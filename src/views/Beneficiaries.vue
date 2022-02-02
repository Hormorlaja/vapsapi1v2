<template>
  <div class="flex">
    <div class="main">
      <app-header title="Beneficiaries" @click="closeOptions" />
      <div class="content">

        <div class="stats" @click="closeOptions">
          <p>Average processing time (All Beneficiaries)</p>
          <h3 class="stats_heading">-</h3>
        </div>

        <div class="app_filter row" @mousedown="closeOptions">
          <div class="row align">
            <search v-model="searchInput" @submit="searchQuery"/>        
            <div class="more-cat" @click="openOptions()">
              {{optionData}}
              <drop-svg />
            </div>
          </div>

          <div class="row align">

            <item-per-view :view="value" @dropDown="isDropDown"></item-per-view>

            <date-filter>
              <VueDatePicker v-model="date" no-header placeholder="Date range" range validate :color="color" @input="getBeneficiariesByDate">
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
          <filter-options v-if="this.showOptions">
            <ul v-if="options">  
                <li v-for="applicant in applicants" :key="applicant.id" @click="selectOptions(applicant.name)">{{applicant.name}}</li>
            </ul>
          </filter-options>
        </div>

        <number-filter v-if="dropdown" :list="num" @filtered-num="itemPerView"></number-filter>

        <div class="approved" @click="closeOptions">
          <card>

            <tableLoader v-if="loading.table" :tableLoader="value" />

            <table v-else-if="beneficiaries.length > 0" class="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Beneficiaries</th>
                  <th>Beneficiary Category</th>
                  <th>Avg processing time (in days)</th>
                  <th>Min processing time (in days)</th>
                  <th>Max processing time (in days)</th>
                  <!-- <th>Rating</th> -->
                </tr>
              </thead>

              <tbody>
                <tr v-for="beneficiary in beneficiaries" :key="beneficiary.id">
                  <td>{{beneficiaries.indexOf(beneficiary) + 1}}</td>
                  <td 
                    @click="getSummary(beneficiary.user_id, beneficiary.name, beneficiary.maximum_processing_time)" 
                    class="table-link" 
                    :data-title="`${beneficiary.name}`">
                    {{beneficiary.name}}
                  </td>
                  <td 
                    @click="getApplicantType(beneficiary.applicant_type, beneficiary.applicant_type)" 
                    class="table-link" 
                    :data-title="`${beneficiary.applicant_type}`">
                    {{beneficiary.applicant_type}}
                  </td>
                  <td>{{beneficiary.average_processing_time}}</td>
                  <td>{{beneficiary.minimum_processing_time}}</td>
                  <td>{{beneficiary.maximum_processing_time}}</td>
                  <!-- <td>-</td> -->
                </tr>
              </tbody>

            </table>

            <p v-else>No Available Data</p>
          </card>
        </div>

        <div class="dash-nav">
          <cta @click="prevBtn" start :active="prev !== null? true : false" :loading="loading.start" />
          <span>{{pageFrom === null? 0 : pageFrom}}-{{pageTo === null? 0 : pageTo}}  of {{total}}</span>
          <cta @click="nextBtn" end :active="next !== null? true : false" :loading="loading.end" />
        </div>

      </div>

      <modal v-if="showModal" @closeModal="closeModal">
        <modal-content 
          @close="closeModal" 
          :summary="beneficiarySummary" 
          :title="title" 
          :loading="loading.card"
          :processingTime="processingTime.average"
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
import itemPerView from '@/components/itemPerView.vue';
import NumberFilter from '@/components/NumberFilter.vue';
import DateFilter from '@/components/DateFilter.vue';
import FilterOptions from '@/components/FilterOptions.vue';
import Modal from '@/components/modals/Modal.vue';
import ModalContent from '@/components/modals/ModalContent.vue';
import TableLoader from '@/components/loaders/TableLoader.vue';

import {getBeneficiaries, 
  getApplicantType, 
  getBeneficiariesSummary, 
  applicantTypeSummary} 
from '@/services/BeneficiariesEndpoint';
import moment from 'moment';

