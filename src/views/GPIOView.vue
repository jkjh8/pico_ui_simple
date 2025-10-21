<!-- @format -->
<script setup>
  import { ref, onMounted } from 'vue'
  import LoadingModal from '../components/LoadingModal.vue'

  const commMode = ref('TEXT')
  const commModes = ['TEXT', 'JSON']
  const autoResponse = ref(true)
  const deviceId = ref(1)

  const deviceIdError = ref('')
  const showReboot = ref(false)
  const modalMessage = ref('Settings have been applied.')
  const showSuccessModal = ref(false)

  function showSuccess() {
    showSuccessModal.value = true
    setTimeout(() => {
      showSuccessModal.value = false
    }, 1000)
  }

  const getCommSettings = async () => {
    try {
      const response = await fetch('/api/gpio')
      const data = await response.json()
      deviceId.value = data.device_id
      autoResponse.value = data.auto_response
      commMode.value = data.comm_mode.toUpperCase()
      console.log('Communication settings fetched:', data)
    } catch (error) {
      console.error('Error fetching communication settings:', error)
    }
  }

  const onSubmit = async () => {
    if (deviceId.value < 1 || deviceId.value > 256) {
      deviceIdError.value = 'Please enter a valid Device ID (1-256).'
      return
    }

    const response = await fetch('/api/gpio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        device_id: deviceId.value,
        auto_response: autoResponse.value,
        comm_mode: commMode.value.toLowerCase()
      })
    })
    if (!response.ok) {
      console.error('Error submitting communication settings:', response.status)
      return
    }
    // 세팅 변경 성공 시 리부팅 모달 표시
    showSuccess()
  }

  onMounted(async () => {
    getCommSettings()
  })
</script>

<template>
  <div
    class="network-card card p-4 shadow-sm"
    style="max-width: 400px; width: 100%; margin: auto">
    <div class="d-flex mb-3">
      <img
        src="../icons/cable.svg"
        style="width: 26px; height: 26px; margin-right: 10px" />
      <h4 class="fw-bold mb-0 ml-2">GPIO Settings</h4>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-2">
        <label
          for="deviceId"
          class="form-label fw-semibold">
          Device ID
        </label>
        <input
          type="number"
          id="deviceId"
          v-model="deviceId"
          class="form-control"
          min="1"
          max="256"
          required />
        <div
          v-if="deviceIdError"
          class="text-danger small mt-1">
          {{ deviceIdError }}
        </div>
      </div>

      <div class="mb-2">
        <label
          for="commMode"
          class="form-label fw-semibold">
          Communication Mode
        </label>
        <select
          id="commMode"
          v-model="commMode"
          class="form-select"
          required>
          <option
            v-for="mode in commModes"
            :key="mode"
            :value="mode">
            {{ mode }}
          </option>
        </select>
      </div>
      <div class="mb-2 d-flex justify-content-between align-items-center">
        <label
          class="form-label fw-semibold"
          for="autoResponseSwitch">
          Enable Auto Response
        </label>
        <div class="form-check form-switch mb-3">
          <input
            class="form-check-input select-switch-lg"
            style="cursor: pointer; margin-top: 10px"
            type="checkbox"
            id="autoResponseSwitch"
            v-model="autoResponse" />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary w-100 mt-3">
        Save Settings
      </button>
    </form>
    <LoadingModal
      :show="showReboot"
      :message="modalMessage" />
    <div
      v-if="showSuccessModal"
      class="modal-center">
      <div class="square-modal">
        <div class="mb-3">
          <div
            class="spinner-border text-success"
            role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <h5 class="mb-2">Settings applied successfully.</h5>
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
