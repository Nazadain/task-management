<script setup lang="ts">

import {RootState, User} from "@/types";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import Icon from "@/components/UI/Icon.vue";
import SidebarUser from "@/components/navbar/sidebar/SidebarUser.vue";

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

    <form class="search__container">
      <div class="search_field">
        <Icon name="search"/>
        <input type="text" placeholder="Поиск...">
      </div>
    </form>
  </div>
</template>

<style scoped>
.sidebar__content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>