<template>
    <ul class="dropdown">
        <li v-for="num in nums" :key="num.id" @click="selectValue(num.value)">{{num.value}}</li>
    </ul>
</template>

<script>
export default {
    name: "number-filter",
    props: ["list"],
    data() {
        return {
            nums: this.list,
            value: null
        }
    },
    mounted() {
        this.nums = this.list
    },
    methods: {
        selectValue(value) {
            this.$emit('filtered-num', value)
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
    width: 65px;
    list-style-type: none;
    position: absolute;
    top: 270px;
    right: 247px;
    box-shadow: 0px 1px 1px 2px #f1f0f0c9;
    background-color: #fff;
    z-index: 3;
  
    & li {
      font-family: 'Apercu Pro Regular';
      color: #5C5C5C;
      font-size: 14px;
      padding: 4px 10px 4px;
      cursor: pointer;
  
      &:hover {
        background-color: #ABDFD4;
      }
    }
}
</style>