function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full
          px-4
          py-2
          rounded-lg
          border
          border-gray-300
          dark:border-gray-600
          dark:bg-gray-700
          dark:text-white
          focus:ring-2
          focus:ring-blue-500
          outline-none
          transition
          ${className}
        `}
      />
    </div>
  );
}

export default Input;