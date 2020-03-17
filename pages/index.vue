
<template>
  <div class="container mx-auto">
    <div class="top-grid">
      <img class="top-grid__banner" :src="bannerImage">
      <CallCard class="top-grid__call-card" title="Call Center" subtitle="Nomor Darurat" number="119" />
      <CallCard class="top-grid__call-card" title="Dinkes Jabar" subtitle="Pertanyaan Umum" number="0811 2093 306" />
      <div
        class="top-grid__call-status rounded-lg"
      >
        <h6>
          <strong>Pertanyaan Terlayani</strong><br>
          <small>
            Telpon & Pesan Teks
          </small>
        </h6>
        <summary class="text-5xl text-yellow-400 font-bold">
          {{ cases ? cases.pertanyaan_terlayani : '' }}
        </summary>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import { Timestamp } from '../lib/firebase'
import { formatDateTimeShort } from '~/lib/date'
// import ImageCarousel from '~/components/ImageCarousel'
// import ImageSwiper from '~/components/ImageSwiper'
import CallCard from '~/components/CallCard'
// import ContactList from '~/components/ContactList'
// import BlogPostPreview from '~/components/Blog/BlogPostPreview'
// import CounterCard from '~/components/CounterCard'
// import PetaPersebaranAllCases from '~/components/Tableau/PetaPersebaranAllCases'

export default {
  components: {
    // ImageCarousel,
    // ImageSwiper,
    CallCard
    // ContactList,
    // BlogPostPreview,
    // CounterCard,
    // PetaPersebaranAllCases
  },
  data () {
    return {
      icon: {
        faChevronRight
      },
      todayDateAndTime: formatDateTimeShort(new Date())
    }
  },
  computed: {
    ...mapState({
      banners: state => state.banners.items,
      hospitals: state => state.hospitals.items.filter((_, index) => index < 3),
      remainingHospitalCount: state => state.hospitals.items.length - 3,
      infographics: state => state.infographics.items.filter((_, index) => index < 3),
      news: state => state.news.items,
      cases: state => state.statistics.cases
    }),
    bannerImage () {
      if (this.banners && this.banners.length) {
        return this.banners[0].url
      }
      return null
    },
    lastUpdatedAt () {
      try {
        return this.formatDateTimeShort(this.cases.updated_at)
      } catch {
        return ''
      }
    }
  },
  async created () {
    await Promise.all([
      this.$store.dispatch('banners/getItems'),
      this.$store.dispatch('news/getItems'),
      this.$store.dispatch('statistics/getCases'),
      this.$store.dispatch('infographics/getItems')
    ])
  },
  methods: {
    formatDateTimeShort
  }
}

</script>

<style lang="scss" scoped>
.top-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  row-gap: 1.5rem;

  &__banner {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    border-radius: 0.5rem;
    @apply shadow-md;
  }

  &__call-card {
    grid-column-end: span 1;
    @apply shadow-md;
  }

  &__call-status {
    grid-column: span 2;
    @apply p-5 flex items-center justify-between
    text-xl text-white
    bg-brand-green-dark
    shadow-md;
  }

  @screen lg {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
  }
}

.responded-question {
  grid-column: auto / span 2;

  @screen lg {
    grid-column: auto;
  }
}
.call-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
.counter-cards {

  @screen lg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 1.5rem;
    align-items: stretch;
    row-gap: 1.5rem;
  }
}

.container {
  @screen lg {
    max-width: 1280px;
  }
}
</style>
