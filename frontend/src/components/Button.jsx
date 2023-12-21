const Button = ({
  children,
  ...props
}) => {
  return (
    <button
      className="flex items-center bg-epitechBlue text-white px-3 py-2 rounded-lg font-bold gap-3 enabled:hover:scale-105 transition duration-200 z-10 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
