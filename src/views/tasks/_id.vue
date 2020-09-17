<template>
  <div class="task">
    <div class="task-sticky-top">
      <div class="task__navbar">
        <div class="task__navbar__back" @click="$router.back()">
          <font-awesome-icon icon="chevron-left" />
        </div>
        贝好赚 - 荒野乱斗试玩
      </div>
    </div>
    <div class="task__header"><img src="https://via.placeholder.com/150" alt="logo"></div>
    <div class="task__body">
      <div class="task__body__title">任务流程</div>
      <div class="card">
        <div class="card__title">游戏下载</div>
        <div class="card__description">点击下载按钮，安装游戏“荒野乱斗”，登录并进行试玩；</div>
        <div class="card__opt">
          <big-gradient-button>下载“荒野求生”</big-gradient-button>
        </div>
      </div>
      <div class="card">
        <div class="card__title">上传试玩截图</div>
        <div class="card__description">参照截图示例上传您试玩的截图，贝好赚将会第一时间进行审核，审核通过后即可获得相应奖励；</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img src="https://via.placeholder.com/150" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload v-model="test"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <big-gradient-button>提交审核</big-gradient-button>
        </div>
      </div>
      <div class="card">
        <div class="card__title">后续奖励任务A</div>
        <div class="card__description">参照截图示例上传您试玩的截图，贝好赚将会第一时间进行审核，审核通过后即可获得相应奖励；</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img src="https://via.placeholder.com/150" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload v-model="test"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <big-gradient-button>提交审核</big-gradient-button>
        </div>
      </div>
      <div class="card">
        <div class="card__title">后续奖励任务B</div>
        <div class="card__description">参照截图示例上传您试玩的截图，贝好赚将会第一时间进行审核，审核通过后即可获得相应奖励；</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img src="https://via.placeholder.com/150" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload v-model="test"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <big-gradient-button>提交审核</big-gradient-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigGradientButton from '@/components/BigGradientButton.vue';
import ScreenshotUpload from '@/components/ScreenshotUpload.vue';

export default {
  components: {
    BigGradientButton,
    ScreenshotUpload,
  },
  data() {
    return {
      test: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.task-sticky-top {
  position: sticky;
  top: 0;
  z-index: 100;
}
.task {
  min-height: 100vh;
  background-color: #313340;
  &__navbar {
    padding: 20px 24px;
    font-size: 34px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 48px;
    background-color: #313340;
    text-align: center;
    position: relative;

    &__back {
      padding: 20px 24px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      color: #fff;
      display: flex;
      align-items: center;
    }
  }
  &__header {
    height: 386px;
    background-size: 100% 100%;

    & > img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &__body {
    padding: 24px;
    &__title {
      display: flex;
      align-items: center;
      height: 56px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      padding-bottom: 24px;
    }
  }
}

.card {
  padding: 24px;
  background-color: #282A37;
  border-radius: 8px;
  margin-bottom: 16px;

  &__title {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 48px;
  }
  &__description {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 40px;
    opacity: 0.6;
    padding-bottom: 24px;
  }
  &__opt {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.screenshot-upload {
  display: flex;
  padding-bottom: 24px;
  &__item {
    flex: 1;
    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 48px;
      padding-bottom: 8px;
    }
    &__screenshot {
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        display: block;
        width: 272px;
        height: 144px;
        border-radius: 8px;
        background-color: #ccc;
      }

      &__upload {
        width: 272px;
        height: 144px;
      }
    }
  }
}
</style>
