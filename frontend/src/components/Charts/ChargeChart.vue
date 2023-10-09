<template>
    <highcharts :options="chartOptions" ref="chartRef" />
</template>
  
<script>

export default {
    name: 'ChargeChart',
    props: ['data'],
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Charge'
                },
                xAxis: {
                    categories: this.data.map((item) => item[0]),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Percent (%)'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Charge',
                    data: this.data.map((item) => item[1]),

                }]
            }
        }
    },
    watch: {
        data: {
            handler(newData) {
                // Update the chart series data when the prop data changes
                if (this.$refs.chartRef && this.$refs.chartRef.chart) {
                    this.$refs.chartRef.chart.update({
                        series: [
                            {
                                data: newData
                            }
                        ]
                    });
                }
            },
            immediate: true
        }
    }
};
</script>
  