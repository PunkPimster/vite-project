import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import LegislationSelecter from '@/components/LegislationSelecter.vue' // Ajusta la ruta según tu proyecto
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
      gdpr: false,
      ccpa: false
    }
  },
  actions: {
    setGDPRLegislation: vi.fn(),
    setCCPALegislation: vi.fn()
  }
})

describe('LegislationSelecter', () => {
  let wrapper

  beforeEach(() => {
    vi.spyOn(store, 'dispatch')
    wrapper = mount(LegislationSelecter, {
      global: {
        plugins: [vuetify, store]
      }
    })
  })

  it('renders correctly', () => {
    // Busca por clases CSS generadas por Vuetify en lugar del nombre del componente
    expect(wrapper.find('.v-card').exists()).toBe(true)

    // Busca el texto dentro del v-card-title, que está dentro de un b-tag
    expect(wrapper.find('.v-card-title b').text()).toBe('Legislation')
  })

  it('updates setGDPRLegislation via store action', async () => {
    // Usar el ID del VCheckbox para seleccionarlo
    const acceptButtonCheckbox = wrapper.find('#select-gdpr')
    await acceptButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setGDPRLegislation', true)
  })

  it('updates setCCPALegislation via store action', async () => {
    const rejectButtonCheckbox = wrapper.find('#select-ccpa')
    rejectButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setCCPALegislation', true)
  })
})
