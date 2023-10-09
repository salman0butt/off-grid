<template>
  <div class="dashboard">
    <h1>Welcome to the Dashboard</h1>
    <button @click="genrate">{{ loading ? 'Generating...' : 'Generate' }}</button>
    <div v-if="powerData && powerData.length > 0" class="charts">
      <Chart :powerData="powerData" :currentData="currentData" :chargeData="chargeData" />
    </div>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import Chart from '../components/Charts/Chart.vue'

export default {
  name: 'Dashboard',
  components: {
    Chart
  },
  data() {
    return {
      powerData: [],
      currentData: [],
      chargeData: [],
      loading: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions(['genrateData', 'getData']),
    async genrate() {
      try {
        this.loading = true;
        const response = await this.genrateData();
        // console.log(response);
        // if (response.data) {
        //   this.setFormateData(response.data);
        // }
        this.fetchData();
        this.loading = false;

      } catch (error) {
        console.log(error);
      }
    },
    setFormateData(data) {
      function formatShortHumanReadableDate(dateTimeString) {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const dateTime = new Date(dateTimeString);

        return dateTime.toLocaleString(undefined, options);
      }
      const { powerData, currentData, chargeData } = data;
      this.powerData = powerData?.map(function (item) {
        const unixTimestamp = new Date(item.timestamp);

        return [formatShortHumanReadableDate(item.timestamp), item.value]
      });

      this.currentData = currentData?.map(function (item) {
        const unixTimestamp = new Date(item.timestamp).getTime();

        return [formatShortHumanReadableDate(item.timestamp), item.value]
      });

      this.chargeData = chargeData?.map(function (item) {
        const unixTimestamp = new Date(item.timestamp).getTime();

        return [formatShortHumanReadableDate(item.timestamp), item.value]
      });
    },
    async fetchData() {
      try {
        this.loading = true;
        const response = await this.getData();
        console.log(response);

        if (response.data) {
          this.setFormateData(response.data);
        }
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  
<style scoped>
.dashboard {
  text-align: center;
  margin: 20px;
}

h1 {
  font-size: 2em;
  color: #000000;
}

p {
  font-size: 1.2em;
  margin-top: 20px;
  color: #000000;
}

button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

.charts {
  margin: 10px;
}
</style>
  