<script setup lang="ts">
import moment from "moment";
import { ref, type PropType } from "vue";
import { useDonationStore } from "@/stores";
import { Constants } from "@/types";
import { onClickOutside } from "@vueuse/core";
import type { IDonation, IUser, IBloodBag } from "@/interfaces";

const { getDonationBloodBags, getUserDonations } = useDonationStore();

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },
  enableEdit: {
    type: Boolean,
    default: true,
  },
  showDonor: {
    type: Boolean,
    default: true,
  },
});

const donations: IDonation[] = await getUserDonations(props.user.id);
const isModalOpen = ref<Boolean>(false);
const bloodBags = ref<IBloodBag[]>([]);
const modal = ref(null);

onClickOutside(modal, () => (isModalOpen.value = false));

const openBloodBagModal = async (donationId: string) => {
  const response = await getDonationBloodBags(donationId);

  bloodBags.value = response ? response : [];
  isModalOpen.value = true;
};
</script>

<template>
  <div class="table-container">
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th v-if="enableEdit"></th>
          <th v-if="showDonor">Doador(a)</th>
          <th>Data da doação</th>
          <th>Hemocentro</th>
          <th>Status</th>
          <th>Bolsa de sangue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="donation in donations" :key="donation.id">
          <td v-if="enableEdit" class="has-text-centered">
            <RouterLink to="/user/edit">
              <span class="icon has-text-danger">
                <i class="fas fa-pencil"></i>
              </span>
            </RouterLink>
          </td>
          <td v-if="showDonor">{{ donation.donor.name }}</td>
          <td>
            {{
              moment(donation.schedule, Constants.backendDateTimeFormat).format(
                Constants.frontendDateTimeFormat
              )
            }}h
          </td>
          <td>{{ donation.hemocenter.name }}</td>
          <td>{{ donation.status }}</td>
          <td class="has-text-centered" title="Visualizar as bolsas de sangue">
            <a @click="openBloodBagModal(donation.id)">
              <span class="icon has-text-danger">
                <i class="fa-solid fa-eye"></i>
              </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="modal"
    :class="{
      'is-active': isModalOpen,
    }"
  >
    <div class="modal-background"></div>
    <div ref="modal" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Bolsas de sangue</p>
        <button
          class="delete"
          aria-label="close"
          @click="isModalOpen = false"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="bloodBags.length == 0">
          Não tem nenhuma bolsa de sangue vinculada com essa doação :(
        </div>
        <div v-if="bloodBags.length > 0">
          <div class="table-container">
            <table class="table is-fullwidth has-text-centered">
              <thead>
                <tr>
                  <th class="has-text-centered">Data de doação</th>
                  <th class="has-text-centered">Código</th>
                  <th class="has-text-centered">Tipo sanguíneo</th>
                  <th class="has-text-centered">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bloodBag in bloodBags" :key="bloodBag.id">
                  <td>
                    {{
                      moment(
                        bloodBag.date,
                        Constants.backendDateTimeFormat
                      ).format(Constants.frontendDateTimeFormat)
                    }}h
                  </td>
                  <td>{{ bloodBag.code }}</td>
                  <td>{{ bloodBag.bloodType }}</td>
                  <td>{{ bloodBag.volume }} ml</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
