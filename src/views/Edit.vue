<template>
  <div>
    <Navbar />
    <Breadcrumb 
      :breadcrumb="breadcrumb"
    />
    <div class="bg-white shadow-md rounded p-4 flex flex-col mb-6">
      <div class="-m-4 mb-4 bg-gray-200  px-6 py-3">
        <h2 class="font-bold text-gray-600 uppercase leading-normal">{{ title }}</h2>
      </div>
      <div class="mb-4">
        <label
          for="brand"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Brand
        </label>
        <select
          name="brand"
          id="brand"
          v-model="payload.brand.brandId"
          class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="brand in brands"
            :key="brand.brandId"
            :value="brand.brandId"
          >
            {{ brand.name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label 
          for="name"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Campaign name
        </label>
        <input 
          type="text"
          class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          id="name"
          v-model="payload.campaignName"
        >
      </div>
      <div class="mb-4">
        <label 
          for="medias"
          class="block text-gray-700 text-sm font-bold mb-4"
        >
          Media
        </label>
        <div class="grid grid-cols-4">
          <div
            v-for="elt in medias"
            :key="elt.mediaId"
            class="mb-4 flex items-center"
          >
            <input 
              type="checkbox"
              class="form-checkbox"  
              :id="elt.value"
              v-model="checkedMedias"
              :value="elt.mediaId"
            >
            <label 
              :for="elt.value"
              class="block text-gray-500 text-sm ml-2"
            >
              {{elt.value}}
            </label>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label 
          for="date"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Decision deadline
        </label>
        <input 
          type="date"
          class="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          id="date"
          v-model="date"
        >
      </div>
      <div class="text-right my-2">
        <button
          class="bg-blue-500 rounded-lg py-2 px-6 hover:bg-blue-700 text-white"
          @click="save()"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Navbar from '../components/Navbar.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  name: 'Edit',
  components: {
    Navbar,
    Breadcrumb
  },
  data() {
    return {
      title: '',
      date: '',
      brands: this.$store.state.brands,
      medias: this.$store.state.medias,
      checkedMedias: [],
      breadcrumb: [
        {
          label: 'Home',
          route: 'home'
        },
        {
          label: 'Edit',
          route: 'edit'
        }

      ]
    }
  },
  computed: {
    payload() {
      const id = this.$route.params.id
      return this.$store.state.payloads.requests.filter((payload) => payload.requestId == id)[0]
    }
  },
  methods: {
    save() {
      this.payload.decisionDeadline = moment.utc(this.date).format()
      this.payload.media = this.medias.filter((v) => this.checkedMedias.includes(v.mediaId))
      this.$store.dispatch('updateValue', this.payload);
      this.$router.push({ name: 'home' });
    }
  },
  mounted() {
    this.title = this.payload.campaignName
    this.date = moment(this.payload.decisionDeadline).format('YYYY-MM-DD')
    this.payload.media.forEach(elt => {
      this.checkedMedias.push(elt.mediaId)
    });
  }
}
</script>
