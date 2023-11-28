"use client";
import { useState } from "react";
// import "./table.scss";
import "./TableActions.scss";

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
  selectedRows,
  onClone,
  onDelete,
}: {
  selectedRows: Object[];
  onClone: Function;
  onDelete: Function;
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
    <div className="row-actions-menu">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="toggle-button"
      >
        Actions{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
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
                  disabled={selectedRows?.length != 1 ? true : false}
                  onClick={() => {
                    onClone(selectedRows[0]);
                    setIsOpen(false);
                  }}
                >
                  Clone Row
                </button>
              </li>
              <li className="menu-item" key="delete">
                <button
                  className="menu-button"
                  disabled={selectedRows?.length < 1 ? true : false}
                  onClick={() => {
                    onDelete(selectedRows);
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
