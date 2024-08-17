import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ConsentSelecter from '@/components/ConsentSelecter.vue'
import { createVuetify } from 'vuetify'
import { createStore } from 'vuex'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Configura Vuetify y Vuex
const vuetify = createVuetify({
  components,
  directives
})
const store = createStore({
  state: {
    configDefault: {
      consentByScroll: false,
      perPurposeConsent: false
    }
  },
  actions: {
    setConsentByScroll: vi.fn(),
    setConsentPerPurpose: vi.fn()
  }
})

describe('ConsentSelecter', () => {
  let wrapper

  beforeEach(() => {
    vi.spyOn(store, 'dispatch')
    wrapper = mount(ConsentSelecter, {
      global: {
        plugins: [vuetify, store]
      }
    })
  })

  it('renders correctly', () => {
    // Busca por clases CSS generadas por Vuetify en lugar del nombre del componente
    expect(wrapper.find('.v-card').exists()).toBe(true)

    // Busca el texto dentro del v-card-title, que está dentro de un b-tag
    expect(wrapper.find('.v-card-title b').text()).toBe('Consent')
  })

  it('updates consentByScroll via store action', async () => {
    // Usar el ID del VCheckbox para seleccionarlo
    const acceptButtonCheckbox = wrapper.find('#scroll-value')
    await acceptButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setConsentByScroll', true)
  })

  it('updates rejectButtonDisplay via store action', async () => {
    const rejectButtonCheckbox = wrapper.find('#purpose-content')
    rejectButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setConsentPerPurpose', true)
  })
})
