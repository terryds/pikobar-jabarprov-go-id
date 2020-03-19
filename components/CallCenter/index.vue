<template>
  <div>
    <div class="flex flex-row flex-wrap md:flex-no-wrap items-stretch rounded-none sm:rounded overflow-hidden">
      <input
        v-model="searchString"
        class="min-w-0 inline-block w-full flex-none sm:flex-1 bg-gray-200 p-4"
        placeholder="Cari kabupaten atau kota..."
        @keyup.enter="performFiltering"
      >
      <div class="flex-1 w-full mt-2 sm:mt-0 sm:flex-none sm:w-auto flex justify-end items-stretch">
        <button
          class="mr-2 sm:mr-0 px-4 py-2 bg-brand-blue hover:bg-brand-blue-lighter text-white flex justify-center items-center"
          @click="performFiltering"
        >
          <FontAwesomeIcon :icon="icon.faSearch" class="mr-2" />
          <span>
            Cari
          </span>
        </button>
        <button
          class="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 flex justify-center items-center"
          @click="onReset"
        >
          <FontAwesomeIcon :icon="icon.faTimes" class="mr-2" />
          <span>
            Reset
          </span>
        </button>
      </div>
    </div>
    <br>
    <table class="w-full">
      <thead class="hidden md:table-header-group">
        <tr class="bg-gray-300 flex flex-col flex-no wrap md:table-row text-left text-gray-600">
          <th class="hidden md:table-cell p-3 w-1/12 text-center">
            No
          </th>
          <th class="p-3 w-2/12">
            Kota/Kab
          </th>
          <th class="p-3 w-3/12">
            CALL CENTER
          </th>
          <th class="p-3 w-6/12">
            HOTLINE
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isPending || !filteredCallCenters">
          <tr v-for="i in 4" :key="i">
            <td colspan="4" class="pt-4" style="border: none !important; background: none !important;">
              <ContentLoader :speed="3" :height="16">
                <rect width="100%" height="100%" rx="2" ry="2" />
              </ContentLoader>
            </td>
          </tr>
        </template>
        <template v-else-if="!filteredCallCenters.length">
          <tr>
            <td colspan="4" class="py-4">
              <div class="w-full p-4 rounded-lg bg-gray-200 text-center">
                Data Tidak Tersedia
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="filteredCallCenters && filteredCallCenters.length">
          <tr
            v-for="(item, index) in filteredCallCenters"
            :key="index"
            class="relative flex flex-col flex-no wrap md:table-row pl-5 md:pl-0 mb-8 md:mb-0"
          >
            <td class="hidden md:table-cell text-center">
              {{ index + 1 }}
            </td>
            <td class="title-cell text-lg font-bold md:font-normal md:text-base md:p-4 text-left">
              {{ item.nama_kotkab }}
            </td>
            <td :class="['text-left md:table-cell', item.call_center && item.call_center.length ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Call Center:
              </h6>
              <p v-if="item.call_center && item.call_center.length">
                <a
                  v-for="(cc, cc_index) in item.call_center"
                  :key="cc_index"
                  class="text-sm inline-block px-4 py-1 bg-blue-100 rounded mr-4 mb-4 md:m-4 text-gray-800 hover:opacity-50"
                  :href="`tel:${cc}`"
                >
                  {{ cc }}
                </a>
              </p>
              <span v-else class="m-4">-</span>
            </td>
            <td :class="['text-left md:table-cell', item.hotline && item.hotline.length ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Hotline:
              </h6>
              <p v-if="item.hotline && item.hotline.length">
                <a
                  v-for="(h, h_index) in item.hotline"
                  :key="h_index"
                  class="text-sm inline-block px-4 py-1 bg-green-100 rounded mr-4 mb-4 md:m-4 text-gray-800 hover:opacity-50"
                  :href="`tel:${h}`"
                >
                  {{ h }}
                </a>
              </p>
              <span v-else class="m-4">-</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapActions } from 'vuex'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'CallCenter',
  components: {
    ContentLoader
  },
  props: {
    count: {
      type: Number,
      default: 9999
    }
  },
  data () {
    return {
      isPending: true,
      searchString: '',
      icon: {
        faSearch,
        faTimes
      },
      filteredCallCenters: null
    }
  },
  computed: {
    callCenters () {
      const items = this.$store.state['call-centers'].items
      if (!items) {
        return null
      }
      return items.filter((_, index) => index < this.count)
    }
  },
  mounted () {
    this.isPending = true
    this.getItems()
      .then(() => {
        this.performFiltering()
      })
      .finally(() => {
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('call-centers', {
      getItems: 'getItems'
    }),
    performFiltering () {
      if (!this.callCenters) {
        this.filteredCallCenters = null
      }
      if (!this.searchString) {
        this.filteredCallCenters = this.callCenters
      }
      if (this.searchString) {
        this.filteredCallCenters = this.callCenters.filter((cc) => {
          return cc.nama_kotkab.toLowerCase().includes(this.searchString.toLowerCase())
        })
      }
    },
    onReset () {
      this.searchString = ''
      this.performFiltering()
    }
  }
}
</script>

<style lang="scss" scoped>
  td {
    vertical-align: middle;
  }
  td:not(:last-child) {
    border-bottom: 0;
  }

  tbody tr:nth-child(even) td {
    @screen md {
      @apply bg-gray-200;
    }
  }

  tbody tr td {
    @screen md {
      @apply border-t-2 border-solid border-gray-300;
    }
  }

  .title-cell::before {
    content: '';
    @apply absolute top-0 left-0 bottom-0 block w-1 bg-orange-300;
    @screen md {
      @apply hidden;
    }
  }
</style>
