<template>
  <div>
    <div class="bg-white shadow-md rounded p-4 flex flex-col mb-6">
      <div class="-m-4 mb-4 bg-gray-200  px-6 py-3">
        <h2 class="font-bold text-gray-600 uppercase leading-normal">Filters</h2>
      </div>
      <div class="flex items-end">
        <div class="mx-2">
          <label 
            for="search"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Search
          </label>
          <input 
            type="text"
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            id="search"
            v-model="search"
          >
        </div>
        <div class="mx-2">
          <label
            for="brand"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            v-model="select"
            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <button
          class="bg-blue-500 rounded-full h-8 w-8 p-2 mx-2 my-1 hover:bg-blue-700"
          @click="resetFilters()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
    </div>
    <div class="bg-white shadow-md rounded">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th 
              class="py-3 px-6"
              :class="col === 'Name' ? 'text-left' : 'text-center'"
              v-for="col in columns"
              :key="col"
            >
              {{ col }}
            </th>
        </tr>
        </thead>
        <tbody
          class="text-gray-600 text-sm font-light"
          v-if="!isEmpty"
        >
          <tr
            class="border-b border-gray-200 hover:bg-gray-100 text-center"
            v-for="row in filteredPayloads"
            :key="row.key"
          >
            <td class="py-3 px-6 text-left">{{ row.campaignName }}</td>
            <td class="py-3 px-6">
              <span :class="`bg-${statusVariant[row.requestStatus.name]}-200 text-${statusVariant[row.requestStatus.name]}-600 py-1 px-3 rounded-full text-xs`">
                {{ row.requestStatus.value }}
              </span>
            </td>
            <td class="py-3 px-6">{{ row.advice ? 'Advice' : 'Request' }}</td>
            <td class="py-3 px-6">{{ row.brand.name }}</td>
            <td class="py-3 px-6">{{ row.decisionDeadline ? convertDate(row.decisionDeadline) : "No deadline" }}</td>
            <td class="py-3 px-6 align-middle text-center flex justify-center">
              <router-link
                class="bg-blue-500 rounded-full p-2 m-2 hover:bg-blue-700"
                :to="{name: 'edit', params: {id: row.requestId}}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </router-link>
              <!-- <button
                class="bg-red-500 rounded-full p-2 m-2 hover:bg-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button> -->
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="100%"
              class="h-32 text-center"
            >
              <div
                class="flex flex-col justify-center items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                <h3>
                  No result
                </h3>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'List',
  components: {
  },
  data() {
    return {
      brands: this.$store.state.brands,
      payloads: this.$store.state.payloads,
      columns: [
        'Name',
        'Status',
        'Type',
        'Brand',
        'Deadline',
        'Actions'
      ],
      statusVariant: {
        SUBMITTED: 'blue',
        DRAFT: 'gray',
        TO_REVIEW: 'yellow',
        TO_MODIFY: 'purple',
        VALIDATED: 'green',
        REJECTED: 'red'
      },
      select: null,
      search: ''
    }
  },
  computed: {
    filteredPayloads() {
      let filteredPayloads = this.payloads.requests
      const filter = {
        brandId: this.select,
        campaignName: this.search
      }

      filteredPayloads = filteredPayloads.filter(function (payload) {
        if (filter.brandId !== null) {
          return payload.campaignName.includes(filter.campaignName) && payload.brand.brandId === filter.brandId
        } else {
          return payload.campaignName.includes(filter.campaignName)
        }
      })

      return filteredPayloads
    },
    isEmpty() {
      return this.filteredPayloads.length > 0 ? false : true
    }
  },
  methods: {
    convertDate(date) {
      return moment(date).format('DD/MM/yyyy, hh:mm:ss')
    },
    resetFilters() {
      this.select = null
      this.search = ''
    }
  }
}
</script>