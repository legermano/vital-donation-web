<script setup lang="ts">
import type { IDonation } from "@/interfaces";
import type { PropType } from "vue";
import moment from "moment";
import { useDonationStore } from "@/stores";
import {
  BaseInput,
  DateTimePicker,
  DonationStatusSelect,
  NameInput,
} from "@/components/fields";
import { Constants, DonationStatus } from "@/types";
import { useSchemas, yup } from "@/modules";
import { useForm } from "vee-validate";
import { router } from "@/router";

interface IDonationEdit {
  schedule: string;
  status: DonationStatus;
}

const props = defineProps({
  donation: {
    type: Object as PropType<IDonation>,
    required: true,
  },
});

const emit = defineEmits(["donationUpdated"]);

const donationStore = useDonationStore();
const { updateDonation } = donationStore;

const formattedDonationDate = moment(
  props.donation.schedule,
  Constants.backendDateTimeFormat
).format(Constants.frontendDateTimeFormat);

const { donationStatus, schedule } = useSchemas();
const schema = yup.object({
  status: donationStatus,
  schedule,
});

const { handleSubmit } = useForm<IDonationEdit>({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (data) => {
  await updateDonation(
    props.donation.id,
    props.donation.donor.id,
    props.donation.hemocenter.id,
    moment(data.schedule, Constants.frontendDateTimeFormat).format(
      Constants.backendDateTimeFormat
    ),
    data.status
  );
  emit("donationUpdated");
});
</script>

<template>
  <form class="columns is-flex is-flex-direction-column" @submit="onSubmit">
    <div class="level">
      <div class="level-item">
        <NameInput
          name="donorName"
          title="Doador(a)"
          :disabled="true"
          :initial-value="donation.donor.name"
        />
      </div>
      <div class="level-item">
        <BaseInput
          name="bloodCenterName"
          title="Hemocentro"
          :initial-value="donation.hemocenter.name"
          :disabled="true"
          icon-class="fa-solid fa-hospital"
        />
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <DateTimePicker
          name="schedule"
          title="Data da doação"
          :initial-value="formattedDonationDate"
        />
      </div>
      <div class="level-item">
        <DonationStatusSelect name="status" :initial-value="donation.status" />
      </div>
    </div>
    <slot name="buttons">
      <hr class="hr" />
      <div class="buttons">
        <button class="button is-danger">Salvar</button>
        <button
          class="button is-danger is-light"
          @click.prevent="router.back()"
        >
          Voltar
        </button>
      </div>
    </slot>
  </form>
</template>

<style scoped lang="scss">
.level {
  align-items: flex-start;

  .level-item {
    flex-shrink: 1;
    .field {
      flex: 1;
    }
  }

  @include tablet {
    .level-item:not(:last-child) {
      margin-right: 0.75rem;
      max-width: calc(50% - 0.75rem);
    }

    .level-item:last-child {
      max-width: calc(50%);
    }
  }
}
</style>
