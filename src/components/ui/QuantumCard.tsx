import React from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuantumCardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'glass' | 'gradient' | 'neon' | 'holographic';
  hover?: 'lift' | 'glow' | 'tilt' | 'scale' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  border?: boolean;
  shadow?: boolean;
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'primary' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
}

const QuantumCard: React.FC<QuantumCardProps> = ({
  variant = 'default',
  hover = 'lift',
  padding = 'md',
  rounded = 'lg',
  border = true,
  shadow = true,
  icon: Icon,
  title,
  subtitle,
  badge,
  badgeColor = 'primary',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  };

  const baseClasses = `
    relative overflow-hidden
    ${paddingClasses[padding]}
    ${roundedClasses[rounded]}
    ${border ? 'border border-neutral-800' : ''}
    ${shadow ? 'shadow-lg' : ''}
    transition-all duration-300
  `;

  const variantClasses = {
    default: 'bg-neutral-900',
    glass: 'bg-neutral-900/80 backdrop-blur-md',
    gradient: 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900',
    neon: 'bg-neutral-900 shadow-neon',
    holographic: 'bg-neutral-900 holographic'
  };

  const badgeColors = {
    primary: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const hoverVariants = {
    lift: {
      y: -8,
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
    },
    glow: {
      boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
    },
    scale: {
      scale: 1.02
    },
    tilt: {
      rotateX: mousePosition.y * 10,
      rotateY: mousePosition.x * 10,
      transformPerspective: 1000
    },
    none: {}
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hover !== 'tilt') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover !== 'none' ? hoverVariants[hover] : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Gradient overlay for holographic effect */}
      {variant === 'holographic' && (
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'linear-gradient(45deg, #ff0080 0%, #ff8c00 100%)',
              'linear-gradient(45deg, #ff8c00 0%, #40e0d0 100%)',
              'linear-gradient(45deg, #40e0d0 0%, #ff0080 100%)'
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      )}

      {/* Neon glow effect */}
      {variant === 'neon' && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: '0 0 50px rgba(236, 72, 153, 0.6), inset 0 0 50px rgba(236, 72, 153, 0.2)',
            zIndex: -1
          }}
        />
      )}

      {/* Card header */}
      {(Icon || title || subtitle || badge) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <motion.div
                className="p-2 rounded-lg bg-pink-500/10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Icon size={24} className="text-pink-400" />
              </motion.div>
            )}
            
            {(title || subtitle) && (
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-neutral-100">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-neutral-400 mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>

          {badge && (
            <motion.span
              className={`
                px-2 py-1 text-xs font-medium rounded-full border
                ${badgeColors[badgeColor]}
              `}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {badge}
            </motion.span>
          )}
        </div>
      )}

      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated border gradient */}
      <AnimatePresence>
        {border && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 rounded-lg animate-border-gradient" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass refraction effect */}
      {variant === 'glass' && (
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-full bg-gradient-to-br from-white/5 to-transparent"
            animate={{
              x: [-200, 200],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        </div>
      )}

      <style jsx>{`
        .holographic {
          position: relative;
          background: linear-gradient(
            45deg,
            rgba(255, 0, 128, 0.1) 0%,
            rgba(255, 140, 0, 0.1) 25%,
            rgba(64, 224, 208, 0.1) 50%,
            rgba(255, 0, 128, 0.1) 75%,
            rgba(255, 140, 0, 0.1) 100%
          );
        }

        .holographic::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            #ff0080,
            #ff8c00,
            #40e0d0,
            #ff0080
          );
          border-radius: inherit;
          opacity: 0.3;
          z-index: -1;
          animation: holographic-border 3s linear infinite;
        }

        @keyframes holographic-border {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .animate-border-gradient {
          background: linear-gradient(
            90deg,
            transparent,
            #ec4899,
            #8b5cf6,
            transparent
          );
          background-size: 200% 100%;
          animation: border-gradient 2s linear infinite;
        }

        @keyframes border-gradient {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shadow-neon {
          box-shadow: 
            0 0 20px rgba(236, 72, 153, 0.3),
            0 0 40px rgba(236, 72, 153, 0.2),
            0 0 60px rgba(236, 72, 153, 0.1);
        }
      `}</style>
    </motion.div>
  );
};

export default QuantumCard;