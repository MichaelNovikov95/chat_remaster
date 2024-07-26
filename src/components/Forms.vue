<template>
  <div>
    <FormComponent
      title="Message"
      :submitFunction="props.sendMessage"
      v-model="props.modelValue.message"
    />
    <FormComponent
      title="Room"
      :submitFunction="props.createRoom"
      v-model="props.modelValue.room"
    />
  </div>
</template>

<script setup lang="ts">
import FormComponent from "./FormComponent.vue";
import { IForms } from "../interfaces/index.ts";

const props = defineProps<IForms>();
</script>
