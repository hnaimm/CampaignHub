"use client";
import { useState } from "react";
import { Campaign } from "@/types";
import { LIST_OF_CAMPAIGNS } from "../../data/initialData.ts";
import CreateCampaignForm from "./CreateCampaignForm.tsx";
import { Card, Table } from "@/components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Campaign>();

const tableColumns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("creation_date", {
    header: "Creation Date",
    cell: (info) => info.getValue().toLocaleDateString(),
    // cell: (info) => <i>{info.getValue()}</i>,
  }),

  columnHelper.accessor("number_of_contacts", {
    header: "Contacts",
    cell: (info) => `${info.getValue()} total contacts`,
  }),
];

const CampaignsTable = () => {
  const [tableData, setTableData] = useState(LIST_OF_CAMPAIGNS);

  const onCampaignClone = (newCampaign: Campaign) => {
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
        (campaign) => !(campaign.id == deletedCampaign.id),
      );
    });

    setTableData(updateTableData);
  };

  const onCampaignAdd = (newCampaign: Campaign) => {
    let updateTableData = [newCampaign, ...tableData];

    setTableData(updateTableData);
  };

  return (
    <Card fullHeight>
      <Table
        tableData={tableData}
        tableColumns={tableColumns}
        onItemClone={onCampaignClone}
        onItemsDelete={onCampaignsDelete}
        onItemAdd={onCampaignAdd}
        AddRowForm={CreateCampaignForm}
      />
    </Card>
  );
};

export default CampaignsTable;
