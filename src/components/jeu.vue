<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import ObjectifList from "./ObjectifList.vue";

// Props + emits pour v-model
const props = defineProps({
  showTrophy: Boolean
})
const emit = defineEmits(['update:showTrophy'])

function closeTrophy() {
  emit('update:showTrophy', false)
}

// --------------------
// Compteur et upgrades
// --------------------
const counter = ref(0)
const multiUpgrade = ref(1.2) // multiplicateur prix upgrades
const showUpgrades = ref(false)
const Rebirth = ref(0)

const RebirthPrice = computed(() => (Rebirth.value + 1) * 1_000_000)

// Prix affichés arrondis + suffixes
function formatNumber(n: number): string {
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(2) + 'T';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'k';
  return n.toFixed(1);
}

// --------------------
// Liste des upgrades (15 total)
// --------------------
const upgrades = ref([
  { name: "Clavier Cassé", cps: 1, price: 10, level: 0 },
  { name: "Souris Gaming", cps: 3, price: 100, level: 0 },
  { name: "Écran HD", cps: 8, price: 750, level: 0 },
  { name: "Serveur Local", cps: 15, price: 3000, level: 0 },
  { name: "Ferme de PC", cps: 40, price: 15000, level: 0 },
  { name: "Data Center", cps: 120, price: 80000, level: 0 },
  { name: "Robot Clickeur", cps: 350, price: 500000, level: 0 },
  { name: "IA Optimisée", cps: 1200, price: 3000000, level: 0 },
  { name: "Crypto Rig", cps: 5000, price: 20000000, level: 0 },
  { name: "Satellite Publicitaire", cps: 25000, price: 150000000, level: 0 },
  { name: "Supercalculateur Quantique", cps: 100000, price: 1_000_000_000, level: 0 },
  { name: "Station Spatiale", cps: 500000, price: 10_000_000_000, level: 0 },
  { name: "Réseau Planétaire", cps: 2000000, price: 100_000_000_000, level: 0 },
  { name: "Dimension Parallèle", cps: 10000000, price: 1_000_000_000_000, level: 0 },
  { name: "Clic Divin", cps: 100000000, price: 10_000_000_000_000, level: 0 }
])

// --------------------
// Achat générique d’upgrade
// --------------------
function buyUpgrade(index: number) {
  const up = upgrades.value[index]
  if (counter.value >= up.price) {
    counter.value -= up.price
    up.level++
    up.price = Math.floor(up.price * multiUpgrade.value)
  }
}

// --------------------
// Clics par seconde
// --------------------
const totalCps = computed(() =>
    upgrades.value.reduce((sum, up) => sum + up.level * up.cps, 0)
)

// --------------------
// Auto-increment
// --------------------
setInterval(() => {
  counter.value += totalCps.value
}, 1000)

// --------------------
// Fonction pour le Rebirth
// --------------------
function doRebirth() {
  if (counter.value >= RebirthPrice.value) {
    counter.value -= RebirthPrice.value
    Rebirth.value++

    // Reset upgrades
    upgrades.value.forEach((up, i) => {
      const basePrices = [10, 100, 750, 3000, 15000, 80000, 500000, 3000000, 20000000, 150000000, 1_000_000_000, 10_000_000_000, 100_000_000_000, 1_000_000_000_000, 10_000_000_000_000]
      up.level = 0
      up.price = basePrices[i]
    })

    counter.value = 0
  }
}

