<template>
  <div class="tutorial-list"><slot></slot></div>
</template>

<style lang="scss" scoped>
.tutorial-list {
  padding: 30px 24px 24px;

  &::v-deep {
    .tutorial-list-item {
      padding-bottom: 48px;

      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
}
</style>
