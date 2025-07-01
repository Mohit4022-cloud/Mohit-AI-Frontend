'use client';

import { useState } from 'react';

export default function TestElevenLabs() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [wsUrl, setWsUrl] = useState('');

  const testConnection = async () => {
    try {
      setStatus('Getting WebSocket URL...');
      setError('');
      
      const response = await fetch('/api/elevenlabs/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: 'agent_01jx1w1hf3e68v6n8510t90ww0'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get WebSocket URL');
      }

      const data = await response.json();
      setWsUrl(data.websocket_url);
      setStatus(`Got WebSocket URL (${data.is_public ? 'public' : 'private'} agent)`);
      
      // Try to connect
      setStatus('Connecting to WebSocket...');
      const ws = new WebSocket(data.websocket_url);
      
      ws.onopen = () => {
        setStatus('WebSocket connected successfully!');
        ws.close();
      };
      
      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError(`WebSocket error occurred`);
      };
      
      ws.onclose = (event) => {
        if (event.code !== 1000) {
          setStatus(`WebSocket closed: Code ${event.code} - ${event.reason || 'No reason provided'}`);
        }
      };
      
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test ElevenLabs Connection</h1>
      
      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Test Connection
      </button>
      
      {status && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded mb-4">
          <strong>Status:</strong> {status}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {wsUrl && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>WebSocket URL:</strong>
          <div className="mt-2 text-xs break-all font-mono">
            {wsUrl}
          </div>
        </div>
      )}
    </div>
  );
}