<!-- @format -->

<script setup>
  import { ref } from 'vue'
  const current = ref('settings')
  import SettingsView from '../views/HomeView.vue'
  import CommView from '../views/CommView.vue'
  import GPIOView from '../views/GPIOView.vue'
  import { networkAddress } from '../composables/useNetwork'
</script>

<template>
  <nav
    class="navbar navbar-expand px-4 bg-primary"
    data-bs-theme="dark">
    <div class="container-fluid">
      <div
        class="navbar-brand"
        style="font-size: 1.5rem; font-weight: 600">
        M
      </div>
      <div class="d-flex align-items-center w-100">
        <div class="navbar-nav d-flex flex-row flex-nowrap gap-2">
          <div
            class="nav-link"
            :class="{ active: current === 'settings' }"
            style="cursor: pointer"
            @click="current = 'settings'"
            aria-current="page">
            Settings
          </div>
          <div
            class="nav-link"
            :class="{ active: current === 'comm' }"
            style="cursor: pointer"
            @click="current = 'comm'">
            Communication
          </div>
          <div
            class="nav-link"
            :class="{ active: current === 'gpio' }"
            style="cursor: pointer"
            @click="current = 'gpio'">
            GPIO
          </div>
        </div>
        <span
          class="ms-auto"
          style="font-size: 0.8rem; color: white">
          {{ networkAddress ? networkAddress.mac : 'No Network' }}
        </span>
      </div>
    </div>
  </nav>
  <main class="px-5 py-3">
    <SettingsView v-if="current === 'settings'" />
    <CommView v-else-if="current === 'comm'" />
    <GPIOView v-else-if="current === 'gpio'" />
  </main>
</template>

<style scoped></style>
