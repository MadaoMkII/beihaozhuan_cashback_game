<template>
  <div class="step-list"><slot></slot></div>
</template>

<style lang="scss" scoped>
.step-list {
  padding-top: 30px;
  padding-bottom: 16px;
}
.step-list::v-deep .step-list-item {
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
}
</style>
