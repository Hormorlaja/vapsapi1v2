<template>
  <div class="flex">
    <div class="main">
      <app-header title="Application"></app-header>
      <div class="content">

        <div class="stats" @click="closeStatus">
          <p>Average processing time (All Applications)</p>
          <h3 class="stats_heading">-</h3>
        </div>

        <div class="app_filter row">
          <div class="row align">
            <search v-model="searchInput" @submit="searchQuery"/>
            <div class="more-cat" @click="showStatusOptions">
                <span>{{options.statusValue}}</span>
              <drop-svg />
            </div>

            <!--Status Dropdown-->
            <div class="option-open">
              <filter-options v-if="options.status">
                <ul>
                  <li v-for="value in status" :key="value" @click="filterByStatus(value)">{{value}}</li>
                </ul>
              </filter-options>
            </div>
            <!--End Status Dropdown-->

            <div class="more-cat" @click="showSector">
                <span>{{options.sectorValue}}</span>
              <drop-svg class="st-drop" />
            </div>

            <!--Sector Dropdown-->
            <div class="option-open sector">
              <filter-options v-if="options.sectors">
                <ul>
                  <li v-for="value in sector" :key="value.id" @click="selectSectors(value)">{{value.name}}</li>
                </ul>
              </filter-options>
            </div>
            <!--End Sector Dropdown-->

            <cta active class="search" @click="onSubmitReq">Search</cta>
          </div>

          <div class="row align">

            <item-per-view :view="value" @dropDown="isDropDown"></item-per-view>

            <date-filter>
              <VueDatePicker v-model="date" no-header placeholder="Date range" range validate :color="color" @input="getApplicationsByDate">
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
        </div>

        <number-filter v-if="dropdown" :list="num" @filtered-num="itemPerView"></number-filter>
        
        <div class="approved" @click="closeStatus">
          <card>

            <tableLoader v-if="loading.table" :tableLoader="value" />

            <table v-else-if="applications.length > 0" class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Application no</th>
                  <th>Sector</th>
                  <th>Application type</th>
                  <th>Status</th>
                  <th>Duration (in days)</th>
                  <th>Ratings</th>
                </tr>
              </thead>

              <tbody>

                 <tr v-for="application in applications" :key="application.id">
                  <td>{{application.created_at | formatDate}}</td>
                  <td>{{application.name}}</td>
                  <td @click="getSummary(application.id, application.name, application.duration)" class="table-link" :data-title="`${application.application_no}`">{{application.application_no}}</td>
                  <td>{{application.sector}}</td>
                  <td>{{application.application_type}}</td>
                  <td>{{application.status}}</td>
                  <td>{{application.duration}}</td>
                  <td><span :class="[application.rating === 'Very Bad'? 'verybad' : application.rating === 'Bad'? 'bad' : application.rating === 'Very Good'? 'verygood' : application.rating === 'Good'? 'good' : application.rating === 'Excellent'? 'excellent' : '']"></span>{{application.rating}}</td>
                </tr>
                
              </tbody>

            </table>

            <p v-else>No Available Data</p>
          </card>
        </div>

        <div class="dash-nav">
          <cta @click="prevBtn" start :active="prev !== null? true : false" :loading="loading.start" />
          <span>{{pageFrom === null? 0 : pageFrom}}-{{pageTo === null? 0 : pageTo}} of {{total}}</span>
          <cta @click="nextBtn" end :active="next !== null? true : false" :loading="loading.end" />
        </div>
      </div>

      <modal v-if="showModal" @closeModal="closeModal">
        <modal-content 
          @close="closeModal" 
          :loading="loading.modalTable" 
          :values="summary" 
          :title="title" 
          :total="summaryTotal" 
          :processingTime="processingTime" 
          application 
        />
      </modal>

    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import DropSvg from '@/components/DropSvg.vue';
import Cta from '@/components/Cta.vue';
import DateFilter from '@/components/DateFilter.vue';
import itemPerView from '@/components/itemPerView.vue';
import NumberFilter from '@/components/NumberFilter.vue';
import Modal from '@/components/modals/Modal.vue';
import ModalContent from '@/components/modals/ModalContent.vue';
import TableLoader from '@/components/loaders/TableLoader.vue';
import FilterOptions from '@/components/FilterOptions.vue';

