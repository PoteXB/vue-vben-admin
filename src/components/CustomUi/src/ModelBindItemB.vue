<template>
  <div class="main text-center whitespace-nowrap">
    <div
      class="flex items-center mx-[-8px] py-[11px] px-[20px]"
      style="border-bottom: 1px solid #efefef"
    >
      <Image
        :src="getPreview(item)"
        class="!w-[40px] !h-[40px] rounded-[20px] mr-[10px]"
        fallback="/fallback.png"
        :preview="false"
      />
      <div class="overflow-hidden flex-1 text-left whitespace-nowrap leading-[22px]">
        <div class="text-ellipsis overflow-hidden">{{ item.label || '暂无名称' }}</div>
        <div class="text-ellipsis overflow-hidden">{{ item.remark || '暂无备注' }}</div>
      </div>
    </div>
    <div
      v-if="soundMap"
      class="mx-[-8px] py-[11px] min-h-[97px]"
      style="border-bottom: 1px solid #efefef"
    >
      <template v-for="i in sounds">
        <div
          class="leading-[20px] h-[22px] flex items-center px-[20px]"
          :key="i.id"
          v-if="soundMap[i.id]"
        >
          <img :src="play" alt="" @click.prevent="preview(soundMap[i.id])" class="mr-[4px]" />
          <span>
            <span>音色:</span>
            <span>{{ soundMap[i.id].name }}</span>
          </span>
        </div>
      </template>
      <div
        @click.prevent="opened = !opened"
        v-if="isMoreTwo"
        class="mt-[8px] flex items-center pl-[38px]"
      >
        <div class="text-[rgba(0,0,0,0.5)]">{{ opened ? '收起' : '展开' }}</div>
        <img
          :src="down"
          alt=""
          :style="{ transform: opened ? 'rotate(180deg)' : 'rotate(0deg)' }"
        />
      </div>
    </div>
    <div class="leading-[40px] selectText">
      {{ value?.includes(item.value) ? '取消选择' : '选择' }}
    </div>
  </div>
</template>
<script lang="ts">
  const audio = new Audio();
</script>
<script lang="ts" setup>
  import play from './img/play.png';
  import down from './img/down.png';
  import { Image } from 'ant-design-vue';
  import { getSynthesis } from '/@/api/virtual/sound';
  import { getPreview } from '/@/utils/helper/assetHelper';

  const props = defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
    soundMap: {
      type: Object,
    },
    text: {
      type: String,
    },
    value: {
      type: Array,
    },
  });
  const opened = ref(false);
  const isMoreTwo = computed(() => {
    return props?.item?.sounds?.length > 2;
  });
  const sounds = computed(() => {
    const list = props?.item?.sounds || [];
    return opened.value ? list : list.slice(0, 2);
  });
  const preview = async (item) => {
    const { tts } = item;
    const result = await getSynthesis({
      ...tts,
      text: props.text || '你好，有什么可以帮您？',
    });
    audio.src = `data:audio/mpeg;base64,${result}`;
    await audio.play();
  };
</script>
<style lang="less" scoped>
  .selectText {
    color: @primary-color;
  }
</style>
