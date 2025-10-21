<!-- @format -->

<script setup>
  import { ref } from 'vue'
  import LoadingModal from './LoadingModal.vue'

  const showConfirm = ref(false)
  const showReboot = ref(false)
  const countdown = ref(10)
  const modalMessage = ref('System reboot has been requested.')

  function onRebootClick() {
    showConfirm.value = true
  }

  function onCancel() {
    showConfirm.value = false
  }

  function onConfirm() {
    showConfirm.value = false
    showReboot.value = true
    countdown.value = 10
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        showReboot.value = false
        // 실제 재부팅 API 호출 위치
        window.location.reload()
      }
    }, 1000)
  }
</script>

<template>
  <div
    class="network-card card p-4 shadow-sm"
    style="max-width: 400px; width: 100%; margin: auto">
    <div class="d-flex mb-3">
      <img
        src="../icons/power_settings_new.svg"
        style="width: 24px; height: 24px; margin-right: 10px" />
      <h4 class="fw-bold mb-0 ml-2">System Reboot</h4>
    </div>

    <button
      type="button"
      class="btn btn-primary w-100 mt-3"
      @click="onRebootClick">
      Reboot
    </button>
    <!-- 확인 모달 -->
    <div
      v-if="showConfirm"
      class="modal-center">
      <div class="square-modal">
        <div class="mb-2 fw-bold">Are you sure you want to reboot?</div>
        <div class="d-flex gap-2 mt-3">
          <button
            class="btn btn-secondary"
            @click="onCancel">
            Cancel
          </button>
          <button
            class="btn btn-primary"
            @click="onConfirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
    <!-- ...existing code... -->
    <!-- 재부팅 모달 -->
    <LoadingModal
      :show="showReboot"
      :message="modalMessage"
      :countdown="countdown" />
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
    width: 300px;
    height: 200px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  }
</style>
