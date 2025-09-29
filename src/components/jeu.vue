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
const multiUpgrade = ref(1.1)
const showUpgrades = ref(false)
const Rebirth = ref(0)

// Upgrades
const upgradeOne = ref(0)
const upgradeTwo = ref(0)
const upgradeThree = ref(0)

// Prix
const upgradeOnePrice = ref(10)
const upgradeTwoPrice = ref(100)
const upgradeThreePrice = ref(1000)

const RebirthPrice = computed(() => (Rebirth.value + 1) * 1_000_000)

// Prix affichés arrondis + suffixes
function formatNumber(n: number): string {
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(2) + 'T';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(2) + 'k';
  return n.toFixed(1);
}

const upgradeOnePriceDisplay = computed(() => formatNumber(upgradeOnePrice.value))
const upgradeTwoPriceDisplay = computed(() => formatNumber(upgradeTwoPrice.value))
const upgradeThreePriceDisplay = computed(() => formatNumber(upgradeThreePrice.value))

// Format compteur principal
const formattedCounter = computed(() => formatNumber(counter.value))

// --------------------
// Fonctions d'achat
// --------------------
function buyUpgradeOne() {
  if (counter.value >= upgradeOnePrice.value) {
    counter.value -= upgradeOnePrice.value
    upgradeOne.value++
    upgradeOnePrice.value *= multiUpgrade.value
  }
}
function buyUpgradeTwo() {
  if (counter.value >= upgradeTwoPrice.value) {
    counter.value -= upgradeTwoPrice.value
    upgradeTwo.value++
    upgradeTwoPrice.value *= multiUpgrade.value
  }
}
function buyUpgradeThree() {
  if (counter.value >= upgradeThreePrice.value) {
    counter.value -= upgradeThreePrice.value
    upgradeThree.value++
    upgradeThreePrice.value *= multiUpgrade.value
  }
}

// --------------------
// Clics par seconde
// --------------------
const totalCps = computed(() =>
    upgradeOne.value * 1 + upgradeTwo.value * 2 + upgradeThree.value * 3
)

// --------------------
// Auto-increment
// --------------------
setInterval(() => {
  counter.value += totalCps.value
}, 1000)

// --------------------
// Fonction clic principal
// --------------------
function doClick() {
  counter.value += 1 + Rebirth.value
}

// --------------------
// Fonction arrondit affichage simple
// --------------------
function roundDisplay(n: number) {
  return Math.floor(n)
}

// --------------------
// Fonction pour le Rebirth
// --------------------
function doRebirth() {
  if (counter.value >= RebirthPrice.value) {
    counter.value -= RebirthPrice.value
    Rebirth.value++

    upgradeOne.value = 0
    upgradeTwo.value = 0
    upgradeThree.value = 0

    upgradeOnePrice.value = 10
    upgradeTwoPrice.value = 100
    upgradeThreePrice.value = 1000

    counter.value = 0
  }
}
  // --------------------
  // Liste Objectif ( nom )
  // --------------------
  const achievements = ref([
    { name: "Premier clic", description: "Fais ton premier clic", unlocked: false },
    { name: "100 clics", description: "Atteins 100 clics", unlocked: false },
    { name: "1 000 clics", description: "Atteins 1 000 clics", unlocked: false },

    { name: "Première amélioration", description: "Achète une amélioration", unlocked: false },
    { name: "5 améliorations", description: "Possède un total de 5 améliorations", unlocked: false },
    { name: "Premier upgrade 3", description: "Achète un upgrade 3", unlocked: false },

    { name: "Premier rebirth", description: "Effectue ton premier rebirth", unlocked: false },
    { name: "3 rebirths", description: "Atteins 3 rebirths", unlocked: false },
    { name: "10 rebirths", description: "Atteins 10 rebirths", unlocked: false },

    { name: "1k $", description: "Accumule 1 000 $", unlocked: false },
    { name: "1M $", description: "Accumule 1 000 000 $", unlocked: false },
    { name: "1B $", description: "Accumule 1 000 000 000 $", unlocked: false },
  ])

// --------------------
// Liste Objectif ( creation )
// --------------------

watch(counter, (newVal) => {
  if (newVal >= 1) achievements.value[0].unlocked = true // Premier clic
  if (newVal >= 100) achievements.value[1].unlocked = true
  if (newVal >= 1000) achievements.value[2].unlocked = true

  if (newVal >= 1000) achievements.value[9].unlocked = true // 1k $
  if (newVal >= 1_000_000) achievements.value[10].unlocked = true
  if (newVal >= 1_000_000_000) achievements.value[11].unlocked = true
})


watch([upgradeOne, upgradeTwo, upgradeThree], ([u1, u2, u3]) => {
  const totalUpgrades = u1 + u2 + u3
  if (totalUpgrades >= 1) achievements.value[3].unlocked = true
  if (totalUpgrades >= 5) achievements.value[4].unlocked = true
  if (u3 >= 1) achievements.value[5].unlocked = true
})


