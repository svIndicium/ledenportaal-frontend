<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      &copy; 2017-{{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">Studievereniging Indicium</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://svindicium.nl/commissies"
        rel="noopener noreferrer"
        target="_blank"
      >
        Development commissie
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const items = [
  {
    title: "Studievereniging Indicium",
    icon: "mdi-home",
    href: "https://svindicium.nl/",
  },
  {
    title: "Instagram",
    icon: "mdi-instagram",
    href: "https://instagram.com/svindicium",
  },
  {
    title: "Github",
    icon: `mdi-github`,
    href: "https://github.com/svIndicium/",
  },
  {
    title: "Discord",
    icon: "mdi-discord",
    href: "https://svindicium.nl/discord",
  },
  {
    title: "LinkedIn",
    icon: "mdi-linkedin",
    href: "https://www.linkedin.com/company/s.v.indicium",
  },
  {
    title: "Email",
    icon: "mdi-email",
    href: "mailto:bestuur@indicium.hu",
  },
];
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
