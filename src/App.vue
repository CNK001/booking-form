<template>
  <div id="app">
    <h1>Stay booking form</h1>
    <BookingStay
      :dates-busy="datesBusy"
      :dates-free="datesFree"
      :price="298"
      currency="PLN"
      locale="pl"
    />
  </div>
</template>

<script>
import BookingStay from "./components/BookingStay.vue";
import dayjs from "dayjs";

export default {
  name: "App",
  components: {
    BookingStay
  },

  data: function() {
    return {
      datesFree: [
        [dayjs('2021-02-08').toDate(), dayjs('2021-02-16').toDate()],
        [dayjs('2021-02-21').toDate(), dayjs('2021-02-25').toDate()]
      ],
      datesBusy: [[dayjs('2021-02-17').toDate(), dayjs('2021-02-20').toDate()]]
    };
  }
};
</script>

<style lang="scss">
$light-grey: #ececec;

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  background: $light-grey;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 27.5rem;
  min-height: calc(100vh - 2rem);
  padding: 1rem;
}
</style>
