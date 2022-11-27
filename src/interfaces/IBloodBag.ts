import type { BloodType } from "@/types";
import type { IDonation } from "@/interfaces";

export default interface IBloodBag {
  id: string;
  code: string;
  date: string;
  bloodType: BloodType;
  volume: number;
  donation?: IDonation;
}
