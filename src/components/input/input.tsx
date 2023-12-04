import { IInputProps } from "@/interfaces";

export const Input = ({
  labelName,
  labelText,
  placeholder,
  type,
  register,
  disable,
  value,
  defaultValue,
  classLabel,
  classInput,
}: IInputProps) => {
  return (
    <>
      {labelName && labelText ? (
        <>
          <label
            className={[
              "-mb-6",
              "text-grey0",
              "text-sm",
              "font-medium",
              classLabel,
            ].join(" ")}
            htmlFor={labelName}
          >
            {labelText}
          </label>

          <input
            className={[
              "rounded",
              "px-3",
              "h-12",
              "border-2",
              "border-grey8",
              "bg-grey5",
              "text-sm",
              "text-grey0",
              "outline-grey3",
              classInput,
            ].join(" ")}
            disabled={disable}
            required
            placeholder={placeholder}
            name={labelName}
            type={type}
            {...register}
            value={value}
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <input
          className={[
            "rounded",
            "px-3",
            "h-12",
            "border-2",
            "border-grey8",
            "bg-grey5",
            "text-sm",
            "text-grey0",
            "outline-grey3",
            classInput,
          ].join(" ")}
          disabled={disable}
          required
          placeholder={placeholder}
          name={labelName}
          type={type}
          {...register}
        />
      )}
    </>
  );
};
