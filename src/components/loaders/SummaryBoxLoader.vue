<template>
    <div>
            <div class="av-data">
                <p class="sm">Average processing time </p>
                <p class="sm-box"></p>
            </div>

            <div class="av-data rate">
                <p class="sm">Rating</p>
                <p class="per"></p>
            </div>

            <div class="rate-card">
                <div class="card" v-for="card in cardLoader" :key="card"></div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'SummaryBoxLoader',
    data() {
        return {
            cardLoader: 4
        }
    }
}
</script>

<style lang="scss" scoped>
.av-data {
    font-size: 16px;
    color: #2B2F32;
    

    .sm {
        font-size: 12px;
        color: #8B8B8B;
        line-height: 30px;
    }

    & .sm-box {
        display: block;
        height: 20px;
        width: 30%;
        background-color: #e7e7e7;
        position: relative;
        overflow: hidden;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
            );
            animation: shimmer 2s infinite;
            content: '';
        }
    }

    &.rate {
        margin-top: 20px;

        & .per {
            display: block;
            height: 20px;
            width: 20%;
            background-color: #e7e7e7;
            position: relative;
            overflow: hidden;

            &::after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                transform: translateX(-100%);
                background-image: linear-gradient(
                90deg,
                rgba(#fff, 0) 0,
                rgba(#fff, 0.2) 20%,
                rgba(#fff, 0.5) 60%,
                rgba(#fff, 0)
                );
                animation: shimmer 2s infinite;
                content: '';
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
        height: 80px;
        padding: 20px 10px;
        border-radius: 4px;
        margin-top: 15px;
        background-color: #e7e7e7;
        position: relative;
        overflow: hidden;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
            );
            animation: shimmer 2s infinite;
            content: '';
        }
    }
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>