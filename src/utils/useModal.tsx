import React, { useState, ReactNode } from "react";
import { Modal } from "@/components";

const useModal = () => {
  const [modal, setModal] = useState<ReactNode | undefined>();

  const showModal = ({ content }: any) => {
    let mod = <Modal hideModal={() => setModal(undefined)}>{content}</Modal>;

    setModal(mod);
  };

  const hideModal = () => {
    setModal(undefined);
  };

  return {
    modal,
    showModal,
    hideModal,
  };
};

export default useModal;
