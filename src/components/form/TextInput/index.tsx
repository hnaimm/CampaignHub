import { useFormContext } from "react-hook-form";
import "./TextInput.scss";

const TextInput = ({
  source,
  label,
  placeholder,
  type = "text",
  required = false,
  iconURL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='12' viewBox='0 0 384 512' fill='%238180a6' %3E%3Cpath d='M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96H160V448c0 17.7 14.3 32 32 32s32-14.3 32-32V96H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H192 32z' /%3E%3C/svg%3E",
}: {
  source: string;
  label: string;
  placeholder: string;
  type?: "text" | "password";
  required?: boolean;
  iconURL?: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="text-input-wrapper">
      <label>
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>

      <input
        {...register(source)}
        placeholder={placeholder}
        type={type}
        style={{ backgroundImage: `url("${iconURL}")` }}
      />

      {errors && errors[source] && (
        <span className="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12"
            width="12"
            viewBox="0 0 512 512"
            fill="#ff2c2c"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
          <span className="error-message-message">
            {errors[source]?.message?.toString()}
          </span>
        </span>
      )}
    </div>
  );
};

export default TextInput;
