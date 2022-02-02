<template>
    <form class="bar" @submit="handleSubmit">
        <svg width="15px" height="16px" viewBox="0 0 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                <g id="SLA-dashboard-/App/-Appl" transform="translate(-313.000000, -194.000000)" stroke="#959595" stroke-width="1.5">
                    <g id="Group-Copy" transform="translate(293.000000, 178.000000)">
                        <g id="search" transform="translate(21.000000, 17.000000)">
                            <circle id="Oval" cx="6" cy="6" r="6"></circle>
                            <line x1="13" y1="14" x2="10" y2="11" id="Path"></line>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <input type="search" placeholder="Search" class="search" :value="value" @input="handleInput" />
    </form>
</template>

<script>
export default {
    prop: ['input'],
    data() {
        return {
            searchInput: ''
        }
    },
    props: {
      value: String
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value)
        },
        handleSubmit(e) {
            e.preventDefault();
            this.$emit('submit', this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    font-family: 'Apercu Pro Regular';
    font-size: 14px;
    color: #959595;
    background-color: #F2F2F2;
    border: 2px solid #F2F2F2;
    border-radius: 2px;
    padding: 15px 15px 15px 40px;
    width: 250px;
}

.bar svg {
    position: absolute;
    top: 17px;
    left: 15px;
}
</style>