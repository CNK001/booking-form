<template>
  <div class="rating">
    <div class="rating__stars">
      <RatingStar :range="1" v-for="n in completeRange" v-bind:key="`full-${n}`" />
      <RatingStar :range="0.5" v-for="n in halfRange" v-bind:key="`half-${n}`" />
      <RatingStar :range="0" v-for="n in emptyRange" v-bind:key="`empty-${n}`" />
    </div>
    <div v-if="count" class="rating__count">{{ count }}</div>
  </div>
</template>

<script>
import RatingStar from "./RatingStar.vue";
const range = (start, end, length = end - start) =>
  Array.from({ length }, (_, i) => start + i);

export default {
  name: "Rating",
  components: {
    RatingStar
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    count: {
      type: Number
    },
    total: {
      type: Number,
      default: 5
    }
  },

  data: function() {
    return {
      completeRange: range(0, this.value),
      halfRange: range(0, this.value % 1 === 0 ? 0 : 1),
      emptyRange: range(0, this.total - this.value)
    };
  },
};
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  margin-bottom: 1 rem;

  &__stars {
    .star {
      max-width: 0.875rem;
      max-height: 0.875rem;
    }
  }

  &__count {
    margin-left: 0.25rem;
    color: #454545;
    font-weight: bolder;
    font-size: 0.875rem;
  }
}
</style>
