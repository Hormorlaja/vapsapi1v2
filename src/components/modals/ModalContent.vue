<template>
    <div class="modal-content">

        <div v-if="application" class="content_info">
            <div class="close" @click="$emit('close')">
                <close-svg />
            </div>
            <h5 class="content_title">Summary</h5>
            <h3 class="content_name">{{title}}</h3>
            <div v-if="values.length > 0" class="av-data">
                <p class="sm">Processing time </p>
                <p>{{processingTime}}</p>
            </div>

            <modal-table-loader v-if="loading" />

            <table v-else-if="values.length > 0 && !loading" class="summary-table">
                <thead>
                    <tr>
                        <th>Progress</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="value in values" :key="value.id">
                        <td>{{value.admin}}</td>
                        <td>{{value.created_at | formatDate}}</td>
                        <td v-if="isLessThanAnHour(value.duration_in_minutes)">{{roundUpMinutes(value.duration_in_minutes)}} Mins</td>
                        <td v-else>{{convertToHours(value.duration_in_minutes)}} Hrs</td>
                    </tr>

                    <tr>
                        <td>Total</td>
                        <td>-</td>
                        <td v-if="isLessThanAnHour(total)">{{roundUpMinutes(total)}} Mins</td>
                        <td v-else>{{convertToHours(total)}} Hrs</td>
                    </tr>
                </tbody>
            </table>

            <p class="_no-data" v-else>No data available</p>
        </div>

        <div v-else class="content_info">
            <div class="close" @click="$emit('close')">
                <close-svg />
            </div>
            <h5 class="content_title">Summary</h5>
            <h3 class="content_name">{{title}}</h3>

            <summary-box-loader v-if="loading" />

            <div v-else>
                <div class="av-data">
                    <p class="sm">Average processing time </p>
                    <p>{{summary.average_duration || processingTime}}</p>
                </div>

                <div class="av-data rate">
                    <!-- <p class="sm">Rating</p> -->
                    <!-- <p class="per good">Good</p> -->
                </div>

                <div class="rate-card">

                    <div class="card total">
                        <p class="fig">{{summary.Total}}</p>
                        <p class="figcap">Total</p>
                    </div>

                    <div class="card completed">
                        <p class="fig">{{summary.Approved}}</p>
                        <p class="figcap">Completed</p>
                    </div>

                    <div class="card processing">
                        <p class="fig">{{summary.Processing}}</p>
                        <p class="figcap">Processing</p>
                    </div>

                    <div class="card queried">
                        <p class="fig">{{summary.Queried}}</p>
                        <p class="figcap">Queried</p>
                    </div>
            
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CloseSvg from '../CloseSvg.vue';
import ModalTableLoader from '@/components/loaders/ModalTableLoader.vue';
import SummaryBoxLoader from '@/components/loaders/SummaryBoxLoader.vue';

export default {
    name: 'ModalContent',
    props: {
        application: {type: Boolean, default: undefined},
        title: {type: String, default: undefined},
        values: {type: Array, default: undefined},
        summary: {type: Object, default: undefined},
        total: {type: Number, default: undefined},
        loading: {type: Boolean, default: undefined},
        processingTime: {type: Number, String, default: undefined}
    },
    components: { CloseSvg, ModalTableLoader, SummaryBoxLoader },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        isLessThanAnHour(minutes) {
            return minutes < 60;
        },
        convertToHours(minutes) {
            if(this.isLessThanAnHour(minutes)){
                return minutes;
            }
            return Math.round(minutes / 60);
        },
        roundUpMinutes(minutes) {
            return Math.round(minutes);
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-content {
    position: absolute;
    bottom: 2rem;
    right: 260px;
    width: 350px;
}

@media screen and (max-height: 500px) {
    .modal-content {
        height: 400px;
    }
}

.content_info {
    width: 100%;
    border: 1px solid #D0CFCF;
    border-radius: 4px;
    padding: 20px 20px 50px;
    background-color: #fff;
    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 5px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: $secondary;
    }

    & ._no-data {
        color: #3e3e3eeb;
        text-align: center;
    }
}

.close {
    float: right;
    color: #B1B1B1;
    font-size: 20px;
    font-weight: 300;
    cursor: pointer;
}

.content_title {
    color: #2B2F32;
    font-weight: 300;
    font-size: 16px;
    margin-top: 13px;
}

.content_name {
    font-size: 20px;
    text-align: center;
    color: #3e3e3eeb;
    text-transform: uppercase;
    padding: 30px 0;
}

.av-data {
    font-size: 16px;
    color: #2B2F32;

    .sm {
        font-size: 12px;
        color: #8B8B8B;
        line-height: 30px;
    }

    &.rate {
        margin-top: 20px;

        & .per {
            font-size: 14px;
        }

        & .good {
            display: flex;
            align-items: center;

            &::before {
                content: '';
                display: block;
                background-color: #4F6EDE;
                border-radius: 3px;
                height: 15px;
                width: 15px;
                margin-right: 5px;
            }
        }
    }
}

.rate-card {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;

    .card {
        width: 47%;
        padding: 20px 10px;
        border-radius: 4px;
        margin-top: 15px;

        &.total {
            background-color: #E2E2E2;

            .fig {
                color: #212121;
            }

            .figcap {
                color: #707070;
                font-size: 13px;
            }

        }

        &.completed {
            background-color: #EEEAFF;

            .fig {
                color: #190082;
            }

            .figcap {
                color: rgba(25,0,130,0.48);
                font-size: 13px;
            }
        }

        &.processing {
            background-color: #D4F8F1;

            .fig {
                color: #00483A;
            }

            .figcap {
                color: rgba(0,72,58,0.58);
                font-size: 13px;
            }
        }

        &.queried {
            background-color: #FFEFDC;

            .fig {
                color: #6C3B00;
            }

            .figcap {
                color: rgba(108,59,0,0.72);
                font-size: 13px;
            }
        }
    }
}

.summary-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 50px;

    & th {
        color: #9E9E9E;
        font-family: 'Apercu Pro Regular';
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        width: 300px;
        border-bottom: 1px solid #252525;
        padding: 0 20px 10px 0;
    }

    & tbody {
      & tr {
            padding: 15px;
            margin: 10px;
            border-bottom: 1px solid #9D9C9C;

        &:last-child {
            border-bottom: 0;
        }

        & td {
            font-size: 14px;
            color: #2B2F32;
            padding: 10px 20px 10px 0;

            &:nth-child(1) {
                text-transform: capitalize;
            }
        }
      }
    }
}
</style>