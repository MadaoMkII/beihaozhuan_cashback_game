<template>
  <div class="tabbar">
    <div class="tabbar__item tabbar__item--icon-1" @click="go('/index/')">首页</div>
    <div class="tabbar__item tabbar__item--icon-2">任务</div>
    <div class="tabbar__item tabbar__item--icon-3" @click="go('/index/shop')">商城</div>
    <div class="tabbar__item tabbar__item--icon-4" @click="go('/index/mine')">我的</div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  height: 100px;
  background-color: #15161D;
  position: fixed;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  left: 0;
  right: 0;
  display: flex;
  &__item {
    width: 25%;
    font-size: 20px;
    font-weight: 400;
    color: #889195;
    line-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &::before {
      content: '';
    }

    &--icon-1 {
      &::before {
        width: 48px;
        height: 48px;
        background-image: url("~@/assets/icon-1.png");
        background-size: 48px 48px;
      }
    }
    &--icon-2 {
      &::before {
        width: 48px;
        height: 48px;
        background-image: url("~@/assets/icon-2-active.png");
        background-size: 48px 48px;
      }
    }
    &--icon-3 {
      &::before {
        width: 48px;
        height: 48px;
        background-image: url("~@/assets/icon-3.png");
        background-size: 48px 48px;
      }
    }
    &--icon-4 {
      &::before {
        width: 48px;
        height: 48px;
        background-image: url("~@/assets/icon-4.png");
        background-size: 48px 48px;
      }
    }
  }
}
</style>

<script>
export default {
  methods: {
    go(path) {
      window.open(path, '_self');
    },
  },
};
</script>
