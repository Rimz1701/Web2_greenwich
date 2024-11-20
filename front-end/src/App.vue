<template>
  <div id="app">
    <div v-if="showNavbar" class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to="/user" class="item">
            <i class="user icon"></i> Profile
          </router-link>
          <router-link to="/pm76" class="item">
            <i class="user secret icon"></i> Authorize
          </router-link>
          <div class="right menu">
            <button class="ui inverted button logout-button" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      showNavbar: true
    };
  },
  watch: {
    $route(to) {
      this.showNavbar = to.path !== '/login' && to.path !== '/signup';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  },
  created() {
    this.showNavbar = this.$route.path !== '/login' && this.$route.path !== '/signup';
  }
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50px;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}

.logout-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
