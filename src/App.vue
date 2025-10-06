<script setup>
import Reglages from "./components/Reglages.vue";
import Trophy from "./components/Trophy.vue";
import Jeu from "./components/jeu.vue";
import { ref } from "vue";
import Start from "./components/Start.vue";

// Contrôle du modal trophée
const showTrophy = ref(false)
const showStart = ref(true);
const startGame = ref(false); // indique quand lancer le timer
</script>
<template>
  <div class="w-screen h-screen bg-gradient-to-b from-black via-gray-900 to-black text-cyan-400 grid grid-cols-4 gap-6 p-6">
    <div class="flex flex-col space-y-4">
      <Reglages />
      <Trophy @click="showTrophy = true" />
    </div>

    <Jeu class="col-span-3" v-model:showTrophy="showTrophy" :start="startGame"/>
  </div>

  <Start v-if="showStart" @start="() => { showStart = false; startGame = true }" />
</template>
