<template>
  <div class="required">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
  .required::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
</style>
