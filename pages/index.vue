<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { generateQuizQuestions } from "~/utils/chatgpt.js";

const router = useRouter();
const { data, error } = await useFetch("/api/sampler");
const doneFetching = ref(false);
const knoptekst = ref("Bezig met laden...");

import { store } from "~/store/store.js";

const startGame = () => {
    if (doneFetching.value == true) router.push("/step");
};

onMounted(async () => {
    const bibleTexts = Object.values(data.value).map((entry) => {
        return {
            bibletext: entry.bibletext,
            passageUrl: entry["passage-url"],
        };
    });

    store.bibleTexts = bibleTexts;

    const result = await generateQuizQuestions(bibleTexts);
    doneFetching.value = true;
    knoptekst.value = "Geef me een kersvers vers";

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
            Kies uit 5 bijzondere dilemma's en krijg een kersvers Bijbelvers
            voorgeschoteld.
        </p>
        <p class="text-xl">
            Het zal je verbazen welk Bijbelvers aansluit bij jouw maffe keuzes
            en gekke voorkeuren. Klaar om appels met peren te vergelijken?
        </p>
        <button
            @click="startGame"
            class="active:mt-1 active:border-b-0 mb-20 text-white border-b-4 font-bold py-3 px-5 rounded-xl"
            :class="{
                'bg-red-500 hover:bg-red-600 focus:bg-red-600 border-red-700':
                    doneFetching,
                'bg-gray-500 border-gray-700': !doneFetching,
            }"
        >
            {{ knoptekst }}
        </button>
    </div>
</template>
