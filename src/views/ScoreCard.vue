<template>
  <div class="flex">
    <div class="main">
      <app-header title="Score Card"></app-header>
      <div class="content">
        <div class="filtering" @mousedown="closeOptions">
            <div class="row sc-row">
                <div class="category-filter score__">
                    <div class="filterby" @click="openOptions()">
                        <span class="suggestions">
                            <p>{{levelData}}</p>
                            <drop-svg class="downarrow" />
                        </span>
                    </div>
                </div>

                <div class="category-filter score__">
                    <div class="filterby">
                        <span class="suggestions">
                            <p>{{assigningOfficer}}</p>
                            <drop-svg class="downarrow" />
                        </span>
                    </div>
                </div>
            </div>

            <date-filter>
              <VueDatePicker v-model="date" no-header placeholder="Date range" range validate :color="color" @input="filterByDate">
                <template #input-icon>
                  <svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                          <g id="SLA-dashboard-" transform="translate(-1237.000000, -93.000000)" stroke="#000000">
                              <g id="Group-5" transform="translate(1223.000000, 77.000000)">
                                  <g id="calendar" transform="translate(15.000000, 17.000000)">
                                      <rect id="Rectangle" x="0" y="1" width="10" height="10" rx="1"></rect>
                                      <line x1="7.25" y1="0" x2="7.25" y2="2" id="Path"></line>
                                      <line x1="2.5" y1="0" x2="2.5" y2="2" id="Path"></line>
                                      <line x1="0" y1="4.5" x2="10" y2="4.5" id="Path"></line>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </svg>
                </template>
              </VueDatePicker>
            </date-filter>
        </div>

        <div class="option-open">
          <filter-options v-if="showLevels">
            <ul v-if="levels">
                <li v-for="level in levels" :key="level.id" @click="selectOption(level)">
                  {{level.name}}
                </li>
            </ul>
          </filter-options>
        </div>

        <div class="option-open officers">
          <filter-options v-if="showOfficers">
            <ul v-if="officers">
                <li v-for="officer in officers" :key="officer.id" @click="selectOfficer(officer)">
                  {{officer.first_name}} {{officer.last_name}}
                </li>
            </ul>
          </filter-options>
        </div>

        <div class="score-metrics" @click="closeOptions">
            
            <h3 class="score-metrics_heading">Metrics</h3>

            <div class="row load" v-if="isLoading">
              <mini-card :width="15" :height="50" :columns="5"/>
            </div>

            <div class="row" v-else>
                <div class="col-4">
                    <div class="metric_reader gray">
                        <span class="deep _sp">
                          <svg width="15px" height="20px" viewBox="0 0 15 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                  <g id="SLA-dashboard/-Scorecard" transform="translate(-301.000000, -216.000000)" stroke="#000000" stroke-width="1.5">
                                      <g id="file" transform="translate(302.000000, 217.000000)">
                                          <path d="M7.3125,0 L1.625,0 C0.727537282,0 0,0.80588745 0,1.8 L0,16.2 C0,17.1941125 0.727537282,18 1.625,18 L11.375,18 C12.2724627,18 13,17.1941125 13,16.2 L13,6.3 L7.3125,0 Z" id="Path"></path>
                                          <polyline id="Path" points="5 0 5 6 13 6"></polyline>
                                      </g>
                                  </g>
                              </g>
                          </svg>
                        </span>
                        <p class="meter">{{cardSummary.total}} <span class="sm">Total</span></p>
                    </div>
                </div>

                <div class="col-4">
                    <div class="metric_reader purple">
                        <span class="deep _sp">
                            <svg width="22px" height="23px" viewBox="0 0 22 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <g id="SLA-dashboard/-Scorecard" transform="translate(-574.000000, -212.000000)" stroke="#140066" stroke-width="2">
                                        <g id="check-circle" transform="translate(575.000000, 213.000000)">
                                            <path d="M19.9998871,10.0731649 L19.9998871,10.9931041 C19.9973549,15.4214974 17.0821893,19.3207669 12.8352597,20.576372 C8.58833016,21.831977 4.02132573,20.1448116 1.61089408,16.4298113 C-0.799537579,12.7148109 -0.479191662,7.85695029 2.39821096,4.49060586 C5.27561359,1.12426142 10.0246279,0.051352279 14.0699038,1.85370792" id="Path"></path>
                                            <polyline id="Path" points="19.9998871 2.98753029 9.99988708 12.9875303 6.99988708 9.99052729"></polyline>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <p class="meter">{{cardSummary.approved}} <span class="sm">Approved</span></p>
                    </div>
                </div>

                <div class="col-4">
                    <div class="metric_reader green">
                        <span class="deep _sp">
                            <svg width="23px" height="19px" viewBox="0 0 23 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                    <g id="SLA-dashboard/-Scorecard" transform="translate(-851.000000, -215.000000)" stroke="#00201A" stroke-width="2">
                                        <g id="refresh-cw" transform="translate(852.000000, 216.000000)">
                                            <polyline id="Path" points="21 1.00439092 21 7.00439092 15 7.00439092"></polyline>
                                            <polyline id="Path" points="0 16.0043909 0 10.0043909 6 10.0043909"></polyline>
                                            <path d="M2,5.99968626 C3.00496414,3.08558395 5.39666886,0.904306409 8.33491266,0.222132474 C11.2731564,-0.460041461 14.3470178,0.452292128 16.4766547,2.63863211 L21,7 M0,10 L4.52334531,14.3613679 C6.65298225,16.5477079 9.72684355,17.4600415 12.6650873,16.7778675 C15.6033311,16.0956936 17.9950359,13.9144161 19,11.0003137" id="Shape"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <p class="meter">{{cardSummary.processing}} <span class="sm">Processing</span></p>
                    </div>
                </div>

                <div class="col-4">
                    <div class="metric_reader orange">
                        <span class="deep _sp">
                          <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                  <g id="SLA-dashboard/-Scorecard" transform="translate(-1130.000000, -216.000000)" stroke="#6C3B00" stroke-width="2">
                                      <g id="search" transform="translate(1131.000000, 217.000000)">
                                          <circle id="Oval" cx="7" cy="7" r="7"></circle>
                                          <line x1="16" y1="16" x2="12" y2="12" id="Path"></line>
                                      </g>
                                  </g>
                              </g>
                          </svg>
                        </span>
                        <p class="meter">{{cardSummary.queried}} <span class="sm">Queried</span></p>
                    </div>
                </div>

                <div class="col-4">
                    <div class="metric_reader red">
                        <span class="deep _sp">
                          <svg width="16px" height="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                          viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve">
                          <path style="fill:#2f0d05;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
                            l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
                            c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
                            c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"/>
                          </svg>
                        </span>
                        <p class="meter">{{cardSummary.declined}} <span class="sm">Declined</span></p>
                    </div>
                </div>

            </div>

        </div>

        <div class="row stats" @click="closeOptions">
          <div class="col-7">
            <card cardTitle="Statistics">
              <div class="chart">
                  <chart-loader v-if="isLoading" />
                  <bar-charts :chartData="barChartData" :options="barChartOptions" v-else />
              </div>
            </card>
          </div>

          <div class="col-3">
            <card cardTitle="Performance Rating" class="pie-chart">
              <chart-loader v-if="isLoading" />
              <pie-chart class="rid" :chartData="chartData" :options="chartOptions" v-else />
              <div class="stats-data">
                <div class="stats-performance">
                  <p><span class="exc"></span>Excellent</p>
                  <p><span class="ave"></span>Average</p>
                </div>
                <div class="stats-performance">
                  <p><span class="good"></span>Good</p>
                  <p><span class="poor"></span>Poor</p>
                </div>
              </div>
            </card>
          </div>
        </div>

        <div class="approved" @click="closeOptions">
          <card class="apr" cardTitle="Top 5 Officers">
            <table-loader v-if="isLoadingTable" />
            <table class="table" v-else>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="officer in topOfficers" :key="officer.id">
                  <td>{{officer.name}}</td>
                  <td>{{officer.level}}</td>
                  <td>
                    <span :class="[officer.rating === 'Very Bad'? 'verybad' : officer.rating === 'Bad'? 'bad' : officer.rating === 'Good'? 'good' : officer.rating === 'Very Good'? 'verygood' : officer.rating === 'Excellent'? 'excellent' : officer.rating === 'Average'? 'average' : '']"></span>
                    {{officer.rating}}
                  </td>
                </tr>
              </tbody>

            </table>
          </card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import Card from '@/components/Card.vue';