// --------------------
// Liste Objectif (34 total)
// --------------------
const achievements = ref([
  // 🎮 Progression basique
  { name: "👆 Premier pas", description: "Fais ton premier clic", unlocked: false },
  { name: "🐣 Nouveau joueur", description: "Atteins 10 clics", unlocked: false },
  { name: "⚡ Échauffement", description: "Atteins 100 clics", unlocked: false },
  { name: "🔥 Marathonien", description: "Atteins 1 000 clics", unlocked: false },
  { name: "💪 Habitué", description: "Atteins 10 000 clics", unlocked: false },
  { name: "🏋️ Forcené", description: "Atteins 1 000 000 clics", unlocked: false },
  { name: "🌌 Infini ?", description: "Atteins 100 000 000 clics", unlocked: false },

  // 🛠️ Améliorations
  { name: "🔧 Upgradeur", description: "Achète ta première amélioration", unlocked: false },
  { name: "💼 Ingénieur du dimanche", description: "Possède 5 améliorations", unlocked: false },
  { name: "⚙️ Collectionneur", description: "Possède 10 améliorations", unlocked: false },
  { name: "🏭 Industriel", description: "Possède 50 améliorations", unlocked: false },
  { name: "🖥️ Geek suprême", description: "Achète l'upgrade 'Écran HD'", unlocked: false },
  { name: "🤖 Maître des machines", description: "Achète un 'Robot Clickeur'", unlocked: false },
  { name: "🛰️ Domination mondiale", description: "Achète le 'Satellite Publicitaire'", unlocked: false },
  { name: "🌐 Connecté", description: "Achète le 'Réseau Planétaire'", unlocked: false },
  { name: "✨ Multivers", description: "Achète 'Dimension Parallèle'", unlocked: false },
  { name: "🙏 Dieu du clic", description: "Achète 'Clic Divin'", unlocked: false },

  // 🔄 Rebirth
  { name: "🔄 Renaissance", description: "Effectue ton premier rebirth", unlocked: false },
  { name: "♻️ Deuxième chance", description: "Atteins 2 rebirths", unlocked: false },
  { name: "🌟 Voyageur temporel", description: "Atteins 3 rebirths", unlocked: false },
  { name: "🎭 Cycle éternel", description: "Atteins 5 rebirths", unlocked: false },
  { name: "🚀 Immortel", description: "Atteins 10 rebirths", unlocked: false },
  { name: "🌌 Renaissance cosmique", description: "Atteins 20 rebirths", unlocked: false },

  // 💰 Argent accumulé
  { name: "💵 Petit portefeuille", description: "Accumule 1 000 $", unlocked: false },
  { name: "💳 Gros joueur", description: "Accumule 10 000 $", unlocked: false },
  { name: "💰 Gros investisseur", description: "Accumule 1 000 000 $", unlocked: false },
  { name: "💎 Riche à millions", description: "Accumule 10 000 000 $", unlocked: false },
  { name: "🏦 Magnat", description: "Accumule 1 000 000 000 $", unlocked: false },
  { name: "🏰 Empire financier", description: "Accumule 10 000 000 000 $", unlocked: false },
  { name: "👑 Roi du capitalisme", description: "Accumule 1 000 000 000 000 $", unlocked: false },
  { name: "🌍 Billionnaire mondial", description: "Accumule 1 000 000 000 000 000 $", unlocked: false },

  // 🎭 Fun / Secrets
  { name: "😴 AFK Master", description: "Reste 1 minute sans cliquer", unlocked: false },
  { name: "🐇 Lapin pressé", description: "Fais 100 clics en 10 secondes", unlocked: false },
])

// --------------------
// Watchers pour objectifs
// --------------------
watch(counter, (newVal) => {
  if (newVal >= 1) achievements.value[0].unlocked = true
  if (newVal >= 10) achievements.value[1].unlocked = true
  if (newVal >= 100) achievements.value[2].unlocked = true
  if (newVal >= 1000) achievements.value[3].unlocked = true
  if (newVal >= 10_000) achievements.value[4].unlocked = true
  if (newVal >= 1_000_000) achievements.value[5].unlocked = true
  if (newVal >= 100_000_000) achievements.value[6].unlocked = true

  // Argent
  if (newVal >= 1_000) achievements.value[23].unlocked = true
  if (newVal >= 10_000) achievements.value[24].unlocked = true
  if (newVal >= 1_000_000) achievements.value[25].unlocked = true
  if (newVal >= 10_000_000) achievements.value[26].unlocked = true
  if (newVal >= 1_000_000_000) achievements.value[27].unlocked = true
  if (newVal >= 10_000_000_000) achievements.value[28].unlocked = true
  if (newVal >= 1_000_000_000_000) achievements.value[29].unlocked = true
  if (newVal >= 1_000_000_000_000_000) achievements.value[30].unlocked = true
})

