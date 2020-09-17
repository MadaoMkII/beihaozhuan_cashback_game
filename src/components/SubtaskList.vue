<template>
  <div class="subtask-list">
    <div class="subtask-list__showcase"><img src="https://via.placeholder.com/150" alt="logo"></div>
    <div class="subtask-list__body"><slot></slot></div>
  </div>
</template>

<style lang="scss" scoped>
.subtask-list {
  display: flex;
  &__showcase {
    flex-shrink: 0;
    padding-right: 16px;
    & > img {
      display: block;
      width: 186px;
      height: 96px;
      background: #D8D8D8;
      border-radius: 8px;
      box-sizing: border-box;
    }
  }
  &__body {
    flex: 1;
    display: flex;
  }

  &::v-deep {
    .subtask-list-item {
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
