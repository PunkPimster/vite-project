<template>
  <v-app>
    <v-container class="cs-container" fluid>
      <v-row>
        <v-col cols="12">
          <v-toolbar flat color="white" id="cookieToolbar">
            <v-toolbar-title style="font-family: Arial">Configure your Cookie Solution</v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>

      <!-- Row with three columns -->
      <v-row>
        <!-- First column with country-select and legislation-select -->
        <v-col cols="3" style="padding-bottom: 50px;">
          <country-select />
          <legislation-select />
        </v-col>
        <!-- Second column with consent-select -->
        <v-col cols="3">
          <consent-select />
          <banner-select />
        </v-col>

        <!-- Third column with preview -->
        <v-col cols="5">
          <v-card>
            <v-card-title>Preview</v-card-title>
            <v-card-text>
              <pre class="preview-json">{{ previewJson }}</pre>
            </v-card-text>
            <v-label>{{ warningText }}</v-label>
          </v-card>
        </v-col>
      </v-row>

      <!-- Row with action buttons -->
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-form @submit.prevent="saveData">
            <v-btn href="/help" text small style="font-family: Arial; font-size: 13px">
              Read the documentation
            </v-btn>
            <v-btn color="primary" id="saveButton" @click="saveData()">
              Save
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
import CountrySelect from '@/components/CountrySelecter.vue'
import LegislationSelect from '@/components/LegislationSelecter.vue'
import ConsentSelect from '@/components/ConsentSelecter.vue'
import BannerSelect from '@/components/BannerSelect.vue'

export default {
  name: 'CookieView',
  components: {
    'country-select': CountrySelect,
    'legislation-select': LegislationSelect,
    'consent-select': ConsentSelect,
    'banner-select': BannerSelect
  },
  data () {
    return {
      warningText: ''
    }
  },
  computed: {
    ...mapState({
      targetCountries: (state) => state.configDefault.targetCountries,
      gdpr: (state) => state.configDefault.gdpr,
      ccpa: (state) => state.configDefault.ccpa,
      consentByScroll: (state) => state.configDefault.consentByScroll,
      perPurposeConsent: (state) => state.configDefault.perPurposeConsent,
      banner: (state) => state.configDefault.banner,
      configDefault: (state) => state.configDefault
    }),
    previewJson() {
        return JSON.stringify(
          {
            targetCountries: this.targetCountries,
            gdpr: this.gdpr,
            ccpa: this.ccpa,
            consentByScroll: this.consentByScroll,
            perPurposeConsent: this.perPurposeConsent,
            banner: this.banner
          },
          null,
          2
        )     
    }
  },
  methods: {
    saveData() {
      this.warningText = ''
      var data = new FormData()

      var xhr = new XMLHttpRequest()
      xhr.open('POST', '/', true)
      xhr.onload = function () {
        console.log(this.responseText)
      }
      if (this.isValidJson(this.configDefault)) {
        this.lawValidations()
        console.log('Valid JSON')
        xhr.send(data)
      }
    },
    isValidJson(json) {
      let isValid = true

      if (json.targetCountries !== undefined && json.targetCountries !== null) {
        if (json.targetCountries !== 'EU' && json.targetCountries !== 'US' && json.targetCountries !== 'world') {
          console.log('Invalid target country')
          isValid = false
        }
      }

      if (json.gdpr !== undefined && json.gdpr !== null) {
        if (typeof json.gdpr !== 'boolean') {
          console.log('Invalid GDPR value')
          isValid = false
        }
      }

      if (json.ccpa !== undefined && json.ccpa !== null) {
        if (typeof json.ccpa !== 'boolean') {
          console.log('Invalid CCPA value')
          isValid = false
        }
      }

      if (json.consentByScroll !== undefined && json.consentByScroll !== null) {
        if (typeof json.consentByScroll !== 'boolean') {
          console.log('Invalid Consent by Scroll value')
          isValid = false
        }
      }

      if (json.perPurposeConsent !== undefined && json.perPurposeConsent !== null) {
        if (typeof json.perPurposeConsent !== 'boolean') {
          console.log('Invalid "per purpose consent" value')
          isValid = false
        }
      }

      if (json.banner !== undefined && json.banner !== null) {
        if (json.banner.acceptButtonDisplay !== undefined && json.banner.acceptButtonDisplay !== null) {
          if (typeof json.banner.acceptButtonDisplay !== 'boolean') {
            console.log('Invalid banner value: accept button display')
            isValid = false
          }
        }

        if (json.banner.rejectButtonDisplay !== undefined && json.banner.rejectButtonDisplay !== null) {
          if (typeof json.banner.rejectButtonDisplay !== 'boolean') {
            console.log('Invalid banner value: reject button display')
            isValid = false
          }
        }

        if (json.banner.closeButtonDisplay !== undefined && json.banner.closeButtonDisplay !== null) {
          if (typeof json.banner.closeButtonDisplay !== 'boolean') {
            console.log('Invalid banner value: close button display')
            isValid = false
          }
        }

        if (json.banner.closeButtonRejects !== undefined && json.banner.closeButtonRejects !== null) {
          if (typeof json.banner.closeButtonRejects !== 'boolean') {
            console.log('Invalid banner value: close button reject')
            isValid = false
          }
        }

        if (json.banner.title !== undefined && json.banner.title !== null) {
          if (typeof json.banner.title !== 'string') {
            console.log('Invalid banner value: title')
            isValid = false
          }
        }
      }

      return isValid
    },
    lawValidations () {
      let compliant = true
      // Italian law requires that users should be able to deny consent to the usage of cookies by a button in the banner 
      //and that the close button of the banner cannot be used to accept the consent of the usage of cookies.
      const euOrWorld = (this.targetCountries === 'EU' || this.targetCountries === 'world')
      const nonCompliantButton = (this.banner.closeButtonDisplay && !this.banner.closeButtonRejects) ||
      (!this.banner.rejectButtonDisplay && !this.banner.closeButtonRejects) ||
      (this.banner.rejectButtonDisplay && this.banner.closeButtonDisplay && !this.banner.closeButtonRejects)
      
      const italianLawNonCompliant = euOrWorld && nonCompliantButton
      if (italianLawNonCompliant) {
        this.warningText = 'Your selected settings are not compliant with laws in Italy'
        compliant = false
      }
      //Both Italian and French laws require that the user 
      //should be able to express a preference on the usage of cookies only by explicit interaction with the banner
      const frenchAndItalianLawNonCompliant = euOrWorld && this.consentByScroll
      if (compliant && frenchAndItalianLawNonCompliant) {
        this.warningText = 'Your selected settings are not compliant with laws in France and Italy'
        compliant = false
      }
      //French law requires that the user should be able to express a granular preference for all the purposes for which the cookies are used
      const frenchLawNonCompliant = euOrWorld && this.perPurposeConsent
      if (compliant && frenchLawNonCompliant) {
        this.warningText = 'Your selected settings are not compliantwith laws in France'
        compliant = false
      }
    }

  },
  
}
</script>
  
<style scoped>
  .cs-container {
    padding: 16px
  }
</style>
  