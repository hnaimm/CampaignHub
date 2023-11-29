import { User } from "@/types";

interface Campaign {
  id: string;
  name: string;
  type: "Marketing" | "Educational" | "Governmental";
  creation_date: Date;
  contacts?: User[] | number[];
  number_of_contacts?: number;
}

export default Campaign;