import {getApplication, applicationSummary} from '@/services/ApplicationEndpoint';
import {sectorList} from '@/services/SectorEndpoint';

export default {
  name: 'Application',
  components: {
    AppHeader,
    Card,
    Search,
    DropSvg,
    Cta,
    DateFilter,
    itemPerView,
    NumberFilter,
    Modal,
    ModalContent,
    TableLoader,
    FilterOptions

  },
  data() {
    return {
      searchInput: '',
      date: null,
      prev: null,
      next: null,
      perPage: 10,
      total: 0,
      pageFrom: 0,
      pageTo: 0,
      currentPage: 1,
      color: "#509FB4",
      dropdown: false,
      num: [
        {id:1, value:5},
        {id:2, value:10},
        {id:3, value:20},
        {id:4, value:50},
        {id:5, value:100},
      ],
      value: 5,
      showModal: false,
      applications: [],
      title: '',
      summary: [],
      summaryTotal: null,
      loading: {
        start: false, 
        end: false,
        table: false,
        modalTable: false
      },
      status: ["Approved", "Processing", "Queried", "Pending", "Awaiting Assignment", "Declined"],
      sector: [],
      options: {
        statusValue: 'Status',
        status: false,
        sectorValue: 'Sectors',
        sectorSlug: '',
        sectors: false
      },
      processingTime: ''
    }
  },
  computed: {
    nextPage: function() {
      return this.currentPage + 1;
    },
    prevPage: function() {
      return this.currentPage - 1;
    },
  },
  mounted() {
    this.getAllApplications();
    this.getSectors();
  },
  methods: {
    isDropDown() {
      this.dropdown = !this.dropdown;
    },
    itemPerView(item) {
      this.value = item;
      this.dropdown = false;
      this.loading.table = true;
      getApplication({
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''), 
        ...(this.value? {per_page: this.value} : ''),
        ...(this.options.statusValue === 'Status'? '' : {status: this.options.statusValue}),
        ...(this.options.sectorSlug? {sector: this.options.sectorSlug} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.currentPage = res.current_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.applications = Object.values(res.data);
        this.loading.table = false;
      })
      .catch(err => err);
    },
    getAllApplications() {
      this.loading.table = true;
      getApplication({from: this.$moment().startOf('year').format('YYYY-MM-DD')})
      .then(res => {
          this.currentPage = res.current_page;
          this.pageFrom = res.from;
          this.pageTo = res.to;
          this.prev = res.prev_page_url;
          this.next = res.next_page_url;
          this.total = res.total;
          this.value = res.per_page;
          this.applications = Object.values(res.data);
          this.loading.table = false;
      })
      .catch(e => e)
    },
    getApplicationsByDate() {
      this.loading.table = true;
      getApplication({
        from: this.date.start, 
        to: this.date.end, 
        per_page: this.value,
        ...(this.options.statusValue === 'Status'? '' : {status: this.options.statusValue}),
        ...(this.options.sectorSlug? {sector: this.options.sectorSlug} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
          this.currentPage = res.current_page;
          this.pageFrom = res.from;
          this.pageTo = res.to;
          this.prev = res.prev_page_url;
          this.next = res.next_page_url;
          this.total = res.total;
          this.value = res.per_page;
          this.applications = Object.values(res.data);
          this.loading.table = false;
      })
      .catch(e => e)
    },
    getSummary(id, title, time) {
      this.openModal();
      this.title = title;
      this.processingTime = time;
      this.loading.modalTable = true;
      applicationSummary(id)
      .then(res => {
        this.summary = res;
        this.summaryTotal = this.summary.reduce((acc, curr) => {
          return acc + curr.duration_in_minutes
        },0)
        this.loading.modalTable = false
      })
      .catch(err => err);
    },
    showStatusOptions() {
      this.options.status = !this.options.status;
      document.querySelector('.downarrow').classList.add("downarrow_active");
      if(this.options.status === false) {
        document.querySelector('.downarrow').classList.remove("downarrow_active");
      }
    },
    filterByStatus(status) {
      this.options.status = false;
      this.options.statusValue = status;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
    },
    showSector() {
      this.options.sectors = !this.options.sectors;
      document.querySelector('.st-drop').classList.add("downarrow_active");
      if(this.options.sectors === false) {
        document.querySelector('.st-drop').classList.remove("downarrow_active");
      }
    },
    closeStatus() {
      this.options.status = false;
      this.options.sectors = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
      document.querySelector('.st-drop').classList.remove("downarrow_active");
    },
    getSectors() {
      sectorList()
      .then(res => {
        this.sector = res;
      })
      .catch(err => err);
    },
    selectSectors(value) {
      document.querySelector('.st-drop').classList.remove("downarrow_active");
      this.options.sectorSlug = value.slug;
      this.options.sectorValue = value.name;
      this.options.sectors = false;
    },
    onSubmitReq() {
      this.loading.table = true;
      getApplication({
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.options.statusValue === 'Status'? '' : {status: this.options.statusValue}),
        ...(this.options.sectorSlug? {sector: this.options.sectorSlug} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.currentPage = res.current_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.value = res.per_page;
        this.applications = Object.values(res.data);
        this.loading.table = false;
      })
      .catch(err => err);
    },
    searchQuery() {
      this.loading.table = true;
      this.searchInput = (this.searchInput || "").trim();
      getApplication({
        ...(this.searchInput? {search: this.searchInput} : ''),
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : '')
      })
      .then (res => {
        this.currentPage = res.current_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.value = res.per_page;
        this.applications = Object.values(res.data);
        this.loading.table = false;
      })
      .catch (err => err);
    },
    nextBtn() {
      this.loading.end = true;
      getApplication({
        page: this.nextPage,
        per_page: this.value,
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        ...(this.options.statusValue === 'Status'? '' : {status: this.options.statusValue}),
        ...(this.options.sectorSlug? {sector: this.options.sectorSlug} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then (res => {
        this.currentPage = res.current_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.value = res.per_page;
        this.applications = Object.values(res.data);
        this.loading.end = false;
      })
      .catch (err => err);
    },
    prevBtn() {
      this.loading.start = true;
      getApplication({
        page: this.prevPage, 
        per_page: this.value,
        ...(this.date? {from: this.date.start} : {from: this.$moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        ...(this.options.statusValue === 'Status'? '' : {status: this.options.statusValue}),
        ...(this.options.sectorSlug? {sector: this.options.sectorSlug} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then (res => {
        this.currentPage = res.current_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.value = res.per_page;
        this.applications = Object.values(res.data);
        this.loading.start = false;
      })
      .catch (err => err)
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>

.stats {
  margin: 30px 0;

  & p {
    color: #686868;
    font-size: 14px;
    line-height: 28px;
  }

  & h3 {
    color: #014548;
    font-size: 28px;
    font-family: 'Apercu Pro Regular';
    font-weight: 400;
  }

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

.app_filter {
  border: 1px solid #D7D7D7;
  padding: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
}

.card {
  border-radius: 0;
}

.num {
  border: 1px solid #D5D5D5;
  padding: 15px;
  font-size: 14px;
  margin-left: 10px;
  font-family: inherit;
  width: 250px;

  &::placeholder {
    color: #AAAAAA;
    font-family: 'Apercu Pro Regular';
    font-size: 14px;
  }
}

.filtering {
  display: flex;
  justify-content: space-between;
}

.filter-title {
  font-size: 14px;
  color: #1F2223;
  margin-right: 10px;
}

.align {
  align-items: center;
}

.table {
  border-collapse: collapse;
  margin-top: 10px;

  & tr {
    & th {
      color: #9E9E9E;
      font-family: 'Apercu Pro Regular';
      font-size: 14px;
      font-weight: 400;
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

          & .red {
              background-color: #D55067;
              @include ratingsBefore;
          }

          & .excellent {
              background-color: #2D58DF;
              @include ratingsBefore;
          }

          & .good {
              background-color: #4F6EDE;
              @include ratingsBefore;
          }
        }
      }
    }
}

.card {
  border-radius: 0;
  padding-right: 30px;
}

.more-cat {
  width: 200px;

  & span {
    overflow: auto;
    width: 100%;

  &::-webkit-scrollbar {
      display: none;
  }
    
  }
}

.search {
  height: 50px;
  width: 90px;
}

.option-open {
  position: absolute;
  left: 538px;
  top: 270px;
  width: 200px;
  z-index: 3;

  &.sector {
      left: 753px;
  }
}

</style>
