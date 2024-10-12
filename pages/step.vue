<script setup>
import { ref, computed } from 'vue';
import { store } from '~/store/store.js';

const currentStep = ref(0);
const totalSteps = 5;

const questions = ref([]);

const questionsAndAnswers = ref([]);

onMounted(() => {
  // loadQuestions();
  questionsAndAnswers.value = store.questionsAndAnswers;
});

const loadQuestions = async () => {
  try {
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generateQuestions',
        params: {
          topic: 'World Capitals',
          numberOfQuestions: 10,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    questions.value = await response.json();
    totalSteps.value = questions.value.length;
  } catch (error) {
    console.error('Error loading questions:', error);
    // Handle error (e.g., show error message to user)
  }
};

const selectOption = (key) => {
  questionsAndAnswers.value[currentStep.value].answer = key;
  nextStep();
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
    </div>
    {{ questionsAndAnswers }}
    <div class="relative">
      <div class="relative text-center mb-8 bg-white p-8 rounded-md shadow-lg">
        <p class="mt-2">{{ currentStep + 1 }}/{{ totalSteps }}</p>
        <h2 class="text-xl font-semibold">{{ store.questionsAndAnswers[currentStep].question }}</h2>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(option, index) in store.questionsAndAnswers[currentStep].options"
        :key="option"
        @click="selectOption(option)"
        class="bg-gray-200 hover:bg-gray-300 py-4 px-6 rounded transition duration-300"
      >
        {{ option }}
      </button>
    </div>

    <!-- <div class="text-center mt-8">
      <button
        @click="nextStep"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        {{ isLastStep ? 'Voltooien' : 'Volgende' }}
      </button>
    </div> -->
  </div>
</template>
