<template>
<div class="hello">
    <h1>{{ msg }}</h1>
    <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
</div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: "Calendar",
    props: {
        msg: String
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(dayjs().startOf('month').add(1, 'day').set('year', 2021).format('YYYY-MM-DD HH:mm:ss'));
        })
    }

};
</script>

<style lang="scss" scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
