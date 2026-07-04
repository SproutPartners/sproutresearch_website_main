// Components/Avatar.js
export default function Avatar({ user, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const initials = (user?.fullName )
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div
      className={`
        ${sizeClasses[size]}
        bg-gradient-to-br from-blue-500 to-purple-600
        rounded-full flex items-center justify-center
        text-white font-bold shadow-md
        ${className}
      `}
    >
      {initials}
    </div>
  );
}
