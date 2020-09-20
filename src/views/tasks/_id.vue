<template>
  <div v-if="task" class="task">
    <div class="task-sticky-top">
      <div class="task__navbar">
        <div class="task__navbar__back" @click="$router.back()">
          <font-awesome-icon icon="chevron-left" />
        </div>
        贝好赚 - {{ task.gameName }}
      </div>
    </div>
    <div class="task__header"><img :src="task.gameBannerUrl" :alt="task.gameName"></div>
    <div class="task__body">
      <div class="task__body__title">任务流程</div>
      <div class="card">
        <div class="card__title">游戏下载</div>
        <div class="card__description">点击下载按钮，安装游戏“{{ task.gameName }}”，登录并进行试玩；</div>
        <div class="card__opt">
          <big-gradient-button @click="download(task.downloadUrl)">下载“{{ task.gameName }}”</big-gradient-button>
        </div>
      </div>
      <div class="card">
        <div class="card__title">上传试玩截图</div>
        <div class="card__description">{{ task.demoDescription }}</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img :src="task.demoSketchUrl" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload
                  :disabled="task.status_mission_try === '未审核' || task.status_mission_try === '审核通过'"
                  v-model="screenshot"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <template v-if="task.status_mission_try === '未提交'">
            <big-gradient-button @click="submit('try', screenshot)">提交审核</big-gradient-button>
          </template>
          <template v-else-if="task.status_mission_try === '未审核'">
            <big-gradient-button disabled>审核中</big-gradient-button>
          </template>
          <template v-else-if="task.status_mission_try === '审核未通过'">
            <big-gradient-button @click="submit('try', screenshot)">审核未通过，请重新上传</big-gradient-button>
          </template>
          <template v-else-if="task.status_mission_try === '审核通过'">
            <big-gradient-button disabled>审核通过，奖励已发放</big-gradient-button>
          </template>
        </div>
      </div>
      <div v-if="task.subsequent_A && task.subsequent_A.available" class="card">
        <div class="card__title">后续奖励任务A</div>
        <div class="card__description">{{ task.subsequent_A.subsequentDescription }}</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img :src="task.subsequent_A.subsequentSketchUrl" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload v-model="screenshotA"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <big-gradient-button @click="submit('A', screenshotA)">提交审核</big-gradient-button>
        </div>
      </div>
      <div v-if="task.subsequent_B && task.subsequent_B.available" class="card">
        <div class="card__title">后续奖励任务B</div>
        <div class="card__description">{{ task.subsequent_B.subsequentDescription }}</div>
        <div class="screenshot-upload">
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">示例图</div>
            <div class="screenshot-upload__item__screenshot"><img :src="task.subsequent_B.subsequentSketchUrl" alt="示例图"></div>
          </div>
          <div class="screenshot-upload__item">
            <div class="screenshot-upload__item__title">我的截图</div>
            <div class="screenshot-upload__item__screenshot">
              <div class="screenshot-upload__item__screenshot__upload">
                <screenshot-upload v-model="screenshotB"/>
              </div>
            </div>
          </div>
        </div>
        <div class="card__opt">
          <big-gradient-button @click="submit('B', screenshotB)">提交审核</big-gradient-button>
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
      isLoading: false,
      task: null,
      screenshot: '',
      screenshotA: '',
      screenshotB: '',
    };
  },
  async created() {
    await this.update();
  },
  methods: {
    async update() {
      this.task = await this.getGame();
      switch (this.task.status_mission_try) {
        case '未提交':
          this.screenshot = '';
          break;
        case '未审核':
          this.screenshot = this.task.screenshotUrl_mission_try;
          break;
        case '审核未通过':
          break;
        case '审核通过':
          this.screenshot = this.task.screenshotUrl_mission_try;
          break;
        default:
          break;
      }
    },
    async getGame() {
      const response = await this.$axios.post('/api/gameEvent/getGameProcessByUUid', { uuid: this.$route.params.id, category: this.$route.query.stepText });
      return response.data.data;
    },
    download(url) {
      window.open(url);
    },
    async submit(type, screenshotURL) {
      if (screenshotURL === '') {
        alert('审核截图不能为空');
        return;
      }
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await this.$axios.post('/api/gameEvent/submitScreenshot', {
          category: this.$route.query.stepText,
          screenshotUrl: screenshotURL,
          uuid: this.$route.params.id,
          sub_title: type,
        });
        await this.update();
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          alert(e.response.data.message);
        } else {
          alert('请求失败，服务器发生错误');
        }
      } finally {
        this.isLoading = false;
      }
    },
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
