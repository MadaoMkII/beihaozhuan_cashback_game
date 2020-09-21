<template>
  <div v-if="data" class="index">
    <activity-header :value="data.getThisMonthIncoming.totalAmount"/>
    <activity-rules/>
    <step-list>
      <step-list-item :order="1">
        <template #content>{{ data.gameEvent[0].stepSetting.description_short }}</template>
        <template v-if="data.gameEvent[0].stepSetting.status === '未开始'" #opt>
          <outline-button>开启任务</outline-button>
        </template>
        <template v-else-if="data.gameEvent[0].stepSetting.status === '进行中'" #opt>
          <gradient-button disabled>提现{{ data.gameEvent[0].stepSetting.expectEarning / 10000 }}元</gradient-button>
        </template>
        <template v-else-if="data.gameEvent[0].stepSetting.status === '已完成'" #opt>
          <gradient-button @click="goWithdraw">提现{{ data.gameEvent[0].stepSetting.expectEarning / 10000 }}元</gradient-button>
        </template>
        <template v-if="data.gameEvent[0].stepSetting.status === '进行中'" #extend>
          <tutorial-list>
            <tutorial-list-item value="0.2">
              <template #title>注册贝好赚用户送</template>
              <template v-if="!isRegistered" #opt><gradient-button>去完成</gradient-button></template>
              <template v-else #opt><outline-button disabled>已完成</outline-button></template>
            </tutorial-list-item>
            <tutorial-list-item :value="data.gameEvent[0].stepSetting.firstWatchEarning / 10000 + ''">
              <template #title>阅读新手教程视频</template>
              <template v-if="!data.gameEvent[0].stepSetting.complete_mission_watchVideo" #opt><gradient-button @click="showWatchVideo(data.gameEvent[0].stepSetting.videoTutorialUrl,'STEP1')">去完成</gradient-button></template>
              <template v-else #opt><outline-button disabled>已完成</outline-button></template>
            </tutorial-list-item>
            <tutorial-list-item :value="data.gameEvent[0].gameSetting[0].demoReward / 10000 + ''">
              <template #title>试着下载一个游戏并上传截图</template>
              <template v-if="!data.gameEvent[0].gameSetting[0].complete_mission_try" #opt><gradient-button @click="$router.push({ name: 'TasksID', params: { id: data.gameEvent[0].gameSetting[0].uuid }, query: { stepText: data.gameEvent[0].category } })">去完成</gradient-button></template>
              <template v-else #opt><outline-button disabled>已完成</outline-button></template>
            </tutorial-list-item>
          </tutorial-list>
        </template>
      </step-list-item>
      <template v-for="i in 5">
        <step-list-item v-if="data.gameEvent[i]" :key="i" :order="i + 1" :disabled="data.gameEvent[i].stepSetting.status === '未开始' && data.gameEvent[i - 1].stepSetting.status !== '已完成'">
          <template #content>{{ data.gameEvent[i].stepSetting.description_short }}</template>
          <template v-if="data.gameEvent[i].stepSetting.status === '未开始'" #opt>
            <outline-button v-if="data.gameEvent[i - 1].stepSetting.status === '已完成'" @click="openTask(data.gameEvent[i].stepSetting.videoTutorialUrl, data.gameEvent[i].category, data.gameEvent[i].stepSetting.firstWatchEarning)">开启任务</outline-button>
            <income v-else :value="data.gameEvent[i].stepSetting.expectEarning / 10000 + ''"/>
          </template>
          <template v-else-if="data.gameEvent[i].stepSetting.status === '进行中'" #opt>
            <gradient-button disabled>提现{{ data.gameEvent[i].stepSetting.expectEarning / 10000 }}元</gradient-button>
          </template>
          <template v-else-if="data.gameEvent[i].stepSetting.status === '已完成'" #opt>
            <gradient-button @click="goWithdraw">提现{{ data.gameEvent[i].stepSetting.expectEarning / 10000 }}元</gradient-button>
          </template>
          <template v-if="data.gameEvent[i].stepSetting.status === '进行中'" #extend>
            <task-list>
              <template v-if="data.gameEvent[i].stepSetting.videoTutorialUrl !== ''" #opt><link-button @click="showWatchVideo(data.gameEvent[i].stepSetting.videoTutorialUrl, data.gameEvent[i].category, false)">视频教程</link-button></template>
              <task-list-item v-for="game in data.gameEvent[i].gameSetting" :key="game.uuid">
                <template #title><span :class="{ 'disabled': game.complete_mission_try && game.complete_mission_A && game.complete_mission_B }">{{ game.gameName }}</span></template>
                <template v-if="game.complete_mission_try && game.complete_mission_A && game.complete_mission_B" #opt>
                  <outline-button disabled>已完成</outline-button>
                </template>
                <template v-else #opt>
                  <gradient-button @click="$router.push({ name: 'TasksID', params: { id: game.uuid }, query: { stepText: data.gameEvent[i].category } })">去完成</gradient-button>
                </template>
                <subtask-list :disabled="game.complete_mission_try && game.complete_mission_A && game.complete_mission_B">
                  <template #banner><img :class="{ 'disabled': game.complete_mission_try && game.complete_mission_A && game.complete_mission_B }" :src="game.gameBannerUrl" :alt="game.gameName"></template>
                  <subtask-list-item :value="game.demoReward / 10000 + ''" :disabled="game.complete_mission_try">试玩奖励</subtask-list-item>
                  <subtask-list-item v-if="game.subsequent_A.available" :value="game.subsequent_A.subsequentReward / 10000 + ''" :disabled="game.complete_mission_A">后续任务A</subtask-list-item>
                  <subtask-list-item v-if="game.subsequent_B.available" :value="game.subsequent_B.subsequentReward / 10000 + ''" :disabled="game.complete_mission_B">后续任务B</subtask-list-item>
                </subtask-list>
              </task-list-item>
            </task-list>
          </template>
        </step-list-item>
      </template>
    </step-list>
    <video-floating-layer :show.sync="showVideo" :src="videoURL" @close="onVideoClose" />
  </div>
