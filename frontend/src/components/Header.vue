<template>
    <header class="app-header">
        <div class="logo-wrapper">
            <img alt="logo" class="logo"
                src="https://off-grid-europe.com/userfiles/media/default/off-grid-logo-energy-experts-pfade-oge-logo.svg"
                width="125" height="125" />
        </div>

        <nav class="nav-links" v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="nav-link">Register</router-link>
        </nav>

        <div v-if="isAuthenticated">
            <button @click="handleLogout">Logout</button>
        </div>
    </header>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Header",
    computed: {
        ...mapGetters(["isAuthenticated"]),
    },
    methods: {
        ...mapActions(["logout"]),
        async handleLogout() {
            try {
                // Logout
                await this.logout();

                this.$router.push("/");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
  

<style scoped>
.app {
  font-family: 'Arial', sans-serif;
}
button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #ff4400;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #0056b3;
}
.app-header {
  max-height: 90px;
  background-color: #3498db;
  color: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.logo-wrapper {
  margin-right: 2rem;
}

.logo {
  width: 300px;
  height: 125px;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  margin-right: 1.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ff5733; 
}


@media (max-width: 767px) {
  .app-header {
    flex-direction: column;
    align-items: center;
  }

  .logo-wrapper {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .nav-links {
    margin-top: 1rem;
  }

  .nav-link {
    margin: 0.5rem 0;
  }
}
</style>

  