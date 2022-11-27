<script setup lang="ts">
import { BloodCenterAutocomplete, DateTimePicker } from "@/components/fields";
import { LoaderSpinner } from "@/components";
import { useForm } from "vee-validate";
import { yup, useToast } from "@/modules";
import { ref, type PropType } from "vue";
import { useDonationStore } from "@/stores";
import moment from "moment";
import { Constants, DonationStatus } from "@/types";
import type { ISchedule, IUser } from "@/interfaces";
import { router } from "@/router";

const props = defineProps({
  donor: {
    type: Object as PropType<IUser>,
    required: true,
  },
});

defineEmits(["previousStepDonation"]);

const { warning } = useToast();
const { createDonation } = useDonationStore();

const schema = yup.object({
  bloodCenterId: yup.string().label("Hemocentro"),
  schedule: yup.string().label("Horário"),
});

const { handleSubmit } = useForm<{ bloodCenterId: string; schedule: string }>({
  validationSchema: schema,
});
const bloodCenterSchedules = ref<ISchedule[] | null>(null);

const onBloodDonationSelected = (schedules: ISchedule[]) =>
  (bloodCenterSchedules.value = schedules);

const getSchedule = (dayOfWeek: string) => {
  const schedule = bloodCenterSchedules.value?.find(
    (s) => s.dayOfWeek == dayOfWeek
  );

  if (schedule == undefined) {
    return "Sem horário";
  }

  return `${schedule.open} - ${schedule.close}`;
};

const onSubmit = handleSubmit(async (data) => {
  console.log(data);

  if (data.bloodCenterId === "") {
    warning("Necessário escolher um hemocentro");
    return;
  }

  if (data.schedule === "" || data.schedule == undefined) {
    warning("Necessário escolher o dia e a hora da doação");
    return;
  }

  createDonation(
    props.donor.id,
    data.bloodCenterId,
    moment(data.schedule, Constants.frontendDateTimeFormat).format(
      Constants.backendDateTimeFormat
    ),
    DonationStatus.SCHEDULED
  ).then(() => router.push("/"));
});
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Escolha o hemocentro e o horário</h3>
      <Suspense>
        <form @submit="onSubmit">
          <BloodCenterAutocomplete
            name="bloodCenterId"
            :show-title="false"
            @blood-donation-selected="onBloodDonationSelected"
          />
          <div class="box" v-if="bloodCenterSchedules != null">
            <h1 class="has-text-centered"><strong>Horários</strong></h1>
            <ul>
              <li>Segunda-feira : {{ getSchedule("MONDAY") }}</li>
              <li>Terça-feira : {{ getSchedule("TUESDAY") }}</li>
              <li>Quarta-feira : {{ getSchedule("WEDNESDAY") }}</li>
              <li>Quinta-feira : {{ getSchedule("THURSDAY") }}</li>
              <li>Sexta-feira {{ getSchedule("FRIDAY") }}:</li>
              <li>Sábado : {{ getSchedule("SATURDAY") }}</li>
              <li>Domingo : {{ getSchedule("SUNDAY") }}</li>
            </ul>
          </div>
          <DateTimePicker
            v-if="bloodCenterSchedules != null"
            name="schedule"
            :show-title="false"
            title="Horário da doação"
          />
          <div class="buttons is-right">
            <button
              class="button is-danger is-light"
              @click.prevent="$emit('previousStepDonation')"
            >
              Retornar
            </button>
            <button class="button is-danger">Concluir</button>
          </div>
        </form>
        <template #fallback> <LoaderSpinner /> </template>
      </Suspense>
    </div>
  </div>
</template>
