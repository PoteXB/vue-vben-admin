<template>
  <InputPassword
    v-bind="$attrs"
    allowClear
    v-model:value="innerValueRef"
    :readonly="readonly"
    @input="input"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </InputPassword>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Input } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    components: { InputPassword: Input.Password },
    props: {
      value: propTypes.string,
      isRegiste: propTypes.bool.def(false),
    },
    setup(props) {
      const [innerValueRef] = useRuleFormItem(props);
      const readonly = props.isRegiste ? ref(true) : ref(false);
      onMounted(() => setTimeout(() => props.isRegiste && (readonly.value = false), 1500));
      const input = () => {
        innerValueRef.value = `${innerValueRef.value}`.replace(/[\u4e00-\u9fa5/\s+/]/gi, '');
      };
      return {
        innerValueRef,
        readonly,
        input,
      };
    },
  });
</script>
<style lang="less" scoped></style>
