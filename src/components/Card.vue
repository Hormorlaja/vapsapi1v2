<template>
    <div class="card">
        <div class="card-heading">
            <h3 v-if="cardTitle">{{cardTitle}}</h3>

            <div v-if="sort === true" class="sort">
                <svg data-v-fae5bece="" width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g data-v-fae5bece="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g data-v-fae5bece="" id="SLA-dashboard-" transform="translate(-278.000000, -94.000000)" stroke="#000000" stroke-width="1.5">
                    <g data-v-fae5bece="" id="filter-copy" transform="translate(279.000000, 95.000000)">
                    <polygon data-v-fae5bece="" id="Path" points="15 0 0 0 6 7.35777778 6 12.4444444 9 14 9 7.35777778"></polygon>
                    </g>
                    </g></g>
                </svg>
                <span>Sort</span>
                <span class="arrow-down">
                    <svg data-v-fae5bece="" width="12px" height="8px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g data-v-fae5bece="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <g data-v-fae5bece="" id="SLA-dashboard-" transform="translate(-1344.000000, -98.000000)" stroke="#000000">
                        <g data-v-fae5bece="" id="Group-5" transform="translate(1223.000000, 77.000000)">
                        <g data-v-fae5bece="" id="chevron-down-copy" transform="translate(122.000000, 22.000000)">
                        <polyline data-v-fae5bece="" id="Path" points="0 0 4 4 8 0"></polyline>
                        </g></g>
                        </g></g>
                    </svg>
                </span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        cardTitle: String,
        sort: Boolean
    }
}
</script>

<style lang="scss" scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 9px;
    padding: 20px 90px 20px 30px;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.card-heading {
    display: flex;
    justify-content: space-between;

    & h3 {
        font-family: 'Apercu Pro Medium';
        font-size: 16px;
        color: #2B2F32;
        padding-bottom: 32px;
    }
}

.sort {
    width: 80px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
</style>