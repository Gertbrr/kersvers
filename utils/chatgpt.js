import axios from 'axios';
import { store } from '~/store/store.js';
import sampleData from '@/data/output.json';

export async function generateQuizQuestions(bibleTexts) {
  const {
    public: { apiKeyOpenai },
  } = useRuntimeConfig();
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  const chatGPT = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKeyOpenai}`,
    },
  });
  try {
    const response = await chatGPT.post('', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Dutch bible verse assistant! It is your job to give the user a fitting bible verse.


## **Bible verses**
Here are the 8 bible verse you can choose from:

${JSON.stringify(store.bibleTexts)}


## **Your task**
You will create 5 questions with 4 possible answers. You will give the user two choices between four options. These are meant to end up with a specific bible text of the ones above.
So, you ask the question in a way that it ends up distinguishing the Bible texts. For example:

Welke kleur?
Rood 🔴
Geel 🟡
Zwart ⚫
Blauw🔵

Welke emotie?
Blij 😃
Boos 😡
Bang 😨
Verdrietig 😭

It is important you give 5 questions, with 4 possible answers for each question, each answer should be 1 word and an emoji.
## **Important guidelines**

Give your output in json format like this.
[
{"question": str,
"options": [str emoji, str emoji, str emoji, str emoji]
}]


Make sure you adhere to this schema, because otherwise the preprocessing will break. It is important that the result can be parsed with JSON.parse Also make sure you give FIVE questions with FOUR options each, consisting of ONE word and an EMOJI`,
        },
      ],
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    throw error;
  }
}

export async function generateResult() {
  try {
    const {
      public: { apiKeyOpenai },
    } = useRuntimeConfig();

    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const chatGPT = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKeyOpenai}`,
      },
    });

    const response = await chatGPT.post('', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Dutch bible verse assistant! It is your job to give the user a fitting bible verse.

## **Bible verses**
Here are the 8 bible verse you can choose from:

${JSON.stringify(store.bibleTexts)}


## **Your task**
In an earlier version the user has been asked the following:

${store.questionsAndAnswers}

Based on the given answers, you will have to choose one of the eight bible texts above. You will have to select the one that fits best and explain why you choose this one.

## **Examples**

The user choose Zwart ⚫ en Verdrietig 😭. From the eight options, the text from Johannes 1 fits best! It acknowledges darkness and sadness, but it also tells us of hope!


## **Important guidelines**

Give your output in json format like this.

Give only the passageUrl value nothing else. No JSON. only one value`,
        },
      ],
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    const resultsWithoutQuotes = result.replace(/['"]+/g, '');
    const matchingKey = Object.keys(sampleData).find((key) => sampleData[key]['passage-url'] === resultsWithoutQuotes);

    store.passage = sampleData[matchingKey].bibletext;

    return true;
  } catch (e) {
    //
  }
}

export async function generateContext() {
  try {
    const {
      public: { apiKeyOpenai },
    } = useRuntimeConfig();

    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const chatGPT = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKeyOpenai}`,
      },
    });

    const answers = store.questionsAndAnswers
      .map((entry) => entry.answer) // Extract 'answer' from each entry
      .filter((answer) => answer) // Filter out undefined/null answers
      .join(', '); // Join answers with a comma and space

    const response = await chatGPT.post('', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Dutch bible verse assistant! In earlier steps a user has answered some questions and a bible verse has been coupled to the answers. It is your task to explain to the user why her choices gave her this bible text.

## **User's choices**
The user choose ${answers}

## **Bible text**
This led to this bible text: ${store.passage}

Based on the given answers, you will have to choose one of the eight bible texts above. You will have to select the one that fits best and explain why you choose this one. You will have to do that in Dutch!

## **Examples**

Je koos Zwart⚫, Verdrietig 😭, Duif🕊️, Wereld🌎, en Boek 📖. De wereld kan soms ontzettend donker zijn en het is niet meer dan menselijk om daar negatieve emoties bij te krijgen. Als je je angstig en machteloos voelt, kan Psalm 116 een bron van troost en kracht zijn. Een vredesduif die een takje van hoop komt brengen. De psalm herinnert je eraan dat God luistert, zelfs in je diepste nood. Hij beschermt je wanneer je zwak bent en biedt rust wanneer je overweldigd bent. Laat deze woorden je hart vullen met hoop, want God is dichtbij, helpt je tranen te drogen en geeft je nieuwe kracht. Vertrouw op Zijn liefde en weet dat Hij je beschermt, zelfs als alles moeilijk lijkt. Je bent niet alleen, Hij is er altijd voor je.
## **Important guidelines**

Give your output in always as a string. Do not repeat the choices.`,
        },
      ],
      temperature: 0.7,
    });

    store.context = response.data.choices[0].message.content;

    return true;
  } catch (e) {
    //
  }
}
