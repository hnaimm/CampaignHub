"use client";

import { NavigationBar } from "@/components";
import CampaignsTable from "./CampaignsTable";

const Campaigns = () => {
  return (
    <main>
      <NavigationBar selectedTab="campaigns" />

      <CampaignsTable />
    </main>
  );
};

export default Campaigns;
