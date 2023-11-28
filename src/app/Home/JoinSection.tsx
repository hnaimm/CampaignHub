"use client";
import { Button } from "@/components";
import { useModal } from "@/utils";
import SignInForm from "./SignInForm";

const JoinSection = () => {
  const { modal, showModal, hideModal } = useModal();

  return (
    <>
      <Button
        title="JOIN"
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

export default JoinSection;
