<template>
  <div class="flex items-center h-[46px]">
    <template v-if="item">
      <div class="mr-[14px] h-[46px]">
        <Image
          :src="getPreview(item)"
          class="!w-[46px] !h-[46px] rounded-[23px]"
          fallback="/fallback.png"
          :preview="false"
        />
      </div>
      <div class="overflow-hidden flex-1 text-left whitespace-nowrap">
        <div class="text-ellipsis overflow-hidden">{{ item.label || '暂无名称' }}</div>
        <div class="text-ellipsis overflow-hidden" v-if="hasRemark">
          {{ item.remark || '暂无备注' }}
        </div>
      </div>
    </template>
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
    hasRemark: {
      type: Boolean,
      default: true,
    },
  });
</script>
<style lang="less" scoped></style>
