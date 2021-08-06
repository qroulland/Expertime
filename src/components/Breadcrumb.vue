<template>
  <div class="py-6">
    <ul class="flex text-gray-500 text-sm lg:text-base">
      <li 
        class="inline-flex items-center"
        v-for="(item, index) in breadcrumb"
        :key="item.route"
      >
        <router-link
          :to="{name: item.route}"
          :class="item.route === getCurrentRoute ? 'text-blue-600 font-semibold' : ''"
        >
          {{ item.label }}
        </router-link>
        <svg
        v-if="index != breadcrumb.length - 1"
        class="h-5 w-auto text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumb: Array,
  },
  computed: {
    getCurrentRoute() {
      return this.$route.name
    }
  }
}
</script>