watch(Rebirth, (newVal) => {
  if (newVal >= 1) achievements.value[6].unlocked = true
  if (newVal >= 3) achievements.value[7].unlocked = true
  if (newVal >= 10) achievements.value[8].unlocked = true
})

// --------------------
// Liste Objectif ( progression )
// --------------------

const unlockedCount = computed(() => achievements.value.filter(a => a.unlocked).length)
const totalAchievements = computed(() => achievements.value.length)
const progressPercent = computed(() => (unlockedCount.value / totalAchievements.value) * 100)



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
          <h3 class="text-lg text-gray-300">{{ roundDisplay(totalCps) }} / sec</h3>
          <h4 class="text-lg text-gray-300">nombre de Rebirth: {{Rebirth}}</h4>
        </div>

        <!-- Bouton CLIC -->

        <button
            @click="doClick"
            class=" w-64 h-64 bg-gray-900 text-white text-3xl font-bold rounded-4xl shadow-2xl hover:bg-white hover:text-black transition transform hover:scale-105 slow-spin ">
          CLIC !
        </button>

      </div>

      <!-- Colonne droite = améliorations -->
      <div class="hidden lg:flex border border-gray-800 rounded-xl p-6 shadow-lg  flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <h3 class="flex text-xl font-bold justify-center items-center text-center text-gray-200 gap-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
          Améliorations
        </h3>

        <!-- Upgrade 1 -->
        <button
            v-on:click="buyUpgradeOne"
            :class="[
          'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
          counter >= upgradeOnePrice
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
            :disabled="counter < upgradeOnePrice">
          <span>Upgrade 1</span>
          <span class="text-sm">+1 / sec</span>
          <span class="text-sm">{{ upgradeOnePriceDisplay }}</span>
        </button>

        <!-- Upgrade 2 -->
        <button
            v-on:click="buyUpgradeTwo"
            :class="[
          'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
          counter >= upgradeTwoPrice
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
            :disabled="counter < upgradeTwoPrice">
          <span>Upgrade 2</span>
          <span class="text-sm">+2 / sec</span>
          <span class="text-sm">{{ upgradeTwoPriceDisplay }}</span>
        </button>

        <!-- Upgrade 3 -->
        <button
            v-on:click="buyUpgradeThree"
            :class="[
          'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
          counter >= upgradeThreePrice
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
            :disabled="counter < upgradeThreePrice">
          <span>Upgrade 3</span>
          <span class="text-sm">+3 / sec</span>
          <span class="text-sm">{{ upgradeThreePriceDisplay }}</span>
        </button>

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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
      </button>

      <!-- Fenêtre/modal des améliorations -->
      <div
          v-if="showUpgrades"
          class="fixed inset-0 z-40 flex items-center justify-center bg-black/50 md:hidden">
        <div class="bg-gray-950 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col space-y-4 max-h-[90vh] overflow-y-auto w-11/12 max-w-sm relative">
          <!-- Bouton fermer -->
          <button @click="showUpgrades = false" class="absolute top-4 right-8 text-gray-400 hover:text-white text-4xl font-bold">×</button>
          <h3 class="flex text-xl font-bold justify-center items-center text-center text-gray-200 gap-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket-icon lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            Améliorations
          </h3>
          <!-- Upgrade 1 -->
          <button
              v-on:click="buyUpgradeOne"
              :class="[
                'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
                counter >= upgradeOnePrice
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
              :disabled="counter < upgradeOnePrice">
            <span>Upgrade 1</span>
            <span class="text-sm">+1 / sec</span>
            <span class="text-sm">{{ upgradeOnePriceDisplay }}</span>
          </button>

          <!-- Upgrade 2 -->
          <button
              v-on:click="buyUpgradeTwo"
              :class="[
                'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
                counter >= upgradeTwoPrice
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
              :disabled="counter < upgradeTwoPrice">
            <span>Upgrade 2</span>
            <span class="text-sm">+2 / sec</span>
            <span class="text-sm">{{ upgradeTwoPriceDisplay }}</span>
          </button>

          <!-- Upgrade 3 -->
          <button
              v-on:click="buyUpgradeThree"
              :class="[
                'px-6 py-4 rounded-lg transition flex flex-col items-center space-y-1 font-semibold',
                counter >= upgradeThreePrice
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed']"
              :disabled="counter < upgradeThreePrice">
            <span>Upgrade 3</span>
            <span class="text-sm">+3 / sec</span>
            <span class="text-sm">{{ upgradeThreePriceDisplay }}</span>
          </button>

          <!-- Rebirth  -->
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



      <!-- 🟡 Trophée - Fenêtre affichée en haut avec taille fixe -->
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-trophy">
                <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
                <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
                <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
                <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
              </svg>
              Trophées ({{ unlockedCount }} / {{ totalAchievements }})
            </div>

            <!-- Barre de progression -->
            <div class="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div class="bg-green-300 h-3" :style="{ width: progressPercent + '%' }"></div>
            </div>
          </h3>

          <!-- ✅ Ici on utilise ton nouveau composant -->
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