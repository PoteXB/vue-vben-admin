<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <RadioGroup
    v-bind="attrs"
    v-model:value="state"
    button-style="solid"
    :class="{ hideRadio: hideRadio }"
  >
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton
        v-if="props.isBtn"
        :value="item.value"
        :disabled="item.disabled"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </RadioButton>
      <Radio v-else :value="item.value" :disabled="item.disabled" @click="handleClick(item)">
        <VNode :content="labelRender(item, state)" v-if="labelRender" />
        <template v-else>{{ item.label }}</template>
      </Radio>
    </template>
  </RadioGroup>
</template>
<script lang="ts">
  import { defineComponent, type PropType, ref, watchEffect, computed, unref, watch } from 'vue';
  import { Radio } from 'ant-design-vue';
  import VNode from './VNode.vue';
  import { isFunction } from '/@/utils/is';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import useFetchByPage from '/@/hooks/custom/useFetchByPage';
  import { useAttrs } from '@vben/hooks';
  import { propTypes } from '/@/utils/propTypes';
  import { BasicFetchResult } from '/@/api/model/baseModel';
  import { omit } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };

  export default defineComponent({
    name: 'ApiRadioGroup',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
      Radio,
      VNode,
    },
    props: {
      api: {
        type: Function as PropType<
          (arg?: any) => Promise<OptionsItem[]> | Promise<BasicFetchResult<OptionsItem>>
        >,
        default: null,
      },
      params: {
        type: [Object, String] as PropType<any | string>,
        default: () => ({}),
      },
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      isBtn: {
        type: [Boolean] as PropType<boolean>,
        default: false,
      },
      hideRadio: {
        type: [Boolean] as PropType<boolean>,
        default: false,
      },
      labelRender: {
        type: Function,
      },
      numberToString: propTypes.bool,
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
      immediate: propTypes.bool.def(true),
      autoValue: propTypes.bool.def(false),
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const { options, loading, fetchByPage } = useFetchByPage<OptionsItem>({
        ...props,
      });
      const isFirstLoad = ref(true);
      const emitData = ref<any[]>([]);
      const attrs = useAttrs();
      const { t } = useI18n();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      // Processing options value
      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(options).reduce((prev, next: any) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              label: next[labelField],
              value: numberToString ? `${value}` : value,
              ...omit(next, [labelField, valueField]),
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      watchEffect(() => {
        props.immediate && fetch();
      });

      watch(
        () => props.params,
        () => {
          !unref(isFirstLoad) && fetch();
        },
        { deep: true },
      );

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;
        await fetchByPage(props.params);
        emitChange();
        autoSetValue();
      }

      function emitChange() {
        emit('options-change', unref(getOptions));
      }

      function autoSetValue() {
        if (!props.autoValue) {
          return;
        }
        const first = unref(getOptions)[0];
        if (first) {
          state.value = first['value'];
        }
      }

      function handleClick(...args) {
        emitData.value = args;
      }

      return { state, getOptions, attrs, loading, t, handleClick, props };
    },
  });
</script>
<style lang="less" scoped>
  @import '/@/components/CustomUi/src/ModelBindItem.less';
  .hideRadio ::v-deep(.ant-radio) {
    display: none;
  }
  .hideRadio ::v-deep(span.ant-radio + *) {
    padding: 0;
  }
</style>
