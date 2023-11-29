import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@/components";
import "./style.scss";

const TextInput = ({
  source,
  label = "",
  placeholder = "",
  type = "text",
  required = false,
  iconURL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='12' viewBox='0 0 384 512' fill='%238180a6' %3E%3Cpath d='M32 32C14.3 32 0 46.3 0 64S14.3 96 32 96H160V448c0 17.7 14.3 32 32 32s32-14.3 32-32V96H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H192 32z' /%3E%3C/svg%3E",
}: {
  source: string;
  label?: string;
  placeholder?: string;
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
      {label && (
        <label>
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}

      <input
        {...register(source)}
        placeholder={placeholder}
        type={type}
        style={{ backgroundImage: `url("${iconURL}")` }}
        //To disable autocomplete:
        onFocus={(event) => {
          event.target.setAttribute("autocomplete", "off");
        }}
      />

      {errors && errors[source]?.message && (
        <ErrorMessage message={errors[source]?.message?.toString() || ""} />
      )}
    </div>
  );
};

export default TextInput;
