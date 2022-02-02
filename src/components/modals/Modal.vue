<template>
    <div class="modal" @click="$emit('closeModal')">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'modal',
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        background: linear-gradient(148.57deg, rgba(255,255,255,0.29) 0%, rgba(255,255,255,0.5) 99.36%, rgba(255,255,255,0.51) 100%);
        overflow-y: auto;
    }
</style>