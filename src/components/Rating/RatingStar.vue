<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="255"
    height="240"
    viewBox="0 0 51 48"
    class="star"
  >
    <defs>
      <linearGradient :id="gradeId" v-if="range > 0 && range < 1">
        <stop
          :offset="`${currentRange * 100}%`"
          :stop-color="config.colorFilled"
        />
        <stop
          :offset="`${100 - currentRange * 100}%`"
          :stop-color="config.colorEmpty"
          stop-opacity="1"
        />
      </linearGradient>
    </defs>
    <path
      :fill="
        range > 0 && range < 1
          ? `url(#${gradeId})`
          : range < 1
          ? config.colorEmpty
          : config.colorFilled
      "
      :stroke="config.stroke"
      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
    />
  </svg>
</template>

<script>
export default {
  name: "RatingStar",
  data: function() {
    return {
      config: {
        colorEmpty: "#becacb",
        colorFilled: "#3b787b",
        stroke: "none"
      }
    };
  },
  props: {
    range: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentRange: function() {
      return this.range;
    },
    gradeId: function() {
      return `grade-${this.currentRange * 100}`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
