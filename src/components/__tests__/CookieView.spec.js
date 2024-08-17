import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CookieView from '@/views/CookieView.vue'
import { createVuetify } from 'vuetify'
import { createStore } from 'vuex'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Mocking child components
vi.mock('@/components/CountrySelecter.vue', () => ({
  default: {
    template: '<div>CountrySelect</div>'
  }
}))

vi.mock('@/components/LegislationSelecter.vue', () => ({
  default: {
    template: '<div>LegislationSelect</div>'
  }
}))

vi.mock('@/components/ConsentSelecter.vue', () => ({
  default: {
    template: '<div>ConsentSelect</div>'
  }
}))

vi.mock('@/components/BannerSelect.vue', () => ({
  default: {
    template: '<div>BannerSelect</div>'
  }
}))

describe('CookieView.vue', () => {
  let store
  let vuetify

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives
    })

    global.ResizeObserver = require('resize-observer-polyfill')

    store = createStore({
      state: {
        configDefault: {
          targetCountries: 'EU',
          gdpr: true,
          ccpa: false,
          consentByScroll: false,
          perPurposeConsent: false,
          banner: {
            acceptButtonDisplay: false,
            rejectButtonDisplay: false,
            closeButtonDisplay: true,
            closeButtonRejects: false,
            title: 'Notice'
          }
        }
      },
      getters: {
        getTargetCountries: (state) => state.configDefault.targetCountries,
        getGDPRLegislation: (state) => state.configDefault.gdpr,
        getCCPALegislation: (state) => state.configDefault.ccpa,
        getConsentByScroll: (state) => state.configDefault.consentByScroll,
        getConsentPerPurpose: (state) => state.configDefault.perPurposeConsent,
        getBanner: (state) => state.configDefault.banner
      }
    })
  })

  it('must show correct title', () => {
    const wrapper = mount(CookieView, {
      global: {
        plugins: [vuetify, store]
      }
    })
    expect(wrapper.find('v-toolbar-title').text()).toBe('Configure your Cookie Solution')
  })

  it('must generate the correct JSON preview', () => {
    const wrapper = mount(CookieView, {
      global: {
        plugins: [vuetify, store]
      }
    })

    const expectedJson = JSON.stringify(
      {
        targetCountries: 'EU',
        gdpr: true,
        ccpa: false,
        consentByScroll: false,
        perPurposeConsent: false,
        banner: {
          acceptButtonDisplay: false,
          rejectButtonDisplay: false,
          closeButtonDisplay: true,
          closeButtonRejects: false,
          title: 'Notice'
        }
      },
      null,
      2
    )

    expect(wrapper.find('.preview-json').text()).toBe(expectedJson)
  })

  it('must call saveData when clicking the save button', async () => {
    const saveDataSpy = vi.spyOn(CookieView.methods, 'saveData')
    const wrapper = mount(CookieView, {
      global: {
        plugins: [vuetify, store]
      }
    })

    const saveButton = wrapper.find('#saveButton')
    await saveButton.trigger('click')

    expect(saveDataSpy).toHaveBeenCalled()
  })

  it('must show warning if the configuration is not compatible with Italian laws', async () => {
    const wrapper = mount(CookieView, {
      global: {
        plugins: [vuetify, store]
      },
      data() {
        return {
          warningText: ''
        }
      }
    })

    // Uso de mutaciones para cambiar el estado
    await wrapper.vm.$store.dispatch('setBannerProperty', {
      key: 'closeButtonDisplay',
      value: true
    })
    await wrapper.vm.$store.dispatch('setBannerProperty', {
      key: 'rejectButtonDisplay',
      value: false
    })
    await wrapper.vm.$store.dispatch('setBannerProperty', {
      key: 'closeButtonRejects',
      value: false
    })

    wrapper.vm.saveData()

    expect(wrapper.vm.warningText).toBe(
      'Your selected settings are not compliant with laws in Italy'
    )
  })
})
