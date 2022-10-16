<script setup lang="ts">
import moment from "moment";
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
import type { BloodType } from "@/types";
import { storeToRefs } from "pinia";

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
const { getUserInfo, updateUser } = userStore;
const { user, formattedBirthDate, weightInKilos, heightInMeters } =
  storeToRefs(userStore);
const { name, cpf, email, birthDate } = useSchemas();

// Update user data before load the page
getUserInfo();

const schema = yup.object({
  name: name.label("nome"),
  cpf: cpf.label("cpf"),
  birthdate: birthDate.label("Data de nascimento"),
  email: email,
});

const { handleSubmit } = useForm<IUserEdit>();
const onSubmit = handleSubmit((data) => {
  if (user.value == null) return;

  console.log(data);
  updateUser({
    ...data,
    id: user.value.id,
    birthdate:
      data.birthdate != undefined
        ? moment(data.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
        : undefined,
    bloodType: undefined,
    weight: data.weight != undefined ? data.weight * 1000 : undefined,
    height: data.height != undefined ? data.height * 100 : undefined,
    roles: user.value.roles,
  });
});
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Editar dados</h3>
      <hr class="hr" />
      <form
        class="columns is-flex is-flex-direction-column box"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="field-body">
          <NameInput
            name="name"
            :initial-value="user?.name"
            class="is-flex-grow-5"
          />
          <CPFInput
            name="cpf"
            class="is-flex-grow-0"
            :initial-value="user?.cpf"
          />
          <DatePicker
            name="birthdate"
            title="Data de nascimento"
            class="is-flex-grow-0"
            :initial-value="formattedBirthDate"
          />
        </div>
        <div class="field-body">
          <WeightInput name="weight" :initial-value="weightInKilos" />
          <BaseInput
            name="height"
            title="Altura"
            mask="#.##"
            icon-class="fa-solid fa-ruler-vertical"
            :initial-value="heightInMeters"
          >
            <template #rightAddon>
              <a class="button is-static"> m </a>
            </template></BaseInput
          >
          <BloodTypeSelect name="bloodType" :initial-value="user?.bloodType" />
        </div>
        <div class="field-body">
          <EmailInput name="email" :initial-value="user?.email" />
          <CellphoneInput name="phone" :initial-value="user?.phone" />
        </div>
        <div class="field-body">
          <BaseInput
            name="address"
            title="Endereço"
            icon-class="fa-solid fa-location-dot"
            :initial-value="user?.address"
          />
          <BaseInput
            name="complement"
            title="Complemento"
            icon-class="fa-solid fa-map-location-dot"
            :initial-value="user?.complement"
          />
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
.field-body {
  margin-bottom: 1rem;
}
</style>
