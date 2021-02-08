<template>
  <div class="calendar" @blur="hideCalendar" tabindex="0" :ref="id" :id="id">
    <div class="header">
      <span class="btn-nav btn-nav--prev" type="button" @click="prevMonth()">
        <span class="chevron-arrow-left"></span>
      </span>
      <div class="month-name">
        {{ activeMonth.name }} {{ activeMonth.date.year }}
      </div>
      <span class="btn-nav btn-nav--next" type="button" @click="nextMonth()">
        <span class="chevron-arrow-right"></span>
      </span>
    </div>

    <div class="weekdays">
      <div v-for="(day, index) of weekDays" :key="index" class="day">
        {{ day }}
      </div>
    </div>
    <div class="days">
      <span
        v-for="(dayMonthPrev, index) of activeMonth.monthBefore.daysList"
        :key="`${index}-before`"
        class="day day--before"
      >
        {{ dayMonthPrev }}
      </span>
      <div
        v-for="(day, index) of activeMonth.daysList"
        :key="index"
        :class="
          `day ${
            (id === 'calendarCheckIn' && dayCheckIn && day === dayCheckIn) ||
            (id === 'calendarCheckOut' && dayCheckOut && day === dayCheckOut)
              ? 'active'
              : ''
          }
          ${setClasses(day, datesFreeRange, 'free')}${setClasses(
            day,
            datesBusyRange,
            'busy'
          )}`
        "
        @click="selectDay(day)"
      >
        <span>
          {{ getDayFromDate(day) }}
        </span>
      </div>
      <div
        v-for="(day, index) of activeMonth.monthAfter.daysList"
        :key="`${index}-after`"
        class="day day--after"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
const localeData = require("dayjs/plugin/localeData");

const monthsList = (start, end, length = end - start) =>
  Array.from({ length }, (_, i) => start + i + 1);

require("dayjs/locale/pl");
require("dayjs/locale/en");
dayjs.extend(localeData);

const MAX_FIELDS = 35;
const TODAY = dayjs().format("YYYY-MM-DD");

