<script setup lang="ts">
import { ref, watch } from 'vue';
import TagIcon from "@/components/icons/IconTag.vue";
import ExpandIcon from "@/components/icons/IconExpand.vue";

const props = defineProps<{ selected: string[] }>();
const selected = ref<string[]>(props.selected);

const tags = [{
  tagname: '編成',
  genre: [],
}, {
  tagname: '技術',
  genre: ['運行', '回線']
}];

watch(() => props.selected, () => {
  selected.value = props.selected;
});
</script>

<template>
  <div class="flex-col items-center flex-nowrap">
    <div class="flex py-3 px-3 items-center text-gray-100 text-sm">
      <h2>タグ</h2>
    </div>
    <div class="py-3 flex flex-col flex-nowrap gap-3">
      <!-- Tags -->
      <details open v-for="(tag, index) in tags" :key="tag.tagname + index"
        class="py-3 px-3 items-center rounded-md bg-emerald-500/10 hover:bg-emerald-300/10 transition-colors duration-200 text-white cursor-pointer text-sm [&_svg:last-child]:open:-rotate-90">
        <summary class="flex list-none justify-between gap-3 text-emerald-400 font-bold">
          <TagIcon />
          <span class="grow">{{ tag.tagname }}</span>
          <div class="justify-self-end" v-show="tag.genre.length">
            <ExpandIcon />
          </div>
        </summary>
        <div v-show="tag.genre.length" class="grid grid-cols-2 gap-3 py-3 px-3">
          <div v-show="tag.genre.length > 1" class="col-span-2 flex gap-2">
            <input type="checkbox" id="ALL" value="ALL" />
            <label for="ALL">{{ selected.values.length === 2 ? "すべて解除" : "すべて選択" }}</label>
          </div>
          <div v-for="(item, idx) in tag.genre" :key="item + idx" class="flex gap-3">
            <input type="checkbox" v-model="selected" id={item} value={item} />
            <label for={item}>{{ item }}</label>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>
