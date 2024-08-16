<script setup lang="ts">
import PDF from 'pdf-vue3'
</script>

<template>
  <div class="h-full flex flex-col lg:min-h-screen lg:flex lg:items-center">
    <div class="h-1/3 w-full">
      <PDF src="/2023price_matsuda.pdf" />
    </div>
    <div class="h-1/3 w-full">
      <PDF src="/KJ00004258792.pdf" show-progress="true" page="1" />
    </div>
  </div>
</template>
