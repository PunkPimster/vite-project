import { createStore } from 'vuex'

export default createStore({
  state: {
    configDefault: {
      targetCountries: 'EU', // Possible values: 'EU', 'US', 'world'
      gdpr: true,
      ccpa: false,
    
      consentByScroll: false,
      perPurposeConsent: false,
    
      banner: {
        acceptButtonDisplay: false, // visibility of the Accept button
        rejectButtonDisplay: false, // visibility of the Reject button
        closeButtonDisplay: true, // visibility of the Close button
        closeButtonRejects: false, // clicking the Close button should accept (`false`) or reject (`true`) the consent
        title: 'Notice', // Text field that will change the displayed title of the banner
      }
    }
  },
  getters: {
    targetCountriesGetter(state) {
      return state.configDefault.targetCountries
    },
    // Legislation
    gdprLegislationGetter(state) {
      return state.configDefault.gdpr
    },
    ccpaLegislationGetter(state) {
      return state.configDefault.ccpa
    },
    // Consent
    consentByScrollGetter(state) {
      return state.configDefault.consentByScroll
    },
    consentPerPurposeGetter(state) {
      return state.configDefault.perPurposeConsent
    }
  },
  mutations: {
    setTargetCountry(state, newValue) {
      state.configDefault.targetCountries = newValue
    },
    // Legislation
    setGDPRLegislation(state, newValue) {
      state.configDefault.gdpr = newValue
    },
    setCCPALegislation(state, newValue) {
      state.configDefault.ccpa = newValue
    },
    // Consent
    setConsentByScroll(state, newValue) {
      state.configDefault.consentByScroll = newValue
    },
    setConsentPerPurpose(state, newValue) {
      state.configDefault.perPurposeConsent = newValue
    },
    // Banner
    setAcceptButtonDisplay(state, newValue) {
      state.configDefault.banner.acceptButtonDisplay = newValue
    },
    setRejectButtonDisplay(state, newValue) {
      state.configDefault.banner.rejectButtonDisplay = newValue
    },
    setCloseButtonDisplay(state, newValue) {
      state.configDefault.banner.closeButtonDisplay = newValue
    },
    setCloseButtonRejects(state, newValue) {
      state.configDefault.banner.closeButtonRejects = newValue
    },
    setTitleValue(state, newValue) {
      state.configDefault.banner.title = newValue
    },
  },
  actions: {
    setTargetCountry({ commit }, newValue) {
      commit('setTargetCountry', newValue)
    },
    // Legislation
    setGDPRLegislation({ commit }, newValue) {
      commit('setGDPRLegislation', newValue)
    },
    setCCPALegislation({ commit }, newValue) {
      commit('setCCPALegislation', newValue)
    },
    // Consent
    setConsentByScroll({ commit }, newValue) {
      commit('setConsentByScroll', newValue)
    },
    setConsentPerPurpose({ commit }, newValue) {
      commit('setConsentPerPurpose', newValue)
    },
    // Banner
    setAcceptButtonDisplay({ commit }, newValue) {
      commit('setAcceptButtonDisplay', newValue)
    },
    setRejectButtonDisplay({ commit }, newValue) {
      commit('setRejectButtonDisplay', newValue)
    },
    setCloseButtonDisplay({ commit }, newValue) {
      commit('setCloseButtonDisplay', newValue)
    },
    setCloseButtonRejects({ commit }, newValue) {
      commit('setCloseButtonRejects', newValue)
    },
    setTitleValue({ commit }, newValue) {
      commit('setTitleValue', newValue)
    },
  },
  modules: {
  }
})