export default {
  name: "Calendar",
  props: {
    id: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      default: "en"
    },
    datesBusy: {
      type: Array
    },
    datesFree: {
      type: Array
    },
    isShowCheckIn: {
      type: Boolean
    },
    isShowCheckOut: {
      type: Boolean
    },
    dayCheckIn: {
      type: String
    },
    dayCheckOut: {
      type: String
    }
  },

  data: function() {
    return {
      title: "calendar",
      currentLocale: "en",
      now: {
        days: dayjs().daysInMonth()
      },
      today: TODAY,
      activeDate: TODAY
    };
  },

  methods: {
    setLocale() {
      this.currentLocale = this.locale;
      dayjs.locale(this.currentLocale);
    },

    prevMonth() {
      this.activeDate = dayjs(this.activeDate).subtract(1, "month");
    },

    nextMonth() {
      this.activeDate = dayjs(this.activeDate).add(1, "month");
    },

    monthDaysArray(daysCount, startDay = 0, length = daysCount - startDay) {
      return monthsList(startDay, daysCount, length);
    },

    dayOfWeek(shortNameOfWeekDay) {
      return this.weekDays.indexOf(shortNameOfWeekDay);
    },

    getDateObject(selectedDate) {
      return {
        day: dayjs(selectedDate).format("D"),
        month: dayjs(selectedDate).format("M"),
        year: dayjs(selectedDate).format("YYYY")
      };
    },

    getDayFromDate(date) {
      return dayjs(date).format("D");
    },

    getMonthDetails(selectedDate) {
      const date = selectedDate;
      const year = dayjs(date).format("YYYY");
      const month = dayjs(date).format("MM");
      const daysCount = dayjs(date).daysInMonth();
      const firstDay = dayjs(date)
        .date(1)
        .format("ddd");
      const prevMonth = dayjs(date).subtract(1, "month");
      const dayOfWeek = this.dayOfWeek(firstDay);
      const prevMonthDaysCount = prevMonth.daysInMonth();

      return {
        date: this.getDateObject(date),
        name: dayjs(date).format("MMMM"),
        shortName: dayjs(date).format("MMM"),
        daysCount: daysCount,
        daysList: this.getDatesFromRange(
          dayjs(`${year}-${month}-1`).toDate(),
          dayjs(`${year}-${month}-${daysCount}`).toDate()
        ),
        firstDay: firstDay,
        dayOfWeek: dayOfWeek,
        monthBefore: {
          date: this.getDateObject(prevMonth),
          daysCount: prevMonthDaysCount,
          daysList: this.monthDaysArray(
            dayOfWeek,
            prevMonthDaysCount - dayOfWeek,
            dayOfWeek
          )
        },

        monthAfter: {
          daysList: this.monthDaysArray(MAX_FIELDS - daysCount - dayOfWeek)
        }
      };
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
    },

    isSelected(day, range) {
      return range.includes(day);
    },

    setClasses(day, range, groupName) {
      let classes = "";
      range.forEach(array => {
        const isSelected = this.isSelected(day, array);
        if (isSelected === true) {
          classes = `day--${groupName}`;
          if (array.indexOf(day) === 0) {
            classes += " first";
          } else if (array.indexOf(day) === array.length - 1) {
            classes += " last";
          }
        }
      });
      return classes;
    },

    hideCalendar() {
      if (this.id === "calendarCheckIn") {
        this.$emit("update:isShowCheckIn", false);
      } else if (this.id === "calendarCheckOut") {
        this.$emit("update:isShowCheckOut", false);
      }
    },

    selectDay(dayChecked) {
      if (this.id === "calendarCheckIn") {
        this.$emit("update:dayCheckIn", dayChecked);
      } else if (this.id === "calendarCheckOut") {
        this.$emit("update:dayCheckOut", dayChecked);
      }
    }
  },

  watch: {
    isShowCheckIn: {
      immediate: true,
      handler(newValue) {
        if (newValue === true) {
          this.$nextTick(function() {
            this.$refs[this.id].focus();
          });
        }
      }
    },
    isShowCheckOut: {
      immediate: true,
      handler(newValue) {
        if (newValue === true) {
          this.$nextTick(function() {
            this.$refs[this.id].focus();
          });
        }
      }
    }
  },

  computed: {
    activeMonth: {
      get: function() {
        return this.getMonthDetails(this.activeDate);
      },

      set: function(value) {
        this.today = value;
      }
    },

    weekDays: function() {
      return dayjs.weekdaysShort();
    },

    datesFreeRange: function() {
      const result = [];
      const dates = this.datesFree;
      dates.forEach(array => {
        result.push(this.getDatesFromRange(array[0], array[1]));
      });
      return result;
    },
    datesBusyRange: function() {
      const result = [];
      const dates = this.datesBusy;
      dates.forEach(array => {
        result.push(this.getDatesFromRange(array[0], array[1]));
      });
      return result;
    }
  },

  created() {
    this.setLocale();
  }
};
</script>

<style lang="scss" scoped>
$mint: #00dbb1;
$red: #e53e3e;
$red-light: #fed7d7;
$light-mint: #c3fef8;
$arrow-color: #424c4d;
$text-color: #98a5b6;
$light-gray: #e1e1e1;
$calendar-margin-top: 0.625rem;
$border-color: #dadada;

$arrow-border-width: 0.1875rem;
$arrow-width: 0.4375rem;
$max-width: 21.875rem;
$day-height: 2.5rem;
$header-height: 3.75rem;
$day-y-padding: 0.313rem;
$form-group-height: 2.6875rem;

%display-middle {
  align-items: center;
  display: flex;
  justify-content: center;
}

%radius-corners {
  &.first {
    span {
      border-bottom-left-radius: $day-height / 2;
      border-top-left-radius: $day-height / 2;
    }
  }
  &.last {
    span {
      border-bottom-right-radius: $day-height / 2;
      border-top-right-radius: $day-height / 2;
    }
  }

  &.first {
    &:before {
      left: auto;
      max-width: 50%;
      right: 0;
    }
  }
  &.last {
    &:before {
      left: 0;
      max-width: 50%;
      right: auto;
    }
  }
}

