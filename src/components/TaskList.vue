<template>
  <div class="task-list">
    <div class="task-list__header">
      <div class="task-list__header__l">任务墙</div>
      <div class="task-list__header__r"><slot v-if="$slots.opt" name="opt"></slot></div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.task-list {
  padding: 24px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24px;
    &__l {
      display: flex;
      align-items: center;
      height: 48px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 40px;
    }
    &__r {}
  }

  &::v-deep {
    .task-list-item {
      padding-bottom: 48px;

      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
}
</style>
