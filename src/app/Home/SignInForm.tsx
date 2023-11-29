import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { ErrorMessage, Form, TextInput } from "@/components";
import { useAuth } from "@/utils";
import { ExistingAccounts } from "./ExistingAccounts.js";
import bcryptjs from "bcryptjs";
import { Account } from "@/types";
import { toast } from "react-toastify";

const SignInForm = ({ modalMethods }: { modalMethods: any }) => {
  const router = useRouter();

  const props = useAuth();
  const { login } = props;

  const { hideModal } = modalMethods;

  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = yup.object({
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const onSubmit = (data: Account) => {
    let { username, password } = data;

    // check if account exists:
    let account = ExistingAccounts.find((acc) => acc.username == username);
    if (account) {
      //check if password correct:

      let passwordCorrect = bcryptjs.compareSync(password, account.hash);

      if (passwordCorrect) {
        //sign in: generate token and save it to cookies

        toast.success("Logged in successfully", {
          position: "bottom-right",
          theme: "dark",
        });

        setErrorMessage("");
        hideModal();

        login({ username, password });

        setTimeout(() => {
          //navigate to campaigns page
          router.push("/campaigns");
        }, 500);
      } else {
        setErrorMessage("Incorrect username or password. Please try again.");
      }
    } else {
      setErrorMessage("Incorrect username or password. Please try again.");
    }
  };
  const onCancel = () => {
    hideModal();
  };

  return (
    <div>
      <h1>Sign In to CampaignHub!</h1>

      <Form
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <TextInput
          source="username"
          label="Username"
          placeholder="Enter username"
          iconURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512' fill='%238180a6' %3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' /%3E%3C/svg%3E"
          required
        />

        <TextInput
          source="password"
          label="Password"
          placeholder="••••••••••"
          iconURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512' fill='%238180a6' %3E%3Cpath d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z' /%3E%3C/svg%3E"
          required
        />

        <>{errorMessage != "" && <ErrorMessage message={errorMessage} />}</>
      </Form>
    </div>
  );
};

export default SignInForm;