watch(upgrades, (newVal) => {
  const totalUpgrades = newVal.reduce((sum, u) => sum + u.level, 0)
  if (totalUpgrades >= 1) achievements.value[7].unlocked = true
  if (totalUpgrades >= 5) achievements.value[8].unlocked = true
  if (totalUpgrades >= 10) achievements.value[9].unlocked = true
  if (totalUpgrades >= 50) achievements.value[10].unlocked = true

  if (newVal[2].level >= 1) achievements.value[11].unlocked = true
  if (newVal[6].level >= 1) achievements.value[12].unlocked = true
  if (newVal[9].level >= 1) achievements.value[13].unlocked = true
  if (newVal[12].level >= 1) achievements.value[14].unlocked = true
  if (newVal[13].level >= 1) achievements.value[15].unlocked = true
  if (newVal[14].level >= 1) achievements.value[16].unlocked = true
}, { deep: true })

watch(Rebirth, (newVal) => {
  if (newVal >= 1) achievements.value[17].unlocked = true
  if (newVal >= 2) achievements.value[18].unlocked = true
  if (newVal >= 3) achievements.value[19].unlocked = true
  if (newVal >= 5) achievements.value[20].unlocked = true
  if (newVal >= 10) achievements.value[21].unlocked = true
  if (newVal >= 20) achievements.value[22].unlocked = true
})


// --------------------
// Gestion du succès "100 clics en 10 sec"
// --------------------
const clickTimes = ref<number[]>([])

function checkSpeedClickAchievement() {
  const now = Date.now()
  // On ajoute le clic actuel dans le tableau
  clickTimes.value.push(now)
  // On garde uniquement les clics des 10 dernières secondes
  clickTimes.value = clickTimes.value.filter(t => now - t <= 10_000)
  // Si au moins 100 clics en moins de 10 sec -> débloque succès
  if (clickTimes.value.length >= 100 && !achievements.value[32].unlocked) {
    achievements.value[32].unlocked = true
  }
}


// --------------------
// Progression affichage
// --------------------
const unlockedCount = computed(() => achievements.value.filter(a => a.unlocked).length)
const totalAchievements = computed(() => achievements.value.length)
const progressPercent = computed(() => (unlockedCount.value / totalAchievements.value) * 100)

const formattedCounter = computed(() => formatNumber(counter.value))
const lastClickTime = ref(Date.now())

// --------------------
// Fonction clic principal (mise à jour avec AFK)
// --------------------
function doClick() {
  counter.value += 1 + Rebirth.value
  lastClickTime.value = Date.now()
  checkSpeedClickAchievement()
}

// Vérification AFK toutes les secondes
setInterval(() => {
  const now = Date.now()
  const diff = now - lastClickTime.value
  if (diff >= 600_000 && !achievements.value[31].unlocked) {
    achievements.value[31].unlocked = true
  }
}, 1000)
</script>

