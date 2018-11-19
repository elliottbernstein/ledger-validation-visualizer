<template>
  <div class="container">
    <div class="row">
      <div class="col">
        </div>
    </div>
    <div class="row">
      <div class="form-group col-6 col-md-4">
        <table class="data-table">
          <tr><th>time(sec)</th><th>seq#</th><th>validations</th></tr>
            <tr v-for="(t, index) in data" v-if=" data[index].validations > 0 && index > data.length - 150">
              <td v-model="data[index]">
                {{data[index].time}}
              </td>
              <td v-model="data[index]">
                {{data[index].sequence}}
              </td>
              <td v-model="data[index]">
                {{data[index].totalValidations}}
              </td>
            </tr>
        </table>
      </div>
      <div class="col-6 col-md-8">
        <div class="row">
          <div class="col-12">
            <div class="placeholder" v-if="data.length < 50">
              <div class="loader">Loading chart data, {{((data.length/50)*100).toFixed(0)}}% complete<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>
              </div>
            </div>
            <v-chart v-else v-bind:chartData="lineGraphData"></v-chart>
          </div>
          <div style="margin-top: -50px; float:right;">
            <span class="stats-item">Stats for Nerds</span>
            <br>
            <span class="stats-item">------------------------------------</span>
            <br>
            <span class="stats-item" v-model="duration">Run duration: {{duration}} seconds</span>
            <br>
            <span class="stats-item" v-model="avg">Average validation: {{avg}} seconds</span>
            <br>
            <span v-if="this.data.length <= 5" class="stats-item" v-model="min">Slowest val (SMA 50): calcuating...</span>
            <span v-if="this.data.length > 5" class="stats-item" v-model="min">Slowest val (SMA 50): {{min}} seconds</span>
            <br>
            <span v-if="this.data.length <= 5" class="stats-item" v-model="min">Fastest val (SMA 50): calcuating...</span>
            <span  v-if="this.data.length > 5" class="stats-item" v-model="max">Fastest val (SMA 50): {{max}} seconds</span>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../assets/data/ledgersData";

export default {
  name: "ledgersChart",
  computed: { // computed properties needed for our stats section
    duration: function () {
      if (this.data.length > 0) {
        return (this.data[this.data.length-1].time)
      }
      return 0
    },
    total: function () {
      return this.data.reduce(function(a, b){
          return a + b.validations;
      }, 0);
    },
    valSpeeds: function () {
      return this.data.filter(i => i.validationSpeed > 0.00001).map(i => i.validationSpeed);
    },
    avg: function () {
      if (this.data.length > 0) {
        const valSpeedsSum = this.valSpeeds.reduce((a,b) => b += a)/1000
        return (valSpeedsSum/this.valSpeeds.length).toFixed(3)
      }
      return 0
    },
    min: function () {
      return (this.valSpeeds.sort().reverse()[0]/1000).toFixed(3)
    },
    max: function () {
      return (this.valSpeeds.sort()[0]/1000).toFixed(3)
    }
  },
  data() {
    return {
      data: data,
      lineGraphData: {
        chartType: "lineGraph",
        selector: "lineGraph",
        title: "Validated Ledgers",
        width: 600,
        height: 400,
        metric: ["averageValidation"],
        dim: "time",
        data: data,
        legends: {
          enabled: true,
          height: 25,
          width: 50
        },
      },
    };
  }
};
</script>

<style>
@keyframes blink {50% { color: transparent }}
.data-table{
  font-size: 12px;
}
.header {
  font-weight: 600;
}
table, th, td {
  border: 1px grey solid;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-right: 5px;
  padding-left: 5px;
}
.stats-item{
  float: left;
}
.placeholder {
  height: 430px;
}
.loader__dot { animation: 1s blink infinite }
.loader__dot:nth-child(2) { animation-delay: 250ms }
.loader__dot:nth-child(3) { animation-delay: 500ms }

.tick:not(:nth-child(20n)) [y]:not([y=""]) {
    visibility: hidden;
}
</style>
