import type { IDonation } from "@/interfaces";
import { axios, useUtils } from "@/modules";
import { defineStore } from "pinia";
import { useToast } from "@/modules";
import type { IBloodBag } from "@/interfaces";
import type { BloodType } from "@/types";

export const useDonationStore = defineStore("donation", () => {
  const { success, error } = useToast();

  const getDonation = async (donationId: string): Promise<IDonation> => {
    return await axios
      .get<IDonation>(`/donations/${donationId}`)
      .then(({ data }) => data);
  };

  const getAllDonations = async (): Promise<IDonation[] | void> => {
    return await axios
      .get<IDonation[]>("/donations")
      .then(({ data }) => data)
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao buscar as doações: ${err.message}`);
        }
      });
  };

  const getUserDonations = async (
    userId: string
  ): Promise<IDonation[] | void> => {
    return await axios
      .get<IDonation[]>("/donations")
      .then(({ data }) => {
        return data.filter((d) => d.donor.id === userId);
      })
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao buscar as doações: ${err.message}`);
        }
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
      .put(`/donations/${donationId}`, {
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

  const createDonationBloodBag = async (
    hemocenterId: string,
    donationId: string,
    code: string,
    date: string,
    volume: number,
    bloodType: BloodType
  ) => {
    await axios
      .post("/blood-bags", {
        hemocenterId,
        donationId,
        code,
        date,
        volume,
        bloodType,
      })
      .then(() => success("Bolsa de sangue cadastrada com sucesso!"))
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao cadastrar a bolsa de sangue: ${err.message}`);
        }
      });
  };

  const updateDonationBloodBag = async (
    id: string,
    code: string,
    date: string,
    volume: number
  ) => {
    await axios
      .put(`/blood-bags/${id}`, {
        id,
        code,
        date,
        volume,
      })
      .then(() => success("Bolsa de sangue atualizada com sucesso!"))
      .catch((err) => {
        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao atualizar a bolsa de sangue: ${err.message}`);
        }
      });
  };

  return {
    getDonation,
    getAllDonations,
    getUserDonations,
    createDonation,
    updateDonation,
    getDonationBloodBags,
    createDonationBloodBag,
    updateDonationBloodBag,
  };
});
