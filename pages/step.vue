<script setup>
import { ref, computed } from 'vue';

const currentStep = ref(1);
const totalSteps = 5;

const steps = [
  {
    question: 'Welke kleur voel je je?',
    options: [
      { id: 1, text: 'Rood' },
      { id: 2, text: 'Blauw' },
      { id: 3, text: 'Groen' },
      { id: 4, text: 'Geel' },
    ],
  },
  {
    question: 'Wat is je favoriete seizoen?',
    options: [
      { id: 1, text: 'Lente' },
      { id: 2, text: 'Zomer' },
      { id: 3, text: 'Herfst' },
      { id: 4, text: 'Winter' },
    ],
  },
  {
    question: 'Welk dier past het best bij jou?',
    options: [
      { id: 1, text: 'Leeuw' },
      { id: 2, text: 'Dolfijn' },
      { id: 3, text: 'Adelaar' },
      { id: 4, text: 'Vlinder' },
    ],
  },
  {
    question: 'Wat is je favoriete vrijetijdsbesteding?',
    options: [
      { id: 1, text: 'Lezen' },
      { id: 2, text: 'Sport' },
      { id: 3, text: 'Koken' },
      { id: 4, text: 'Reizen' },
    ],
  },
  {
    question: 'Welk element spreekt je het meest aan?',
    options: [
      { id: 1, text: 'Vuur' },
      { id: 2, text: 'Water' },
      { id: 3, text: 'Aarde' },
      { id: 4, text: 'Lucht' },
    ],
  },
];

const currentQuestion = computed(() => steps[currentStep.value - 1]);

const selectOption = (id) => {
  // Handle option selection
  console.log(`Step ${currentStep.value}, Selected option: ${id}`);
  // You can store the answer here if needed
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    // Handle end of quiz
    console.log('Quiz completed!');
  }
};

const isLastStep = computed(() => currentStep.value === totalSteps);
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold mb-2">Logo</h1>
      <div class="bg-gray-200 rounded-full h-4 w-full">
        <div
          class="bg-blue-500 h-4 rounded-full transition-all duration-300"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
      <p class="mt-2">{{ currentStep }}/{{ totalSteps }}</p>
    </div>

    <div class="text-center mb-8">
      <h2 class="text-xl font-semibold">{{ currentQuestion.question }}</h2>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="option in currentQuestion.options"
        :key="option.id"
        @click="selectOption(option.id)"
        class="bg-gray-200 hover:bg-gray-300 py-4 px-6 rounded transition duration-300"
      >
        {{ option.text }}
      </button>
    </div>

    <div class="text-center mt-8">
      <button
        @click="nextStep"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {{ isLastStep ? 'Voltooien' : 'Volgende' }}
      </button>
    </div>
  </div>
</template>
