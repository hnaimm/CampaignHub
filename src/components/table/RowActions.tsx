"use client";
import { useState } from "react";
import "./style.scss";
import { toast } from "react-toastify";

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";

const RowActions = ({
  rowItem,
  onClone,
  onDelete,
  shouldHide,
}: {
  rowItem: Object;
  onClone: Function;
  onDelete: Function;
  shouldHide: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(2),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <div
      className={shouldHide ? "row-actions-menu hidden" : "row-actions-menu"}
    >
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="row-toggle-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>
      </button>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="menu"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <ul className="menu-list">
              <li className="menu-item" key="clone">
                <button
                  className="menu-button"
                  onClick={() => {
                    toast.success("Row cloned successfully", {
                      position: "bottom-right",
                      theme: "dark",
                    });
                    onClone(rowItem);
                    setIsOpen(false);
                  }}
                >
                  Clone Row
                </button>
              </li>
              <li className="menu-item" key="delete">
                <button
                  className="menu-button"
                  onClick={() => {
                    toast("Row deleted successfully", {
                      position: "bottom-right",
                      theme: "dark",
                    });
                    onDelete([rowItem]);
                    setIsOpen(false);
                  }}
                >
                  Delete Row
                </button>
              </li>
            </ul>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};

export default RowActions;
