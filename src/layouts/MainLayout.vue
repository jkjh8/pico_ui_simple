<!-- @format -->

<script setup>
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  const route = useRoute()
  const navbarCollapse = ref(null)
</script>

<template>
  <nav
    class="navbar navbar-expand-md px-4 bg-primary"
    data-bs-theme="dark">
    <div class="container-fluid">
      <div
        class="navbar-brand"
        style="font-weight: 600">
        Mic Controller
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        ref="navbarCollapse">
        <div class="navbar-nav">
          <a
            class="nav-link"
            :class="{ active: route.path === '/' }"
            href="/"
            aria-current="page">
            Settings
          </a>
          <a
            class="nav-link"
            :class="{ active: route.path === '/comm' }"
            href="/comm">
            Communication
          </a>
          <a
            class="nav-link"
            :class="{ active: route.path === '/gpio' }"
            href="/gpio">
            GPIO
          </a>
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
