<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import TagIcon from "@/components/icons/IconTag.vue";
import ExpandIcon from "@/components/icons/IconExpand.vue";

const props = defineProps<{ selectedItems: string[] }>();
const selectedItems = ref<string[]>(props.selectedItems);
let isAllSelected = ref<boolean>(true);

const tags = [{
  tagname: '編成',
  genre: [],
}, {
  tagname: '技術',
  genre: ['運行', '回線']
}];

const selectAll = (tagname: string) => {
  const data = tags.find((tag) => tag.tagname === tagname);

  if (isAllSelected.value) {
    // Clear
    selectedItems.value = [];
    isAllSelected.value = false;
  } else {
    if (data) {
      selectedItems.value = data?.genre;
      isAllSelected.value = true;
    } else {
      console.log('tag-list: genre not found');
    }
  }
};

const selectOne = (tagname: string) => {
  const data = tags.find((tag) => tag.tagname === tagname);
  if (data) {
    if (selectedItems.value.length === data.genre.length) {
      isAllSelected.value = true;
    } else {
      isAllSelected.value = false;
    }
  }
};

onMounted(() => {
  for (const tag of tags) {
    selectedItems.value.concat(tag.genre);
  }
});

watch(() => props.selectedItems, () => {
  selectedItems.value = props.selectedItems;
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
        class="py-3 px-3 items-center rounded-md bg-emerald-500/10 hover:bg-emerald-300/10 transition-colors duration-200 text-white text-sm [&_svg:last-child]:open:-rotate-90">
        <summary class="flex list-none justify-between gap-3 text-emerald-400 font-bold">
          <TagIcon />
          <span class="grow">{{ tag.tagname }}</span>
          <div class="justify-self-end" v-show="tag.genre.length">
            <ExpandIcon />
          </div>
        </summary>
        <div v-show="tag.genre.length" class="grid grid-cols-2 gap-3 py-3 px-3">
          <div v-show="tag.genre.length > 1" class="col-span-2 flex gap-2">
            <input type="checkbox" :name="tag.tagname" value="setall" id="setall" :checked="isAllSelected"
              @change="selectAll(tag.tagname)" class="cursor-pointer" />
            <label for="setall" class="cursor-pointer">すべて選択</label>
          </div>
          <div v-for="(item, idx) in tag.genre" :key="item + idx" class="flex gap-3">
            <input type="checkbox" v-model="selectedItems" :name="tag.tagname" :value="item" :id="item"
              @change="selectOne(tag.tagname)" class="cursor-pointer" />
            <label :for="item" class="cursor-pointer">{{ item }}</label>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>