export default {
  name: 'Beneficiaries',
  components: {
    AppHeader,
    Card,
    Search,
    DropSvg,
    Cta,
    itemPerView,
    NumberFilter,
    DateFilter,
    FilterOptions,
    Modal,
    ModalContent,
    TableLoader
  },
  data() {
    return {
      searchInput: '',
      dropdown: false,
      date: null,
      prev: '',
      next: '',
      perPage: 10,
      total: 0,
      pageFrom: 0,
      pageTo: 0,
      currentPage: 1,
      index: 1,
      color: "#509FB4",
      options: [
        {id:1, value:"Individual", sub:"(Returning office)"},
        {id:2, value:"Corporate"},
        {id:3, value:"NGO", sub:"(International)"},
        {id:4, value:"NGO", sub:"(local)"},
        {id:7, value:"Government Agencies", more: true},
      ],
      otherOptions: [
        {id:8, value:"Federal"},
        {id:9, value:"State"},
        {id:10, value:"Defence"},
        {id:11, value:"Diplomats"},
        {id:12, value:"Foreign Affairs"},
        {id:13, value:"Others"},
      ],
      optionData: "Beneficiary Category",
      showOtherOptions: false,
      showOptions: false,
      num: [
        {id:1, value:5},
        {id:2, value:10},
        {id:3, value:20},
        {id:4, value:50},
        {id:5, value:100},
      ],
      value: 5,
      showModal: false,
      applicants: [],
      title: "",
      serialNumber: 0,
      beneficiaries: [],
      beneficiarySummary: {},
      loading: {
        start: false, 
        end: false,
        table: false,
        card: false
      },
      processingTime: {
        total: '',
        average: null
      }
    }
  },
  computed: {
    nextPage: function() {
      return this.currentPage + 1;
    },
    prevPage: function() {
      return this.currentPage - 1;
    }
  },
  mounted() {
    this.getBeneficiaries();
    this.selectApplicant();
  },
  methods: {
    isDropDown() {
      this.dropdown = !this.dropdown;
    },
    itemPerView(item) {
      this.value = item;
      this.dropdown = false;
      this.loading.table = true;
      getBeneficiaries({ 
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        per_page: this.value,
        ...(this.searchInput? {search: this.searchInput} : '')
      })
        .then(res => {
          this.prev = res.prev_page_url;
          this.next = res.next_page_url;
          this.value = res.per_page;
          this.pageFrom = res.from;
          this.pageTo = res.to;
          this.currentPage = res.current_page;
          this.total = res.total;
          this.beneficiaries = res.data;
          this.loading.table = false;
        })
        .catch(e => e)
    },
    openOptions() {
      this.showOptions = !this.showOptions;
      this.showOtherOptions = false;
      document.querySelector('.downarrow').classList.add("downarrow_active");

      if(this.showOptions === false) {
        document.querySelector('.downarrow').classList.remove("downarrow_active");
      }
    },
    selectOptions(option) {
      this.showOptions = false;
      this.optionData = option;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
      this.filterByApplicantType(this.optionData);
    },
    closeOptions() {
      this.showOptions = false;
      this.dropdown = false;
      document.querySelector('.downarrow').classList.remove("downarrow_active");
    },
    getBeneficiaries() {
      this.loading.table = true;
      getBeneficiaries({from: moment().startOf('year').format('YYYY-MM-DD')})
        .then(res => {
          this.value = res.per_page;
          this.pageFrom = res.from;
          this.pageTo = res.to;
          this.currentPage = res.current_page;
          this.prev = res.prev_page_url;
          this.next = res.next_page_url;
          this.total = res.total;
          this.beneficiaries = Object.values(res.data);
          this.loading.table = false;
        })
        .catch(e => e)
    },
    getBeneficiariesByDate() {
      this.loading.table = true;
      getBeneficiaries({
        from: this.date.start, 
        to: this.date.end, 
        per_page: this.value,
        ...(this.optionData === 'Beneficiary Category'? '' : {applicant_type: this.optionData}),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
        .then(res => {
          this.value = res.per_page;
          this.pageFrom = res.from;
          this.pageTo = res.to;
          this.currentPage = res.current_page;
          this.prev = res.prev_page_url;
          this.next = res.next_page_url;
          this.total = res.total;
          this.beneficiaries = Object.values(res.data);
          this.loading.table = false;
        })
        .catch(e => e)
    },
    selectApplicant() {
      getApplicantType()
        .then(res => {
          this.applicants = res;
        })
        .catch(e => e)
    },
    getSummary(id, title, time) {
      this.openModal();
      this.title = title;
      this.processingTime.average = time;
      this.loading.card = true;
      getBeneficiariesSummary(id)
      .then(res => {
        this.beneficiarySummary = res;
        this.loading.card = false;
      })
      .catch(err => err)
    },
    getApplicantType(applicant, title) { //beneficiary category summary
      this.openModal();
      this.title = title;
      this.loading.card = true;
      applicantTypeSummary(applicant)
      .then(res => {
        this.beneficiarySummary = res;
        this.loading.card = false;
      })
      .catch(err => err)
    },
    filterByApplicantType(applicant) {
      this.loading.table = true;
      getBeneficiaries({
        from: moment().startOf('year').format('YYYY-MM-DD'), 
        per_page: this.value,
        applicant_type: applicant,
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.value = res.per_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.currentPage = res.current_page;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.beneficiaries = Object.values(res.data);
        this.loading.table = false;
      })
      .catch(err => err)
    },
    searchQuery() {
      this.loading.table = true;
      getBeneficiaries({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} :  ''),
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.value = res.per_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.currentPage = res.current_page;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.beneficiaries = Object.values(res.data);
        this.loading.table = false;
      })
      .catch(err =>  err);
    },
    nextBtn() {
      this.loading.end = true;
      getBeneficiaries({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} :  ''),
        ...(this.optionData === 'Beneficiary Category'? '' : {applicant_type: this.optionData}),
        per_page: this.value, page: this.nextPage,
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.value = res.per_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.currentPage = res.current_page;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.beneficiaries = Object.values(res.data);
        this.loading.end = false;
      })
      .catch(err =>  err);
    },
    prevBtn() {
      this.loading.start = true;
      getBeneficiaries({
        ...(this.date? {from: this.date.start} : {from: moment().startOf('year').format('YYYY-MM-DD')}),
        ...(this.date? {to: this.date.end} : ''),
        ...(this.optionData === 'Beneficiary Category'? '' : {applicant_type: this.optionData}),
        per_page: this.value, page: this.prevPage,
        ...(this.searchInput? {search: this.searchInput} : '')
      })
      .then(res => {
        this.value = res.per_page;
        this.pageFrom = res.from;
        this.pageTo = res.to;
        this.currentPage = res.current_page;
        this.prev = res.prev_page_url;
        this.next = res.next_page_url;
        this.total = res.total;
        this.beneficiaries = Object.values(res.data);
        this.loading.start = false;
      })
      .catch(err =>  err)

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
  width: 300px;
  left: 540px;
  top: 274px;
  z-index: 3;
}

.option-sub {
  width: 265px;
  position: absolute;
  left: 303px;
  top: 193px;
}

</style>
