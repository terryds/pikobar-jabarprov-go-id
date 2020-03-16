<template>
  <div class="">
    <ul class="list-none list-outside contact-list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="mb-8">
        <h5 class="inline-block text-lg font-bold leading-loose">
          {{ item.name }}
        </h5>
        <p>
          {{ item.address }}, {{ item.city }}
        </p>
        <p class="text-sm">
          <template v-if="item.phones && item.phones.length">
            <a
              v-for="(num, j) in item.phones"
              :key="j"
              class="inline-block px-4 py-1 bg-blue-100 rounded mt-2 mr-2 text-gray-800 hover:opacity-50"
              :href="`tel:${num}`"
              target="_blank"
              :title="`Telpon ${num}`">
              <i class="fas fa-phone fa-sm mr-1" />
              <span>
                {{ num }}
              </span>
            </a>
          </template>
          <a
            v-if="item.web"
            class="inline-block px-4 py-1 bg-green-100 rounded mt-2 mr-2 text-gray-800 hover:opacity-50"
            :href="item.web"
            target="_blank"
            :title="`Buka Laman ${item.web}`">
            <i class="fas fa-globe-asia fa-sm mr-1" />
            <span>
              {{ item.web }}
            </span>
          </a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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

  // @screen md {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   column-gap: 1rem;
  //   row-gap: 1rem;
  // }

  // @screen lg {
  //   @apply block;
  // }

  // @screen xl {
  //   display: grid;
  // }
}
</style>
