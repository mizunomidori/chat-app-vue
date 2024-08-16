<script setup>
import { ref } from 'vue';
import PlusIcon from '@/components/icons/IconPlus.vue';
import LightIcon from '@/components/icons/IconLight.vue';
import DarkIcon from '@/components/icons/IconDark.vue';
import TeamsIcon from '@/components/icons/IconTeams.vue';
import UpdateIcon from '@/components/icons/IconUpdate.vue';
import EscapeIcon from '@/components/icons/IconEscape.vue';
import BalloonIcon from '@/components/icons/IconBalloon.vue';
import CheckIcon from '@/components/icons/IconCheck.vue';
import DustbinIcon from '@/components/icons/IconDustbin.vue';
const emits = defineEmits(['clear', 'light']);
const props = defineProps({
  questions: Array,
});

let isLightMode = ref(false);
let counter = ref(0);
let isConfirm = ref({
  text: 'Clear conversation',
  isTrue: false,
});

const clearStorage = () => {
  counter.value += 1;
  isConfirm.value = {
    text: 'Confirm clear conversation',
    isTrue: true,
  };
  console.log(counter.value);
  if (counter.value === 2) {
    setTimeout(() => {
      localStorage.clear();
      emits('clear', true);
    }, 1000);
    isConfirm.value = {
      text: 'Clear conversation',
      isTrue: false,
    };
    counter.value = 0;
  }
};

const changeToLight = () => {
  isLightMode.value = !isLightMode.value;
  emits('light', isLightMode.value);
};
</script>
<template>
  <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
    <div class="flex h-full min-h-0 flex-col">
      <div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
        <nav class="flex h-full flex-1 flex-col space-y-1 p-2">
          <a
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20"
          >
            <PlusIcon />
            New chat
          </a>
          <div class="flex-col flex-1 overflow-y-auto border-b border-white/20">
            <div class="flex flex-col gap-2 text-gray-100 text-sm">
              <a
                v-for="(thread, index) in questions"
                :key="index"
                class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group"
              >
                <BalloonIcon />
                <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  {{ thread.value }}
                  <div
                    class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"
                  ></div>
                </div>
              </a>
            </div>
          </div>
          <a
            v-if="questions && questions.length"
            @click="clearStorage()"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <CheckIcon v-if="isConfirm.isTrue" />
            <DustbinIcon v-else />
            {{ isConfirm.text }}</a
          ><a
            @click="changeToLight()"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <DarkIcon v-if="isLightMode" />
            <LightIcon v-else />
            {{ isLightMode ? 'Dark' : 'Light' }} mode</a
          ><a
            href="https://discord.gg/openai"
            target="_blank"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <TeamsIcon />
            OpenAI Teams</a
          ><a
            href="https://learn.microsoft.com/ja-jp/azure/ai-services/openai/"
            target="_blank"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          >
            <UpdateIcon />
            Updates &amp; FAQ</a
          ><a
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            ><EscapeIcon />Log out</a
          >
        </nav>
      </div>
    </div>
  </div>
</template>
