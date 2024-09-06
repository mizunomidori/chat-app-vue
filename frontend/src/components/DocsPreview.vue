<script setup lang="ts">
import PDF from 'pdf-vue3';
</script>

<template>
  <div
    class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:right-0 md:flex md:w-[260px] md:flex-col"
  >
    <div class="flex h-full min-h-0 flex-col">
      <div
        class="scrollbar-trigger p-2 flex-col flex-nowrap h-full w-full flex-1 items-start border-white/20 text-white text-sm"
      >
        <h2 class="flex px-3 py-3">関連資料のプレビュー</h2>
        <!-- <div
          class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm bg-red-900"
        >
          AAA
          <PDF src="/2023price_matsuda.pdf" />
        </div> -->
      </div>
    </div>
  </div>
</template>
