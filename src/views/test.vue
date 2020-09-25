<template>
  <div>测试登录</div>
</template>

<script>
export default {
  async created() {
    await this.$axios.post('/api/user/login', { tel_number: this.$route.query.phone, password: this.$route.query.password });
    this.$router.push({ name: 'Index' });
  },
};
</script>
