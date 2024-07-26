<template>
  <div v-for="message of props.messages">
    <p>{{ message.user }} : {{ message.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { IPropsMessages } from "../interfaces/index.ts";

const props = defineProps<IPropsMessages>();
</script>
