<template>
  <div v-if="show" class="video-floating-layer">
    <video controls>
      <source :src="src" type="video/mp4">
    </video>
    <div class="video-floating-layer__close" @click="onClose">
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
  methods: {
    onClose() {
      this.$emit('update:show', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
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
  & > video {
    width: 100%;
  }

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
