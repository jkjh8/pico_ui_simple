<!-- @format -->

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRules } from '../composables/useRules.js'
  import LoadingModal from './LoadingModal.vue'

  const networkStatus = ref({})
  const newValue = ref({})
  const showModal = ref(false)
  const countdown = ref(10)
  const modalMessage = ref('IP address has been changed.')

  const ipError = ref('')
  const netmaskError = ref('')
  const gatewayError = ref('')
  const dnsError = ref('')

  const { validateIP } = useRules()

  function validateForm() {
    ipError.value = validateIP(newValue.value.ip)
      ? ''
      : 'please enter a valid IP address.'
    netmaskError.value = validateIP(newValue.value.subnet)
      ? ''
      : 'please enter a valid Netmask.'
    gatewayError.value = validateIP(newValue.value.gateway)
      ? ''
      : 'please enter a valid Gateway.'
    dnsError.value = validateIP(newValue.value.dns)
      ? ''
      : 'please enter a valid DNS.'
    return (
      !ipError.value &&
      !netmaskError.value &&
      !gatewayError.value &&
      !dnsError.value
    )
  }
  // dhcp_enabled가 true로 바뀌면 에러 메시지 초기화
  watch(
    () => newValue.value.dhcp_enabled,
    (val) => {
      if (val) {
        ipError.value = ''
        netmaskError.value = ''
        gatewayError.value = ''
        dnsError.value = ''
      }
    }
  )

  const getNetworkStatus = async () => {
    try {
      const response = await fetch('/api/network')
      const data = await response.json()
      return (networkStatus.value = data.network)
    } catch (error) {
      console.error('Error fetching network status:', error)
    }
  }

  onMounted(async () => {
    await getNetworkStatus()
    newValue.value = networkStatus.value
  })

  async function onSubmit() {
    if (validateForm() || newValue.value.dhcp_enabled) {
      // 네트워크 설정 제출
      const response = await fetch('/api/network', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newValue.value)
      })
      if (!response.ok) {
        console.error('Error submitting network settings:', response.status)
      }
      // 모달 표시 및 10초 카운트다운 후 새로고침
      showModal.value = true
      countdown.value = 10
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
          showModal.value = false
          window.location.reload()
        }
      }, 1000)
    }
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div
      class="network-card card p-4 shadow-sm"
      style="max-width: 400px; margin: auto">
      <div class="d-flex align-items-center mb-3">
        <img
          src="../icons/settings_ethernet.svg"
          style="width: 28px; height: 28px; margin-right: 10px" />
        <h4 class="fw-bold mb-0 ml-2">Network Status</h4>
        <div class="ms-auto d-flex align-items-center">
          <span class="me-2">DHCP</span>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              style="cursor: pointer"
              type="checkbox"
              v-model="newValue.dhcp_enabled"
              id="dhcpSwitch" />
          </div>
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label text-secondary small">IP Address</label>
        <input
          type="text"
          class="form-control bg-light"
          v-model="newValue.ip"
          :disabled="newValue.dhcp_enabled" />
        <div
          v-if="ipError"
          class="text-danger small mt-1">
          {{ ipError }}
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label text-secondary small">Netmask</label>
        <input
          type="text"
          class="form-control bg-light"
          v-model="newValue.subnet"
          :disabled="newValue.dhcp_enabled" />
        <div
          v-if="netmaskError"
          class="text-danger small mt-1">
          {{ netmaskError }}
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label text-secondary small">Gateway</label>
        <input
          type="text"
          class="form-control bg-light"
          v-model="newValue.gateway"
          :disabled="newValue.dhcp_enabled" />
        <div
          v-if="gatewayError"
          class="text-danger small mt-1">
          {{ gatewayError }}
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label text-secondary small">DNS</label>
        <input
          type="text"
          class="form-control bg-light"
          v-model="newValue.dns"
          :disabled="newValue.dhcp_enabled" />
        <div
          v-if="dnsError"
          class="text-danger small mt-1">
          {{ dnsError }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary w-100 mt-3">
        Confirm
      </button>
    </div>
    <LoadingModal
      :show="showModal"
      :message="modalMessage"
      :countdown="countdown" />
  </form>
</template>

<style scoped>
  input[disabled] {
    opacity: 0.5;
  }
</style>
