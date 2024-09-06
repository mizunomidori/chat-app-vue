<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import TagIcon from '@/components/icons/IconTag.vue';
import ExpandIcon from '@/components/icons/IconExpand.vue';
import type { TagType, MultiTagType } from '@/types/types.d';

const emits = defineEmits(['updateSelectedTags']);
const referenceTags = ref<MultiTagType[]>([]);
const selectedTags = ref<string[]>([]);
let isAllSelected = ref<boolean>(true);

const tags = [
  {
    tag_name: '総務',
    tag_id: 'soumu',
  },
  {
    tag_name: '技術',
    tag_id: 'eng',
    sub_tags: [
      {
        tag_name: '運行',
        tag_id: 'mcc',
      },
      {
        tag_name: '回線',
        tag_id: 'kc',
      },
    ],
  },
];

const toggleTag = (tag_id: string) => {
  const index = selectedTags.value.indexOf(tag_id);
  if (index === -1) {
    selectedTags.value.push(tag_id);
  } else {
    selectedTags.value.splice(index, 1);
  }
  emits('updateSelectedTags', selectedTags.value);
};

onMounted(() => {
  referenceTags.value = tags;
  for (const tag of referenceTags.value) {
    tag.checked = true;
    selectedTags.value.push(tag.tag_id);
    if (tag.sub_tags) {
      for (const stag of tag.sub_tags) {
        stag.checked = true;
        selectedTags.value.push(tag.tag_id);
      }
    }
  }
});
</script>

<template>
  <div class="flex-col items-center flex-nowrap">
    <div class="flex py-3 px-3 items-center text-gray-100 text-sm">
      <h2>タグ</h2>
    </div>
    <div class="py-3 flex flex-col flex-nowrap gap-3">
      <!-- Tags -->
      <details
        open
        v-for="(tag, index) in referenceTags"
        :key="tag.tag_name + index"
        class="py-3 px-3 items-center rounded-md bg-emerald-500/10 hover:bg-emerald-300/10 transition-colors duration-200 text-white text-sm [&_svg:last-child]:open:-rotate-90"
      >
        <summary class="flex list-none justify-between gap-3 text-emerald-400 font-bold">
          <TagIcon />
          <div class="flex grow gap-3">
            <label class="cursor-pointer flex grow gap-3">
              <input
                type="checkbox"
                switch
                v-model="tag.checked"
                :name="tag.tag_name"
                :value="tag.tag_name"
                class="cursor-pointer"
              />
              {{ tag.tag_name }}
            </label>
          </div>
          <div class="justify-self-end" v-show="tag.sub_tags?.length">
            <ExpandIcon />
          </div>
        </summary>
        <div v-show="tag.sub_tags?.length" class="grid grid-cols-2 gap-3 py-3 px-3">
          <!-- <div v-show="tag.sub_tags?.length > 1" class="col-span-2 flex gap-2">
            <input
              type="checkbox"
              :name="tag.tag_name"
              :value="tag.tag_name + '-all'"
              :id="tag.tag_name + '-all'"
              :checked="isAllSelected"
              @change="checkAllSubTag(tag.tag_name)"
              class="cursor-pointer"
            />
            <label :for="tag.tag_name + '-all'" class="cursor-pointer">すべて選択</label>
          </div> -->
          <div v-for="(sub_tag, idx) in tag.sub_tags" :key="sub_tag + idx.toString()">
            <label class="cursor-pointer flex gap-3">
              <input
                type="checkbox"
                switch
                v-model="sub_tag.checked"
                :name="sub_tag.tag_name"
                :value="sub_tag.tag_name"
                @change="toggleTag(sub_tag.tag_id)"
                class="cursor-pointer"
              />
              {{ sub_tag.tag_name }}
            </label>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>
