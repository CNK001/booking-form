<template>
  <div class="callendar">
    <!-- <h1>{{ msg }}</h1> -->

    <div class="header">
      <button class="btn-nav" @click="prevMonth()">
        <span class="chevron-arrow-left"></span>
      </button>
      <div class="month-name">{{  activeMonth.name }} {{ activeMonth.date.year }}</div>
      <button class="btn-nav" @click="nextMonth()">
        <span class="chevron-arrow-right"></span>
      </button>
    </div>

    <div class="weekdays">
      <div v-for="(day, index) of weekDays" :key="index" class="day">
        {{ day }}
      </div>
    </div>
    <div class="days">
      <div v-for="(dayMonthPrev, index) of activeMonth.monthBefore.daysList" :key="`${index}-before`" class="day day--before">
        {{ dayMonthPrev }}
      </div>
      <div
        v-for="(day, index) of activeMonth.daysList"
        :key="index"
        class="day"
      >
        {{ day }}
      </div>
      <div v-for="(day, index) of activeMonth.monthAfter.daysList" :key="`${index}-after`" class="day day--after">
        {{ index + 1}}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
const localeData = require("dayjs/plugin/localeData");
// const isBetween = require("dayjs/plugin/isBetween");
// const updateLocale = require('dayjs/plugin/updateLocale')

const monthsList = (start, end, length = end - start) =>
  Array.from({ length }, (_, i) => start + i + 1);

require("dayjs/locale/pl");
require("dayjs/locale/en");
// var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localeData);
// dayjs.extend(updateLocale);
// dayjs.extend(localizedFormat)

const MAX_FIELDS = 35;
const TODAY = dayjs().format("YYYY-MM-DD");

console.log(MAX_FIELDS);

export default {
  name: "Calendar",
  props: {
    locale: {
      type: String,
      default: "en",
    },
    currentDate: {
      type: String,
    },
    freeSlot: {
      type: Array,
    }
  },

  data: function() {
    return {
      title: "calendar",
      currentLocale: "en",
      now: {
        days: dayjs().daysInMonth(),
      },
      today: TODAY,
      activeDate: TODAY,
    }
  },

  methods: {
    setLocale() {
      this.currentLocale = this.locale;
      dayjs.locale(this.currentLocale);
    },

    prevMonth() {
      this.activeDate = dayjs(this.activeDate).subtract(1, 'month');
    },

    nextMonth() {
      this.activeDate = dayjs(this.activeDate).add(1, 'month');
    },

    monthDaysArray(daysCount, startDay=0, length=daysCount-startDay) {
      return monthsList(startDay, daysCount, length);
    },

    dayOfWeek(shortNameOfWeekDay) {
      return this.weekDays.indexOf(shortNameOfWeekDay);
    },

    getDateObject(selectedDate) {
      return {
        day: dayjs(selectedDate).format('D'),
        month: dayjs(selectedDate).format('M'),
        year: dayjs(selectedDate).format('YYYY')
      }
    },

    getMonthDetails(selectedDate) {

      const date = selectedDate;
      const daysCount = dayjs(date).daysInMonth();
      const firstDay = dayjs(date).date(1).format('ddd');
      const prevMonth = dayjs(date).subtract(1, 'month');
      const dayOfWeek = this.dayOfWeek(firstDay);
      const prevMonthDaysCount = prevMonth.daysInMonth();

      return {
        date: this.getDateObject(date),
        name: dayjs(date).format("MMMM"),
        shortName: dayjs(date).format("MMM"),
        daysCount: daysCount,
        daysList: this.monthDaysArray(daysCount),
        firstDay: firstDay,
        dayOfWeek: dayOfWeek,

        monthBefore: {
          date: this.getDateObject(prevMonth),
          daysCount: prevMonthDaysCount,
          daysList: this.monthDaysArray(dayOfWeek, prevMonthDaysCount - dayOfWeek, dayOfWeek),
        },

        monthAfter: {
          daysList: this.monthDaysArray(MAX_FIELDS - daysCount - dayOfWeek),
        }

      }
    },

  getDatesFromRange(startDate, endDate) {
    let dates = [],
    currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(dayjs(currentDate).format("YYYY-MM-DD"));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates; 
  }

  },

  computed: {

    activeMonth: {
      get: function() {
        return this.getMonthDetails(this.activeDate);
      },

      set: function(value) {
        this.today = value
      }
    },

    weekDays: function() {
      return dayjs.weekdaysShort();
    },

    freeFrom: function() {
      return dayjs(this.freeSlot[0]).format("YYYY-MM-DD");
    },

    freeTo: function() {
      return dayjs(this.freeSlot[1]).format("YYYY-MM-DD");
    },

    freeSlotRange: function() {
      return this.getDatesFromRange(this.freeSlot[0], this.freeSlot[1])
    }
  },

  created() {
    this.setLocale();
  },

  mounted: function() {
    this.$nextTick(function() {
      console.log(
        this.getDatesFromRange(dayjs(this.today), dayjs(this.today).add(1, 'month') )
  //     console.log(
  //       dayjs()
  //         .startOf("month")
  //         .set("year", 2021)
  //         .format("YYYY-MM-DD")
      );
    });
  },
};
</script>

<style lang="scss" scoped>
$bg-mint: #00dbb1;
$arrow-color: #424c4d;
$arrow-border-width: 3px;
$arrow-width: 7px;

.callendar {
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;

  .header {
    align-items: center;
    background: $bg-mint;
    display: flex;
    height: 3.75rem;
    justify-content: space-between;

    .month-name {
      color: #fff;
      font-size: 1.3125rem;
      font-weight: 500;
    }
  }

  .btn-nav {
    all: initial;
    padding: 0 1rem;
  }

  .weekdays,
  .days {
    display: flex;
    flex-wrap: wrap;
  }

  .day {
    // padding: 0.5rem;
    flex: 14.2857142857%;
    max-width: 14.2857142857%;
    text-transform: capitalize;
    user-select: none;

    &--after,
    &--before {
      opacity: .4;
    }
  }
}

%arrow {
  display: inline-block;
  height: $arrow-width;
  user-select: none;
  width: $arrow-width;
}

.chevron-arrow-left {
  @extend %arrow;
  border-left: $arrow-border-width solid $arrow-color;
  border-top: $arrow-border-width solid $arrow-color;
  transform: rotate(-45deg);
}

.chevron-arrow-right {
  @extend %arrow;
  border-bottom: $arrow-border-width solid $arrow-color;
  border-right: $arrow-border-width solid $arrow-color;
  transform: rotate(-45deg);
}
</style>
