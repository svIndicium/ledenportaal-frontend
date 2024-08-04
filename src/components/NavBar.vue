<template>
  <v-app-bar app class="px-md-2">
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />
    </template>

    <v-img
      max-width="32"
      min-height="25"
      src="@/assets/logo_wh.svg"
    />

    <v-spacer/>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.path"
        :active="$route.path === item.path"
        class="me-2 text-none"
        slim
      >
        {{ item.text }}
      </v-btn>
    </template>

    <v-spacer />

    <template #append>
      <v-btn
        class="ms-1 opacity-60"
        icon="mdi-bell-outline"
      />

      <v-btn class="ms-1" icon="">
        <v-avatar image="@/assets/default_pfp.jpg" />

        <v-menu activator="parent" origin="top">
          <v-list>
            <v-list-item link title="Gegevens" />
            <v-list-item link title="Uitloggen" @click="signOut" />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-if="$vuetify.display.smAndDown"
    v-model="drawer"
    location="top"
    temporary
    width="360"
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.path"
        :active="$route.path === item.path"
        link
      >
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item link prepend-icon="mdi-bell-outline" title="Notifications" />

      <v-divider />

      <v-list-item
        lines="two"
        link
        prepend-avatar="@/assets/default_pfp.jpg"
        :subtitle="userStatus"
        :title="userName"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const drawer = ref(false)
const router = useRouter()
const user = useCurrentUser()

const items = [
  { text: 'Dashboard',  path: '/dashboard' },
  { text: 'Tickets',    path: '/dashboard/tickets' },
  { text: 'Ledenlijst', path: '/dashboard/ledenlijst' },
  { text: 'Gegevens' ,  path: '/dashboard/gegevens' },
  { text: 'FAQ',        path: '/faq' },
  { text: 'Contact',    path: '/contact' },
]

const userName = computed(() => user.value?.displayName || 'User')
const userStatus = "Lid" // TODO: Bijv. Lid of alumnus-status

const signOut = async () => {
  const auth = useFirebaseAuth();
  auth.signOut().then(() => {
    console.log('logged out');
    router.push('/login');
  }).catch((error) => {
    console.log(error);
  });
}
</script>
