<template>
    <div class="category-filter date-filter">
        <div class="filterby">
        
        <span class="suggestions">
            <slot></slot>
            <svg width="18px" height="8px" viewBox="0 0 10 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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

<style lang="scss" scoped>
.filterby {
  display: flex;

  & svg {
    margin-right: 10px;
  }
}

.suggestions {
  display: flex;
  align-items: center;
  cursor: pointer;

  & p {
    font-size: 14px;
    color: #aaa;
    padding-right: 10px;
  }
}

.category-filter {
  border: 1px solid #ddd;
  max-width: 395px;
  padding: 15px 23px;
  border-radius: 6px;
  margin: 20px 0 10px;
}
</style>