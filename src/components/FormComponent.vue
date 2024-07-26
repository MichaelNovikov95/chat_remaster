<template>
  <form @submit.prevent="props.submitFunction">
    <h3>{{ props.title }}</h3>
    <input
      class="border-lg border-black border-2"
      type="text"
      v-model="model"
    />
  </form>
</template>

<script setup lang="ts">
import { IForm } from "../interfaces/index.ts";

const model = defineModel({
  type: String,
  default: "",
});

const props = defineProps<IForm>();
</script>
