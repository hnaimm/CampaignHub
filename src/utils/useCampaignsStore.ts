import { create } from "zustand";
import { LIST_OF_CAMPAIGNS } from "../data/allData.ts";
import { Campaign } from "@/types";

interface CampaignState {
  campaigns: Campaign[];
  addCampaignToStore: (newCampaign: Campaign) => void;
  deleteCampaignFromStore: (toDeleteCampaign: Campaign) => void;
}

const useCampaignsStore = create<CampaignState>((set, get) => ({
  campaigns: LIST_OF_CAMPAIGNS,
  addCampaignToStore: (newCampaign) => {
    let updateTableCampaigns = get().campaigns;
    updateTableCampaigns = [newCampaign, ...updateTableCampaigns];
    set({ campaigns: updateTableCampaigns });
  },
  deleteCampaignFromStore: (toDeleteCampaign) => {
    let updateTableCampaigns = get().campaigns.filter(
      (campaign) => !(campaign.id == toDeleteCampaign.id),
    );
    set({ campaigns: updateTableCampaigns });
  },
}));

export default useCampaignsStore;
