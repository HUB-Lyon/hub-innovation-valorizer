import { classNames } from "../utils";

const Input = ({
  label,
  name,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  classes = "",
  LeftIcon = null,
  as = null,
  ...props
}) => {
  const Component = as ?? "input"

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {LeftIcon &&
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        }
        <Component
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-200",
            LeftIcon ? 'pl-10' : '',
            classes,
          )}
          {...props}
        />
      </div>
    </div>
  )
}

export default Input;
