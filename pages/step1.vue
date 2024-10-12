<script setup>
import { ref } from 'vue';

const currentStep = ref(3);
const totalSteps = ref(5);
const question = ref('Welke kleur voel je je?');

const options = ref([
  { id: 1, text: 'Red' },
  { id: 2, text: 'Blue' },
  { id: 3, text: 'Green' },
  { id: 4, text: 'Yellow' },
]);

const selectOption = (id) => {
  // Handle option selection
  console.log(`Selected option: ${id}`);
};

const nextStep = () => {
  // Handle moving to next step
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold mb-2">Logo</h1>
      <div class="bg-gray-200 rounded-full h-4 w-full">
        <div class="bg-blue-500 h-4 rounded-full" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
      </div>
      <p class="mt-2">{{ currentStep }}/{{ totalSteps }}</p>
    </div>

    <div class="text-center mb-8">
      <h2 class="text-xl font-semibold">{{ question }}</h2>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option.id)"
        class="bg-gray-200 hover:bg-gray-300 py-4 px-6 rounded"
      >
        {{ option.text }}
      </button>
    </div>

    <div class="text-center mt-8">
      <button @click="nextStep" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Volgende
      </button>
    </div>
  </div>
</template>
