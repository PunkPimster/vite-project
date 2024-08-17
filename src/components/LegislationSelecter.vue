<template lang="">
    <v-card style="max-height: 200px;">
        <v-card-title>
            <b>Legislation</b>
        </v-card-title>
        <v-card-text>
            <v-checkbox ref="" v-model="gdprValue" label="GDPR"></v-checkbox>
            <v-checkbox v-model="ccpaValue" label="CCPA"></v-checkbox>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    computed: {
        gdprValue: {
            get() {
                return this.$store.state.configDefault.gdpr
            },
            set(newValue) {
                this.$store.dispatch('setGDPRLegislation', newValue)
            }
        },
        ccpaValue: {
            get() {
                return this.$store.state.configDefault.ccpa
            },
            set(newValue) {
                this.$store.dispatch('setCCPALegislation', newValue)
            }
        },
    }
    
}
</script>
<style lang="">
    
</style>