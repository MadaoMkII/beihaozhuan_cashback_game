<template>
  <div
    class="subtask-list-item"
    :class="{ 'subtask-list-item--disabled': disabled }"
  >
    <div class="subtask-list-item__title"><slot></slot></div>
    <div class="subtask-list-item__subtitle">
      <div class="subtask-list-item__subtitle__coin"></div>
      +{{ value }}元
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
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
.subtask-list-item {
  flex: 1;
  border-radius: 8px;
  //opacity: 0.3;
  border: 2px solid #9d9fa8;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #9d9fa8;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #d1d1d5;
    line-height: 32px;
    background-color: #565969;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 32px;

    &__coin {
      width: 40px;
      height: 40px;
      background-image: url("~@/assets/coin.png");
      background-size: 100% 100%;
    }
  }

  &--disabled {
    opacity: 0.5;
  }
}
</style>
