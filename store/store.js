// store.js
import { reactive } from 'vue';

export const store = reactive({
  questionsAndAnswers: [],
  bibleTexts: [],
  passage: null,
  context: null,
});
