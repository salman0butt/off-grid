<template>
    <highcharts :options="chartOptions" ref="chartRef" />
</template>
  
<script>
export default {
    name: 'PowerChart',
    props: ['data'],
    data() {
        return {
            chartOptions: {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: 'Power rate over time',
                    align: 'left'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Power rate'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    type: 'area',
                    name: 'Power',
                    data: this.data
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
  