<template>
  <div v-if="show" class="video-floating-layer">
    <div class="video-floating-layer__video" v-html="src"></div>
    <div v-if="showClose" class="video-floating-layer__close" @click="onClose">
      <font-awesome-icon :icon="['far', 'times-circle']" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.showClose = false;
        setTimeout(() => {
          this.showClose = true;
        }, 20 * 1000);
      }
    },
  },
  data() {
    return {
      showClose: false,
    };
  },
  methods: {
    onClose() {
      this.$emit('update:show', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.video-floating-layer {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  &__video {
    width: 100%;
    height: 100%;
    //position: relative;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    & > iframe {
      width: 100%;
      height: 100%;
    }

    //&::before {
    //  content: '';
    //  display: block;
    //  width: 1px;
    //  margin-left: -1px;
    //  height: 0;
    //}
  }

  //&__video {
  //  aspect-ratio: 1 / 1;
  //}

  &__close {
    position: absolute;
    font-size: 50px;
    top: 0;
    right: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
}
</style>
