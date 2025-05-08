<script setup lang="ts">

import {RootState, User} from "@/types";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import Icon from "@/components/UI/Icon.vue";
import SidebarUser from "@/components/navbar/sidebar/SidebarUser.vue";
import routes from "@/router/router"
import SidebarSearch from "@/components/navbar/sidebar/SidebarSearch.vue";

const store = useStore<RootState>();

const user = computed<User | null>(() => store.getters["user"]);


onMounted(async () => {
  const response = await fetch("/user.json");
  if (!response.ok) {
    console.log("Error fetching users.json");
    return;
  }
  const json = await response.json();
  store.commit("setUser", json);
})

</script>

<template>
  <div class="sidebar__content">
    <sidebar-user
        :user="user"
    />

    <sidebar-search />

    <nav class="nav">
      <router-link
          class="nav-link"
          to="/">
        <Icon
            class="nav-link-icon"
            name="home"
            :size="22"
        />
        Главная
      </router-link>
      <router-link
          class="nav-link"
          to="/boards"
      >
        <Icon
            class="nav-link-icon"
            name="board"
            :size="22"
        />
        Доски
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.sidebar__content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.nav .nav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 5px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 5px;
  border-radius: 10px;
  transition: 0.2s;
}

.nav .nav-link:hover {
  background: #F5F5F9;
  cursor: pointer;
}

.router-link-active {
  color: #6F72FF;
  background: #E7E7FF;
}

.router-link-active .nav-link-icon {
  fill: #6F72FF;
}

.router-link-active:hover {
  background: #E7E7FF !important;
}
</style>