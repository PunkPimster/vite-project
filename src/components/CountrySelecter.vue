<template lang="">
    <v-card style="max-height: 200px;">
              <v-card-title>
                <b>Target countries</b>
              </v-card-title>
              <v-card-text>
                <v-radio-group v-model="targetCountries">
                  <v-radio label="Worldwide" value="world"></v-radio>
                  <v-radio label="US users only" value="US"></v-radio>
                  <v-radio label="EU users only" value="EU"></v-radio>
                </v-radio-group>
              </v-card-text>
    </v-card> 
</template>
<script>
export default {
    computed: {
      targetCountries: {
        get() {
          return this.$store.state.configDefault.targetCountries
        },
        set(newValue) {
          this.$store.dispatch('setTargetCountry', newValue)
        }
      }
    }
}
</script>
<style lang="">
    
</style>