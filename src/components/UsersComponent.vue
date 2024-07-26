<template>
  <div>
    <h3>Users online</h3>
    <div v-for="user of props.onlineUsers">
      <button>{{ user }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IUsers } from "../interfaces/index.ts";

const props = defineProps<IUsers>();
</script>
