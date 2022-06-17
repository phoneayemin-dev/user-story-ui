<template>
    <nuxt-link to="/employee">Go To Employee List</nuxt-link>
</template>
<script>

  export default {
    middleware: 'auth',
  }
</script>
