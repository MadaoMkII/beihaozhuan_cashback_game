<template>
  <div class="income">
    <div class="income__text">预期收益</div>
    <div class="income__value">{{ value }}<div class="income__value__unit">元</div></div>
  </div>
</template>

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

<style lang="scss" scoped>
.income {
  &__text {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 34px;
    text-align: right;
  }
  &__value {
    height: 72px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 56px;
    font-family: serif;
    font-weight: bold;
    color: #DDB67F;
    line-height: 1;

    &__unit {
      margin-left: 4px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #DDB67F;
      line-height: 1;
    }
  }
}
</style>
