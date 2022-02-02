<template>
    <button :type="type" :disabled="disabled || loading"
        @click="$emit('click')" class="link cta" :class="{'active': active}">
        <slot name="loading" v-if="loading">
            <span class="loading">&nbsp;Loading...&nbsp;</span>
        </slot>
        <template v-else>
            <slot name="start" v-if="start">
                <span class="start">&larr; Previous</span>
            </slot>
            <slot></slot>
            <slot name="end" v-if="end">
                <span class="end">Next &rarr;</span>
            </slot>
        </template>   
    </button>
</template>

<script>
export default {
    name: "Cta",
    props: {
      type: {type: String, default: undefined},
      loading: {type: Boolean, default: false},
      start: {type: Boolean, default: false},
      end: {type: Boolean, default: false},
      disabled: {type: Boolean, default: false},
      active: {type: Boolean, default: false}
    }
}
</script>

<style lang="scss" scoped>
.cta {
    padding: 10px;
    margin: 0 20px;
    background-color: #D8D8D8;
    font-family: inherit;
    font-size: 16px;
    color: rgba(92, 92, 92, 0.23);
    border-radius: 3px;
    border: 0;
    cursor: not-allowed;
    min-width: 90px;
    width: 130px;


    &.active {
        background-color: #ABDFD4;
        color: #004548;
        font-family: inherit;
        cursor: pointer;
    }

    &:disabled {
        cursor: not-allowed;
    }
}

.start, 
.end {
    padding: 0 10px;
}

.loading {
    padding: 0 8px;
}

</style>