
<template>
  <div class="container mx-auto">
    <section class="top-grid m-8">
      <div class="top-grid__banner rounded-lg overflow-hidden">
        <img class="absolute inset-0 w-full h-full object-cover object-left-top" :src="bannerImage">
      </div>
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
    </section>
    <section class="m-8">
      <h2 class=" text-2xl">
        <b>Angka Kejadian di Jawa Barat</b><br>
        <small class="opacity-75">Update Terakhir: {{ lastUpdatedAt }}</small>
      </h2>
      <div class="my-4 lg:p-8 lg:flex items-start lg:bg-white lg:rounded-lg lg:shadow-md">
        <summary>
          <CounterCard
            class="p-6 mb-6 rounded-lg bg-white shadow-md lg:p-0 lg:mb-0 lg:mr-16 lg:bg-transparent lg:shadow-none"
            label="ODP • Orang Dalam Pemantauan"
            :count="countOf.odp"
            unit="Orang"
            :log-on-click="true"
          >
            <template #icon>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.5018 18.3107C23.9521 16.7611 22.0902 15.6374 20.0583 14.9966C20.4139 14.7521 20.7504 14.4743 21.0634 14.1637C22.4331 12.8041 23.1875 10.9924 23.1875 9.0625V2.8125C23.1875 1.26169 21.9258 0 20.375 0H11.625C10.0742 0 8.8125 1.26169 8.8125 2.8125V8.98406C8.8125 11.4716 10.0642 13.6782 11.9642 14.9894C9.92356 15.6291 8.05369 16.7553 6.49825 18.3107C3.96025 20.8487 2.5625 24.2232 2.5625 27.8125V32H29.4375V27.8125C29.4375 24.2232 28.0398 20.8487 25.5018 18.3107ZM10.6875 2.8125C10.6875 2.29556 11.1081 1.875 11.625 1.875H16H20.375C20.8919 1.875 21.3125 2.29556 21.3125 2.8125V3.75H18.6513C18.2643 2.65887 17.2222 1.875 16 1.875C14.7778 1.875 13.7358 2.65887 13.3488 3.75H10.6875V2.8125ZM16.9375 4.6875C16.9375 5.20444 16.5169 5.625 16 5.625C15.4831 5.625 15.0625 5.20444 15.0625 4.6875C15.0625 4.17056 15.4831 3.75 16 3.75C16.5169 3.75 16.9375 4.17056 16.9375 4.6875ZM10.6875 8.98406V5.625H13.3488C13.7358 6.71613 14.7778 7.5 16 7.5C17.2222 7.5 18.2643 6.71613 18.6513 5.625H21.3125V9.0625C21.3125 10.4889 20.7549 11.828 19.7424 12.833C18.7301 13.8378 17.3855 14.3826 15.9596 14.3748C13.0525 14.3533 10.6875 11.935 10.6875 8.98406ZM15.0625 30.125H4.4375V27.8125C4.4375 23.2026 7.14963 19.2148 11.0618 17.3591L15.0625 21.3599V30.125ZM12.9998 16.6456C13.957 16.3881 14.9626 16.25 16 16.25C17.0358 16.25 18.0399 16.3877 18.9958 16.6444L15.9972 19.6429L12.9998 16.6456ZM27.5625 30.125H16.9375V21.3542L20.9344 17.3573C24.8486 19.2121 27.5625 23.2011 27.5625 27.8125V30.125Z" fill="#27AE60" />
                <path d="M23.1875 24.5V22.625H21.3125V24.5H19.4375V26.375H21.3125V28.25H23.1875V26.375H25.0625V24.5H23.1875Z" fill="#F2C94C" />
              </svg>
            </template>
          </CounterCard>
        </summary>
        <summary>
          <CounterCard
            class="p-6 mb-6 rounded-lg bg-white shadow-md lg:p-0 lg:mb-0 lg:mr-16 lg:bg-transparent lg:shadow-none"
            label="PDP • Pasien Dalam Pengawasan"
            :count="countOf.pdp"
            unit="Orang"
            :log-on-click="true"
          >
            <template #icon>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.4599 11.9124C27.2117 11.9124 28.6131 13.3138 28.6131 15.0656C28.6131 16.8175 27.2117 18.2189 25.4599 18.2189C23.7081 18.2189 22.3066 16.8175 22.3066 15.0656C22.3066 13.3138 23.708 11.9124 25.4599 11.9124Z" fill="#F2C94C" />
                <path d="M29.781 15.0657C29.781 12.6911 27.8346 10.7445 25.4598 10.7445C23.0851 10.7445 21.1386 12.691 21.1386 15.0657C21.1386 17.0511 22.4622 18.7251 24.2919 19.2312V23.8249C24.2919 25.382 23.669 26.8225 22.5401 27.9514C21.489 29.0415 20.0097 29.6643 18.4525 29.6643C15.2214 29.6643 12.6131 27.056 12.6131 23.8249V17.2458C14.7153 17.0122 16.7007 16.039 18.18 14.5597C19.9318 12.8079 20.905 10.4721 20.905 7.94172V2.41364C20.905 1.75181 20.3989 1.24579 19.7372 1.24579H16V3.58156H18.5693V7.94164C18.5693 9.84919 17.8296 11.601 16.545 12.9246C15.2214 14.2482 13.4307 14.9879 11.5621 14.9879C7.70811 14.9879 4.55478 11.8346 4.55478 7.98054V3.58149H7.04629V1.24572H3.38693C2.72511 1.24572 2.21909 1.75181 2.21909 2.41356V7.98046C2.21909 12.6909 5.72271 16.6228 10.2775 17.2457V23.8248C10.2775 28.3406 13.9368 31.9999 18.4526 31.9999C20.6717 31.9999 22.7349 31.1435 24.2142 29.5863C25.7714 28.0291 26.6278 26.0048 26.6278 23.8248V19.2312C28.4574 18.7251 29.781 17.0511 29.781 15.0657ZM25.4599 17.0511C24.3309 17.0511 23.4745 16.1947 23.4745 15.0657C23.4745 13.9368 24.3309 13.0803 25.4599 13.0803C26.5888 13.0803 27.4453 13.9368 27.4453 15.0657C27.4453 16.1947 26.5888 17.0511 25.4599 17.0511Z" fill="#27AE60" />
                <path d="M7.00731 4.82728C6.34548 4.82728 5.83946 4.32118 5.83946 3.65943V1.16785C5.83939 0.506095 6.34548 0 7.00731 0C7.66914 0 8.17517 0.506095 8.17517 1.16785V3.65935C8.17517 4.32118 7.66907 4.82728 7.00731 4.82728Z" fill="#F2C94C" />
                <path d="M16.0389 4.82728C15.3771 4.82728 14.8711 4.32118 14.8711 3.65943V1.16785C14.871 0.506095 15.3771 0 16.0389 0C16.7008 0 17.2068 0.506095 17.2068 1.16785V3.65935C17.2068 4.32118 16.7008 4.82728 16.0389 4.82728Z" fill="#F2C94C" />
              </svg>
            </template>
          </CounterCard>
        </summary>
        <summary>
          <CounterCard
            class="p-6 mb-6 rounded-lg bg-white shadow-md lg:p-0 lg:mb-0 lg:bg-transparent lg:shadow-none"
            label="Kasus Terkonfirmasi COVID-19"
            :count="countOf.aktif"
            unit="Orang"
            :log-on-click="true"
          >
            <template #icon>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.96249 10.9125C7.48026 10.9125 7.89999 10.4928 7.89999 9.97501C7.89999 9.45724 7.48026 9.03751 6.96249 9.03751C6.44473 9.03751 6.02499 9.45724 6.02499 9.97501C6.02499 10.4928 6.44473 10.9125 6.96249 10.9125Z" fill="#333333" />
                <path d="M12.9875 10.9125C13.5053 10.9125 13.925 10.4928 13.925 9.97501C13.925 9.45724 13.5053 9.03751 12.9875 9.03751C12.4697 9.03751 12.05 9.45724 12.05 9.97501C12.05 10.4928 12.4697 10.9125 12.9875 10.9125Z" fill="#333333" />
                <path d="M14.9959 23.0958H14.9292V21.845C16.3553 21.4964 17.4798 20.3719 17.8284 18.9458H18.0084C18.5262 18.9458 18.9459 18.5261 18.9459 18.0083C18.9459 17.4906 18.5262 17.0708 18.0084 17.0708H17.9417V14.9291H18.0084C18.5262 14.9291 18.9459 14.5094 18.9459 13.9916C18.9459 13.4739 18.5262 13.0541 18.0084 13.0541H17.9417V12.9875V7.9H18.0084C18.5262 7.9 18.9459 7.48025 18.9459 6.9625C18.9459 3.11762 15.8354 0 11.9834 0H7.96562C4.12706 0 1.00412 3.12294 1.00412 6.9615V6.9625C1.00412 7.48025 1.42387 7.9 1.94162 7.9H2.00831V12.9875V13.0542H1.94162C1.42387 13.0542 1.00412 13.4739 1.00412 13.9917C1.00412 14.5094 1.42387 14.9292 1.94162 14.9292H2.00831V17.0709H1.94162C1.42387 17.0709 1.00412 17.4906 1.00412 18.0084C1.00412 18.5261 1.42387 18.9459 1.94162 18.9459H2.12169C2.47025 20.372 3.59469 21.4965 5.02081 21.8451V23.0959H4.95419C2.22244 23.0958 0 25.3182 0 28.05V31.0625C0 31.5802 0.41975 32 0.9375 32C1.45525 32 1.875 31.5802 1.875 31.0625V28.05C1.875 26.3521 3.25631 24.9708 4.95419 24.9708H5.57006L9.31213 28.7129C9.67819 29.079 10.2718 29.079 10.6379 28.7129L14.38 24.9708H14.9959C16.6938 24.9708 18.0751 26.3521 18.0751 28.05V31.0625C18.0751 31.5802 18.4948 32 19.0126 32C19.5303 32 19.9501 31.5802 19.9501 31.0625V28.05C19.95 25.3182 17.7276 23.0958 14.9959 23.0958ZM11.9833 1.875C14.3804 1.875 16.5321 3.57875 16.9852 6.025H15.9989C13.5144 6.025 11.4401 4.23425 10.999 1.875H11.9833ZM15.9989 7.9H16.0666V12.05H3.88337V7.9H3.951C6.52025 7.9 8.76869 6.50075 9.97488 4.42419C11.1811 6.50063 13.4296 7.9 15.9989 7.9ZM2.96556 6.025C3.40631 3.66594 5.48069 1.875 7.96562 1.875H8.95106C8.51031 4.23406 6.43594 6.025 3.951 6.025H2.96556ZM13.0541 23.645L9.975 26.7241L6.89581 23.6449V21.9583H13.0541V23.645ZM13.9916 20.0833H5.95831C4.81419 20.0833 3.88337 19.1524 3.88337 18.0083V13.925H16.0667V18.0083C16.0666 19.1525 15.1358 20.0833 13.9916 20.0833Z" fill="#27AE60" />
                <path d="M31.0625 27.9833C31.5802 27.9833 32 27.5636 32 27.0458C32 26.5281 31.5802 26.1083 31.0625 26.1083H30.8825C30.7853 25.7107 30.6286 25.3363 30.421 24.9958L31.2231 24.1945C31.5893 23.8286 31.5896 23.2349 31.2237 22.8687C30.8578 22.5024 30.2642 22.5021 29.8979 22.8681L29.095 23.6701C28.7547 23.4628 28.3806 23.3063 27.9834 23.2092V23.0292C27.9834 22.5114 27.5636 22.0917 27.0459 22.0917C26.5281 22.0917 26.1084 22.5114 26.1084 23.0292V23.2092C25.7111 23.3063 25.3369 23.4628 24.9967 23.6701L24.1939 22.8681C23.8276 22.5021 23.2341 22.5024 22.8681 22.8687C22.5022 23.235 22.5024 23.8286 22.8687 24.1945L23.6708 24.9958C23.4633 25.3363 23.3065 25.7108 23.2093 26.1083H23.0293C22.5116 26.1083 22.0918 26.5281 22.0918 27.0458C22.0918 27.5636 22.5116 27.9833 23.0293 27.9833H23.2093C23.3065 28.3809 23.4633 28.7554 23.6708 29.0959L22.8687 29.8973C22.5024 30.2632 22.5022 30.8568 22.8681 31.2231C23.2341 31.5894 23.8277 31.5896 24.1939 31.2237L24.9967 30.4216C25.337 30.6289 25.7112 30.7854 26.1084 30.8826V31.0625C26.1084 31.5803 26.5282 32 27.0459 32C27.5637 32 27.9834 31.5803 27.9834 31.0625V30.8825C28.3807 30.7854 28.7549 30.6289 29.0951 30.4216L29.8979 31.2236C30.2642 31.5896 30.8577 31.5893 31.2237 31.223C31.5897 30.8567 31.5894 30.2631 31.2231 29.8972L30.4211 29.0959C30.6286 28.7554 30.7854 28.3809 30.8826 27.9833H31.0625ZM27.0458 29.1208C25.9016 29.1208 24.9708 28.19 24.9708 27.0458C24.9708 25.9016 25.9017 24.9708 27.0458 24.9708C28.1899 24.9708 29.1208 25.9017 29.1208 27.0458C29.1208 28.1899 28.19 29.1208 27.0458 29.1208Z" fill="#F2C94C" />
              </svg>
            </template>
          </CounterCard>
        </summary>
      </div>
    </section>
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
import CounterCard from '~/components/CounterCard'
// import PetaPersebaranAllCases from '~/components/Tableau/PetaPersebaranAllCases'

export default {
  components: {
    // ImageCarousel,
    // ImageSwiper,
    CallCard,
    // ContactList,
    // BlogPostPreview,
    CounterCard
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
    },
    countOf () {
      if (!this.cases) {
        return {}
      }
      const { odp, pdp, aktif } = this.cases
      return {
        odp: odp.total.jabar,
        pdp: pdp.total.jabar,
        total: aktif.jabar
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
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 58.625%;
    grid-column-end: span 2;
    grid-row-end: span 2;
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
