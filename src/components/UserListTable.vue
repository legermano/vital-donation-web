<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const { getAllUsers } = userStore;
const { users } = storeToRefs(userStore);

await getAllUsers();
</script>

<template>
  <div class="table-container">
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>CPF</th>
          <th>E-mai</th>
          <th>Tipo sanguineo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="has-text-centered" title="Editar doação">
            <RouterLink
              :to="{
                path: `/user/edit/${user.id}`,
              }"
            >
              <span class="icon has-text-danger">
                <i class="fas fa-pencil"></i>
              </span>
            </RouterLink>
          </td>
          <td>{{ user.name }}</td>
          <td>
            {{ user.cpf }}
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.bloodType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
