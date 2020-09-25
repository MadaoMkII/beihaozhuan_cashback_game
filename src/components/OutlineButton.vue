<template>
  <div
    class="outline-button"
    :class="{ 'outline-button--disabled': disabled }"
    @click="onClick"><slot></slot></div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick($event) {
      if (this.disabled) return;
      this.$emit('click', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
.outline-button {
  user-select: none;
  background-color: transparent;
  display: inline-flex;
  height: 48px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 24px;
  border: 2px solid #DDB67F;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #DDB67F;
  line-height: 1;
  box-sizing: border-box;
  padding: 0 24px;
  align-items: center;
  justify-content: center;

  &--disabled {
    opacity: 0.5;
  }
}
</style>
