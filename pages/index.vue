<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const startGame = () => {
  router.push('/step');
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <button @click="startGame" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Start Game
    </button>
  </div>
</template>
