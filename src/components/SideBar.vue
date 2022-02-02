<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <ul class="sidebar-menu_list">
                <li class="sidebar-menu_title">DASHBOARD</li>
                <li class="list active">
                    <router-link to="/" class="sidebar-menu_link active">
                        <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                <g id="SLA-dashboard-" transform="translate(-28.000000, -145.000000)" stroke="#C5ECF4">
                                    <g id="grid" transform="translate(29.000000, 146.000000)">
                                        <rect id="Rectangle" x="0" y="0" width="4" height="4"></rect>
                                        <rect id="Rectangle" x="7" y="0" width="4" height="4"></rect>
                                        <rect id="Rectangle" x="7" y="7" width="4" height="4"></rect>
                                        <rect id="Rectangle" x="0" y="7" width="4" height="4"></rect>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        Overview
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="sidebar-menu">
            <ul class="sidebar-menu_list">
                <li class="sidebar-menu_title">App processing time</li>
                <li class="list">
                    <router-link to="/application" class="sidebar-menu_link">
                    <svg width="13px" height="13px" viewBox="0 0 10 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g id="SLA-dashboard-" transform="translate(-28.000000, -252.000000)" stroke="#81A3AD">
                                <g id="file" transform="translate(29.000000, 253.000000)">
                                    <path d="M4.5,0 L1,0 C0.44771525,0 0,0.492486775 0,1.1 L0,9.9 C0,10.5075132 0.44771525,11 1,11 L7,11 C7.55228475,11 8,10.5075132 8,9.9 L8,3.85 L4.5,0 Z" id="Path"></path>
                                    <polyline id="Path" points="3 0 3 4 8 4"></polyline>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Application
                </router-link>
                </li>
                <li class="list">
                    <router-link to="/beneficiaries" class="sidebar-menu_link">
                    <svg width="13px" height="13px" viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g id="SLA-dashboard-" transform="translate(-28.000000, -302.000000)" stroke="#81A3AD">
                                <g id="users" transform="translate(29.000000, 303.000000)">
                                    <path d="M9,10 L9,9 C9,7.8954305 7.99264069,7 6.75,7 L2.25,7 C1.00735931,7 0,7.8954305 0,9 L0,10" id="Path"></path>
                                    <circle id="Oval" cx="4" cy="2" r="2"></circle>
                                    <path d="M12,10 L12,8.97785349 C11.9990935,8.04622713 11.1766659,7.2329064 10,7" id="Path"></path>
                                    <path d="M8,0 C9.1768664,0.233894084 10,1.05702769 10,2 C10,2.94297231 9.1768664,3.76610592 8,4" id="Path"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Beneficiaries
                </router-link>
                </li>
                <!-- <li class="list">
                    <router-link to="/beneficiarycategory" class="sidebar-menu_link">
                        <svg width="13px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                <g id="SLA-dashboard-" transform="translate(-28.000000, -348.000000)" stroke="#81A3AD">
                                    <g id="user" transform="translate(29.000000, 349.000000)">
                                        <path d="M10,11 L10,9.66666667 C10,8.19390733 8.88071187,7 7.5,7 L2.5,7 C1.11928813,7 0,8.19390733 0,9.66666667 L0,11" id="Path"></path>
                                        <circle id="Oval" cx="5.5" cy="2.5" r="2.5"></circle>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    Beneficiary category
                </router-link>
                </li> -->
                <li class="list">
                    <router-link to="/sector" class="sidebar-menu_link">
                    <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <g id="SLA-dashboard-" transform="translate(-28.000000, -396.000000)" stroke="#96C7D1">
                                <g id="pie-chart" transform="translate(29.000000, 397.000000)">
                                    <path d="M10,7.81422098 C9.08898172,9.97373578 6.85274149,11.258921 4.53320201,10.9560338 C2.21366253,10.6531465 0.380550442,8.83658209 0.0519064399,6.51519123 C-0.276737562,4.19380038 0.979808249,1.93776447 3.12370615,1" id="Path"></path>
                                    <path d="M11,6 C11,4.40870106 10.367859,2.88257758 9.24264069,1.75735931 C8.11742242,0.632141042 6.59129894,0 5,0 L5,6 L11,6 Z" id="Path"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Sector
                </router-link>
                </li>
            </ul>
        </div>

        <div class="sidebar-menu">
            <ul class="sidebar-menu_list">
                <li class="sidebar-menu_title">RATINGS</li>
                <li class="list">
                    <router-link to="/scorecard" class="sidebar-menu_link">
                    <svg width="15px" height="14px" viewBox="0 0 15 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="SLA-dashboard-" transform="translate(-29.000000, -496.000000)" stroke="#8EB2BB">
                                <path d="M36.5,497.343316 L38.0908854,501.310334 L42.355354,501.59748 L39.0741066,504.336378 L40.1188078,508.480862 L36.5,506.206576 L32.8811922,508.480862 L33.9258934,504.336378 L30.644646,501.59748 L34.9091146,501.310334 L36.5,497.343316 Z" id="Star"></path>
                            </g>
                        </g>
                    </svg>
                        Scorecard
                    </router-link>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "SideBar"
}
</script>

<style lang="scss" scoped>

.sidebar {
    max-width: 243px;
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: $primary;
    overflow: auto;
}

.sidebar-menu {
    position: relative;
    top: 100px;
    padding: 0 12px 43px 12px;
    font-size: 0.875rem;
    color: rgba(169,220,231,0.89);

    .list {
        margin: 10px 0;
    }

    .sidebar-menu_list {
        list-style-type: none;

        & .sidebar-menu_title {
            text-transform: uppercase;
            padding-left: 17px;
        }

        & .sidebar-menu_link {
            position: relative;
            text-decoration: none;
            color: rgba(169,220,231,0.89);
            padding: 10px 17px 11px;
            display: block;

            & svg {
                margin-right: 12px;
            }

            &:before {
                content: "";
                display: block;
                position: absolute;
                top:0;
                bottom: 0;
                left: 0;
                right: 0;
                border-radius: 3px;
                background-color: #00577a61;
                transform: scaleX(0);
                transform-origin: bottom right;
                transition: transform .3s ease;
                z-index: -1;
            }

            &:hover:before {
                transform: scaleX(1);
                transform-origin: bottom left;
            }

            &.router-link-exact-active.router-link-active {
                background-color: $secondary;
                color: rgba(255,255,255,0.89);
                border-radius: 3px;
                display: block;
            }
        }
    }

}

</style>