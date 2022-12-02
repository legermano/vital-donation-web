<script setup lang="ts">
import type { IBloodBag, IDonation, IUser } from "@/interfaces";
import type { PropType } from "vue";
import { FieldArray, useForm } from "vee-validate";
import { BloodType } from "@/types";
import { BaseInput, DateTimePicker } from "@/components/fields";
import { useUserStore, useDonationStore } from "@/stores";
import { useSchemas, useUtils, yup } from "@/modules";

interface IBloodBagForm {
  bloodBags: IBloodBag[];
}

const props = defineProps({
  donationId: {
    type: String,
    required: true,
  },
  donorId: {
    type: String,
    required: true,
  },
  bloodBag: {
    type: Object as PropType<IBloodBag[]>,
    required: true,
  },
});

const userStore = useUserStore();
const donationStore = useDonationStore();
const user: IUser = await userStore.getUser(props.donorId);
const donation: IDonation = await donationStore.getDonation(props.donationId);

const { formatDatetimeToFront, formatDatetimeToBack } = useUtils();
const { requiredString } = useSchemas();
const schema = yup.object().shape({
  bloodBags: yup
    .array()
    .of(
      yup.object().shape({
        code: requiredString.label("Código"),
        volume: yup.number().required().label("Volume"),
        date: requiredString.label("Data"),
      })
    )
    .strict(),
});

const initialData = {
  bloodBags: [] as IBloodBag[],
} as IBloodBagForm;

if (props.bloodBag.length == 0) {
  initialData.bloodBags.push({
    id: "",
    code: "",
    date: "",
    //TODO: Verificar qual tipo sanguineo utilizar por padrão quando o usuário não tem no cadastro
    bloodType: user.bloodType ?? BloodType["A+"],
    volume: 300,
  });
} else {
  props.bloodBag.forEach((b) => {
    b.date = formatDatetimeToFront(b.date);
    initialData.bloodBags.push(b);
  });
}

const { handleSubmit } = useForm<IBloodBagForm>({
  // validationSchema: schema,
  initialValues: initialData,
});

const deleteBloodBag = (idx: number) => {
  console.log(initialData.bloodBags[idx]);
};

const onSubmit = handleSubmit((data: IBloodBagForm) => {
  data.bloodBags.forEach((b) => {
    const date = formatDatetimeToBack(b.date);
    if (b.id) {
      donationStore.updateDonationBloodBag(b.id, b.code, date, b.volume);
    } else {
      donationStore.createDonationBloodBag(
        donation.hemocenter.id,
        donation.id,
        b.code,
        formatDatetimeToBack(b.date),
        b.volume,
        b.bloodType
      );
    }
  });
});
</script>

<template>
  <form>
    <FieldArray name="bloodBags" v-slot="{ fields, push, remove }">
      <fieldset
        class="InputGroup"
        v-for="(field, idx) in fields"
        :key="field.key"
      >
        <input
          type="text"
          style="display: none"
          :name="`bloodBags[${idx}].id`"
        />
        <div class="level">
          <div class="level-item">
            <BaseInput
              :id="`code_${idx}`"
              :name="`bloodBags[${idx}].code`"
              title="Código"
            />
          </div>
          <div class="level-item">
            <BaseInput
              :id="`volume_${idx}`"
              :name="`bloodBags[${idx}].volume`"
              title="Volume (ml)"
            >
            </BaseInput>
          </div>
          <div class="level-item">
            <DateTimePicker
              :id="`date_${idx}`"
              :name="`bloodBags[${idx}].date`"
              title="Data da doação"
            />
          </div>
          <div class="level-item remove-button">
            <button
              class="button is-danger"
              @click="
                deleteBloodBag(idx);
                remove(idx);
              "
            >
              <span class="icon is-small">
                <i class="fas fa-times"></i>
              </span>
            </button>
          </div>
        </div>
        <hr class="hr" />
      </fieldset>

      <div class="buttons is-right">
        <button
          class="button is-danger is-light"
          @click.prevent="push({ email: '', name: '' })"
        >
          Adiciona bolsa de sangue +
        </button>
        <button class="button is-danger" @click="onSubmit">Salvar</button>
      </div>
    </FieldArray>
  </form>
</template>

<style scoped lang="scss">
.level {
  align-items: flex-end;

  .level-item {
    .field {
      flex: 1;
    }

    @include desktop {
      &:not(:last-child) {
        margin-right: 0.75rem;
      }
    }

    @include touch {
      &.remove-button {
        justify-content: end;
      }
    }
  }
}
</style>
