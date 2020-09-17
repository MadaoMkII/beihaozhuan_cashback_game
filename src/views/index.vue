<template>
  <div class="index">
    <activity-header/>
    <activity-rules/>
    <step-list>
      <step-list-item :order="1">
        <template #content>初出茅庐，熟悉操作得一元</template>
        <template #opt>
          <outline-button
            @click="$router.push({ name: 'TasksID', params: { id: '1' } })"
          >开启任务</outline-button>
        </template>
        <template #extend>
          <tutorial-list>
            <tutorial-list-item value="0.2">
              <template #title>注册贝好赚用户送</template>
              <template #opt><gradient-button>去完成</gradient-button></template>
            </tutorial-list-item>
            <tutorial-list-item value="0.3">
              <template #title>阅读新手教程视频</template>
              <template #opt><gradient-button>去完成</gradient-button></template>
            </tutorial-list-item>
            <tutorial-list-item value="0.5">
              <template #title>试着下载一个游戏并上传截图</template>
              <template #opt><gradient-button>去完成</gradient-button></template>
            </tutorial-list-item>
          </tutorial-list>
        </template>
      </step-list-item>
      <step-list-item :order="2">
        <template #content>小试牛刀，奖励升级轻松赚</template>
        <template #opt><income value="20"/></template>
        <template #extend>
          <task-list>
            <template #opt><link-button>视频教程</link-button></template>
            <task-list-item>
              <template #title>秦时明月</template>
              <template #opt><gradient-button>去完成</gradient-button></template>
              <subtask-list>
                <subtask-list-item value="2">试玩奖励</subtask-list-item>
                <subtask-list-item value="5">后续任务A</subtask-list-item>
                <subtask-list-item value="5">后续任务B</subtask-list-item>
              </subtask-list>
            </task-list-item>
            <task-list-item>
              <template #title>秦时明月</template>
              <template #opt><gradient-button>去完成</gradient-button></template>
              <subtask-list>
                <subtask-list-item value="2">试玩奖励</subtask-list-item>
                <subtask-list-item value="5">后续任务A</subtask-list-item>
              </subtask-list>
            </task-list-item>
          </task-list>
        </template>
      </step-list-item>
      <step-list-item :order="3" disabled>
        <template #content>得心应手，邀请好友一起玩</template>
        <template #opt><income value="50"/></template>
      </step-list-item>
      <step-list-item :order="4" disabled>
        <template #content>融会贯通，收入翻倍不再难</template>
        <template #opt><income value="100"/></template>
      </step-list-item>
      <step-list-item :order="5" disabled>
        <template #content>驾轻就熟，优化时间无负担</template>
        <template #opt><income value="200"/></template>
      </step-list-item>
      <step-list-item :order="6" disabled>
        <template #content>出类拔萃，花样翻新月月欢</template>
        <template #opt><income value="500"/></template>
      </step-list-item>
    </step-list>
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
  },
  methods: {
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
</style>
