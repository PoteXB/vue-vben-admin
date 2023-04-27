<template>
  <ApiSelect :dropdownMatchSelectWidth="false" v-bind="$attrs" ref="childRef" :open="opened">
    <template #dropdownRender>
      <ClickOutSide @mousedown.prevent @click-outside="handleClickOutsideBox">
        <div class="p-[20px] border-[1px] border-solid border-[#e4e4e4]">
          <ClickOutSide @click-outside="handleClickOutside">
            <a-input
              v-model:value="search"
              @click="inputClick"
              @keydown.stop
              placeholder="搜索问答"
            />
          </ClickOutSide>
        </div>
        <div class="p-[20px] cursor-default">
          <Checkbox
            v-if="!search"
            v-model:checked="checked"
            :indeterminate="indeterminate"
            @change="onCheckAllChange"
            >全选</Checkbox
          >
          <div v-else-if="search && getOptionsBySearch.length">搜索结果</div>
          <div v-else class="text-center">暂未搜到相关问答</div>
          <div>
            <Tag
              class="!mt-[12px] cursor-pointer"
              v-for="item in getOptionsBySearch"
              :key="item.value"
              @click="tagClick(item)"
              :color="!!valueMap[item.value] ? 'blue' : ''"
            >
              {{ item.label }}
            </Tag>
          </div>
        </div>
      </ClickOutSide>
    </template>
  </ApiSelect>
</template>
<script lang="ts" setup>
  import { ref, computed, watch, Ref } from 'vue';
  import { Checkbox, Tag } from 'ant-design-vue';
  import ApiSelect from './ApiSelect.vue';
  import { isArray } from '/@/utils/is';
  import { ClickOutSide } from '/@/components/ClickOutSide';
  const childRef = ref<InstanceType<typeof ApiSelect>>();
  const valueMap = ref({});
  const checked = ref(false);
  const opened: Ref<undefined | boolean> = ref(undefined);
  const indeterminate = ref(false);
  const search = ref('');
  const getOptions = computed(() => {
    return childRef.value?.getOptions;
  });
  const getOptionsBySearch = computed(() => {
    return (getOptions.value || []).filter((item) => {
      return (item?.label ?? '').toLowerCase().includes(search.value.toLowerCase());
    });
  });
  const state = computed(() => {
    return childRef.value?.state;
  });
  const inputDom = {
    dom: null,
    focus: false,
  };
  const tagClick = (item) => {
    if (!childRef.value) {
      return;
    }
    const state = childRef.value.state;
    const { value } = item;
    if (isArray(state)) {
      if (valueMap.value[value]) {
        childRef.value.state =
          state.filter((v) => {
            return v !== value;
          }) || [];
      } else {
        childRef.value.state = [...state, value];
      }
    }
  };
  const onCheckAllChange = (e) => {
    if (!childRef.value) {
      return;
    }
    const getOptions = childRef.value.getOptions;
    if (e.target.checked) {
      childRef.value.state = getOptions.map((v) => {
        return v.value;
      });
    } else {
      childRef.value.state = [];
    }
  };
  const inputClick = (e) => {
    inputDom.dom = e.target;
    inputDom.focus = true;
    e.target.focus();
    opened.value = true;
  };
  const handleClickOutside = () => {
    if (inputDom.focus) {
      inputDom.dom.blur();
      inputDom.focus = false;
    }
  };
  const handleClickOutsideBox = () => {
    if (opened.value) {
      opened.value = false;
      setTimeout(() => {
        opened.value = undefined;
        search.value = '';
      }, 100);
    }
  };
  watch(
    [getOptions, state],
    () => {
      if (isArray(state.value) && getOptions.value) {
        valueMap.value = state.value.reduce((obj, v) => {
          obj[v] = true;
          return obj;
        }, {});
        checked.value = state.value.length === getOptions.value.length;
        indeterminate.value = !!state.value.length && state.value.length < getOptions.value.length;
      }
    },
    {
      deep: true,
    },
  );
</script>
