<script setup lang="ts">
import PDF from 'pdf-vue3'
</script>

<template>
  <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:right-0 md:flex md:w-[260px] md:flex-col">
    <div class="flex h-full min-h-0 flex-col">
      <div class="scrollbar-trigger flex-col flex-nowrap h-full w-full flex-1 items-start border-white/20">
        <h2 class="px-3 py-3">関連資料のプレビュー</h2>
        <div class="bg-red-900">
          AAA
          <PDF src="/2023price_matsuda.pdf" />
        </div>
        <div class="">
          <PDF src="/KJ00004258792.pdf" show-progress="true" page="1" />
        </div>
      </div>
    </div>
  </div>
</template>
