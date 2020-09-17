<template>
  <div
    class="link-button"
    :class="{ 'link-button--disabled': disabled }"
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
.link-button {
  user-select: none;
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #DDB67F;
  line-height: 40px;

  &--disabled {
    opacity: 0.5;
  }
}
</style>