import DropSvg from '@/components/DropSvg.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import DateFilter from '@/components/DateFilter.vue';
import PieChart from '@/components/charts/PieChart.vue';
import BarCharts from '@/components/charts/BarCharts.vue';
import ChartLoader from '@/components/loaders/ChartLoader.vue';
import MiniCard from '@/components/loaders/MiniCard.vue';
import TableLoader from '@/components/loaders/TableLoader.vue';

import {getScoreBoard, getAdmin, officerRatings} from '@/services/ScoreCardEndpoint';

export default {
  name: 'ScoreCard',
  components: {
    AppHeader,
    Card,
    DropSvg,
    PieChart,
    BarCharts,
    DateFilter,
    FilterOptions,
    ChartLoader,
    MiniCard,
    TableLoader
  },
  data() {
    return {
      date: null,
      color: "#509FB4",
      cardSummary: {},
      levels: [],
      showOfficers: false,
      officers: [],
      assigningOfficer: "All Officers",
      levelData: "All Levels",
      singleAdminId: null,
      showLevels: false,
      isLoading: false,
      isLoadingTable: false,
      performaceRating: [],
      statSummary: {
        labels: [],
        values: []
      },
      topOfficers: [],
      chartData: {},
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {enabled: true},
        legend: {
          display: false
        }
      },
      barChartData: {},
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getScoreCard();
    this.getTopOfficers();
  },
  methods: {
    getScoreCard() {
      this.isLoading = true;
      getScoreBoard({
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        ...(this.singleAdminId? {admin_id: this.singleAdminId} : '')
      })
      .then(res => {
        this.cardSummary = res.data.card_summaries;
        this.levels = res.data.roles;
        this.performaceRating = Object.values(res.data.performance_rating);
        this.statSummary.labels = Object.keys(res.data.statistics_summaries);
        this.statSummary.values = Object.values(res.data.statistics_summaries);
        this.fillDoughnutData(this.performaceRating);
        this.fillBarChartData(this.statSummary.labels, this.statSummary.values);
        this.isLoading = false;
      })
      .catch(err => err)
    },
    getAdminLevel(roleId) {
      getAdmin(roleId)
        .then(res => {
          this.officers = res.data;
          this.showOfficers = true;

          if(this.officers.length === 1) {
            this.showOfficers = false;
            this.assigningOfficer = this.officers[0].first_name + ' ' + this.officers[0].last_name;
            this.singleAdminId = this.officers[0].user_id;
            this.getScoreCard();
          }
        })
    },
    openOptions() {
      this.showLevels = !this.showLevels
      document.querySelector('.downarrow').classList.add("downarrow_active");
      if(this.showLevels === false) {
        document.querySelector('.downarrow').classList.remove("downarrow_active");
      }
    },
    closeOptions() {
      this.showLevels = false;
      this.showOfficers = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
    },
    selectOption(option) {
      this.levelData = option.name;
      this.getAdminLevel(option.id);
      this.assigningOfficer = this.assigningOfficerId;
      this.showLevels = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
    },
    selectOfficer(option) {
      this.assigningOfficer = option.first_name + ' ' + option.last_name;
      this.singleAdminId = option.user_id;
      this.showOfficers = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
      this.getScoreCard();
    },
    filterByDate() {
      this.getScoreCard();
    },
    getTopOfficers() {
      this.isLoadingTable = true;
      officerRatings()
      .then(res => {
        this.topOfficers = res.data;
        this.isLoadingTable = false;
      })
      .catch(err => err)
    },
    fillDoughnutData(data) {
      this.chartData = {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Excellent", "Good", "Average", "Poor"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#092BA8", "#4F6EDE", "#9DB2FF", "#E2E8FF"],
            data: data
          }
        ]
      }
    },
    fillBarChartData(labels, data) {
      this.barChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: "#509FB4",
            borderColor: "#509FB4",
            borderWidth: 1
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.filtering {
  display: flex;
  justify-content: space-between;
}

.filterby {
  display: flex;

  & svg {
    margin-right: 10px;
  }
}

.filter-title {
  font-size: 14px;
  color: #1F2223;
  margin-right: 10px;
}

.suggestions {
  display: flex;
  align-items: center;
  cursor: pointer;

  & p {
    font-size: 14px;
    color: #aaa;
    padding-right: 10px;
  }
}

.category-filter {
  border: 1px solid #ddd;
  max-width: 395px;
  padding: 15px 23px;
  border-radius: 6px;
  margin: 20px 0 10px;
}

.metrics {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 9px;
  padding: 30px 40px;
}

.metrics-col {
  width: 20%;
}

.metrics-title  {
  font-size: 20px;
  color: #2B2F32;
}

.metrics-total {
  color: #000;

  & p {
    font-size: 14px;
    color: #6A6A6A;
    margin-top: 10px;
    display: flex;
    align-items: center;

    &:before {
    display: block;
    content: '';
    height: 10px;
    width: 10px;
    border-radius: 50px;
    margin-right: 8px;
    }
  }

  & .red {
    &:before {
      background-color: #D55067;
    }
  }

  & .dark {
    &:before {
      background-color: #000;
    }
  }

  & .lemon {
    &:before {
      background-color: #35BCA0;
    }
  }

  & .orange {
    &:before {
      background-color: #FF8A00;
    }
  }

  & .yellow {
    &:before {
      background-color: #EFAA59;
    }
  }
}

.stats {
  margin: 20px 0;

  & .col-7 {
    padding-right: 10px;
  }

  & .stats_fig {
    color: #2B2F32;

    & p:last-child {
      font-size: 14px;
      padding-top: 11px;
      color: #B1B1B1;
    }
  }
}

.fig {
  justify-content: space-between;
}


.table {
  border-collapse: collapse;
  margin: 10px 10px 0;

  & tr {
    & th {
      color: #ADADAD;
      font-family: 'Apercu Pro Regular';
      font-size: 16px;
      text-align: left;
      width: 400px;
      border-bottom: 0.2px solid #B1B1B150;
      padding: 0 20px 15px;
    }
  }
    & tbody {
      & tr {
        padding: 15px;
        margin: 10px;
        border-bottom: 0.2px solid #9D9C9C50;

        &:last-child {
          border-bottom: 0;
        }
        
        & td {
          color: #2B2F32;
          padding: 20px;
          text-transform: capitalize;
        }
      }
    }

}

///
.sc-row {
    justify-content: space-between;
    width: 500px;
}

.scrore-metrics {
    padding: 0 60px;
}

.score-metrics_heading {
    font-size: 16px;
    font-family: 'Apercu Pro Medium';
}

.apr {
    padding-right: 30px;
}

.score-metrics {
    padding: 50px 30px;
}

.metric_reader {
    max-width: 180px;
    font-size: 23px;
    margin-top: 20px;
    display: flex;

    & .meter {
      padding: 10px;
    }

    & .sm {
        font-size: 13px;
    }

    & ._sp {
      width: 50px;
      text-align: center;
      padding: 10px;
    }
}

.gray {
    background-color: #E2E2E2;
    color: #000000;

    & .deep {
        background-color: #999999;
    }

    & .sm {
      color: #707070;
    }
}

.purple {
    background-color: #EEEAFF;
    color: #190082;

    & .deep {
        background-color: #B19EFF;
    }

    & .sm {
      color: rgba(25,0,130,0.48);;
    }
}

.green {
    background-color: #D4F8F1;
    color: #00483A;

    & .deep {
        background-color: #42AF9A;
    }

    & .sm {
      color: rgba(0,72,58,0.58);
    }
}

.orange {
    background-color: #FFEFDC;

    & .deep {
        background-color: #FCB969;
    }

    & .sm {
      color: rgba(108,59,0,0.72);
    }
}

.red {
    background-color: #ffd3c9;

    & .deep {
        background-color: #ff4921;
    }

    & .sm {
      color: rgba(125,72,60,1);
    }
}

.stats-data {
  max-width: 300px;
  margin: 50px auto 30px;
  padding-left: 40px;
}

@mixin block($background) {
  display: inline-block;
  background: $background;
  height: 12px;
  width: 12px;
  margin-right: 5px;
  border-radius: 3px;
}

.stats-performance {
  display: flex;

  margin-bottom: 20px;

  & p {
    
    width: 300px;

    .exc {
      @include block(#092BA8)
    }
    .ave {
      @include block(#9DB2FF)
    }
    .good {
      @include block(#4F6EDE)
    }
    .poor {
      @include block(#E2E8FF)
    }
  }
}

.chart {
  margin-top: 30px;
}

.option-open {
  position: absolute;
  width: 300px;
  z-index: 3;

  &.officers {
    left: 540px;
    text-transform: capitalize;
  }
}

.score__ {
  width: 400px;
  margin-right: 10px;

  & .suggestions {

    & p {
      width: 200px;
      text-transform: capitalize;
    }
  }
}

.load {
  margin-top: 15px;
}
</style>
