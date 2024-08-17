<template lang="">
    <v-card style="max-height: 200px;">
      <v-card-title>
        <b>Consent</b>
      </v-card-title>
      <v-card-text>
        <v-checkbox v-model="scrollValue" label="Consent by scroll"></v-checkbox>
        <v-checkbox v-model="perPurposeValue" label="Per purpose consent"></v-checkbox>
      </v-card-text>
    </v-card>
</template>
<script>
export default {
  computed: {
      scrollValue: {
          get() {
              return this.$store.state.configDefault.consentByScroll
          },
          set(newValue) {
              this.$store.dispatch('setConsentByScroll', newValue)
          }
      },
      perPurposeValue: {
          get() {
              return this.$store.state.configDefault.perPurposeConsent
          },
          set(newValue) {
              this.$store.dispatch('setConsentPerPurpose', newValue)
          }
      },
  }
}
</script>
<style lang="">
    
</style>