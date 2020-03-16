<template>
  <nav
    class="fixed bottom-0 w-screen px-4 py-2 flex flex-row justify-center items-baseline bg-white"
    style="box-shadow: 0 -8px 24px 0 rgba(0,0,0,0.1)">
    <div class="navbar-items">
      <NavbarItem
        v-for="(item, index) in navbarItems"
        :key="index"
        :title="item.title"
        :to="item.to"
        :exact="item.exact">
        <template #icon>
          <FontAwesomeIcon :icon="item.icon" />
        </template>
      </NavbarItem>
    </div>
  </nav>
</template>

<script>
import {
  faHome,
  faBell,
  faNewspaper,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'

import NavbarItem from './NavbarItem'

export default {
  components: {
    NavbarItem
  },
  data () {
    return {
      navbarItems: [
        {
          title: 'Home',
          to: '/',
          exact: true,
          icon: faHome
        },
        {
          title: 'Notifikasi',
          to: '/notifications',
          icon: faBell
        },
        {
          title: 'Berita',
          to: '/articles',
          icon: faNewspaper
        },
        {
          title: 'FAQ',
          to: '/faq',
          icon: faQuestionCircle
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-items {
  display: grid;
  grid-template-columns: repeat(4, 100px);
}
</style>
