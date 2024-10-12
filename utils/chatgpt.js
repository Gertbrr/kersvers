import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;

const chatGPT = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function generateQuizQuestions(bibleTexts) {
  try {
    const response = await chatGPT.post('', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Dutch bible verse assistant! It is your job to give the user a fitting bible verse.


## **Bible verses**
Here are the 8 bible verse you can choose from:

${JSON.stringify(bibleTexts)}


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
