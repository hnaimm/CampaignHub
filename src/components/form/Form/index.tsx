import { ReactElement, MouseEventHandler } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";
import Button from "../Button";
import "./Form.scss";

const Form = ({
  validationSchema,
  onSubmit,
  onCancel,
  children,
}: {
  validationSchema: ObjectSchema<any>;
  onSubmit: SubmitHandler<any>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  children: ReactElement[];
}) => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, watch } = formMethods;

  console.log("watch!!!", watch());

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}

        <div className="form-action-buttons">
          <Button
            title="Cancel"
            type="button"
            onClick={onCancel}
            primary={false}
          />
          <Button title="Submit" type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
