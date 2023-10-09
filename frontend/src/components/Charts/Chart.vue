<template>
    <div class="chart-conatiner">
        <power-chart :data="powerData"></power-chart>
        <charge-chart :data="chargeData"></charge-chart> 
        <current-chart :data="currentData"></current-chart>
    </div>
</template>
  
<script>
import PowerChart from './PowerChart.vue';
import CurrentChart from './CurrentChart.vue';
import ChargeChart from './ChargeChart.vue';

export default {
    name: 'Chart',
    components: {
        PowerChart,
        CurrentChart,
        ChargeChart,
    },
    props: {
        powerData: {
            type: Array,
            required: true,
        },
        currentData: {
            type: Array,
            required: true,
        },
        chargeData: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {

        };
    },
};
</script>
  
<style>
.chart-conatiner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>