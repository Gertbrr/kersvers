<template>
    <div
        class="pointer-events-none -z-50 fixed inset-0 overflow-hidden opacity-40"
    >
        <div
            v-for="(fruit, index) in fruits"
            :key="fruit.id"
            :class="['absolute', index > 10 && 'max-lg:hidden']"
            :style="getFruitStyle(fruit)"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                :class="('w-full h-full', fruit.color)"
            >
                <path
                    v-if="fruit.icon === 'apple'"
                    d="M17.3,6c-1.5,0-3.8.8-5.2,1.5-1.5-.8-3.7-1.5-5.2-1.5-3.8,0-5.3,3.9-5.3,7.5,0,4.7,3,10.5,7.5,10.5s2.2-.8,3-.8,1.5.8,3,.8c4.5,0,7.5-5.8,7.5-10.5,0-3.6-1.4-7.5-5.2-7.5ZM16.5,1.5V0h-1.5c-2.1,0-3.8,1.7-3.8,3.8v1.5h1.5c2.1,0,3.8-1.7,3.8-3.8Z"
                    fill="currentColor"
                />
                <path
                    v-if="fruit.icon === 'banana'"
                    d="M14.1,24c.4,0,.9,0,1.3-.1-.4,0-.7-.2-1-.4-.4-.2-.7-.7-.8-1.1-.2.2-.3.6-.2.8,0,.4.4.8.7.8ZM21.8,20.9c1.6-2.1,2-4.6,2-6.4,0-3-1.1-6.2-3.2-9-.6-.8-1.8-1.9-2.6-2.6C15.8,1.2,13.2.1,10.6,0c-1.2,0-2.3.1-3.2.6-1.1.5-1.9,1.3-2.2,2.3,0,0-.1.1-.2,0,0,0-.1-.1,0-.2.2-.4.4-.9.7-1.2-.6,0-1.2,0-1.8,0-.4,0-.8-.2-1-.5,0,0,0-.2-.1-.2,0-.1,0-.2-.2-.3-.1,0-.3,0-.5,0-.8.3-1.4.9-1.7,1.5-.3.7-.1,1.6.4,2.1.4.3.8.4,1.2.5.4,0,.9,0,1.4,0,.2,0,.4,0,.6,0,.4,0,.8,0,1.2,0,0,0,0,0,0,0,.2,0,.2.1.2.1h0c.4,1,1.3,1.6,2.3,2.2.1,0,.3.2.4.3,2.4,1.5,4.3,3.8,5.4,6.5,1,2.7,1.2,5.7.4,8.4-.1.4.2,1,.6,1.3.4.3.8.4,1.5.5,2.1.2,4.4-.9,5.8-2.7Z"
                    fill="currentColor"
                />
                <path
                    v-if="fruit.icon === 'lemon'"
                    d="M24,13.1c0-2.1-.6-4.1-1.7-5.9C20.1,3.4,16.2.3,12.8-.2c-3.2-.5-5.9.6-6.8,1-.1,0-.2,0-.3.1-.4.1-1,0-1.6,0-.4,0-.8-.1-1.2-.1-.6,0-1.1.1-1.5.6-.6.7-.4,1.7-.3,2.7,0,.5.1.9,0,1.3,0,.4-.2.9-.4,1.5-.3,1-.8,2.3-.8,3.4,0,1.4-.2,4.1,2.1,7.7,2.4,3.7,6.6,6.4,10.4,6.4,2.3,0,3.3-.3,4.2-.6.7-.2,1.3-.4,2.3-.4,1.9,0,3.1-.2,3.8-.9,1-1.1.6-2.8.4-3.3-.1-.5,0-1.3.3-2.1v-.2c.2-.6.5-2.2.5-3.5Z"
                    fill="currentColor"
                />
                <path
                    v-if="fruit.icon === 'strawberry'"
                    d="M24,10.8l-2.8-2,.9-2.5.2-.6h0s0,0,0,0l-3.7-.4-.4-3v-.7c0,0,0,0,0,0h0s-3,1.2-3,1.2l-1.3-1.8L13.2,0h0s0,0,0,0l-.9,2.4,9.4,9.3,1.5-.6.8-.3h0s0,0,0,0ZM13.3,4.5c-.4-.4-1.3-.9-2.4-1.1,0,0,0,0,0,0-.4,0-.9-.2-1.4-.2-1.4,0-3.4.4-5.4,2.4,0,0-.2.2-.2.3,0,0-.1.1-.2.2-.2.2-.3.4-.5.6,0,0,0,.1-.1.2C.3,10.5-.1,15.8,0,18.2c.2,2.2,1.1,3.5,1.7,4.1.6.6,1.8,1.5,4.1,1.7.3,0,.6,0,.9,0h0c.4,0,1.4,0,2.6-.2,0,0,0,0,.1,0,0,0,.1,0,.2,0,0,0,.1,0,.2,0,0,0,0,0,.1,0,0,0,.2,0,.3,0,0,0,0,0,.1,0,0,0,.2,0,.3,0,0,0,0,0,.1,0,0,0,.2,0,.3,0,0,0,.2,0,.2,0,0,0,.1,0,.2,0,2.3-.5,4.9-1.5,6.8-3.5,3.7-3.7,2.3-8.1,1.1-9.3l-6.1-6.1ZM5.9,19c0,.3-.3.6-.5.9-.4.4-.8.6-1.2.6s-.3,0-.4-.1c-.3-.3-.1-1,.4-1.5.4-.4.8-.6,1.2-.6s.3,0,.4.1c.1.1.2.4,0,.7ZM6.5,13.2c0,.3-.3.6-.5.9-.4.4-.8.6-1.2.6s-.3,0-.4-.1c-.3-.3-.1-1,.4-1.5.4-.4.8-.6,1.2-.6s.3,0,.4.1c.1.1.2.4,0,.7ZM8.3,7.6c0,.3-.3.6-.5.9-.4.4-.8.6-1.2.6s-.3,0-.4-.1c0,0-.1-.2-.1-.4,0-.4.2-.8.6-1.2.4-.4.8-.6,1.2-.6s.3,0,.4.1c.1.1.2.4,0,.7ZM11.4,18.3c0,.3-.3.6-.5.9-.4.4-.8.6-1.2.6s-.3,0-.4-.1c-.3-.3-.1-1,.4-1.5.4-.4.8-.6,1.2-.6s.3,0,.4.1c.1.1.2.4,0,.7ZM12.2,12.9c-.4.4-.8.6-1.2.6s-.3,0-.4-.1c-.3-.3-.1-1,.4-1.5.4-.4.8-.6,1.2-.6s.3,0,.4.1c.3.3.1,1-.4,1.5ZM16.2,16.9c-.4.4-.8.6-1.2.6s-.3,0-.4-.1c-.3-.3-.1-1,.4-1.5.4-.4.8-.6,1.2-.6s.3,0,.4.1c0,0,.1.2.1.4,0,.4-.2.8-.6,1.2Z"
                    fill="currentColor"
                />
                <path
                    v-if="fruit.icon === 'pear'"
                    d="M18.1,13.5c-.8-.9-1.2-2-1.2-3.1v-.2c0-2.4-1.6-4.4-3.8-4.9.3-1.1,1.3-3.1,3.5-4,.4-.2.6-.6.5-1-.2-.4-.6-.6-1-.5-1.8.7-3,2.1-3.7,3.3-.3-.7-.7-1.4-1.4-1.9C9.7.2,7.9,0,6.9,0s-.5,0-.5,0h-.7c0,0,0,.8,0,.8,0,.1.1,2.9,1.9,4.4.5.4,1,.7,1.5.9-1.2.9-2,2.3-2,4v.3c0,1.1-.5,2.1-1.2,3.1-1.1,1.2-1.7,2.8-1.6,4.4.1,2.5,1.8,4.8,4.2,5.7,1.1.4,2.3.5,3.5.2.5.1.9.2,1.4.2h0c.7,0,1.4-.1,2.1-.4,2.4-.9,4.1-3.2,4.2-5.7,0-1.6-.5-3.2-1.6-4.4Z"
                    fill="currentColor"
                />
            </svg>
            <component :is="fruit.icon" :class="fruit.color" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineComponent, markRaw } from "vue";

