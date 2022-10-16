import type IRole from "./IRole";
import type { BloodType } from "@/types";

export default interface IUser {
  id: string;
  name: string;
  cpf: number;
  email?: string;
  phone?: string;
  address?: string;
  complement?: string;
  weight?: number;
  height?: number;
  birthdate?: string;
  bloodType?: BloodType;
  roles?: Array<IRole>;
}
