<template>
    <div class="dough"></div>
</template>

<style lang="scss" scoped>
.dough {
    position: relative;
    width: 100%;
    height: 400px;
    display: block;
    background: #E7E7E7;
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

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>