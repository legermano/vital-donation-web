import { NotificationType } from "@/types";
import { toast } from "bulma-toast";

export const useToast = () => {
  const success = (text: string): void => {
    toast({
      message: text,
      type: NotificationType.SUCCESS,
    });
  };

  const warning = (text: string): void => {
    toast({
      message: text,
      type: NotificationType.WARNING,
    });
  };

  const error = (text: string): void => {
    toast({
      message: text,
      type: NotificationType.DANGER,
    });
  };

  const info = (text: string): void => {
    toast({
      message: text,
      type: NotificationType.INFO,
    });
  };

  return {
    success,
    warning,
    error,
    info,
  };
};
