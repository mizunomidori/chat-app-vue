<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

import Chat from '@/components/Chat.vue';
import Guides from '@/components/Guides.vue';
import Sidebar from '@/components/Sidebar.vue';
import DocsPreview from '@/components/DocsPreview.vue';

import SubmitIcon from '@/components/icons/IconSubmit.vue';
import type { MessageType } from '@/types/types.d';

import { ref, onMounted, watch } from 'vue';

const question = ref<string>('');
const messageList = ref<MessageType[]>([]);
const questionList = ref<MessageType[]>([]);
let isThinking = ref<boolean>(false);
let isLight = ref<boolean>(false);

const selectedTags = ref<string[]>([]);

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

const setQuestions = (questions: MessageType[]) => {
  localStorage.setItem('threads', JSON.stringify(questions));
};

const getQuestions = () => {
  questionList.value = JSON.parse(localStorage.getItem('threads') || '{}');
};

const clearStorage = () => {
  questionList.value = [];
  messageList.value = [];
};

const getAnswer = async () => {
  try {
    isThinking.value = true;

    messageList.value.push({
      role: 'user',
      content: question.value,
    });
    messageList.value.push({
      role: 'assistant',
      content: '',
    });

    // const res = await openai.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [{ role: 'user', content: question.value }],
    //   max_tokens: 1024,
    //   temperature: 0.0,
    // });
    // const data = res.choices[0].message.content;
    const data = 'DUMMY:AAAAAAABBBBBBBBCCCCCCCDDDDDEEEEE';

    messageList.value.pop();
    messageList.value.push({
      role: 'assistant',
      content: data?.trim(),
    });

    const userQuestions = messageList.value.filter((item) => {
      return item.role === 'user';
    });
    setQuestions(userQuestions);
    getQuestions();
    console.log('saveQ', questionList.value);
  } catch (error) {
    console.log('error', error);
  } finally {
    isThinking.value = false;
    question.value = '';
  }
};

const sendQuestion = async () => {
  if (!question.value.length || question.value === '\n') {
    question.value = '';
    return;
  }
  await getAnswer();
};

const sendExample = (example: string) => {
  question.value = example;
  sendQuestion();
};

const updateSelectedTags = (tags: string[]) => {
  selectedTags.value = tags;
  console.log('home:tags:', selectedTags.value);
};

onMounted(() => {
  getQuestions();
});
</script>

<template>
  <div class="overflow-hidden w-full h-full relative" :class="isLight ? 'light' : 'dark'">
    <div class="flex flex-1 flex-col md:pl-[260px] md:pr-[260px] h-screen">
      <main
        class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1"
      >
        <div class="h-full" v-if="messageList.length">
          <div class="h-full flex-1 overflow-hidden">
            <div class="h-full overflow-y-auto bg-gray-100 dark:bg-gray-800">
              <div>
                <div class="flex flex-col items-center text-sm dark:bg-gray-800">
                  <div
                    v-for="(chat, i) in messageList"
                    :key="i"
                    class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]"
                    :class="{ ai: chat.role === 'assistant' }"
                  >
                    <Chat :chat="chat" :key="i" class="w-full" />
                  </div>
                  <div class="w-full h-32 md:h-48 flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Guides -->
        <Guides @example="sendExample" v-else />
        <div
          class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient"
        >
          <form
            @submit.prevent="getAnswer"
            class="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
          >
            <div
              class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 text-gray-800 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
            >
              <textarea
                class="m-0 w-full h-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 focus-visible:outline-0 dark:bg-transparent md:pl-0"
                rows="1"
                cols="1"
                @keyup.enter="isThinking || sendQuestion()"
                placeholder="何でも聞いてください..."
                v-model="question"
              ></textarea>
              <button
                type="submit"
                class="absolute p-2 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                @click="sendQuestion()"
                :disabled="isThinking"
              >
                <SubmitIcon />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    <Sidebar
      :questions="questionList"
      @clear="clearStorage()"
      @light="isLight = $event"
      @update-selected-tags="updateSelectedTags"
    />
    <DocsPreview />
  </div>
</template>
