import Link from "next/link";
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
        <img id="ch-logo" src="/campaignHub logo.PNG" alt="Company Logo" />
      </section>

      {/* tabs section and settings section*/}
      <section id="tabs-section">
        <li className="tab">
          <Link href={`/campaigns`} class-name="tab-text">
            Campaigns
          </Link>
        </li>
        <li className="tab">
          <Link href={`/insights`} class-name="tab-text">
            Insights
          </Link>
        </li>
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
