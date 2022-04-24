import React from "react";

const Input = ({ id, label, className, labelClassName, value, placeHolder, onInputChangeHandler, type, required, options }) => {
  return (
      <div>
        <label htmlFor={id} className={labelClassName || "block text-sm font-medium text-gray-700"}>
          {label}
        </label>
        <div className="mt-1">
          {type === "select" && 
            <select
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={onInputChangeHandler}
            >
              <option disabled>{placeHolder}</option>
              {options.map((option, optionIdx) => (
                <option key={optionIdx} value={option.value}>{option.text}</option>
              ))}
            </select>
          }
          {type !== "select" && <input
            id={id}
            type={type || "text"}
            value={value}
            onChange={onInputChangeHandler}
            required={required || true}
            className={className || "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"}
            placeholder={placeHolder}
          />}
        </div>
      </div>
  )
};

export default Input;