<template>
  <!-- Layout jeu en 2 colonnes -->
  <div class="grid grid-cols-2 gap-6 w-full h-full p-6 text-white">
    <!-- Colonne gauche = compteur + bouton clic -->
    <div class="flex flex-col items-center justify-around space-y-12 md:mr-36">
      <!-- Score -->
      <div class="flex flex-col items-center space-y-2">
        <div class="flex items-center justify-center space-x-2">
          <h2 class="text-4xl font-extrabold">{{ formattedCounter }}</h2>
          <span class="text-2xl font-extrabold bg-white text-black px-3 py-1 rounded-full shadow"> $ </span>
        </div>
        <h3 class="text-lg text-gray-300">{{ formatNumber(totalCps) }} / sec</h3>
        <h4 class="text-lg text-gray-300">nombre de Rebirth: {{Rebirth}}</h4>
      </div>

      <!-- Bouton Clic -->
      <button @click="doClick">
        <img
            class="w-[450%] text-8xl font-extrabold rounded-full flex items-center justify-center transition transform active:scale-110 slow-spin filter"
            src="/src/assets/button2.png"
            alt=""
            style="filter: hue-rotate(110deg) saturate(300%) brightness(75%) opacity(100%);">
      </button>
    </div>

    <!-- Colonne droite = améliorations -->
    <div class="hidden lg:flex border border-gray-800 rounded-xl p-6 shadow-lg  flex-col space-y-4 max-h-[90vh] overflow-y-auto">
      <h3 class="flex text-xl font-bold justify-center items-center text-center text-gray-200 gap-1 ">
        Améliorations
      </h3>

      <!-- Liste upgrades -->
      <div v-for="(up, i) in upgrades" :key="i">
        <button
            @click="buyUpgrade(i)"
            :class="[
    'w-full px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
    counter >= up.price
      ? 'bg-white text-black hover:bg-gray-200'
      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
  ]"
            :disabled="counter < up.price">
          <span>{{ up.name }}</span>
          <span class="text-sm">{{up.cps }} / sec</span>
          <span class="text-sm">{{ formatNumber(up.price) }}</span>
          <span class="text-xs text-gray-400">Lvl {{ up.level }}</span>
        </button>
      </div>

      <!-- Rebirth -->
      <button
          v-on:click="doRebirth"
          :class="[
        'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
        counter >= RebirthPrice
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
          :disabled="counter < RebirthPrice">
        <span>Rebirth</span>
        <span class="text-sm">+1 / clic </span>
        <span class="text-sm">{{ RebirthPrice }}</span>
      </button>
    </div>

    <!-- Bouton flottant mobile -->
    <button
        @click="showUpgrades = true"
        class=" absolute flex items-center justify-center w-12 h-12 xs:flex top-38 left-6  lg:hidden bg-gray-800 text-white rounded-lg shadow-md hover:bg-white hover:text-black transition transform hover:scale-105">
      ⚡
    </button>

    <!-- Fenêtre/modal des améliorations (mobile) -->
    <div
        v-if="showUpgrades"
        class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 md:hidden">
      <div class="bg-gray-950 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col space-y-4 max-h-[90vh] overflow-y-auto w-11/12 max-w-sm relative">
        <!-- Bouton fermer -->
        <button @click="showUpgrades = false" class="absolute top-4 right-8 text-gray-400 hover:text-white text-4xl font-bold">×</button>
        <h3 class="flex text-xl font-bold justify-center items-center text-center text-gray-200 gap-1 ">
          Améliorations
        </h3>

        <!-- Liste upgrades mobile -->
        <div v-for="(up, i) in upgrades" :key="'m' + i">
          <button
              @click="buyUpgrade(i)"
              :class="[
              'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
              counter >= up.price
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
              :disabled="counter < up.price">
            <span>{{ up.name }}</span>
            <span class="text-sm">+{{ up.cps }} / sec</span>
            <span class="text-sm">{{ formatNumber(up.price) }}</span>
            <span class="text-xs text-gray-400">Lvl {{ up.level }}</span>
          </button>
        </div>

        <!-- Rebirth -->
        <button
            v-on:click="doRebirth"
            :class="[
          'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
          counter >= RebirthPrice
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
            :disabled="counter < RebirthPrice">
          <span>Rebirth</span>
          <span class="text-sm">+1 / clic </span>
          <span class="text-sm">{{ RebirthPrice }}</span>
        </button>
      </div>
    </div>

    <!-- 🟡 Trophée -->
    <div v-if="props.showTrophy" class="fixed inset-0 z-10 bg-black/50">
      <div
          class="absolute left-1/2 transform -translate-x-1/2 top-[50px]
           bg-gray-950 border border-gray-800 rounded-xl shadow-lg
           flex flex-col space-y-4 overflow-y-auto p-6
           w-[95%] max-w-[800px] h-[80vh] lg:h-[650px]"
      >
        <!-- Bouton fermer -->
        <button @click="closeTrophy"
                class="absolute top-4 right-8 text-gray-400 hover:text-white text-4xl font-bold">×</button>

        <!-- Titre -->
        <h3 class="flex flex-col w-full text-xl font-bold text-gray-200 gap-2">
          <div class="flex items-center justify-center gap-2">
            🏆 Trophées ({{ unlockedCount }} / {{ totalAchievements }})
          </div>

          <!-- Barre de progression -->
          <div class="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div class="bg-green-300 h-3" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </h3>

        <!-- ✅ Composant Objectif -->
        <ObjectifList :objectifs="achievements" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slow-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.slow-spin {
  animation: slow-spin 4s linear infinite;
}
</style>