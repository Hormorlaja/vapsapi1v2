<template>
    <table class="table">
        <thead>
            <tr>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
                <th>
                    <span></span>
                </th>
            </tr>
        </thead>

        <tbody>

            <tr v-for="row in tableLoader" :key="row">
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
                <td>
                    <span></span>
                </td>
            </tr>

        </tbody>

    </table>
</template>

<script>
export default {
    name: 'TableLoader',
    props: {
        tableLoader: {type: Number, default: 5}
    }
}
</script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
  margin-top: 10px;

  & tr {
    & th {
        position: relative;
        color: #ADADAD;
        font-family: 'Apercu Pro Regular';
        font-size: 16px;
        text-align: left;
        width: 300px;
        border-bottom: 1px solid #25252550;
        padding: 0 20px 15px;
        overflow: hidden;

        & span {
            display: block;
            background: #E7E7E7;
            height: 30px;

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

            @keyframes shimmer {
                100% {
                transform: translateX(100%);
                }
            }
        }
    }
  }
    & tbody {
      & tr {
            padding: 15px;
            margin: 10px;
            border-bottom: 1px solid #9D9C9C50;

            &:last-child {
                border-bottom: 0;
            }

        & td {
            position: relative;
            color: #2B2F32;
            padding: 20px;
            overflow: hidden;

          & span {
                display: block;
                background: #E7E7E7;
                height: 30px;

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

                @keyframes shimmer {
                    100% {
                    transform: translateX(100%);
                    }
                }
            }
        }

        & .name {
            text-transform: capitalize;
        }
      }
    }

}
</style>