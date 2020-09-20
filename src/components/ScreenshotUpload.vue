<template>
  <div
    class="screenshot-upload-component"
    :class="{ 'screenshot-upload-component--disabled': disabled }"
  >
    <div v-if="!showcase" class="screenshot-upload-component__placeholder">
      <font-awesome-icon icon="plus" />
    </div>
    <img v-if="showcase" class="screenshot-upload-component__showcase" :src="showcase" alt="上传截图">
    <input
      v-if="!disabled"
      ref="input"
      class="screenshot-upload-component__input"
      type="file"
      accept="image/*"
      @change="onChange"
    >
    <div v-if="(showcase && !isUploading) && !disabled" class="screenshot-upload-component__clear" @click="clear">
      <font-awesome-icon :icon="['far', 'times-circle']" />
    </div>
    <div v-if="isUploading" class="screenshot-upload-component__uploading">
      <font-awesome-icon icon="spinner" spin />
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

  &__uploading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
  &--disabled {
  }
}
</style>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isUploading: false,
      showcase: null,
    };
  },
  created() {
    if (this.value !== '') {
      this.showcase = this.value;
    }
  },
  methods: {
    readAsDataURL(input) {
      const file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.showcase = e.target.result;
        this.$emit('change', '');
        this.upload(file);
      };
      fileReader.readAsDataURL(file);
    },
    async upload(file) {
      if (this.isUploading) return;
      try {
        this.isUploading = true;
        const formData = new FormData();
        formData.append('files[]', file);
        const response = await this.$axios.post('/api/images/uploadImages', formData);
        this.$emit('change', response.data.data);
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert('请求失败，服务器发生错误');
        }
        this.clear();
      } finally {
        this.isUploading = false;
      }
    },
    onChange(e) {
      const file = e.target.files[0];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 2MB!');
        return;
      }
      this.readAsDataURL(e.target);
    },
    clear() {
      this.$refs.input.value = '';
      this.showcase = null;
      this.$emit('change', '');
    },
  },
};
</script>
