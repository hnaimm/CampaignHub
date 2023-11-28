import { User } from "@/types";

interface Campaign {
  name: string;
  creation_date: Date;
  account_id: string;
  type: "Marketing" | "Educational" | "Governmental";
  contacts: User[];
}

export default Campaign;
