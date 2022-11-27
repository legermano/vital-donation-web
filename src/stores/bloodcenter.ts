import type IBloodCenter from "@/interfaces/IBloodCenter";
import { axios } from "@/modules";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBloodCenterStore = defineStore("bloodcenter", () => {
  const bloodCenters = ref<IBloodCenter[]>([] as IBloodCenter[]);

  const getAllBloodCenters = async (): Promise<void> => {
    await axios
      .get("/hemocenters")
      .then(({ data }) => (bloodCenters.value = data));
  };

  return {
    bloodCenters,
    getAllBloodCenters,
  };
});
