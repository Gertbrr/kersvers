import axios from 'axios';
import { store } from '~/store/store.js';

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

    store.results = response.data.choices[0].message.content;

    return true;
  } catch (e) {
    //
  }
}
