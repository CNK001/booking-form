<template>
  <div id="app">
    <h1>Formularz rezerwacji pobytu</h1>
    <BookingStay :price="298" currency="PLN" locale="pl" />
  </div>
</template>

<script>
import BookingStay from "./components/BookingStay.vue";

export default {
  name: "App",
  components: {
    BookingStay
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
