"use client";

import { useEffect, useState } from 'react';

export function AudioDiagnostics() {
  const [diagnostics, setDiagnostics] = useState({
    audioContext: 'Checking...',
    webSocket: 'Checking...',
    proxy: 'Checking...',
    browser: 'Checking...',
    microphone: 'Checking...'
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      // Check Audio Context
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          setDiagnostics(d => ({ ...d, audioContext: '✗ Not supported' }));
        } else {
          const ac = new AudioContextClass();
          const sampleRate = ac.sampleRate;
          ac.close();
          setDiagnostics(d => ({ ...d, audioContext: `✓ ${sampleRate}Hz` }));
        }
      } catch (e) {
        setDiagnostics(d => ({ ...d, audioContext: '✗ Failed' }));
      }

      // Check WebSocket support
      setDiagnostics(d => ({ 
        ...d, 
        webSocket: 'WebSocket' in window ? '✓ Supported' : '✗ Not supported' 
      }));

      // Check proxy using WebSocket connection test
      try {
        await new Promise<void>((resolve, reject) => {
          const ws = new WebSocket('ws://localhost:3002');
          const timeout = setTimeout(() => {
            ws.close();
            reject(new Error('Connection timeout'));
          }, 5000);

          ws.onopen = () => {
            clearTimeout(timeout);
            ws.close();
            resolve();
          };

          ws.onerror = (error) => {
            clearTimeout(timeout);
            reject(error);
          };
        });

        setDiagnostics(d => ({ 
          ...d, 
          proxy: '✓ WebSocket server accessible' 
        }));
      } catch (e) {
        setDiagnostics(d => ({ ...d, proxy: '✗ Not running' }));
      }

      // Browser info
      const userAgent = navigator.userAgent;
      let browserInfo = '⚠️  Unknown';
      if (userAgent.includes('Chrome')) {
        browserInfo = '✓ Chrome';
      } else if (userAgent.includes('Firefox')) {
        browserInfo = '✓ Firefox';
      } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserInfo = '⚠️  Safari (limited support)';
      }
      setDiagnostics(d => ({ ...d, browser: browserInfo }));

      // Check microphone access
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setDiagnostics(d => ({ ...d, microphone: '✓ Available' }));
      } catch (e) {
        const error = e as Error;
        if (error.name === 'NotAllowedError') {
          setDiagnostics(d => ({ ...d, microphone: '✗ Permission denied' }));
        } else if (error.name === 'NotFoundError') {
          setDiagnostics(d => ({ ...d, microphone: '✗ No microphone found' }));
        } else {
          setDiagnostics(d => ({ ...d, microphone: '✗ Error' }));
        }
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-sm">
      <h3 className="font-bold mb-2">System Diagnostics</h3>
      <ul className="space-y-1">
        <li>Audio Context: <span className="font-mono">{diagnostics.audioContext}</span></li>
        <li>WebSocket: <span className="font-mono">{diagnostics.webSocket}</span></li>
        <li>Proxy Server: <span className="font-mono">{diagnostics.proxy}</span></li>
        <li>Browser: <span className="font-mono">{diagnostics.browser}</span></li>
        <li>Microphone: <span className="font-mono">{diagnostics.microphone}</span></li>
      </ul>
      <div className="mt-3 pt-3 border-t border-gray-300">
        <p className="text-xs text-gray-600">
          For best results, use Chrome or Firefox with the proxy server running.
        </p>
      </div>
    </div>
  );
}