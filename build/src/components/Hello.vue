<template>
  <div class="c-form">
      <p> App Name </p>
      <input v-model="appName" />

      <p> Email </p>
      <input v-model="email" />

      <p> App Binary </p>
      <input type="file" @change="file = $event.target.files[0]" />

      <button type="button" @click="emitFile"> Upload </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appName: 'A Fancy App for All the Chaps',
      email: 'nick@fog.haus',
    }
  },

  methods: {
    emitFile () {
      let payload = {
        appName: this.appName,
        email: this.email,
        file: this.file
      }

      this.appName = ""
      this.email = ""
      this.file = null

      this.$emit('submitted', payload)
    }
  }
}
</script>

<style scoped>
input { display: block; }
button { display: block; }
</style>
