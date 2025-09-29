<script setup>
import Reglages from "./components/Reglages.vue";
import Trophy from "./components/Trophy.vue";
import Jeu from "./components/jeu.vue";
import { ref } from "vue";

// Contrôle du modal trophée
const showTrophy = ref(false)
</script>

<template>
  <div class="w-screen h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white grid grid-cols-4 gap-6 p-6">
    <!-- Sidebar -->
    <div class="flex flex-col space-y-4">
      <Reglages />
      <Trophy @click="showTrophy = true" />
    </div>

    <!-- Jeu -->
    <Jeu class="col-span-3" v-model:showTrophy="showTrophy" />
  </div>
</template>
