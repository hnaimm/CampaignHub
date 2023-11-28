import Image from "next/image";
import "./NavigationBar.scss";

const NavigationBar = ({
  selectedTab,
}: {
  selectedTab: "campaigns" | "insights";
}) => {
  return (
    <div id="navigation-bar">
      {/* company section */}
      <section id="company-section">
        <img
          id="ch-logo"
          src="/campaignHub logo.PNG"
          alt="Picture of the author"
        />
      </section>

      {/* tabs section and settings section*/}
      <section id="tabs-section">
        <button className="tab">
          <span className="tab-text">Campaigns</span>
        </button>
        <button className="tab">
          <span className="tab-text">Insights</span>
        </button>
      </section>

      {/* Logged in user section */}
      <section id="user-section">
        <div id="user-info">
          <p>User Name</p>
          <p>Company Name</p>
        </div>
        <div id="user-img">
          <img id="user-logo" src="/user-logo.ico" />
        </div>
      </section>
    </div>
  );
};

export default NavigationBar;
