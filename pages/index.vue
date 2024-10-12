<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const { data, error } = await useFetch("/api/sampler");

import { store } from "~/store/store.js";

const startGame = () => {
    router.push("/step");
};

onMounted(async () => {
    const bibleTexts = Object.values(data.value).map(
        (entry) => entry.bibletext,
    );

    // const { test } = await useFetch('/api/chatgpt');

    // const {
    //     public: { apiKeyOpenai },
    // } = useRuntimeConfig();
    // const API_URL = "https://api.openai.com/v1/chat/completions";

    // const chatGPT = axios.create({
    //     baseURL: API_URL,
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${apiKeyOpenai}`,
    //     },
    // });
    const result = await generateQuizQuestions(bibleTexts);

    store.questionsAndAnswers = result;
});
</script>

<template>
    <div
        class="flex items-center justify-center gap-y-8 min-h-screen flex-col max-w-lg mx-auto text-center px-5"
    >
        <FruitBackground />
        <img src="~/assets/logo.svg" class="max-w-full mr-12 mb-8" />
        <p class="text-2xl font-bold">
            Kies uit 3 bijzondere dilemma's en krijg een kersvers Bijbelvers
            voorgeschoteld.
        </p>
        <p class="text-xl">
            Het zal je verbazen welk Bijbelvers aansluit bij jouw maffe keuzes
            en gekke voorkeuren. Klaar om appels met peren te vergelijken?
        </p>
        <button
            @click="startGame"
            class="bg-red-500 hover:bg-red-600 active:mt-1 active:border-b-0 focus:bg-red-600 mb-20 text-white border-b-4 border-red-700 font-bold py-3 px-5 rounded-xl"
        >
            Geef me een kersvers vers
        </button>
    </div>
</template>
