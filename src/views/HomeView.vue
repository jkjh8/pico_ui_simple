<!-- @format -->
<script setup>
  import IpSettings from '../components/IpSettings.vue'
  import systemReboot from '../components/systemReboot.vue'
</script>

<template>
  <div class="ip-settings">
    <IpSettings />
    <systemReboot />
  </div>
</template>

<style scoped>
  .ip-settings {
    display: grid;
    gap: 1rem;
    padding-top: 1rem;
  }
</style>
