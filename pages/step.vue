<script setup>
import { ref, computed } from "vue";
import { store } from "~/store/store.js";
import { generateResult } from "~/utils/chatgpt.js";
import { useRouter } from "vue-router";

const router = useRouter();

const currentStep = ref(0);
const totalSteps = 5;

const selectOption = (key) => {
    console.log(store);
    store.questionsAndAnswers[currentStep.value].answer = key;
    nextStep();
};

async function nextStep() {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
    }

    if (currentStep.value == 5) {
        const result = await generateResult();

        if (result) {
            router.push("/result");
        }
    }
}

const isLastStep = computed(() => currentStep.value === totalSteps);
</script>

<template>
    <div class="container mx-auto p-4 min-h-screen">
        <FruitBackground />
        <div class="text-center mb-4">
            <h1 class="text-2xl font-bold mb-2">Logo</h1>
            <div class="bg-orange-200 rounded-full h-4 w-full">
                <div
                    class="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                ></div>
            </div>
        </div>
        {{ currentStep }}
        {{ store.questionsAndAnswers }}

        <template v-if="currentStep < totalSteps">
            <div class="relative">
                <div
                    class="relative text-center mb-8 bg-white p-8 rounded-md shadow-lg"
                >
                    <p class="mt-2">{{ currentStep + 1 }}/{{ totalSteps }}</p>
                    <h2 class="text-xl font-semibold">
                        {{ store.questionsAndAnswers[currentStep].question }}
                    </h2>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <button
                    v-for="(option, index) in store.questionsAndAnswers[
                        currentStep
                    ].options"
                    :key="option"
                    @click="selectOption(option)"
                    class="transition duration-300 active:mt-1 active:border-b-0 text-white border-b-4 font-bold text-2xl py-8 px-6 rounded-xl"
                    :class="{
                        'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 border-blue-800':
                            index == 0,
                        'bg-green-500 hover:bg-green-600 focus:bg-green-600 border-green-800':
                            index == 1,
                        'bg-red-500 hover:bg-red-600 focus:bg-red-600 border-red-800':
                            index == 2,
                        'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 border-yellow-800':
                            index == 3,
                    }"
                >
                    {{ option }}
                </button>
            </div>
        </template>

        <template v-else>Loading</template>

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
