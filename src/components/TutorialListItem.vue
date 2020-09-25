<template>
  <div class="tutorial-list-item">
    <div class="tutorial-list-item__left">
      <div class="tutorial-list-item__left__title">
        <slot v-if="$slots.title" name="title"></slot>
      </div>
      <div class="tutorial-list-item__left__subtitle">
        <div class="tutorial-list-item__left__subtitle__coin"/>
        +{{ value }}元
      </div>
    </div>
    <div class="tutorial-list-item__right"><slot v-if="$slots.opt" name="opt"></slot></div>
  </div>
</template>

<style lang="scss" scoped>
.tutorial-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__left {
    &__title {
      display: flex;
      align-items: center;
      height: 48px;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
    }
    &__subtitle {
      display: flex;
      align-items: center;
      height: 48px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      line-height: 40px;

      &__coin {
        width: 40px;
        height: 40px;
        background-image: url("~@/assets/coin.png");
        background-size: 100% 100%;
      }
    }
  }
  &__right {}
}
</style>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
