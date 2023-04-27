<template>
  <div class="main flex items-center pl-[6px]" :class="{ active: item.value === value }">
    <div class="flex items-center mr-[30px]">
      <Image
        :src="getPreview(item)"
        class="!w-[24px] !h-[24px] rounded-[48px] mr-[6px]"
        fallback="/fallback.png"
        :preview="false"
      />
      <div>{{ item.label }}</div>
    </div>
    <a-button type="link" @click="preview" style="padding-right: 0">预览</a-button>
  </div>
</template>
<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import { getPreview } from '/@/utils/helper/assetHelper';

  defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
    },
  });
  const preview = () => {
    console.log('点击预览');
  };
</script>
<style lang="less" scoped></style>
