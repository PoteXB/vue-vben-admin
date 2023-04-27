<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'VNode',
    props: {
      content: {
        type: Object,
      },
    },
    render() {
      return this.content;
    },
  });
</script>
