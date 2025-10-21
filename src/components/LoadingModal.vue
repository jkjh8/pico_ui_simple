<!-- @format -->

<script setup>
  import { defineProps, defineEmits } from 'vue'

  const { show, message, countdown } = defineProps({
    show: Boolean,
    message: {
      type: String,
      default: 'Processing...'
    },
    countdown: {
      type: Number,
      default: null
    }
  })
  const emits = defineEmits(['update:show'])
</script>

<template>
  <div
    class="modal-center"
    v-if="show">
    <div
      class="square-modal d-flex flex-column justify-content-center align-items-center">
      <div class="mb-3"></div>
      <div
        class="mb-2"
        style="font-size: 1.2rem; font-weight: 600">
        {{ message }}
      </div>
      <div
        class="mt-2"
        style="font-size: 1.2rem">
        System will reboot.
      </div>
      <div
        class="spinner-border text-primary mt-2"
        role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div
        v-if="countdown !== null"
        style="font-size: 0.8rem">
        <span class="fw-bold">
          {{ countdown }}
        </span>
        seconds remaining.
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-center {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.15);
    z-index: 1050;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .square-modal {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    padding: 15px 40px 40px 40px;
    opacity: 0.9;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  }
</style>
