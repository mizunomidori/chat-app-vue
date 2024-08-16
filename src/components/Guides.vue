<script setup lang="ts">
import SunIcon from '@/components/icons/IconSun.vue';
import ThunderIcon from '@/components/icons/IconThunder.vue';
import HistoryIcon from '@/components/icons/IconHistory.vue';
import CautionIcon from '@/components/icons/IconCaution.vue';
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <div class="react-scroll-to-bottom--css-ryzwt-79elbk h-full dark:bg-gray-800">
      <div class="react-scroll-to-bottom--css-ryzwt-1n7m0yu">
        <div class="flex flex-col items-center text-sm dark:bg-gray-800">
          <div
            class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100"
          >
            <h1
              class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center"
            >
              ChatGPT
            </h1>
            <div class="md:flex items-start text-center gap-3.5">
              <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <SunIcon />
                  使用例
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <button
                    class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                  >
                    "政見放送について教えて" →
                  </button>
                  <button
                    class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                  >
                    "・・・って何？" →
                  </button>
                  <button
                    class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                  >
                    "・・・ってなんでなん？" →
                  </button>
                </ul>
              </div>
              <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <CautionIcon />
                  回答について
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    事前に収集した資料をもとに回答を生成します
                  </li>
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    質問の仕方を変えることで性能が上がることがあります
                  </li>
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    間違った回答を生成することがあります
                  </li>
                </ul>
              </div>
              <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                  <HistoryIcon />
                  会話履歴
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    過去の会話を記憶し次の回答に活用しています
                  </li>
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    過去の質問内容によって回答の精度が落ちることがあります
                  </li>
                  <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                    不要な会話履歴は削除することができます
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w-full h-32 md:h-48 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>
