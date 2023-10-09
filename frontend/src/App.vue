<template>
  <div class="app">
    <Header />

    <div class="page-content">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        // Logout
        await this.logout();

        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>

.page-content {
  display: flex;
  justify-content: center;
  align-items: baseline;
  min-height: calc(100vh - 125px);
  background-color: #f0f0f0;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

</style>
