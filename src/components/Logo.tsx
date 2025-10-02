import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'horizontal', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  const LogoIcon = () => (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
    >
      <path 
        fill="#4f46e5" 
        d="M50 0C27.9 0 10 17.9 10 40c0 22.1 40 60 40 60s40-37.9 40-60C90 17.9 72.1 0 50 0zm0 60c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"
      />
      <path 
        fill="#ffffff" 
        d="M50 25c-8.3 0-15 6.7-15 15v10c0 1.9 1.4 3.5 3.2 3.8.3.1.7.1 1 .1h21.6c.3 0 .6 0 .9-.1 1.8-.3 3.2-1.9 3.2-3.8V40c0-8.3-6.7-15-15-15z"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <LogoIcon />;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <LogoIcon />
        <span className={`${textSizes[size]} text-gray-800 font-bold`}>
          Essencial <span className="font-bold">Já</span>
        </span>
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      <span className={`${textSizes[size]} text-gray-800 font-bold`}>
        Essencial <span className="font-bold">Já</span>
      </span>
    </div>
  );
};

export default Logo;
