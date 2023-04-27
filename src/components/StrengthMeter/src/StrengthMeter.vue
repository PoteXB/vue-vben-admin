<template>
  <div :class="prefixCls" class="relative">
    <Input
      v-if="showInput"
      v-bind="$attrs"
      allowClear
      v-model:value="innerValueRef"
      :readonly="readonly"
      :disabled="disabled"
      @input="input"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Input>
    <div :class="`${prefixCls}-bar`">
      <div :class="`${prefixCls}-bar--fill`" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { Input } from 'ant-design-vue';
  import { zxcvbn } from '@zxcvbn-ts/core';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'StrengthMeter',
    components: { Input },
    props: {
      value: propTypes.string,
      showInput: propTypes.bool.def(true),
      disabled: propTypes.bool,
    },
    emits: ['score-change'],
    setup(props, { emit }) {
      const [innerValueRef] = useRuleFormItem(props);
      const { prefixCls } = useDesign('strength-meter');
      const readonly = ref(true);
      onMounted(() => setTimeout(() => (readonly.value = false), 1500));

      const getPasswordStrength = computed(() => {
        const { disabled } = props;
        if (disabled) return -1;
        const innerValue = unref(innerValueRef);
        const score = innerValue ? zxcvbn(unref(innerValueRef) as string).score : -1;
        emit('score-change', score);
        return score;
      });

      const input = () => {
        innerValueRef.value = `${innerValueRef.value}`.replace(/[\u4e00-\u9fa5/\s+/]/gi, '');
      };

      return {
        getPasswordStrength,
        prefixCls,
        innerValueRef,
        readonly,
        input,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-strength-meter';

  .@{prefix-cls} {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      border-radius: 6px;
      background-color: @disabled-color;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        z-index: 10;
        width: 20%;
        height: inherit;
        border-width: 0 5px;
        border-style: solid;
        border-color: @white;
        background-color: transparent;
      }

      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }

      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        transition: width 0.5s ease-in-out, background 0.25s;
        border-radius: inherit;
        background-color: transparent;

        &[data-score='0'] {
          width: 20%;
          background-color: darken(@error-color, 10%);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: @error-color;
        }

        &[data-score='2'] {
          width: 60%;
          background-color: @warning-color;
        }

        &[data-score='3'] {
          width: 80%;
          background-color: fade(@success-color, 50%);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: @success-color;
        }
      }
    }
  }
</style>
