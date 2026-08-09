function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white
        dark:bg-gray-800
        rounded-xl
        shadow-md
        p-6
        transition
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;