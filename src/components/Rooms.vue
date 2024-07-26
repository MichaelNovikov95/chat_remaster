<template>
  <aside>
    <h3>Rooms</h3>
    <button @click="props.toGeneral" v-if="props.choosenRoom"
      >Back to general channel
    </button>
    <div v-for="room of props.rooms">
      <button @click="props.chooseRoom(room)">{{ room }}</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { IRooms } from "../interfaces/index.ts";

const props = defineProps<IRooms>();
</script>
