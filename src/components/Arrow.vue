<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 19.5 13.2"
    style="enable-background:new 0 0 19.5 13.2;"
    xml:space="preserve"
    class="arrow"
  >
    <g>
      <path class="st0" d="M12.7,0.5l6.1,6.1l-6.1,6.1 M0,6.6h18.8" />
    </g>
  </svg>
</template>
<script>
export default {
  name: "Arrow",
  data: function() {
    return {
      config: {
        colorEmpty: "#becacb",
        colorFilled: "#3b787b",
        stroke: "none"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.arrow {
  width: 23px;
  margin: 0 0.5rem;
}
.st0 {
  fill: none;
  stroke: #6a6a6a;
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
</style>
