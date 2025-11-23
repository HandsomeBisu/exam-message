import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'floating';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  fullWidth = false
}) => {
  const baseStyles = "font-bold rounded-2xl py-4 px-6 flex items-center justify-center transition-colors select-none";
  
  const variants = {
    primary: "bg-[#3182f6] text-white hover:bg-[#1b64da] disabled:bg-[#b0b8c1]",
    secondary: "bg-[#e8f3ff] text-[#1b64da] hover:bg-[#dbe9ff]",
    ghost: "bg-transparent text-[#4e5968] hover:bg-black/5",
    floating: "fixed bottom-8 left-1/2 -translate-x-1/2 shadow-lg shadow-blue-500/30 bg-[#3182f6] text-white z-50 rounded-full px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;