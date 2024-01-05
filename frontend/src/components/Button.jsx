import { classNames } from "../utils"

const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={
        classNames(
          "flex items-center",
          "bg-epitechBlue text-white",
          "px-3 py-2",
          "rounded-lg",
          "font-bold gap-3",
          "enabled:hover:scale-105 transition duration-200 disabled:cursor-not-allowed",
          "z-10",
          className
        )
      }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
