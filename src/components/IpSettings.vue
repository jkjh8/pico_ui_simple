<!-- @format -->

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRules } from '../composables/useRules.js'
  import LoadingModal from './LoadingModal.vue'
  import { api } from '../composables/useApi.js'
  import { macAddress, networkAddress } from '../composables/useNetwork.js'

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
  // dhcp가 true로 바뀌면 에러 메시지 초기화
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

  const getnetworkAddress = async () => {
    try {
      const r = await api.get('/network')
      macAddress.value = r.data.mac
      return (networkAddress.value = r.data.network)
    } catch (error) {
      console.error('Error fetching network status:', error)
    }
  }

  onMounted(async () => {
    await getnetworkAddress()
    newValue.value = networkAddress.value
  })

  async function onSubmit() {
    if (validateForm() || newValue.value.dhcp_enabled) {
      // 네트워크 설정 제출
      try {
        await api.post('/network', newValue.value)
      } catch (error) {
        return console.error('Error submitting network settings:', error)
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
      <div class="network-header">
        <img
          src="../icons/settings_ethernet.svg"
          style="width: 24px; height: 24px" />
        <div class="font-name-tag mb-1">Network Status</div>
        <div class="header-actions">
          <span class="me-2">DHCP</span>
          <label class="switch">
            <input
              class="switch-input"
              type="checkbox"
              v-model="newValue.dhcp_enabled"
              id="dhcpSwitch" />
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>
      <div class="mb-2">
        <label class="form-label text-secondary small">IP Address</label>
        <input
          type="text"
          class="form-control form-control-sm bg-light"
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
          class="form-control form-control-sm bg-light"
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
          class="form-control form-control-sm bg-light"
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
          class="form-control form-control-sm bg-light"
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
