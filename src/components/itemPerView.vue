<template>
    <div class="items">
        <span>Items per view:</span>
        <span @click="$emit('dropDown')" class="items-display">{{view}}</span>
    </div>
</template>

<script>
export default {
    name: "item-view",
    props: ["view"],
}
</script>

<style lang="scss" scoped>
.items {
  margin-top: 7px;
  color: #5C5C5C;
  font-size: 14px;
  margin-right: 50px;
  display: flex;
  align-items: center;
  margin-left: 15px;

  .items-display {
    background-color: #D8D8D8;
    padding: 9px;
    margin-left: 10px;
    font-family: 'Apercu Pro Medium';
    font-size: 14px;
    cursor: pointer;
  }
}
</style>