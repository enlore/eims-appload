<template>
  <div class="app">
    <Hello @submitted="processSubmission"></Hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  components: { Hello },
  methods: {
    processSubmission (p) {
      console.info(p)

      this.$az.createBlob(p.file)
        .then(res => {
          console.info(res)
        })
    }
  }
}
</script>

<style>
body {
    height: 100%;
    margin: 0;
    color: #444;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
}

form {
  margin-top: 8rem;
  flex: 1 1 50%;
}

button { margin-top: 8px; }
input { margin-top: 8px; }
p { margin: 0; margin-top: 16px; line-height: 1.4; }

</style>