.calendar {
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  max-width: $max-width;
  padding-top: $calendar-margin-top;
  position: absolute;
  top: $form-group-height;
  z-index: 2;

  &#calendarCheckIn {
    left: 0;
    &:before {
      left: 1.5625rem;
    }
  }

  &#calendarCheckOut {
    right: 0;
    &:before {
      right: 1.5625rem;
    }
  }

  &:before {
    content: "";
    border-color: $border-color $border-color transparent transparent;
    border-style: solid;
    border-width: 1px;
    height: 0.75rem;
    position: absolute;
    top: 0.1875rem;
    transform: rotate(-45deg);
    width: 0.75rem;
    z-index: -1;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  .fieldset {
    max-width: 22.1875rem;
  }

  .header {
    align-items: center;
    background: $mint;
    display: flex;
    height: $header-height;
    justify-content: space-between;

    .month-name {
      color: #fff;
      font-size: 1.3125rem;
      font-weight: 500;
      user-select: none;
    }
  }

  .btn-nav {
    all: initial;
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0 1rem;
    position: relative;

    &:before {
      background: rgba($arrow-color, 0.3);
      bottom: calc(50% - #{$arrow-width} * 1.3);
      content: "";
      height: 0.125rem;
      position: absolute;
      top: auto;
      transform: translateY(-50%);
      width: $arrow-width * 1.3;
    }

    &:hover {
      cursor: pointer;
    }

    &--prev:before {
      left: auto;
      right: calc(50% - 0.125rem);
    }

    &--next:before {
      left: calc(50% - 0.125rem);
      right: auto;
    }
  }

  .weekdays,
  .days {
    background: #fff;
    border-width: 0 1px 1px 1px;
    border: 1px solid $light-gray;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.875rem;
    padding-left: 0.875rem;
    padding-right: 0.875rem;

    & > .day {
      &--free {
        &:before {
          background-color: $light-mint;
          bottom: $day-y-padding;
          content: "";
          left: 0;
          position: absolute;
          top: $day-y-padding;
          width: 100%;
          z-index: 0;
        }

        span {
          color: $mint;
        }
        &.first,
        &.last {
          span {
            color: #fff;
            z-index: 2;
            &:before {
              background: $mint;
              border-radius: 50%;
              bottom: 0;
              content: "";
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              z-index: -1;
            }
          }
        }
        @extend %radius-corners;
      }

      &--busy {
        pointer-events: none;
        &:before {
          background: $red-light;
          bottom: $day-y-padding;
          content: "";
          left: 0;
          position: absolute;
          top: $day-y-padding;
          width: 100%;
          z-index: 0;
        }

        &.first,
        &.last {
          span {
            color: #fff;
            z-index: 2;
            &:before {
              background: $red;
              border-radius: 50%;
              bottom: 0;
              content: "";
              left: 0;
              position: absolute;
              right: 0;
              top: 0;
              z-index: -1;
            }
          }
        }
        @extend %radius-corners;
      }
    }
  }

  .day {
    @extend %display-middle;
    color: $text-color;
    flex: 14.2857142857%;
    font-weight: 500;
    height: $day-height;
    max-width: 14.2857142857%;
    padding: $day-y-padding 0;
    position: relative;
    text-transform: capitalize;
    user-select: none;

    &.active {
      &:after {
        border-radius: 50%;
        border: 2px solid $mint;
        content: "";
        height: $day-height;
        position: absolute;
        width: $day-height;
        z-index: 3;
      }
    }

    span {
      @extend %display-middle;
      display: flex;
      flex: 100%;
      height: 100%;
      max-width: $day-height;
      position: relative;
    }

    &--after,
    &--before {
      opacity: 0.4;
    }
  }
}

%arrow {
  display: flex;
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
