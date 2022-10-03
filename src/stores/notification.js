import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([]);

  function success(title, text) {
    let id = new Date().getTime();

    notifications.value.push({
      id,
      title,
      text,
      type: "is-success",
    });

    setTimeout(() => this.clear(id), 5000);
  }

  function warning(title, text) {
    let id = new Date().getTime();

    notifications.value.push({
      id,
      title,
      text,
      type: "is-warning",
    });

    setTimeout(() => this.clear(id), 5000);
  }

  function error(title, text) {
    let id = new Date().getTime();

    notifications.value.push({
      id,
      title,
      text,
      type: "is-danger",
    });

    setTimeout(() => this.clear(id), 5000);
  }

  function clear(id) {
    notifications.value = notifications.value.filter((n) => (n.id = !id));
  }

  return {
    notifications,
    success,
    warning,
    error,
    clear,
  };
});
