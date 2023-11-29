"use client";
import { Button } from "@/components";
import { useModal } from "@/utils";
import SignInForm from "./SignInForm";

const SignUpButton = () => {
  const { modal, showModal, hideModal } = useModal();

  return (
    <>
      <Button
        title="Join Now!"
        onClick={() => {
          showModal({
            content: (
              <SignInForm modalMethods={{ modal, showModal, hideModal }} />
            ),
          });
        }}
      />
      {modal}
    </>
  );
};

export default SignUpButton;
