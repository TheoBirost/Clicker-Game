<script setup lang="ts">
import { defineProps } from "vue"

interface Objectif {
  name: string
  description: string
  unlocked: boolean
}

const props = defineProps<{
  objectifs: Objectif[]
}>()
</script>

<template>
  <div class="space-y-2">
    <div
        v-for="(objectif, index) in objectifs"
        :key="index"
        :class="[
        'p-3 rounded-md border flex justify-between items-center transition',
        objectif.unlocked
          ? 'border-green-400 bg-green-800 text-green-100'
          : 'border-gray-700 bg-gray-800 text-gray-400'
      ]"
    >
      <div>
        <h4 class="font-bold">{{ objectif.name }}</h4>
        <p class="text-sm">{{ objectif.description }}</p>
      </div>
      <span v-if="objectif.unlocked" class="text-green-300 font-bold text-xl">✔</span>
      <span v-else class="text-amber-500  text-xl">✖</span>
    </div>
  </div>
</template>
