<template>
    <div class="options">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'FilterOptions',
    data() {
        return {
            isOpen: true
        }
    },
    methods: {
        clickOutside(e) {
            let el = this.$refs.output;
            if (!el.contains(e.target) && el !== e.target) {
                this.hideList();
            }
        },
        hideList() {
            let el = this.$refs.output;
            el.classList.add('close');
        }
    }
}
</script>

<style lang="scss" scoped>
    .options {
        width: 100%;
        height: auto;
        background-color: #fff;
        box-shadow: 0px 1px 1px 2px #f1f0f0c9;

        & ul {
            & li {
                list-style-type: none;
                font-size: 15px;
                color: #2B2F32;
                padding: 14px;
                cursor: pointer;

                & span {
                    padding-left: 5px;
                    color: #A6A6A6;
                }

                 & .arrow-right {
                     float: right;
                    & svg {
                        transform: rotate(270deg);
                    }
                }                    

                    &:hover {
                        background-color: #ABDFD4;
                    }
            }
        }
    }
</style>