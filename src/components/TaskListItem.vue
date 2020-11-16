<template>
  <div class="task-list-item">
    <div class="task-list-item__header">
      <div class="task-list-item__header__l"><slot v-if="$slots.title" name="title"></slot></div>
      <div class="task-list-item__header__r"><slot v-if="$slots.opt" name="opt"></slot></div>
    </div>
    <div class="task-list-item__body"><slot></slot></div>
  </div>
</template>

<style lang="scss" scoped>
.task-list-item {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    &__l {
      display: flex;
      align-items: center;
      //height: 48px;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      //margin-right: 15px;
    }
    &__r {
      flex-shrink: 0;
    }
  }
}
</style>
