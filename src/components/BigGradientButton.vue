<template>
  <div
    class="big-gradient-button"
    :class="{ 'big-gradient-button--disabled': disabled }"
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
.big-gradient-button {
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 426px;
  height: 80px;
  background: linear-gradient(270deg, #F0DCB6 0%, #DDB67F 100%);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 48px;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 40px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;

  &--disabled {
    opacity: 0.5;
  }
}
</style>
