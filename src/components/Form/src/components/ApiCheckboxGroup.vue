<template>
  <div v-if="getOptions.length">
    <div class="h-[32px] flex items-center mb-[10px]" v-if="getOptions.length">
      <Checkbox
        v-model:checked="checkAll"
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
      >
        全选
      </Checkbox>
    </div>
    <CheckboxGroup v-bind="$attrs" v-model:value="state">
      <Checkbox
        v-for="item in getOptions"
        :key="item.value"
        :value="item.value"
        class="ant-checkbox-group-item"
      >
        <VNode :content="labelRender(item, state)" v-if="labelRender" />
        <template v-else>
          {{ item.label }}
        </template>
      </Checkbox>
    </CheckboxGroup>
  </div>
  <span v-else>{{ emptyText }}</span>
</template>
<script lang="ts" setup>
  import { computed, unref, PropType, ref, watch, watchEffect } from 'vue';
  import { CheckboxGroup, Checkbox, Form } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import VNode from './VNode.vue';
  import useFetchByPage from '/@/hooks/custom/useFetchByPage';
  import { propTypes } from '/@/utils/propTypes';
  import { omit } from 'lodash-es';
  import { BasicFetchResult } from '/@/api/model/baseModel';
  import { isFunction } from '/@/utils/is';
  interface OptionsItem {
    label: string;
    value: string;
    disabled?: boolean;
  }
  const props = defineProps({
    value: {
      type: Array,
    },
    api: {
      type: Function as PropType<
        (arg?: Recordable) => Promise<OptionsItem[]> | Promise<BasicFetchResult<Recordable>>
      >,
      default: null,
    },
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    labelRender: {
      type: Function,
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    resultField: propTypes.string.def(''),
    totalField: propTypes.string.def(''),
    sizeField: propTypes.string.def(''),
    immediate: propTypes.bool.def(true),
    autoValue: propTypes.bool.def(false),
    emptyText: propTypes.string.def('数据为空'),
  });
  Form.useInjectFormItemContext();
  const { options, fetchByPage } = useFetchByPage<OptionsItem>({
    ...props,
  });
  const checkAll = ref(false);
  const indeterminate = ref(false);
  const getOptions = computed(() => {
    const { labelField, valueField } = props;
    return unref(options).reduce((prev, next: Recordable) => {
      if (next) {
        prev.push({
          ...omit(next, [labelField, valueField]),
          label: next[labelField],
          value: next[valueField],
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  });
  const [state] = useRuleFormItem(props, 'value', 'checkChange');
  const changeCheckAll = () => {
    if (state.value) {
      indeterminate.value = !!state.value.length && state.value.length < getOptions.value.length;
      checkAll.value = state.value.length === getOptions.value.length;
    }
  };
  watchEffect(() => {
    props.immediate && fetch();
  });
  watch(
    () => state.value,
    () => {
      changeCheckAll();
    },
  );
  watch(
    () => options.value,
    () => {
      changeCheckAll();
    },
  );
  const onCheckAllChange = (e) => {
    indeterminate.value = false;
    state.value = e.target.checked
      ? getOptions.value.map((v) => {
          return v.value;
        })
      : [];
  };
  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) {
      if (props.options) {
        options.value = props.options;
      }
      return;
    }
    await fetchByPage(props.params);
    autoSetValue();
  }
  function autoSetValue() {
    if (!props.autoValue) {
      return;
    }
    const first = unref(getOptions).map((v) => {
      return v.value;
    });
    if (first) {
      state.value = first;
    }
  }
</script>
<style lang="less" scoped>
  @import '/@/components/CustomUi/src/ModelBindItem.less';
  @import '/@/components/CustomUi/src/ModelBindItemB.less';
  @import '/@/components/CustomUi/src/ModelBindItemC.less';
</style>
