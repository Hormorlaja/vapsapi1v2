<template>
    <div class="category-filter" @click="openDrop">
      <div class="filterby">
          <template v-if="iconBefore">
            <svg width="17px" height="16px" viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="SLA-dashboard-" transform="translate(-278.000000, -94.000000)" stroke="#000000" stroke-width="1.5">
                      <g id="filter-copy" transform="translate(279.000000, 95.000000)">
                          <polygon id="Path" points="15 0 0 0 6 7.35777778 6 12.4444444 9 14 9 7.35777778"></polygon>
                      </g>
                  </g>
              </g>
            </svg>
            <span class="filter-title">Filter by:</span>
          </template>
          <span class="suggestions" @click="option">
            <p>{{title}}</p>
            <svg v-if="iconAfter" ref="arrowdown" width="12px" height="8px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="SLA-dashboard-" transform="translate(-1344.000000, -98.000000)" stroke="#000000">
                        <g id="Group-5" transform="translate(1223.000000, 77.000000)">
                            <g id="chevron-down-copy" transform="translate(122.000000, 22.000000)">
                                <polyline id="Path" points="0 0 4 4 8 0"></polyline>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
          </span>
      </div>
    </div>

</template>

<script>

export default {
  name: 'DropFilter',
  props: {
      title: {type: String,  default: undefined},
      iconBefore: {type: Boolean,  default: undefined},
      iconAfter: {type: Boolean,  default: true}

  },
  data() {
    return {
      dropActive: false,
      itemList: false,
      item: ''
    }
  },
  methods: {
    openDrop() {
      this.dropActive = !this.dropActive;
      this.$refs.arrowdown.classList.add("_active");

      if(this.dropActive === false) {
        this.$refs.arrowdown.classList.remove("_active");
      }
    },
    option() {
      this.$emit("option");
    }
  }
}
</script>

<style lang="scss" scoped>

.filterby {
  display: flex;
  cursor: pointer;

  & svg {
    margin-right: 10px;
  }
}

.filter-title {
  font-size: 14px;
  color: #1F2223;
  margin-right: 10px;
}

.suggestions {
  display: flex;
  align-items: center;

  & p {
    font-size: 14px;
    color: #aaa;
    padding-right: 10px;
  }

  & svg {
      transition: .5s ease-in-out;
  }

  & ._active {
      transform: rotate(180deg);
      transition: .5s ease-in-out;
  }
}

.category-filter {
  border: 1px solid #ddd;
  max-width: 395px;
  padding: 15px 23px;
  border-radius: 6px;
  margin: 20px 10px 10px;
}

.filter-title {
  font-size: 14px;
  color: #1F2223;
  margin-right: 10px;
}
</style>
