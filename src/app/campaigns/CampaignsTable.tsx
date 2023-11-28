"use client";
import { useState } from "react";
import { Campaign } from "@/types";
import { LIST_OF_CAMPAIGNS } from "./data.ts";
import { Card, Table } from "@/components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Campaign>();

const tableColumns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("creation_date", {
    header: "Creation Date",
    cell: (info) => info.getValue().toLocaleDateString(),
    // cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("account_id", {
    header: "Account ID",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("contacts", {
    header: "Contacts",
    cell: (info) => info.getValue().join(", "),
  }),
];

const CampaignsTable = () => {
  const [tableData, setTableData] = useState(LIST_OF_CAMPAIGNS);

  const onCampaignAdd = (newCampaign: Campaign) => {
    let newCampaignName = "";

    if (newCampaign.name.substring(0, 8) == "Copy of ") {
      let len = newCampaign.name.length;
      if (
        newCampaign.name[len - 3] == "(" &&
        newCampaign.name[len - 1] == ")"
      ) {
        newCampaignName = `${newCampaign.name.substring(0, len - 3)}(${
          parseInt(newCampaign.name[len - 2]) + 1
        })`;
      } else {
        newCampaignName = `${newCampaign.name} (1)`;
      }
    } else {
      newCampaignName = `Copy of ${newCampaign.name}`;
    }

    newCampaign = { ...newCampaign, name: newCampaignName };
    let updateTableData = [newCampaign, ...tableData];

    setTableData(updateTableData);
  };

  const onCampaignsDelete = (deletedCampaigns: Campaign[]) => {
    let updateTableData = tableData;

    deletedCampaigns.forEach((deletedCampaign) => {
      updateTableData = updateTableData.filter(
        (campaign) =>
          !(
            campaign.name == deletedCampaign.name &&
            campaign.account_id == deletedCampaign.account_id
          ),
      );
    });

    setTableData(updateTableData);
  };

  return (
    <Card fullHeight>
      <Table
        tableData={tableData}
        tableColumns={tableColumns}
        onItemAdd={onCampaignAdd}
        onItemsDelete={onCampaignsDelete}
      />
    </Card>
  );
};

export default CampaignsTable;
