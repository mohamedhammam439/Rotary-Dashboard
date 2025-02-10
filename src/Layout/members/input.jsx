import { Label, TextInput } from "flowbite-react";

const CustomInput = ({htmlFor, value , label , onChange, onBlur , placeholder, touched , errors}) => {
  return (
    <div className="flex flex-row ">
      <div className="flex flex-row flex-wrap items-center">
        <div className="mb-2 w-32 ">
          <Label htmlFor={htmlFor} value={label} />
        </div>
        <div>
          <TextInput
            id={htmlFor}
            type="text"
            placeholder={placeholder}
            className="w-72"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            color={errors.htmlFor && touched.htmlFor ? "failure" : ""}
            helperText={
              errors.htmlFor && touched.htmlFor ? (
                <p className="text-xs ">{errors.htmlFor}</p>
              ) : (
                ""
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
