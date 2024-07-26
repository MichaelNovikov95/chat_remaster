<template>
  <div class="bg-red-500">
    <h1>Chat</h1>
    <h3>Welcome to chat, {{ props.id }}</h3>
    <h3 v-if="props.choosenRoom">Current room: {{ props.choosenRoom }}</h3>
  </div>
</template>

<script setup lang="ts">
import { IHeader } from "../interfaces/index.ts";

const props = defineProps<IHeader>();
</script>
