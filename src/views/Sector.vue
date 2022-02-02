<template>
  <div class="flex">
    <div class="main">
      <app-header title="Sector" />
      <div class="content">

        <div class="stats" @click="closeOptions">
          <p>Average processing time (All Sectors)</p>
          <h3 class="stats_heading">-</h3>
        </div>

        <div class="app_filter row" @mousedown="closeOptions">
          <div class="row align">
            <search v-model="searchInput" @submit="searchQuery"/>
            <div class="more-cat" @click="displaySectors">
              {{sector.title}}
              <svg width="12px" height="8px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
            </div>
          </div>

          <div class="row align">

            <item-per-view :view="value" @dropDown="isDropDown"></item-per-view>

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
        </div>

        <div class="option-open">
            <filter-options v-if="sector.isDisplayed">
              <ul>
                <li v-for="data in sector.sectors" :key="data.id" @click="selectSector(data)">{{data.name}}</li>
              </ul>
            </filter-options>
        </div>

        <number-filter v-if="dropdown" :list="num" @filtered-num="itemPerView"></number-filter>

        <div class="approved" @click="closeOptions">
          <card>
            <tableLoader v-if="loading.table" :tableLoader="value" />

            <table v-else-if="sectorData.length > 0" class="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Sector</th>
                  <th>Avg Processing time</th>
                  <th>Min processing time</th>
                  <th>Max processing time</th>
                  <!-- <th>Rating</th> -->
                </tr>
              </thead>

              <tbody>

                <tr v-for="data in sectorData" :key="data.id">
                  <td>{{sectorData.indexOf(data) + 1}}</td>
                  <td @click="getSummary(data.name, data.name, data.average_processing_time)" class="table-link" :data-title="`${data.name}`">{{data.name}}</td>
                  <td>{{data.average_processing_time}}</td>
                  <td>{{data.minimum_processing_time}}</td>
                  <td>{{data.maximum_processing_time}}</td>
                  <!-- <td>-</td> -->
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

      <modal v-if="showModal">
        <modal-content 
          @close="closeModal" 
          :summary="sectorSummary.data"
          :title="sectorSummary.title"
          :processingTime="sectorSummary.time"
          :loading="loading.modalCard"
        />
      </modal>

    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import DateFilter from '@/components/DateFilter.vue';
import itemPerView from '@/components/itemPerView.vue';
import NumberFilter from '@/components/NumberFilter.vue';
import Modal from '@/components/modals/Modal.vue';
import ModalContent from '@/components/modals/ModalContent.vue';
import TableLoader from '@/components/loaders/TableLoader.vue';
import Cta from '@/components/Cta.vue';
import FilterOptions from '@/components/FilterOptions.vue';

import moment from 'moment';
import {sector, getSector, sectorList} from '@/services/SectorEndpoint';

export default {
  name: 'Sector',
  components: {
    AppHeader,
    Card,
    Search,
    DateFilter,
    itemPerView,
    NumberFilter,
    Modal,
    ModalContent,
    TableLoader,
    Cta,
    FilterOptions
  },
  data() {
    return {
      searchInput: '',
      dropdown: false,
      date: null,
      color: "#509FB4",
      total: 0,
      pageFrom: 0,
      pageTo: 0,
      currentPage: 1,
      prev: '',
      next: '',
      num: [
        {id:1, value:5},
        {id:2, value:10},
        {id:3, value:20},
        {id:4, value:50},
        {id:5, value:100},
      ],
      value: 5,
      showModal: false,
      loading: {
        start: false, 
        end: false,
        table: false,
        modalCard: false
      },
      sector: {
        isDisplayed: false,
        sectors: [],
        title: 'All Sectors'
      },
      sectorData: [],
      sectorSummary: {
        data: {},
        title: '',
        time: null,
      }
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
    this.getSectorData();
    this.allSectors();
  },
  methods: {
    isDropDown() {
      this.dropdown = !this.dropdown;
    },
    openModal(title) {
      this.title = title
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    allSectors() {
      sectorList()
      .then(res => {
        this.sector.sectors = res;
      })
      .catch(err => err)
    },
    getSectorData() {
      this.loading.table = true;
      getSector({from: moment().startOf('year').format('YYYY-MM-DD')})
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page; 
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.table = false;
      })
      .catch(err => err)
    },
    getSummary(id, title, time) {
      this.openModal();
      this.sectorSummary.title = title;
      this.sectorSummary.time = time;
      this.loading.modalCard = true;
      sector(id)
      .then(res => {
        this.sectorSummary.data = res;
        this.loading.modalCard = false;
      })
      .catch(err => err)
    },
    itemPerView(item) {
      this.value = item;
      this.dropdown = false;
      this.loading.table = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        per_page: this.value, page: this.prevPage,
        ...(this.sector.title === 'All Sectors'? {benefiting_sector: ''} : {benefiting_sector: this.sector.title}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.table = false;
      })
      .catch(err => err)
    },
    filterByDate() {
      this.loading.table = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        per_page: this.value, page: this.prevPage,
        ...(this.sector.title === 'All Sectors'? {benefiting_sector: ''} : {benefiting_sector: this.sector.title}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.table = false;
      })
      .catch(err => err)
    },
    displaySectors() {
      this.sector.isDisplayed = !this.sector.isDisplayed;
    },
    selectSector(sector) {
      this.sector.isDisplayed = false;
      this.sector.title = sector.name;
      this.loading.table = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {end: this.date.end} : ''),
        per_page: this.value, page: this.prevPage,
        ...(this.sector.title === 'All Sectors'? {benefiting_sector: ''} : {benefiting_sector: this.sector.title}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.table = false;
      })
      .catch(err => err)
    },
    searchQuery() {
      this.loading.table = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {end: this.date.end} : ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.table = false;
      })
      .catch(err => err)
    },
    prevBtn() {
      this.loading.start = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {end: this.date.end} : ''),
        per_page: this.value, page: this.prevPage,
        ...(this.sector.title === 'All Sectors'? {benefiting_sector: ''} : {benefiting_sector: this.sector.title}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.start = false;
      })
      .catch(err => err)
    },
    nextBtn() {
      this.loading.end = true;
      getSector({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {end: this.date.end} : ''),
        per_page: this.value, page: this.nextPage,
        ...(this.sector.title === 'All Sectors'? {benefiting_sector: ''} : {benefiting_sector: this.sector.title}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.sectorData = Object.values(res.data);
        this.value = res.per_page;
        this.total = res.total;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.currentPage = res.current_page;
        this.loading.end = false;
      })
      .catch(err => err)
    },
    closeOptions() {
      this.showOptions = false;
      this.sector.isDisplayed = false;
    },
  }
}
</script>

<style lang="scss" scoped>

.stats {
  margin: 30px 0;

  & p {
    color: #8B8B8B;
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
  padding-right: 30px;
}

.num {
  border: 1px solid #D5D5D5;
  padding: 15px;
  color: #AAAAAA;
  font-size: 14px;
  margin-left: 10px;
}

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

.align {
  align-items: center;
}

.table {
  border-collapse: collapse;
  margin-top: 10px;
  width: 100%;

  & tr {
    & th {
      color: #9E9E9E;
      font-family: 'Apercu Pro Regular';
      font-size: 16px;
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
          font-size: 16px;
        }
      }
    }
}

.option-open {
  position: absolute;
  left: 538px;
  top: 270px;
  width: 300px;
  z-index: 3;
}

</style>
