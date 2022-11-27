import type { IDonation } from "@/interfaces";
import { axios, useUtils } from "@/modules";
import { defineStore } from "pinia";
import { useToast } from "@/modules";
import type { IBloodBag } from "@/interfaces";

export const useDonationStore = defineStore("donation", () => {
  const { success, error } = useToast();

  const getUserDonations = async (userId: string): Promise<IDonation[]> => {
    return await axios.get<IDonation[]>("/donations").then(({ data }) => {
      return data.filter((d) => d.donor.id === userId);
    });
  };

  const createDonation = async (
    donorId: string,
    bloodCenterId: string,
    schedule: string,
    status: string
  ): Promise<void> => {
    await axios
      .post("/donations", {
        donorId,
        hemocenterId: bloodCenterId,
        schedule,
        status,
      })
      .then(() => success("Doação cadastrada com sucesso!"))
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao cadastrar a doação: ${err.message}`);
        }
      });
  };

  const updateDonation = async (
    donationId: string,
    donorId: string,
    bloodCenterId: string,
    schedule: string,
    status: string
  ): Promise<void> => {
    await axios
      .put("/donations", {
        id: donationId,
        donorId,
        hemocenterId: bloodCenterId,
        schedule,
        status,
      })
      .then(() => success("Doação atualizada com sucesso!"))
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao atualizar a doação: ${err.message}`);
        }
      });
  };

  const getDonationBloodBags = async (
    donationId: string
  ): Promise<IBloodBag[] | void> => {
    return await axios
      .get<IBloodBag[]>("/blood-bags")
      .then(({ data }) => {
        return data.filter((b) => b.donation?.id === donationId);
      })
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao buscar as bolsas de sangue: ${err.message}`);
        }
      });
  };

  return {
    getUserDonations,
    createDonation,
    updateDonation,
    getDonationBloodBags,
  };
});
