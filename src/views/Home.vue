<template>
  <div>
    <Navbar />
    <Breadcrumb 
      :breadcrumb="breadcrumb"
    />
    <List />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import List from '../components/List.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    List,
    Breadcrumb
  },
  data() {
    return {
      breadcrumb: [
        {
          label: 'Home',
          route: 'home'
        }
      ]
    }
  }
}
</script>
