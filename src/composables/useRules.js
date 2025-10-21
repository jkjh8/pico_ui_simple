/** @format */

// useRules.js
export function useRules() {
  function validateIP(val) {
    return /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.|$)){4}$/.test(val)
  }
  return {
    validateIP
  }
}
