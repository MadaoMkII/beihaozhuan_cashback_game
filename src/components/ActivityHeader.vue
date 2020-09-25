<template>
  <div class="activity-header">
    <div class="activity-header__progress">
      <div class="activity-header__progress__label-container">
        <div v-for="(label, i) in progressLabelList" :key="i" class="activity-header__progress__label">{{ label.value / 10000 }}元</div>
      </div>
      <div class="activity-header__progress__progress-bar" :style="{ width: progress }"></div>
    </div>
    <div class="activity-header__cash">您本月共赚了：{{ data.getThisMonthIncoming.totalAmount / 10000 }}元</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentTotal() {
      return this.data.getThisMonthIncoming.totalAmount;
    },
    stepTotal() {
      let value = 0;
      for (let i = 0; i < this.data.gameEvent.length; i += 1) {
        value += this.data.gameEvent[i].stepSetting.expectEarning;
      }
      return value;
    },
    progressLabelList() {
      const list = [];
      for (let i = 0; i < this.data.gameEvent.length; i += 1) {
        let value = this.data.gameEvent[i].stepSetting.expectEarning;
        for (let j = 0; j < i; j += 1) {
          value += this.data.gameEvent[j].stepSetting.expectEarning;
        }
        list.push({
          value: this.data.gameEvent[i].stepSetting.expectEarning,
          left: `${((value / 10000) / (this.stepTotal / 10000)) * 100}%`,
          totalValue: value,
        });
      }
      return list;
    },
    progress() {
      if (this.data.gameEvent[5] && this.data.gameEvent[5].stepSetting.status === '已完成') {
        return '100%';
      }
      if (this.data.gameEvent[4] && this.data.gameEvent[4].stepSetting.status === '已完成') {
        return '80.2%';
      }
      if (this.data.gameEvent[3] && this.data.gameEvent[3].stepSetting.status === '已完成') {
        return '60.6%';
      }
      if (this.data.gameEvent[2] && this.data.gameEvent[2].stepSetting.status === '已完成') {
        return '40.6%';
      }
      if (this.data.gameEvent[1] && this.data.gameEvent[1].stepSetting.status === '已完成') {
        return '23%';
      }
      if (this.data.gameEvent[0] && this.data.gameEvent[0].stepSetting.status === '已完成') {
        return '5.6%';
      }
      return '0%';
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-header {
  position: relative;
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
    //border-radius: 8px;

    &__progress-bar {
      width: 0;
      height: 16px;
      background: linear-gradient(270deg, #F0DCB6 0%, #DDB67F 100%);
      //border-radius: 8px;
    }

    &__label-container {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 16px;
      display: flex;
      justify-content: space-between;
    }
    &__label {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 20px;
      opacity: .6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
      white-space: nowrap;
      transform: translateX(50%);

      &::after {
        margin-top: 6px;
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-image: url("~@/assets/tiny-arrow-down.png");
        background-size: 100% 100%;
      }
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
