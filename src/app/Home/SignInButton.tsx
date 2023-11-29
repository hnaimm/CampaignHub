"use client";
import { Button } from "@/components";
import { useModal } from "@/utils";
import SignInForm from "./SignInForm";
import "./style.scss";

const SignUpButton = () => {
  const { modal, showModal, hideModal } = useModal();

  return (
    <>
      <button
        id="signin-button"
        onClick={() => {
          showModal({
            content: (
              <SignInForm modalMethods={{ modal, showModal, hideModal }} />
            ),
          });
        }}
      >
        Already have an account? Click to sign in
      </button>

      {modal}
    </>
  );
};

export default SignUpButton;
