function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-5
        py-2
        rounded-lg
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        transition
        duration-200
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;