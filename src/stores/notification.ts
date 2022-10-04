import { ref } from "vue";
import { defineStore } from "pinia";
import type { INotification } from "@/interfaces";
import { NotificationType } from "@/types";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([] as INotification[]);

  function notificate(
    title: string,
    text: string,
    notificationType: NotificationType
  ): void {
    const id = new Date().getTime();

    notifications.value.push({
      id,
      title,
      text,
      type: notificationType,
    });

    setTimeout(() => clear(id), 5000);
  }

  function clear(id: number): void {
    notifications.value = notifications.value.filter(
      (notification) => notification.id != id
    );
  }

  function success(title: string, text: string): void {
    notificate(title, text, NotificationType.SUCCESS);
  }

  function warning(title: string, text: string): void {
    notificate(title, text, NotificationType.WARNING);
  }

  function error(title: string, text: string): void {
    notificate(title, text, NotificationType.DANGER);
  }

  function info(title: string, text: string): void {
    notificate(title, text, NotificationType.INFO);
  }

  return {
    notifications,
    notificate,
    clear,
    success,
    warning,
    error,
    info,
  };
});
