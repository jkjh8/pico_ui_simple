<!-- @format -->

<script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<template>
  <nav
    class="navbar navbar-expand px-4 bg-primary"
    data-bs-theme="dark">
    <div class="container-fluid">
      <div
        class="navbar-brand"
        style="font-weight: 600">
        Mic Controller
      </div>
      <div class="d-flex align-items-center w-100">
        <div class="navbar-nav d-flex flex-row flex-nowrap">
          <router-link
            class="nav-link"
            :class="{ active: route.path === '/' }"
            to="/"
            aria-current="page">
            Settings
          </router-link>
          <router-link
            class="nav-link"
            :class="{ active: route.path === '/comm' }"
            to="/comm">
            Communication
          </router-link>
          <router-link
            class="nav-link"
            :class="{ active: route.path === '/gpio' }"
            to="/gpio">
            GPIO
          </router-link>
        </div>
        <span class="navbar-text ms-auto">v0.1.0</span>
      </div>
    </div>
  </nav>
  <main class="px-5 py-3">
    <router-view />
  </main>
</template>

<style scoped></style>
