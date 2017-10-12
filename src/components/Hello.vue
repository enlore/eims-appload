<template>
  <div>
    <form action="http://localhost:8081/api/submission" enctype="multipart/form-data" method="POST">
      <p> App Name </p>
      <input name="appName" />

      <p> Email </p>
      <input name="email" value="nick@fog.haus" />

      <p> App Binary </p>
      <input type="file" name="submission" multiple="multiple" />

      <button type="submit"> Upload </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style scoped>
input { display: block; }
button { display: block; }
</style>
