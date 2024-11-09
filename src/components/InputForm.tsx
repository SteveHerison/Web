import { useState } from "react";
import Olho from "../assets/eye-svgrepo-com.svg";
import OlhoClose from "../assets/eye-closed-svgrepo-com.svg";

interface Props {
  title: string;
  value: string;
  id: string;
  type?: string;
  place?: string;
  disabled: boolean;
  required?: boolean;
  errorMessage: string;
  spellcheck: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

const InputForm = ({
  title,
  id,
  type = "text",
  place,
  disabled,
  value,
  required = false,
  errorMessage,
  spellcheck,
  onChange,
  onFocus,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full [--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center">
      <input
        id={id}
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={place}
        disabled={disabled}
        value={value}
        required={required}
        spellCheck={spellcheck}
        autoComplete="off"
        aria-invalid="false"
        onChange={({ target }) => onChange && onChange(target.value)}
        onFocus={onFocus}
        className={`peer relative text-black h-10 min-h-10 pr-10 leading-normal appearance-none resize-none box-border text-base w-full text-inherit block text-left border border-solid bg-white rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a] ${
          errorMessage ? "border-red-500" : ""
        }${type === "password" ? "pl-7" : "pl-2"}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className="absolute items-center object-center w-5 h-5 bg-transparent left-1 focus:outline-none"
        >
          <img
            src={isPasswordVisible ? Olho : OlhoClose}
            alt="Toggle password visibility"
          />
        </button>
      )}
      <label
        className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[32px] peer-focus-visible:text-teal-500 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
        htmlFor={id}
      >
        {title}
      </label>

      <div className="group w-10 absolute top-0 bottom-0 right-0 flex items-center justify-center text-[--clr] peer-focus-visible:text-teal-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1rem"
          height="1rem"
          strokeLinejoin="round"
          strokeLinecap="round"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className={`"relative z-10 ${
            errorMessage ? "text-red-500" : "peer-focus-visible:text-teal-600"
          }`}
        >
          <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
        <span
          className={`${
            errorMessage ? "bg-red-500 text-red-300 font-semibold" : ""
          } text-sm absolute cursor-default select-none rounded-s px-1.5 right-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[calc(100%+18px)] bg-gray-200 text-black z-20 text-center`}
        >
          {errorMessage ? errorMessage : "Campo obrigatório"}
        </span>
      </div>
    </div>
  );
};

export default InputForm;
