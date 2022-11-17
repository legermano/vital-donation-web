<script setup lang="ts">
import { useForm } from "vee-validate";
import {
  NameInput,
  EmailInput,
  CPFInput,
  DatePicker,
  BaseInput,
  BloodTypeSelect,
  CellphoneInput,
  WeightInput,
} from "@/components/fields";
import { yup, useSchemas } from "@/modules";
import { router } from "@/router";
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import moment from "moment";
import { Constants, type BloodType } from "@/types";

interface IUserEdit {
  name: string;
  cpf: number;
  email?: string;
  phone?: string;
  address?: string;
  complement?: string;
  weight?: number;
  height?: number;
  birthdate?: string;
  bloodType?: BloodType;
}
const userStore = useUserStore();
const { updateUser, weightInKilos, heightInMeters } = userStore;
const { user, formattedBirthDate } = storeToRefs(userStore);
const {
  name,
  cpf,
  email,
  birthDate,
  bloodType,
  phone,
  address,
  complement,
  weight,
  height,
} = useSchemas();

const formmatedWeight = weightInKilos?.replace(".", ",");
const formmatedHeight = heightInMeters?.replace(".", ",");

const schema = yup.object({
  name,
  cpf,
  birthdate: birthDate,
  weight,
  height,
  bloodType,
  email,
  phone,
  address,
  complement,
});

const { handleSubmit } = useForm<IUserEdit>({
  validationSchema: schema,
});

const onSubmit = handleSubmit((data) => {
  if (user.value == null) return;

  updateUser({
    ...data,
    id: user.value.id,
    birthdate:
      data.birthdate != undefined
        ? moment(data.birthdate, Constants.frontendDateFormat).format(
            Constants.backendDateFormat
          )
        : undefined,
    bloodType:
      data.bloodType != undefined &&
      data.bloodType != Constants.bloodTypeDefaultOption
        ? data.bloodType
        : undefined,
    weight:
      data.weight != undefined
        ? Number(data.weight.toString().replace(/,/, ".")) * 1000
        : undefined,
    height:
      data.height != undefined
        ? Number(data.height.toString().replace(/,/, ".")) * 100
        : undefined,
    roles: user.value.roles,
  });
});
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Dados pessoais</h3>
      <hr class="hr" />
      <form
        class="columns is-flex is-flex-direction-column box"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="level">
          <div class="level-item is-flex-shrink-1 mw-60">
            <NameInput name="name" :initial-value="user?.name" />
          </div>
          <div class="level-item mw-20 is-flex-shrink-1">
            <CPFInput name="cpf" :initial-value="user?.cpf" />
          </div>
          <div class="level-item mw-20 is-flex-shrink-1">
            <DatePicker
              name="birthdate"
              title="Data de nascimento"
              :initial-value="formattedBirthDate"
            />
          </div>
        </div>
        <div class="level">
          <div class="level-item mw-33 is-flex-shrink-1">
            <WeightInput name="weight" :initial-value="formmatedWeight" />
          </div>
          <div class="level-item mw-33 is-flex-shrink-1">
            <BaseInput
              name="height"
              title="Altura (m)"
              mask="#,##"
              icon-class="fa-solid fa-ruler-vertical"
              :initial-value="formmatedHeight"
            />
          </div>
          <div class="level-item mw-33">
            <BloodTypeSelect
              name="bloodType"
              :initial-value="user?.bloodType"
            />
          </div>
        </div>
        <div class="level">
          <div class="level-item mw-50">
            <EmailInput name="email" :initial-value="user?.email" />
          </div>
          <div class="level-item mw-50">
            <CellphoneInput name="phone" :initial-value="user?.phone" />
          </div>
        </div>
        <div class="level">
          <div class="level-item mw-50">
            <BaseInput
              name="address"
              title="Endereço"
              icon-class="fa-solid fa-location-dot"
              :initial-value="user?.address"
            />
          </div>
          <div class="level-item mw-50">
            <BaseInput
              name="complement"
              title="Complemento"
              icon-class="fa-solid fa-map-location-dot"
              :initial-value="user?.complement"
              :is-full-width="true"
            />
          </div>
        </div>
        <hr class="hr" />
        <div class="buttons">
          <button class="button is-danger">Salvar</button>
          <button class="button is-danger is-light" @click="router.back()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";
.level {
  align-items: flex-start;

  .level-item {
    .field {
      flex: 1;
    }
  }

  @include tablet {
    .level-item:not(:last-child) {
      margin-right: 0.75rem;
    }
    .mw-20:not(:last-child) {
      max-width: calc(20% - 0.75rem);
    }
    .mw-20:last-child {
      max-width: calc(20%);
    }
    .mw-33:not(:last-child) {
      max-width: calc(33.33% - 0.75rem);
    }
    .mw-33:last-child {
      max-width: calc(33.33%);
    }
    .mw-50:not(:last-child) {
      max-width: calc(50% - 0.75rem);
    }
    .mw-50:last-child {
      max-width: calc(50%);
    }
    .mw-60:not(:last-child) {
      max-width: calc(60% - 0.75rem);
    }
    .mw-60:last-child {
      max-width: calc(60%);
    }
  }
}
</style>
