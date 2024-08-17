<script setup lang="ts">
import { nextTick, onMounted, ref, watch, computed } from 'vue';
import GptIcon from '@/components/icons/IconGpt.vue';
import UserIcon from '@/components/icons/IconUser.vue';
import MemoIcon from '@/components/icons/IconMemo.vue';
import ClipboardIcon from "@/components/icons/IconClipboard.vue";
import { type MessageType } from '@/types/custom';

// const props = defineProps({
//   chat: {
//     type: Object || null,
//   },
// });

const props = defineProps<{ chat:MessageType }>();
const chat = ref<MessageType>(props.chat);

let currentChar = ref<string>('');
const typingSpeed = ref<number>(20);
let currentMessage = ref<HTMLDivElement>();

const wait = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

onMounted(async () => {
  await nextTick();
  const div = currentMessage.value;
  div?.scrollIntoView({ behavior: 'smooth' });
});

watch(
  () => props.chat,
  async (newValue, oldValue) => {
    const fetchMessages = async () => {
      console.log('newValue', newValue);
      if (newValue?.role === 'assistant') {
        for (let i = 0; i < newValue.content.length; i++) {
          await wait(typingSpeed.value);
          currentChar.value = newValue.content.slice(0, i + 1);
        }
      }
    };
    fetchMessages();
  },
  { immediate: true },
);
</script>

<template>
  <div class="chat" ref="currentMessage">
    <!-- User -->
    <div
      v-if="chat.role === 'user'"
      class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800"
    >
      <div
        class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0"
      >
        <div class="w-[30px] flex flex-col relative items-end">
          <div
            class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
            style="background-color: rgb(16, 163, 127)"
          >
            <UserIcon />
          </div>
        </div>
        <div
          class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]"
        >
          <div class="flex flex-grow flex-col gap-3">
            <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
              {{ chat.content }}

              <!-- <div v-for="(message, index) in messages" :key="index + 'sdf'">
                <span v-if="index === currentMessage">{{ currentChar }}</span>
                <span v-else>{{ message }}</span>
              </div> -->
            </div>
          </div>
          <div
            class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"
          >
            <!-- TODO: 過去のチャットを編集可能にする？ -->
            <!-- <button
              class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible"
            >
              <MemoIcon />
            </button> -->
            <button
              class="rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible"
            >
              <ClipboardIcon />
            </button>
          </div>
          <div class="flex justify-between"></div>
        </div>
      </div>
    </div>
    <!-- GPT -->
    <div
      v-else
      class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-[#ececed] dark:bg-[#444654]"
    >
      <div
        class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0"
      >
        <div class="w-[30px] flex flex-col relative items-end">
          <div
            class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
            style="background-color: rgb(16, 163, 127)"
          >
            <GptIcon />
          </div>
        </div>
        <div
          class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]"
        >
          <div class="flex flex-grow flex-col gap-3">
            <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
              <div class="markdown prose w-full break-words dark:prose-invert light">
                <p>
                  {{ currentChar }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div
              class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"
            >
              <button
                class="rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible"
              >
                <ClipboardIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
}
</style>
