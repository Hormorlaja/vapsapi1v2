<template>
  <div class="flex">
    <div class="main">
      <app-header title="Overview" />
      <div class="content">
        <div class="filtering" @mousedown="closeOptions">
          <div class="category-filter">
            <div class="filterby">
              <svg width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                      <g id="SLA-dashboard-" transform="translate(-278.000000, -94.000000)" stroke="#000000" stroke-width="1.5">
                          <g id="filter-copy" transform="translate(279.000000, 95.000000)">
                              <polygon id="Path" points="15 0 0 0 6 7.35777778 6 12.4444444 9 14 9 7.35777778"></polygon>
                          </g>
                      </g>
                  </g>
              </svg>
              <span class="filter-title">Filter by:</span>
              <span class="suggestions" @click="openOptions()">
                <p class="_option">{{this.optionData}}</p>
                <drop-svg class="downarrow" />
              </span>
            </div>
          </div>

          <!-- <drop-filter iconBefore :title="optionData" @option="openOptions()" /> -->
          
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
          <filter-options v-if="showOptions">
            <ul v-if="options">
                <li v-for="option in options" :key="option.id" @click="dropOptions(option)">
                  {{option.value}}
                  <span class="arrow-right">
                    <svg class="downarrow" width="12px" height="8px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g id="SLA-dashboard-" transform="translate(-1344.000000, -98.000000)" stroke="#000000">
                                <g id="Group-5" transform="translate(1223.000000, 77.000000)">
                                    <g id="chevron-down-copy" transform="translate(122.000000, 22.000000)">
                                        <polyline id="Path" points="0 0 4 4 8 0"></polyline>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </span>
                </li>
            </ul>
          </filter-options>
        </div>

        <div class="option-sub">
          <filter-options v-if="loadOptionsSector">
            <ul>
                <li v-for="filterOptionSector in filterOptionSectors" :key="filterOptionSector.id" @click="selectOption(filterOptionSector)">{{filterOptionSector.name}}</li>
            </ul>
          </filter-options>

          <filter-options v-if="loadOptionsBeneficiary">
            <ul>
                <li v-for="beneficiary in filterOptionsBeneficiary" :key="beneficiary.id" @click="selectOption(beneficiary)">{{beneficiary.name}}</li>
            </ul>
          </filter-options>

          <filter-options v-if="loadOptionsAdmin">
            <ul>
                <li v-for="admin in filterOptionAdmin" :key="admin.id" @click="selectOption(admin)">{{admin.name}}</li>
            </ul>
          </filter-options>
        </div>
        <div @click="closeOptions()">
          <div class="metrics" v-if="loading">
            <mini-card :width="20" :height="50" :columns="4"/>
          </div>
          
          <div class="metrics" v-else>
            <!-- <div class="metrics-col">
              <p class="metrics-title">{{cardSummary.total_duration}} days</p>
              <div class="metrics-total">
                <p class="dark">Total Duration</p>
              </div>
            </div> -->

            <div class="metrics-col">
              <p class="metrics-title">{{cardSummary.approved}} days</p>
              <div class="metrics-total">
                <p class="lemon">Approved Applications</p>
              </div>
            </div>

            <div class="metrics-col">
              <p class="metrics-title">{{cardSummary.processing}} days</p>
              <div class="metrics-total red">
                <p class="orange">Processing Applications</p>
              </div>
            </div>

            <div class="metrics-col">
              <p class="metrics-title">{{cardSummary.queried}} days</p>
              <div class="metrics-total">
                <p class="yellow">Queried Applications</p>
              </div>
            </div>

            <div class="metrics-col">
              <p class="metrics-title">{{cardSummary.pending}} days</p>
              <div class="metrics-total">
                <p class="red">Pending Applications</p>
              </div>
            </div>
          </div>

          <div class="row stats">
            <div class="col-7">
              <card cardTitle="Statistics">
                <mini-card :width="15" :height="40" :columns="3" v-if="loading"/>
                <div class="row fig" v-else>
                  <div class="stats_fig">
                    <p>{{parseInt(time.overall_average_processing_time) | formatToDays}}</p>
                    <p>Average processing time</p>
                  </div>

                  <div class="stats_fig">
                    <p>{{parseInt(time.overall_maximum_processing_time) | formatToDays}}</p>
                    <p>Maximum processing time</p>
                  </div>

                  <div class="stats_fig">
                    <p>{{parseInt(time.overall_minimum_processing_time) | formatToDays}}</p>
                    <p>Minimum processing time</p>
                  </div>
                </div>

                <div class="line-chart">
                  <chart-loader v-if="loading" />
                  <line-chart :chartData="lineChartData" :options="lineChartOptions" v-else />
                </div>

              </card>
            </div>

            <div class="col-3">
              <card cardTitle="Status" class="pie-chart">
                  <chart-loader v-if="loading" />
                  <div v-else>
                    <pie-chart class="rid" :chartData="pieChartData" :options="pieChartOptions" />
                    <div class="status-data">
                      <p class="apr"><span class="status-data_rate">Approved</span>{{statusPercentages.approved}}%</p>
                      <p class="pro"><span class="status-data_rate">Processing</span>{{statusPercentages.processing}}%</p>
                      <p class="qur"><span class="status-data_rate">Queried</span>{{statusPercentages.queried}}%</p>
                      <p class="pen"><span class="status-data_rate">Pending</span>{{statusPercentages.pending}}%</p>
                      <p class="awi"><span class="status-data_rate">Awaiting Assignment</span>{{statusPercentages.awaitingAssignment}}%</p>
                      <p class="dec"><span class="status-data_rate">Declined</span>{{statusPercentages.declined}}%</p>
                    </div>
                  </div>
              </card>
            </div>
          </div>
        </div>

        <div class="approved">
          <card cardTitle="Recently approved applications">

            <tableLoader v-if="loadingTable" />

            <table class="table" v-else>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Application no</th>
                  <th>Application type</th>
                  <th>Sector</th>
                  <th>Date Created</th>
                  <th>Duration (in days)</th>
                  <th>Rating</th>
                </tr>
              </thead>

              <tbody>

                <tr v-for="approved in recentlyApproved" v-bind:key="approved.id">
                  <td class="name">{{approved.name}}</td>
                  <td>{{approved.application_no}}</td>
                  <td>{{approved.application_type}}</td>
                  <td>{{approved.sector}}</td>
                  <td>{{approved.created_at | formatDate}}</td>
                  <td>{{approved.duration}}</td>
                  <td>
                    <span :class="[approved.rating === 'Very Bad'? 'verybad' : approved.rating === 'Bad'? 'bad' : approved.rating === 'Good'? 'good' : approved.rating === 'Very Good'? 'verygood' : approved.rating === 'Excellent'? 'excellent' : approved.rating === 'Average'? 'average' : '']"></span>
                    {{approved.rating}}
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
import FilterOptions from '@/components/FilterOptions.vue';
// import DropFilter from '@/components/DropFilter.vue';
import DropSvg from '@/components/DropSvg.vue';
import Card from '@/components/Card.vue';
import DateFilter from '@/components/DateFilter.vue';
import LineChart from '@/components/charts/LineChart.vue';
import PieChart from '@/components/charts/PieChart.vue';
import TableLoader from '@/components/loaders/TableLoader.vue';
import ChartLoader from '@/components/loaders/ChartLoader.vue';
import MiniCard from '@/components/loaders/MiniCard.vue';
// import RemoveDrops from '@/mixins/RemoveDrops.js';

