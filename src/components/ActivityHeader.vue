<template>
  <div class="activity-header">
    <div class="activity-header__progress">
      <div class="activity-header__progress__progress-bar" :style="{ width: `${((value / 10000) / 500) * 100}%` }"></div>
    </div>
    <div class="activity-header__cash">您本月共赚了：{{ value / 10000 }}元</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-header {
  position: relative;
  width: 750px;
  height: 512px;
  background-image: url("~@/assets/activity-header-bg.png");
  background-size: 100% 100%;

  &__progress {
    position: absolute;
    top: 366px;
    left: 94px;
    width: 568px;
    height: 16px;
    background: #737682;
    border-radius: 8px;

    &__progress-bar {
      width: 0;
      height: 16px;
      background: linear-gradient(270deg, #F0DCB6 0%, #DDB67F 100%);
      border-radius: 8px;
    }
  }

  &__cash {
    position: absolute;
    top: 390px;
    left: 234px;
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 48px;
  }
}
</style>
