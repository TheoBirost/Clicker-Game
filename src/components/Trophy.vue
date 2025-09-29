<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button
      @click="emit('click')"
      class="w-12 h-12 flex items-center justify-center bg-gray-800 text-white rounded-lg shadow-md hover:bg-white hover:text-black transition transform hover:scale-105">
    <!-- Icône trophée -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy">
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
    </svg>
  </button>
</template>

<style scoped>
/* Optionnel : styles supplémentaires */
</style>