import {getOverview, getRecentApprovals} from '@/services/OverviewEndpoints';
import {sectorList} from '@/services/SectorEndpoint';

export default {
  name: 'Overview',
  components: {
    AppHeader,
    FilterOptions,
    DropSvg,
    Card,
    DateFilter,
    LineChart,
    PieChart,
    TableLoader,
    ChartLoader,
    MiniCard,
    // DropFilter
  },
  data() {
    return {
      time: {},
      loading: false,
      loadingTable: false,
      cardSummary: {},
      statusPercentages: {},
      recentlyApproved: {},
      filterOptionsBeneficiary: {},
      filterOptionSectors: {},
      filterOptionAdmin: {},
      loadOptionsSector: false,
      loadOptionsBeneficiary: false,
      loadOptionsAdmin: false,
      statisticsSummary: {
        labels: [],
        values: []
      },
      allResult: [],
      date: null,
      color: "#509FB4",
      options: [
          {id: 1, value: "Sector"},
          {id: 2, value: "Beneficiary Category"},
          {id: 3, value: "Admin"}
      ],
      showOptions: false,
      optionData: 'Sector, benficiary category, Admin',
      optionSlug: '',
      optionGroup: '',
      pieData: {
        labels: [],
        values: []
      },
      pieChartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {enabled: true},
        legend: {
          display: false
        }
      },
      pieChartData: {},
      lineChartData: {},
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {enabled: true},
        fill: true,
        elements: {
          point: {
            radius: 0
          }
        },
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
  // mixins: [RemoveDrops],
  created() {
    this.getAll();
    this.recentApprovals();
  },
  methods: {
    // disableDrop() {
    //   if(this.showOptions == true) {
    //       this.showOptions = false;
    //       console.log('ksksksk')
    //   } else {
    //     console.log('else')
    //     this.showOptions = true;
    //   }
    // },
    getAll() {
      let summary = [];
      let dataArray = [];
      let labelArray = [];
      this.loading = true;
      this.getSectors();
      getOverview({
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        ...(this.optionGroup === "Sector"? {benefiting_sector: this.optionSlug} : ''),
        ...(this.optionGroup === "Beneficiary Category"? {applicant_type: this.optionData} : ''),
        ...(this.optionGroup === "Admin"? {admin_level: this.optionSlug} : ''),
      })
      .then(res => {
        this.allResult = res.data;
        this.time = this.allResult.overall_statistics_summaries;
        this.cardSummary = res.data.card_summaries;
        this.statusPercentages = res.data.status_percentages;
        this.filterOptionsBeneficiary = res.data.beneficiaries;
        this.filterOptionAdmin = res.data.admins;
        this.pieData.values = Object.values(res.data.status_percentages);
        summary = res.data.statistics_summaries;
        summary.filter(function(obj) {
          dataArray.push(obj.applications_processed)
          labelArray.push(obj.month)
        })
        this.statisticsSummary.values = dataArray;
        this.statisticsSummary.labels = labelArray;
        this.fillDoughnutData(this.pieData.values);
        this.fillLineData(this.statisticsSummary.values, this.statisticsSummary.labels);
        this.loading = false;
      })
      .catch(err => err)
    },
    recentApprovals() {
      this.loadingTable = true;
      getRecentApprovals()
        .then(res => {
          this.recentlyApproved = res.data;
          this.loadingTable = false;
        })
        .catch(err => err)
    },
    openOptions() {
      this.showOptions = !this.showOptions;
      document.querySelector('.downarrow').classList.add("downarrow_active");
      if(this.showOptions === false) {
        document.querySelector('.downarrow').classList.remove("downarrow_active");
        this.loadOptionsAdmin = false;
        this.loadOptionsBeneficiary = false;
        this.loadOptionsSector = false;
      }
    },
    closeOptions() {
      this.showOptions = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
      this.loadOptionsAdmin = false;
      this.loadOptionsBeneficiary = false;
      this.loadOptionsSector = false;
    },
    dropOptions(option) {
      this.optionGroup = option.value;
      if (this.optionGroup === "Sector") {
        this.loadOptionsSector = true;
        this.loadOptionsBeneficiary = false;
        this.loadOptionsAdmin = false;
      } else if (this.optionGroup === "Beneficiary Category") {
        this.loadOptionsBeneficiary = true;
        this.loadOptionsSector = false;
        this.loadOptionsAdmin = false;
      } else if (this.optionGroup === "Admin") {
        this.loadOptionsAdmin = true;
        this.loadOptionsBeneficiary = false;
        this.loadOptionsSector = false;
      } else {
        this.loadOptionsAdmin = false;
        this.loadOptionsBeneficiary = false;
        this.loadOptionsSector = false;
      }
    },
    selectOption(option) {
      this.showOptions = false;
      this.optionData = option.name;
      this.optionSlug = option.slug;
      this.loadOptionsAdmin = false;
      this.loadOptionsBeneficiary = false;
      this.loadOptionsSector = false;
      this.getAll();
      document.querySelector('.downarrow').classList.remove("downarrow_active");
    },
    filterByDate() {
      this.getAll();
    },
    getSectors() {
      sectorList()
      .then(res => {
        this.filterOptionSectors = res;
      })
    },
    fillDoughnutData(data) {
      this.pieChartData = {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Approved", "Processing", "Queried", "Pending", "Awaiting Assignment", "Declined"],
        datasets: [
          {
            backgroundColor: ["#35BCA0", "#5637E5", "#EFAA59", "#D55067", "#0992c7", "#96152c"],
            data: data
          }
        ]
      }
    },
    fillLineData(data, label) {
      this.lineChartData = {
        labels: label,
        datasets: [
          {
            data: data,
            backgroundColor: "rgba(227,255,247,0.74)",
            borderColor: "#35BCA0",
            borderWidth: 2,
            tension: 0
          },
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

  & ._option {
    width: 230px;
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
      background-color: #5637E5;
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
      color: #818181;
    }
  }
}

.fig {
  justify-content: space-between;
}


.table {
  border-collapse: collapse;
  margin-top: 10px;

  & tr {
    & th {
      color: #ADADAD;
      font-family: 'Apercu Pro Regular';
      font-size: 16px;
      text-align: left;
      width: 300px;
      border-bottom: 1px solid #25252550;
      padding: 0 20px 15px;
    }
  }
    & tbody {
      & tr {
        padding: 15px;
        margin: 10px;
        border-bottom: 1px solid #9D9C9C50;

        &:last-child {
          border-bottom: 0;
        }

        & td {
          color: #2B2F32;
          padding: 20px;
        }

        & .name {
            text-transform: capitalize;
        }
      }
    }

}

.option-open {
  position: absolute;
  width: 400px;
  z-index: 3;
}

.option-sub {
  width: 400px;
  position: absolute;
  left: 670px;
  top: 215px;
}

@mixin before($background) {
  content: '';
  display: block;
  height: 15px;
  width: 15px;
  border-radius: 50px;
  margin-right: 15px;
  background-color: $background;
}

@mixin height {
  display: flex;
  padding-bottom: 20px;
}

.status-data {
  max-width: 230px;
  margin: 60px auto;

  .apr {
    @include height;

    &:before {
      @include before(#35BCA0);
    }
  }

  .pro {
    @include height;

    &:before {
      @include before(#5637E5);
    }
  }

  .qur {
    @include height;

    &:before {
      @include before(#EFAA59);
    }
  }

  & .pen {
    @include height;

    &:before {
      @include before(#D55067);
    }
  }

  & .awi {
    @include height;

    &:before {
      @include before(#0992c7);
    }
  }

  & .dec {
    @include height;

    &:before {
      @include before(#96152c);
    }
  }

  .status-data_rate {
      width: 180px;
  }
}

.card {
  border-radius: 0;
  padding-right: 30px;
}
</style>
