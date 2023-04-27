<template>
  <div class="explain" :class="{ show }">
    <div class="error">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { watch, ref } from 'vue';
  const props = defineProps({
    value: { type: [Number, Array, Boolean, String] },
  });
  const show = ref(false);
  const setShow = (val) => {
    show.value = val;
  };
  watch(
    () => props.value,
    (val) => {
      show.value = !!val;
    },
  );
  defineExpose({
    setShow,
  });
</script>
<style scoped lang="less">
  .explain {
    height: 0;
    min-height: 0;
    opacity: 0;
    color: @error-color;
    font-size: 14px;
    display: none;
  }
  .explain.show {
    display: block;
    height: auto;
    min-height: 24px;
    opacity: 1;
    transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
</style>
