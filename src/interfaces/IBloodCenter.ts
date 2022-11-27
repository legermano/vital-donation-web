import type { ISchedule } from "@/interfaces";

export default interface IBloodCenter {
  id: string;
  name: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  schedules: ISchedule[];
}
