<template>
  <div class="screenshot-upload-component">
    <div v-if="!showcase" class="screenshot-upload-component__placeholder">
      <font-awesome-icon icon="plus" />
    </div>
    <img v-if="showcase" class="screenshot-upload-component__showcase" :src="showcase" alt="上传截图">
    <input
      ref="input"
      class="screenshot-upload-component__input"
      type="file"
      accept="image/*"
      @change="onChange"
    >
    <div v-if="showcase" class="screenshot-upload-component__clear" @click="clear">
      <font-awesome-icon :icon="['far', 'times-circle']" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screenshot-upload-component {
  width: 100%;
  height: 100%;
  position: relative;

  &__input {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  &__showcase {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    display: block;
  }

  &__placeholder {
    border-radius: 8px;
    border: 2px dashed #ccc;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    font-size: 48px;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 40px;
    transform: translateY(-50%) translateX(50%);
    color: #fff;
  }
}
</style>

<script>
export default {
  props: {
    value: {
      type: [File, Boolean],
      required: true,
    },
  },
  data() {
    return {
      showcase: null,
    };
  },
  methods: {
    readAsDataURL(input) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.showcase = e.target.result;
        this.$emit('input', input.files[0]);
      };
      fileReader.readAsDataURL(input.files[0]);
    },
    onChange(e) {
      this.readAsDataURL(e.target);
    },
    clear() {
      this.$refs.input.value = '';
      this.showcase = null;
      this.$emit('input', false);
    },
  },
};
</script>
