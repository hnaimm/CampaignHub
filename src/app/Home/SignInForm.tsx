import { useForm, SubmitHandler } from "react-hook-form";

const SignInForm = ({ onSubmit }: { onSubmit: SubmitHandler<any> }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("watch!!!", watch());

  return (
    <div>
      <h1>Sign In to CampaignHub!</h1>
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="username"
          {...register("username", { required: true })}
        />

        <input
          placeholder="password"
          {...register("exampleRequired", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default SignInForm;
