<template>
  <div
    class="vy-checkbox-group"
    role="group"
    aria-label="checkbox-group"
    :class="objClass"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "vyCheckboxGroup",
  componentName: "vyCheckboxGroup",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    mode: {
      type: String,
      default: "horizontal",
      description: "horizontal / vertical",
    },
  },
  data() {
    return {
      objClass: {
        "vy-horizontal-checkbox": this.mode === "horizontal",
      },
    };
  },
  methods: {},
};
</script>
<style scoped>
.vy-horizontal-checkbox {
  display: flex;
  flex-direction: row;
}
</style>