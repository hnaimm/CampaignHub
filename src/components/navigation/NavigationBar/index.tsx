import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils";
import "./style.scss";

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

const NavigationBar = ({
  selectedTab,
}: {
  selectedTab: "campaigns" | "insights";
}) => {
  const router = useRouter();

  const { user, logout } = useAuth();

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
    <>
      <div id="navigation-bar">
        {/* company section */}
        <section id="company-section">
          <img id="ch-logo" src="/CH_logo_navbar.png" alt="Company Logo" />
        </section>

        {/* tabs section and settings section*/}
        <section id="tabs-section">
          <li className={selectedTab == "campaigns" ? "tab tab-active" : "tab"}>
            <Link href={`/campaigns`} class-name="tab-text">
              Campaigns
            </Link>
          </li>
          <li className={selectedTab == "insights" ? "tab tab-active" : "tab"}>
            <Link href={`/insights`} class-name="tab-text">
              Insights
            </Link>
          </li>
        </section>

        {/* Logged in user section */}
        <button
          id="user-section"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <div id="user-info">
            <p id="user-name">{user?.username}</p>
            <p id="user-company">
              {user?.username} {user?.username}
            </p>
          </div>
          <div id="user-avatar">
            {user?.username?.substring(0, 1).toUpperCase()}
          </div>

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
                        logout();

                        router.push("/");
                      }}
                    >
                      Logout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                        className="logout-icon"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </FloatingFocusManager>
          )}
        </button>
      </div>
    </>
  );
};

export default NavigationBar;
