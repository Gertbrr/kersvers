<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { store } from "~/store/store.js";

const router = useRouter();

const passage = ref(null);

const showBible = ref(false);
</script>

<template>
    <div class="flex pt-5 items-center gap-y-8 min-h-screen flex-col">
        <FruitBackground />
        <dl
            class="flex items-center text-sm gap-1 flex-wrap px-5 max-w-xl mx-auto"
        >
            <dt class="font-bold">Jouw mix:</dt>

            <dd
                class="bg-white shadow-sm rounded-xl p-2"
                v-for="item in store.questionsAndAnswers"
            >
                {{ item.answer }}
            </dd>
        </dl>
        <!-- {{ store.context }} -->
        <div class="lg:text-lg w-full px-5 max-w-2xl mx-auto">
            <Typewriter
                v-if="store.context"
                :text="store.context"
                @done="showBible = true"
            />
        </div>
        <transition
            enter-active-class="duration-500 ease-out"
            enter-from-class="transform opacity-0 translate-y-40"
            enter-to-class="opacity-100"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0 translate-y-40"
        >
            <div
                v-show="showBible"
                class="shadow-xl bg-white rounded-t-3xl pt-5 px-5 pb-10 max-w-3xl mx-auto"
            >
                <p class="text-lg">
                    {{ passage }}
                </p>
            </div>
        </transition>
    </div>
</template>
