<script setup>
import { ref, computed } from "vue";
import { store } from "~/store/store.js";
import { generateResult, generateContext } from "~/utils/chatgpt.js";
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

        console.log(result, "result");

        if (result) {
            const result2 = await generateContext();
            console.log(result2, "result2");
            if (result2) {
                router.push("/result");
            }
        }
    }
}

const isLastStep = computed(() => currentStep.value === totalSteps);
</script>

<template>
    <div class="container mx-auto min-h-screen p-4">
        <div class="text-center mb-4">
            <img
                src="~/assets/logo.svg"
                class="w-24 mb-2 mx-auto lg:mb-8 lg:w-36"
            />
            <div class="bg-orange-200 rounded-full h-4 w-full">
                <div
                    class="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    :style="{
                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    }"
                ></div>
            </div>
        </div>

        <div class="relative">
            <div
                class="relative text-center mb-8 bg-white p-8 rounded-md shadow-lg"
            >
                <p class="mt-2">{{ currentStep + 1 }}/{{ totalSteps }}</p>
                <h2 class="text-xl font-semibold">
                    {{ store.questionsAndAnswers[currentStep].question }}
                </h2>
            </div>

            <template v-if="currentStep < totalSteps">
                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="(option, index) in store.questionsAndAnswers[
                            currentStep
                        ].options"
                        :key="option"
                        @click="selectOption(option)"
                        class="transition duration-300 active:mt-1 active:border-b-0 text-white border-b-4 font-bold text-lg lg:text-2xl py-8 px-6 rounded-xl"
                        :class="{
                            'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 border-blue-700':
                                index == 0,
                            'bg-green-500 hover:bg-green-600 focus:bg-green-600 border-green-700':
                                index == 1,
                            'bg-red-500 hover:bg-red-600 focus:bg-red-600 border-red-700':
                                index == 2,
                            'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 border-yellow-700':
                                index == 3,
                        }"
                    >
                        {{ option }}
                    </button>
                </div>
            </template>

            <template v-else>Loading</template>
        </div>
    </div>
</template>