</template>

<script>
import ActivityHeader from '@/components/ActivityHeader.vue';
import ActivityRules from '@/components/ActivityRules.vue';
import OutlineButton from '@/components/OutlineButton.vue';
import GradientButton from '@/components/GradientButton.vue';
import StepList from '@/components/StepList.vue';
import StepListItem from '@/components/StepListItem.vue';
import Income from '@/components/Income.vue';
import TutorialList from '@/components/TutorialList.vue';
import TutorialListItem from '@/components/TutorialListItem.vue';
import TaskList from '@/components/TaskList.vue';
import TaskListItem from '@/components/TaskListItem.vue';
import SubtaskList from '@/components/SubtaskList.vue';
import SubtaskListItem from '@/components/SubtaskListItem.vue';
import LinkButton from '@/components/LinkButton.vue';
import VideoFloatingLayer from '@/components/VideoFloatingLayer.vue';

export default {
  components: {
    ActivityHeader,
    ActivityRules,
    OutlineButton,
    GradientButton,
    StepList,
    StepListItem,
    Income,
    TutorialList,
    TutorialListItem,
    TaskList,
    TaskListItem,
    SubtaskList,
    SubtaskListItem,
    LinkButton,
    VideoFloatingLayer,
  },
  data() {
    return {
      data: null,
      isLoading: false,
      isRegistered: true,
      showVideo: false,
      videoURL: '',
      videoCoin: 0,
      platform: this.getMobileOperatingSystem(),
    };
  },
  async created() {
    await this.update();
  },
  methods: {
    async getAllData() {
      const response = await this.$axios.get('/api/gameEvent/getRenderData');
      for (let i = 0; i < response.data.data.gameEvent.length; i += 1) {
        if (i !== 0) {
          const list = [];
          for (let j = 0; j < response.data.data.gameEvent[i].gameSetting.length; j += 1) {
            if (this.platform !== '通用') {
              if (response.data.data.gameEvent[i].gameSetting[j].platform === this.platform || response.data.data.gameEvent[i].gameSetting[j].platform === '通用') {
                list.push(response.data.data.gameEvent[i].gameSetting[j]);
              }
            } else {
              list.push(response.data.data.gameEvent[i].gameSetting[j]);
            }
          }
          response.data.data.gameEvent[i].gameSetting = list;
        }
      }
      // response.data.data.gameEvent[0].stepSetting.complete_mission_watchVideo = false;
      // response.data.data.gameEvent[0].stepSetting.status = '已完成';
      // response.data.data.gameEvent[1].stepSetting.status = '未开始';
      // response.data.data.gameEvent[1].stepSetting.expectEarning = 10000;
      // response.data.data.gameEvent[1].gameSetting[0].complete_mission_try = true;
      // response.data.data.gameEvent[1].gameSetting[0].complete_mission_A = true;
      // response.data.data.gameEvent[1].gameSetting[0].complete_mission_B = true;
      return response.data.data;
    },
    async update() {
      this.data = await this.getAllData();
      console.log(this.data);
    },
    goWithdraw() {
      console.log('go');
      window.open('/index/applyNew');
    },
    async completeVideo(stepText) {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await this.$axios.post('/api/gameEvent/completeWatchingMission', { category: stepText });
        await this.update();
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          console.log(e.response.data.message);
        } else {
          console.log('请求失败，服务器发生错误');
        }
      } finally {
        this.isLoading = false;
      }
    },
    async openTask(videoURL, stepText, coin) {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await this.$axios.post('/api/gameEvent/initialGameEventByStep', { category: stepText });
        await this.update();
        this.videoCoin = coin;
        await this.showWatchVideo(videoURL, stepText);
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
    async showWatchVideo(url, step, is = true) {
      this.videoURL = url;
      this.showVideo = true;
      if (step === 'STEP1') {
        this.videoCoin = 0;
      }
      if (is) {
        await this.completeVideo(step);
      }
    },
    onVideoClose() {
      if (this.videoCoin === 0) return;
      alert(`视频教程观看完成，${this.videoCoin}金币奖励已到账`);
    },
    getMobileOperatingSystem() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      if (/android/i.test(userAgent)) {
        return '安卓';
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'IOS';
      }

      return '通用';
    },
    test($event) {
      console.log('test', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  background-color: #313340;
  min-height: 100vh;
}

.disabled {
  opacity: 0.5;
}
</style>
