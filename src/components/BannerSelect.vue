<template>
  <v-card>
    <v-card-title>
      <b>Banner Configuration</b>
    </v-card-title>
    <v-card-text>
      <!-- Checkbox for Accept Button Display -->
      <v-checkbox
        v-model="acceptButtonDisplay"
        label="Display Accept Button"
        id="accept-button-display"
      ></v-checkbox>

      <!-- Checkbox for Reject Button Display -->
      <v-checkbox
        v-model="rejectButtonDisplay"
        label="Display Reject Button"
        id="reject-button-display"
      ></v-checkbox>

      <!-- Checkbox for Close Button Display -->
      <v-checkbox
        v-model="closeButtonDisplay"
        label="Display Close Button"
        id="close-button-display"
      ></v-checkbox>

      <!-- Checkbox for Close Button Rejects -->
      <v-checkbox
        v-model="closeButtonRejects"
        label="Close Button Rejects Consent"
        id="close-button-rejects"
      ></v-checkbox>

      <!-- Text input for Banner Title -->
      <v-text-field
        v-model="titleValue"
        label="Banner Title"
        placeholder="Enter the banner title"
        id="titleValue"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    acceptButtonDisplay: {
      get() {
        return this.$store.state.configDefault.banner.acceptButtonDisplay
      },
      set(newValue) {
        this.$store.dispatch('setAcceptButtonDisplay', newValue)
      }
    },
    rejectButtonDisplay: {
      get() {
        return this.$store.state.configDefault.banner.rejectButtonDisplay
      },
      set(newValue) {
        this.$store.dispatch('setRejectButtonDisplay', newValue)
      }
    },
    closeButtonDisplay: {
      get() {
        return this.$store.state.configDefault.banner.closeButtonDisplay
      },
      set(newValue) {
        this.$store.dispatch('setCloseButtonDisplay', newValue)
      }
    },
    closeButtonRejects: {
      get() {
        return this.$store.state.configDefault.banner.closeButtonRejects
      },
      set(newValue) {
        this.$store.dispatch('setCloseButtonRejects', newValue)
      }
    },
    titleValue: {
      get() {
        return this.$store.state.configDefault.banner.title
      },
      set(newValue) {
        this.$store.dispatch('setTitleValue', newValue)
      }
    }
  }
}
</script>
