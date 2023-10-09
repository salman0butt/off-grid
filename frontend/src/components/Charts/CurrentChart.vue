<template>
    <highcharts :options="chartOptions" ref="chartRef" />
</template>
  
<script>

export default {
    props: ['data'],
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Current'
                },
                xAxis: {
                    categories: this.data.map((item) => item[0]),
                    accessibility: {
                        description: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Current'
                    },
                    labels: {
                        format: '{value} V'
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: 'Current',
                    marker: {
                        symbol: 'square'
                    },
                    data: this.data.map((item) => item[1])

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
  