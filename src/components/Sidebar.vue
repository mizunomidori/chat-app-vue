<script setup lang="ts">
import { ref, watch } from 'vue';
import PlusIcon from '@/components/icons/IconPlus.vue';
import LightIcon from '@/components/icons/IconLight.vue';
import DarkIcon from '@/components/icons/IconDark.vue';
import TeamsIcon from '@/components/icons/IconTeams.vue';
import UpdateIcon from '@/components/icons/IconUpdate.vue';
import EscapeIcon from '@/components/icons/IconEscape.vue';
import BalloonIcon from '@/components/icons/IconBalloon.vue';
import DustbinIcon from '@/components/icons/IconDustbin.vue';
import ExpandIcon from "@/components/icons/IconExpand.vue";
import { type MessageType } from '@/types/custom';

const emits = defineEmits(['clear', 'light']);
const props = defineProps<{ questions: MessageType[] }>();
const questions = ref<MessageType[]>(props.questions);

let isLightMode = ref(false);
const waitTime = ref<number>(500);

interface ConfirmType {
  text: string;
  needConfirm: boolean;
}

const clearConversation: ConfirmType = {
  text: "会話履歴の全クリア",
  needConfirm: false,
}

const clearStorage = () => {
  setTimeout(() => {
    localStorage.clear();
    emits('clear', true);
  }, waitTime.value);
};

const changeToLight = () => {
  isLightMode.value = !isLightMode.value;
  emits('light', isLightMode.value);
};

watch(() => props.questions, () => {
  questions.value = props.questions;
});
</script>
<template>
  <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
    <div class="flex h-full min-h-0 flex-col">
      <div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
        <nav class="flex h-full flex-1 flex-col space-y-1 p-2">
          <a @click="clearStorage()"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
            <PlusIcon />
            <!-- TODO: 新規タブで会話を開始したほうがいい？ -->
            新しい会話を開始
          </a>
          <div class="flex py-3 px-3 items-center text-gray-100 text-sm">
            <h2>チャット履歴</h2>
          </div>

          <div class="flex-col flex-1 overflow-y-auto border-b border-white/20">
            <div class="flex flex-col gap-2 text-gray-100 text-sm">
              <a v-for="(thread, index) in questions" :key="index"
                class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
                <BalloonIcon />
                <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                  {{ thread.content }}
                  <div
                    class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]">
                  </div>
                </div>
              </a>
            </div>
          </div>
          <a v-if="questions && questions.length" @click="clearStorage()"
            class="flex py-3 px-3 items-center gap-3 rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-200 text-white cursor-pointer text-sm">
            <DustbinIcon />
            会話履歴の全クリア
          </a>
          <div class="flex-col flex-1 overflow-y-auto border-y border-white/20">
            <div class="flex flex-col gap-2 text-gray-100 text-sm">
              <div class="flex-col items-center flex-nowrap">
                <div class="flex py-3 px-3 items-center text-gray-100 text-sm">
                  <h2>タグ</h2>
                </div>
                <div class="py-3 flex flex-col flex-nowrap gap-3">
                  <details
                    class="py-3 px-3 items-center rounded-md bg-emerald-500/10 hover:bg-emerald-300/10 transition-colors duration-200 text-white cursor-pointer text-sm [&_svg]:-rotate-[-90deg] [&_svg]:open:-rotate-90">
                    <summary class="flex list-none justify-between text-emerald-400 font-bold">
                      編成
                      <ExpandIcon />
                    </summary>
                  </details>
                  <details
                    class="py-3 px-3 items-center rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-gray-500 text-sm">
                    <summary class="flex list-none">
                      営業
                    </summary>
                  </details>
                  <details open
                    class="py-3 px-3 items-center rounded-md bg-emerald-500/10 hover:bg-emerald-300/10 transition-colors duration-200 text-white cursor-pointer text-sm [&_svg]:-rotate-[-90deg] [&_svg]:open:-rotate-90">
                    <summary class="flex list-none justify-between text-emerald-400 font-bold">
                      技術
                      <ExpandIcon />
                    </summary>
                    <ul class="pt-3">
                      <li>運行</li>
                      <li>回線</li>
                    </ul>
                  </details>
                </div>
              </div>

            </div>
          </div>

          <a @click="changeToLight()"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <DarkIcon v-if="isLightMode" />
            <LightIcon v-else />
            {{ isLightMode ? 'Dark' : 'Light' }} mode
          </a>
          <a href="https://discord.gg/openai" target="_blank"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <TeamsIcon />
            OpenAI Teams
          </a>
          <a href="https://learn.microsoft.com/ja-jp/azure/ai-services/openai/" target="_blank"
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <UpdateIcon />
            Azure OpenAI 公式ドキュメント
          </a>
          <a
            class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
            <EscapeIcon />Log out
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
