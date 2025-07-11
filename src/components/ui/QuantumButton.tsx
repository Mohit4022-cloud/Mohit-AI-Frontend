import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuantumButtonProps extends Omit<HTMLMotionProps<"button">, 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const QuantumButton: React.FC<QuantumButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  glow = false,
  pulse = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
    xl: 24
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-pink-500 to-pink-600
      hover:from-pink-600 hover:to-pink-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-pink-500
      ${glow ? 'shadow-pink-500/25' : ''}
    `,
    secondary: `
      bg-neutral-800 border border-neutral-700
      hover:bg-neutral-700 hover:border-neutral-600
      text-neutral-100
      focus:ring-neutral-500
    `,
    ghost: `
      bg-transparent hover:bg-neutral-800/50
      text-neutral-300 hover:text-neutral-100
      focus:ring-neutral-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      hover:from-red-600 hover:to-red-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500
      ${glow ? 'shadow-red-500/25' : ''}
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600
      hover:from-green-600 hover:to-green-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-green-500
      ${glow ? 'shadow-green-500/25' : ''}
    `
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(236, 72, 153, 0.3)',
        '0 0 40px rgba(236, 72, 153, 0.5)',
        '0 0 20px rgba(236, 72, 153, 0.3)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const LoadingSpinner = () => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate={glow ? "animate" : "rest"}
      disabled={disabled || loading}
      {...props}
    >
      {/* Pulse effect */}
      {pulse && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-white"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.3, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}

      {/* Glow effect */}
      {glow && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          variants={glowVariants}
          animate="animate"
          style={{ zIndex: -1 }}
        />
      )}

      {/* Loading state */}
      {loading && <LoadingSpinner />}

      {/* Button content */}
      <motion.div
        className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}
        animate={{ opacity: loading ? 0 : 1 }}
      >
        {Icon && iconPosition === 'left' && (
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon size={iconSizes[size]} />
          </motion.div>
        )}
        
        <span>{children}</span>
        
        {Icon && iconPosition === 'right' && (
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon size={iconSizes[size]} />
          </motion.div>
        )}
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 0, opacity: 1 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>

      <style jsx>{`
        button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.6s;
          z-index: 1;
        }

        button:hover::before {
          transform: translateX(100%);
        }

        /* Gradient border effect for secondary variant */
        .border-gradient {
          background: linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%);
          padding: 1px;
          border-radius: 0.5rem;
        }

        .border-gradient > * {
          background: #1a1a1a;
          border-radius: calc(0.5rem - 1px);
        }
      `}</style>
    </motion.button>
  );
};

export default QuantumButton;