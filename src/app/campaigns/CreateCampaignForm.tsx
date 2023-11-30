import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Form, TextInput, SelectInput } from "@/components";
import { Campaign } from "@/types";
import { nanoid } from "nanoid";
import {
  LIST_OF_CAMPAIGN_TYPES,
  LIST_OF_CONTACTS,
  LIST_OF_CAMPAIGNS,
} from "../../data/allData.ts";

const CreateCampaignForm = ({
  modalMethods,
  addRow,
}: {
  modalMethods: any;
  addRow: Function;
}) => {
  const { hideModal } = modalMethods;

  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = yup.object({
    name: yup.string().required("This field is required"),
    type: yup.object().required("This field is required"),
    contacts: yup
      .array(yup.object())
      .min(5, "Please select at least 5 contacts.")
      .required("Please select at least 5 contacts."),
  });

  const onSubmit = (data: Campaign) => {
    if (LIST_OF_CAMPAIGNS.find((camp) => camp.name == data.name)) {
      //Can't add campaign, name already exists
      setErrorMessage(
        `The name '${data.name}' already exists, please use another name.`,
      );
    } else {
      //Can add campaign
      setErrorMessage("");
      addRow({
        id: nanoid(),
        name: data.name,
        // @ts-ignore
        type: data.type.value,
        creation_date: new Date(),
        number_of_contacts: data.contacts?.length,
      });

      hideModal();
    }
  };
  const onCancel = () => {
    hideModal();
  };

  return (
    <div>
      <h1>Add New Row</h1>

      <Form
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <TextInput
          source="name"
          label="campaign name"
          placeholder="Enter name"
          iconURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='14' width='16' viewBox='0 0 512 512' fill='%238180a6' %3E%3Cpath d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' /%3E%3C/svg%3E"
          required
        />

        <SelectInput
          source="type"
          label="Campaign type"
          placeholder="Select Type"
          options={LIST_OF_CAMPAIGN_TYPES.map((op) => ({
            value: op,
            label: op,
          }))}
          iconURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='18' viewBox='0 0 576 512' fill='%238180a6' %3E%3Cpath d='M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z' /%3E%3C/svg%3E"
          required
        />

        <SelectInput
          source="contacts"
          label="Contacts"
          placeholder="Select 5 contacts"
          options={LIST_OF_CONTACTS.map((op) => ({
            value: op.id,
            label: op.fullname,
          }))}
          isMulti
          iconURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512' fill='%238180a6' %3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' /%3E%3C/svg%3E"
          required
        />

        <>{errorMessage != "" && <ErrorMessage message={errorMessage} />}</>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;