const fruitIcons = ["apple", "banana", "lemon", "strawberry", "pear"];
const fruitColors = [
    "text-red-200",
    "text-yellow-200",
    "text-orange-200",
    "text-pink-200",
    "text-blue-200",
    "text-purple-200",
];

const fruits = ref([]);
const animationFrameId = ref(null);
const idCounter = ref(0);

const createFruit = () => ({
    id: ++idCounter.value,
    icon: fruitIcons[Math.floor(Math.random() * fruitIcons.length)],
    color: fruitColors[Math.floor(Math.random() * fruitColors.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 3, // 3-5vh
    speed: Math.random() * 0.05 + 0.01, // 0.01-0.06
    direction: Math.random() * 2 * Math.PI,
});

const getFruitStyle = (fruit) => {
    return {
        left: `${fruit.x}%`,
        top: `${fruit.y}%`,
        width: `${fruit.size}vh`,
        height: `${fruit.size}vh`,
        transform: `translate(-50%, -50%)`,
    };
};

const moveFruits = () => {
    fruits.value.forEach((fruit) => {
        fruit.x += Math.cos(fruit.direction) * fruit.speed;
        fruit.y += Math.sin(fruit.direction) * fruit.speed;

        if (fruit.x < 0 || fruit.x > 100 || fruit.y < 0 || fruit.y > 100) {
            fruit.x = Math.random() * 100;
            fruit.y = Math.random() * 100;
            fruit.direction = Math.random() * 2 * Math.PI;
        }
    });

    animationFrameId.value = requestAnimationFrame(moveFruits);
};

onMounted(() => {
    for (let i = 0; i < 20; i++) {
        fruits.value.push(createFruit());
    }
    moveFruits();
});

onUnmounted(() => {
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value);
    }
});
</script>
