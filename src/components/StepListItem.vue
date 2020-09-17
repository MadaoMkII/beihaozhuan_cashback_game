<template>
  <div
    class="step-list-item"
    :class="{ 'step-list-item--disabled': disabled }"
  >
    <div :class="`step-list-item__order step-list-item__order--${order}`"/>
    <div class="step-list-item__chat">
      <div
        class="step-list-item__chat__a"
        :class="{ 'step-list-item__chat__a--has-extend': $slots.extend }"
      >
        <div class="step-list-item__chat__a__l"><slot name="content"></slot></div>
        <div class="step-list-item__chat__a__r"><slot name="opt"></slot></div>
      </div>
      <div v-if="$slots.extend" class="step-list-item__chat__b"><slot name="extend"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.step-list-item {
  display: flex;
  &__order {
    flex-shrink: 0;
    height: 120px;
    display: flex;
    align-items: center;
    margin-right: 8px;
    &::after {
      display: block;
      content: '';
      width: 48px;
      height: 48px;
    }
    &--1::after {
      background-image: url("~@/assets/1.png");
      background-size: 100% 100%;
    }
    &--2::after {
      background-image: url("~@/assets/2.png");
      background-size: 100% 100%;
    }
    &--3::after {
      background-image: url("~@/assets/3.png");
      background-size: 100% 100%;
    }
    &--4::after {
      background-image: url("~@/assets/4.png");
      background-size: 100% 100%;
    }
    &--5::after {
      background-image: url("~@/assets/5.png");
      background-size: 100% 100%;
    }
    &--6::after {
      background-image: url("~@/assets/6.png");
      background-size: 100% 100%;
    }
  }
  &__chat {
    flex: 1;
    border-radius: 8px;
    margin-left: 8px;
    &__a {
      position: relative;
      height: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #565969;
      border-radius: 8px;
      &::after {
        position: absolute;
        left: -8px;
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 8px 8px 8px 0;
        border-color: transparent #565969 transparent transparent;
      }
      &__l {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 48px;
        margin-left: 24px;
      }
      &__r {
        margin-right: 24px;
      }

      &--has-extend {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &__b {
      background-color: #282A37;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  &--disabled {
    opacity: 0.5;
  }
}
</style>
