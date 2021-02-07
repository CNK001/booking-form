<template>
  <div class="booking-box">
    <div class="price">{{ priceFormat() }}</div>
    <rating :value="4.5" :total="5" :count="123" />
    <hr />
    <form class="booking-form">
      <fieldset class="fieldset">
        <legend>Dates</legend>
        <div class="form-group" @blur="hideCalendar">
          <input
            @focus="focusCheckIn"
            class="date-input"
            :class="isShowCheckIn === true ? 'active' : ''"
            type="text"
            name="check_in"
            placeholder="Check In"
            v-model="dayCheckIn"
          />
          <calendar
            v-if="isShowCheckIn"
            :is-show-check-in.sync="isShowCheckIn"
            locale="en"
            :dates-busy="datesBusy"
            :dates-free="datesFree"
            :day-check-in.sync="dayCheckIn"
            id="calendarCheckIn"
          />
          <Arrow />
          <input
            @focus="focusCheckOut"
            :class="isShowCheckOut === true ? 'active' : ''"
            class="date-input"
            type="text"
            name="check_out"
            placeholder="Check Out"
            v-model="dayCheckOut"
          />
          <calendar
            v-if="isShowCheckOut"
            :is-show-check-out.sync="isShowCheckOut"
            locale="en"
            :dates-busy="datesBusy"
            :dates-free="datesFree"
            :day-check-out.sync="dayCheckOut"
            id="calendarCheckOut"
          />
        </div>
      </fieldset>
    </form>
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
    Arrow
  },
  props: {
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    locale: {
      String,
      default: "en"
    },
    datesBusy: Array,
    datesFree: Array
  },

  data: function() {
    return {
      title: "calendar",
      isShowCheckIn: false,
      isShowCheckOut: false,
      dayCheckIn: "",
      dayCheckOut: ""
    };
  },

  computed: {
    showCheckInCalendar: function() {
      return this.isShowCheckIn;
    },
    showCheckOutCalendar: function() {
      return this.isShowCheckOut;
    }
  },

  methods: {
    priceFormat: function() {
      return new Intl.NumberFormat(this.locale, {
        currency: this.currency,
        style: "currency"
      }).format(this.price);
    },

    focusCheckIn: function() {
      this.isShowCheckIn = true;
    },

    focusCheckOut: function() {
      this.isShowCheckOut = true;
    },

    hideCalendar() {
      this.isShowCheckIn = false;
      this.isShowCheckOut = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$dark-grey: #5a5a5a;
$border-color: #dadada;
$text-focus: #377375;
$bg-light: #a1d9d6;

$form-group-height: 2.6875rem;

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
    position: relative;

    legend {
      color: $dark-grey;
      font-size: 0.8125rem;
      padding: 0 0 0.625rem;
    }
  }

  .form-group {
    align-items: center;
    border: 1px solid $border-color;
    display: flex;
    max-height: $form-group-height;
    padding: 0.625rem;
  }

  .date-input {
    background: transparent;
    border-radius: 0.1875rem;
    border: none;
    font-size: 0.9375rem;
    max-width: 9.125rem;
    padding: 0.125rem 0.3125rem;

    &::placeholder {
      color: $text-focus;
    }

    &:focus,
    &:active,
    &.active {
      background-color: $bg-light;
      box-shadow: none;
      color: $text-focus;
      outline: 0;
    }
  }
}
</style>
