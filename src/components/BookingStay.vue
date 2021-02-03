<template>
  <div class="booking-box">
    <div class="price">{{ priceFormat() }}</div>
    <rating :value="4.5" :total="5" :count="123" />
    <hr />
    <form class="booking-form">
      <fieldset class="fieldset">
        <legend>Dates</legend>
        <div class="form-group">
          <input
            class="date-input"
            type="text"
            name="check_in"
            placeholder="Check In"
          />
          <Arrow />
          <input
            class="date-input"
            type="text"
            name="check_out"
            placeholder="Check Out"
          />
        </div>
      </fieldset>
    </form>
    <calendar locale="en" />
  </div>
</template>

<script>
import Calendar from "./Calendar.vue";
import Rating from "./Rating.vue";
import Arrow from "./Arrow.vue";

export default {
  name: "BookingStay",
  components: {
    Calendar,
    Rating,
    Arrow,
  },
  props: {
    price: Number,
    currency: String,
    locale: {
      String,
      default: "en",
    },
  },

  data: function() {
    return {
      title: "calendar",
    };
  },

  methods: {
    priceFormat: function() {
      return new Intl.NumberFormat(this.locale, {
        style: "currency",
        currency: this.currency,
      }).format(this.price);
    },
  },
};
</script>

<style lang="scss" scoped>
$dark-grey: #5a5a5a;
$border-color: #dadada;
$text-focus: #377375;
$bg-light: #a1d9d6;

.booking-box {
  border: 1px solid $border-color;
  padding: 1.25rem;
}

hr {
  border-bottom: none;
  border-top: 1px solid $border-color;
  margin: 1rem 0;
}

.price {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.375rem;
}

.booking-form {
  display: flex;

  .fieldset {
    all: inherit;

    legend {
      color: $dark-grey;
      font-size: 0.8125rem;
      padding: 0 0 0.625rem;
    }

  }

  .form-group {
    
    display: flex;
    border: 1px solid $border-color;
    align-items: center;
    padding: 0.625rem;
  }

  .date-input {
    border: none;
    border-radius: 0.1875rem;
    font-size: 0.9375rem;
    padding: 0.125rem 0.3125rem;
    max-width: 9.125rem;

    &::placeholder {
      color: $text-focus;
    }

    &:focus {
      background-color: $bg-light;
      box-shadow: none;
      color: $text-focus;
      outline: 0;
    }
  }
}
</style>
