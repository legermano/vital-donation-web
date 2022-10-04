import type { NotificationType } from "@/types";

export default interface INotification {
  id: number;
  title: string;
  text: string;
  type: NotificationType;
}
