<template>
  <div class="">
    <ul class="list-none list-outside contact-list">
      <li
        v-for="(item, i) in items"
        :key="i"
      >
        <ContactListItem v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import ContactListItem from './ContactListItem'
export default {
  components: {
    ContactListItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-list  {
  @apply block;

  @screen lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
  }
}
</style>
