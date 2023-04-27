<template>
  <div class="main flex items-center" :class="{ active: item.value === value }">
    <div class="flex items-center mr-[30px]">
      <Image
        :src="getPreview(item)"
        class="!w-[24px] !h-[24px] rounded-[48px] mr-[6px]"
        fallback="/fallback.png"
        :preview="false"
      />
      <div>{{ item.label || '暂无名称' }}</div>
      <div class="ml-[10px]">(</div>
      <div
        class="flex-1 max-w-[100px] whitespace-nowrap overflow-hidden overflow-ellipsis"
        :title="item.remark"
      >
        {{ item.remark || '暂无备注' }}
      </div>
      <div>)</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getPreview } from '/@/utils/helper/assetHelper';
  import { Image } from 'ant-design-vue';
  defineProps({
    item: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
    },
  });
</script>
<style lang="less" scoped></style>
