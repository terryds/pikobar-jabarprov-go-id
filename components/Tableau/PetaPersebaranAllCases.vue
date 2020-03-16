<template>
  <TableauViz :url="url"/>
</template>

<script>
import TableauViz from './TableauViz'
export default {
  components: {
    TableauViz
  },
  data () {
    return {
      url: 'https://public.tableau.com/views/PetaSebaranODPPDP-BlueVersion/DashboardMapAllCases?:embed=y&:origin=viz_share_link&:toolbar=n&:embed_code_version=3&:loadOrderID=0&showTabs=false&:display_count=y'
    }
  }
}
</script>
