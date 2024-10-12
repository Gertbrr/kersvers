<template>
    <p class="w-full whitespace-pre-wrap font-mono">{{ displayText }}</p>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";

const PAUSE = 20;

export default defineComponent({
    name: "Typewriter",
    props: {
        text: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const displayText = ref("");
        const typePause = ref("");
        let index = 0;
        const typewriterEffect = () => {
            // Is there more to write?
            if (
                props.text.length > 0 &&
                displayText.value.length < props.text.length
            ) {
                const nextChar = props.text.charAt(displayText.value.length);
                const afterNextChar = props.text.charAt(
                    displayText.value.length + 1,
                );
                const isPartOfSentence =
                    nextChar == "," || nextChar == ":" || nextChar == ";";
                const isEndOfSentence =
                    (nextChar == "." || nextChar == "!" || nextChar == "?") &&
                    (afterNextChar == " " || afterNextChar == "\\");
                const isLineBreak = nextChar == "\\";
                const isStartOfHtml = nextChar === "<";
                const isStyle = nextChar === "*" || nextChar === "_";

                // Write this next piece
                if (isStyle) {
                    displayText.value +=
                        props.text.charAt(displayText.value.length) +
                        (afterNextChar == "*" ? afterNextChar : "");
                } else if (isStartOfHtml) {
                    // Print html tags at once
                    displayText.value += props.text.slice(
                        displayText.value.length,
                        props.text.indexOf(">", displayText.value.length),
                    );
                } else if (isLineBreak) {
                    // Print escaped symbols at once
                    displayText.value +=
                        props.text.charAt(displayText.value.length) +
                        afterNextChar;
                } else {
                    // Print next character
                    displayText.value += props.text.charAt(
                        displayText.value.length,
                    );
                }

                // Continue typing the next piece after a pause
                if (isPartOfSentence) {
                    typePause.value = PAUSE * 10;
                } else if (isEndOfSentence) {
                    typePause.value = PAUSE * 30;
                } else if (isLineBreak) {
                    typePause.value = PAUSE * 50;
                } else {
                    typePause.value = PAUSE;
                }

                setTimeout(typewriterEffect, typePause.value);
            } else {
                emit("done");
                console.log("done");
            }
        };

        onMounted(() => {
            typewriterEffect();
        });

        watch(
            () => props.text,
            () => {
                displayText.value = "";
                index = 0;
                typewriterEffect();
            },
        );

        return { displayText };
    },
});
</script>
