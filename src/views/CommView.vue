<!-- @format -->
<script setup>
  import { ref, onMounted } from 'vue'
  import LoadingModal from '../components/LoadingModal.vue'

  const bauds = [9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600]
  const baudRate = ref(9600)
  const tcpPort = ref(5050)

  const portError = ref('')
  const showReboot = ref(false)
  const countdown = ref(10)
  const modalMessage = ref('Updates have been applied.')

  function showRebootModal() {
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

  const getCommSettings = async () => {
    try {
      const response = await fetch('/api/control')
      const data = await response.json()
      tcpPort.value = data.tcp_port
      baudRate.value = data.rs232_1_baud
      console.log('Communication settings fetched:', data)
    } catch (error) {
      console.error('Error fetching communication settings:', error)
    }
  }

  const onSubmit = async () => {
    if (tcpPort.value < 1 || tcpPort.value > 65535) {
      portError.value = 'Please enter a valid TCP port (1-65535).'
      return
    }

    const response = await fetch('/api/control', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tcp_port: tcpPort.value,
        rs232_1_baud: baudRate.value
      })
    })
    if (!response.ok) {
      console.error('Error submitting communication settings:', response.status)
      return
    }
    // 세팅 변경 성공 시 리부팅 모달 표시
    showRebootModal()
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
        src="../icons/send.svg"
        style="width: 26px; height: 26px; margin-right: 10px" />
      <h4 class="fw-bold mb-0 ml-2">Communication Settings</h4>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-2">
        <label
          for="tcpPort"
          class="form-label fw-semibold">
          TCP Port
        </label>
        <input
          type="number"
          id="tcpPort"
          v-model="tcpPort"
          class="form-control"
          min="1"
          max="65535"
          required />
        <div
          v-if="portError"
          class="text-danger small mt-1">
          {{ portError }}
        </div>
      </div>

      <div class="mb-2">
        <label
          for="baudRate"
          class="form-label fw-semibold">
          RS-232 Baud Rate
        </label>
        <select
          id="baudRate"
          v-model="baudRate"
          class="form-select"
          required>
          <option
            v-for="baud in bauds"
            :key="baud"
            :value="baud">
            {{ baud }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary w-100 mt-3">
        Save Settings
      </button>
    </form>
    <LoadingModal
      :show="showReboot"
      :message="modalMessage"
      :countdown="countdown" />
  </div>
</template>

<style scoped></style>
