import React from 'react';
import { Sparkles } from 'lucide-react';

interface MohitAILogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function MohitAILogo({ size = 'medium', className = '' }: MohitAILogoProps) {
  const sizeClasses = {
    small: 'mohit-logo-small',
    medium: 'mohit-logo-medium', 
    large: 'mohit-logo-large'
  };

  return (
    <div className={`mohit-ai-logo ${sizeClasses[size]} ${className}`}>
      <div className="logo-core">
        <div className="logo-inner">
          <Sparkles className="logo-icon" />
        </div>
      </div>
      <style jsx>{`
        .mohit-ai-logo {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Small size - for navbar */
        .mohit-logo-small .logo-core {
          width: 40px;
          height: 40px;
        }

        .mohit-logo-small .logo-inner {
          inset: 5px;
        }

        .mohit-logo-small .logo-icon {
          width: 20px;
          height: 20px;
        }

        /* Medium size - for general use */
        .mohit-logo-medium .logo-core {
          width: 60px;
          height: 60px;
        }

        .mohit-logo-medium .logo-inner {
          inset: 8px;
        }

        .mohit-logo-medium .logo-icon {
          width: 30px;
          height: 30px;
        }

        /* Large size - for hero sections */
        .mohit-logo-large .logo-core {
          width: 100px;
          height: 100px;
        }

        .mohit-logo-large .logo-inner {
          inset: 15px;
        }

        .mohit-logo-large .logo-icon {
          width: 50px;
          height: 50px;
        }

        /* Core styles */
        .logo-core {
          position: relative;
          aspect-ratio: 1;
          animation: logoRotate 4s linear infinite;
          filter: drop-shadow(0 0 15px rgba(255, 110, 199, 0.6));
          transition: filter 0.3s ease;
        }

        .mohit-ai-logo:hover .logo-core {
          filter: drop-shadow(0 0 25px rgba(255, 110, 199, 0.9));
        }

        @keyframes logoRotate {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }

        .logo-inner {
          position: absolute;
          background: linear-gradient(135deg, #FF6EC7 0%, #E94B9B 25%, #FF6EC7 50%, #FFB6E1 75%, #FF6EC7 100%);
          background-size: 300% 300%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 0 30px rgba(255, 110, 199, 0.8),
            inset 0 0 15px rgba(255, 255, 255, 0.4);
          animation: logoPulse 2s ease-in-out infinite, gradientShift 5s ease-in-out infinite;
          overflow: hidden;
        }

        /* Inner energy effect */
        .logo-inner::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: energyRotate 2s linear infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes energyRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              0 0 20px rgba(255, 110, 199, 0.6),
              inset 0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 
              0 0 30px rgba(255, 110, 199, 0.9),
              inset 0 0 15px rgba(255, 255, 255, 0.5);
          }
        }

        /* Icon styling */
        .logo-icon {
          color: white;
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}