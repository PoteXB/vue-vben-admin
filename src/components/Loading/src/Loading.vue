<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '', { 'z-index': zIndex }]"
    v-show="loading"
  >
    <Spin
      v-bind="$attrs"
      :class="{ 'card-box': type === 'card' }"
      :tip="tip"
      :size="size"
      :spinning="loading"
    />
  </section>
</template>
<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { SizeEnum } from '/@/enums/sizeEnum';

  export default defineComponent({
    name: 'Loading',
    components: { Spin },
    props: {
      tip: {
        type: String as PropType<string>,
        default: '',
      },
      size: {
        type: String as PropType<SizeEnum>,
        default: SizeEnum.LARGE,
        validator: (v: SizeEnum): boolean => {
          return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
        },
      },
      absolute: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      // loading类型 -- card: 卡片类型
      type: {
        type: String as PropType<'default' | 'card'>,
        default: 'default',
      },
      background: {
        type: String as PropType<string>,
      },
      theme: {
        type: String as PropType<'dark' | 'light'>,
      },
      zIndex: {
        type: Number,
      },
    },
  });
</script>
<style lang="less" scoped>
  .full-loading {
    display: flex;
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(240 242 245 / 60%);

    &.absolute {
      position: absolute;
      z-index: 300;
      top: 0;
      left: 0;
    }
  }
  .card-box {
    padding: 50px 70px;
    background-color: #fff;
    border-radius: 10px;
  }
  :deep(.ant-spin.ant-spin-show-text .ant-spin-text) {
    margin-top: 10px;
  }

  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: @modal-mask-bg;
    }
  }

  .full-loading.dark {
    background-color: @modal-mask-bg;
  }
</style>
