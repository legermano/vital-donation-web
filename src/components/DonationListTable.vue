<script setup lang="ts">
import moment from "moment";
import { ref, type PropType } from "vue";
import { useDonationStore } from "@/stores";
import { Constants } from "@/types";
import { onClickOutside } from "@vueuse/core";
import { BloodBagForm } from "@/components/forms";
import type { IDonation, IUser, IBloodBag } from "@/interfaces";

const { getDonationBloodBags, getUserDonations, getAllDonations } =
  useDonationStore();

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
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

const isBloodBagViewModalOpen = ref<Boolean>(false);
const isBloodBagFormModalOpen = ref<Boolean>(false);
const bloodBags = ref<IBloodBag[]>([]);
const donation = ref<string>("");
const donor = ref<string>("");
const bloodBagViewModal = ref(null);
const bloodBagFormModal = ref(null);

let donations: IDonation[] = [];

if (props.user) {
  const donationsResponse = await getUserDonations(props.user.id);
  donations = donationsResponse ? donationsResponse : [];
} else {
  const donationsResponse = await getAllDonations();
  donations = donationsResponse ? donationsResponse : [];
}

onClickOutside(
  bloodBagViewModal,
  () => (isBloodBagViewModalOpen.value = false)
);

onClickOutside(
  bloodBagFormModal,
  () => (isBloodBagFormModalOpen.value = false)
);

const openBloodBagModalView = async (donationId: string) => {
  const response = await getDonationBloodBags(donationId);

  bloodBags.value = response ? response : [];
  isBloodBagViewModalOpen.value = true;
};

const openBloodBagModalForm = async (donationId: string, donorId: string) => {
  const response = await getDonationBloodBags(donationId);

  donation.value = donationId;
  donor.value = donorId;
  bloodBags.value = response ? response : [];
  isBloodBagFormModalOpen.value = true;
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
          <th></th>
          <th v-if="showDonor">Doador(a)</th>
          <th>Data da doação</th>
          <th>Hemocentro</th>
          <th>Status</th>
          <th>Bolsa de sangue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="donation in donations" :key="donation.id">
          <td v-if="enableEdit" class="has-text-centered" title="Editar doação">
            <RouterLink
              :to="{
                path: `/donation/edit/${donation.id}`,
              }"
            >
              <span class="icon has-text-danger">
                <i class="fas fa-pencil"></i>
              </span>
            </RouterLink>
          </td>
          <td
            v-if="enableEdit"
            class="has-text-centered"
            title="Adicionar bolsas de sangue"
          >
            <a @click="openBloodBagModalForm(donation.id, donation.donor.id)">
              <span class="icon has-text-danger">
                <i class="fa-solid fa-hand-holding-droplet"></i>
              </span>
            </a>
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
            <a @click="openBloodBagModalView(donation.id)">
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
      'is-active': isBloodBagViewModalOpen,
    }"
  >
    <div class="modal-background"></div>
    <div ref="bloodBagViewModal" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Bolsas de sangue</p>
        <button
          class="delete"
          aria-label="close"
          @click="isBloodBagViewModalOpen = false"
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

  <div class="modal is-active" v-if="isBloodBagFormModalOpen">
    <div class="modal-background"></div>
    <div ref="bloodBagFormModal" class="modal-card modal-bloodbag-form">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastrar bolsas de sangue</p>
        <button
          class="delete"
          aria-label="close"
          @click="isBloodBagFormModalOpen = false"
        ></button>
      </header>
      <section class="modal-card-body">
        <BloodBagForm
          :donation-id="donation"
          :donor-id="donor"
          :blood-bag="bloodBags"
        />
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-bloodbag-form {
  width: auto !important;
}
</style>
