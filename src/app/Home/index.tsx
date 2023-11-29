"use client";
import Link from "next/link";
import SignUpButton from "./SignUpButton";
import SignInButton from "./SignInButton";
import "./style.scss";

const Home = () => {
  return (
    <main id="landing-page">
      <nav>
        <Link id="logo-link" href={`/`} class-name="tab-text">
          <img id="ch-logo" src="/CH_logo_navbar.png" alt="Company Logo" />
        </Link>

        <div id="links">
          <a href="#home" className="link">
            Home
          </a>
          <a href="#features" className="link">
            Features
          </a>
          <a href="#demo" className="link">
            Demo
          </a>
        </div>
      </nav>

      <div id="landing-body">
        <section id="home">
          <div id="left">
            <div id="left-content">
              <h1>Manage all your</h1>
              <h1>campaigns</h1>
              <h1>in one place.</h1>

              <p id="ch-description">
                CampaignHub is a campaigns management system that helps your
                business plan, execute and manage marketing campaigns, ensuring
                delivering on time and within budget.
              </p>

              <div id="signin-buttons">
                <SignUpButton />
                <SignInButton />
              </div>
            </div>
          </div>
          <div id="right">
            <img
              id="ch-screenshot"
              src="/circle_design_2.png"
              alt="CH screenshot"
            />
          </div>
        </section>
        <section id="features">
          <h1 id="features-title">Our features</h1>
          <div id="features-list">
            <div className="feature">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100"
                  width="100"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0c17.7 0 32 14.3 32 32V64h32c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-64 64c-12.5 12.5-32.8 12.5-45.3 0l-64-64c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8h32V32c0-17.7 14.3-32 32-32zM169.4 393.4l64-64c12.5-12.5 32.8-12.5 45.3 0l64 64c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H288v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H192c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9zM32 224H64V192c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c12.5 12.5 12.5 32.8 0 45.3l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32zm297.4 54.6c-12.5-12.5-12.5-32.8 0-45.3l64-64c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6v32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H448v32c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-64-64zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
              <p className="feature-description">
                Save and manage your campaigns
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100"
                  width="100"
                  viewBox="0 0 512 512"
                >
                  <path d="M384 48c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H384zM96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM240 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H208zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" />
                </svg>
              </div>
              <p className="feature-description">Manage all your contacts</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100"
                  width="100"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                </svg>
              </div>
              <p className="feature-description">
                See insights and success rates
              </p>
            </div>
          </div>

          <p id="more-text">And much more!</p>
        </section>

        <section id="demo">
          <p id="demo-text">Want to know more about what CampaignHub offers?</p>
          <p id="book-text">Book your demo today!</p>

          <div id="email-section">
            <input id="email-input" placeholder="Enter you email address" />
            <p id="email-text">
              Please enter your email address, and we will get in touch with
              you.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
