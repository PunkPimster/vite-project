import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import BannerSelect from '@/components/BannerSelect.vue' // Ajusta la ruta según tu proyecto
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
      banner: {
        acceptButtonDisplay: false,
        rejectButtonDisplay: false,
        closeButtonDisplay: false,
        closeButtonRejects: false,
        title: 'Default Title'
      }
    }
  },
  actions: {
    setAcceptButtonDisplay: vi.fn(),
    setRejectButtonDisplay: vi.fn(),
    setCloseButtonDisplay: vi.fn(),
    setCloseButtonRejects: vi.fn(),
    setTitleValue: vi.fn()
  }
})

describe('BannerSelect', () => {
  let wrapper

  beforeEach(() => {
    vi.spyOn(store, 'dispatch')
    wrapper = mount(BannerSelect, {
      global: {
        plugins: [vuetify, store]
      }
    })
  })

  it('renders correctly', () => {
    // Busca por clases CSS generadas por Vuetify en lugar del nombre del componente
    expect(wrapper.find('.v-card').exists()).toBe(true)

    // Busca el texto dentro del v-card-title, que está dentro de un b-tag
    expect(wrapper.find('.v-card-title b').text()).toBe('Banner Configuration')
  })

  it('updates acceptButtonDisplay via store action', async () => {
    // Usar el ID del VCheckbox para seleccionarlo
    const acceptButtonCheckbox = wrapper.find('#accept-button-display')
    await acceptButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setAcceptButtonDisplay', true)
  })

  it('updates rejectButtonDisplay via store action', async () => {
    const rejectButtonCheckbox = wrapper.find('#reject-button-display')
    rejectButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setRejectButtonDisplay', true)
  })

  it('updates closeButtonDisplay via store action', async () => {
    const closeButtonCheckbox = wrapper.find('#close-button-display')
    closeButtonCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setCloseButtonDisplay', true)
  })

  it('updates closeButtonRejects via store action', async () => {
    const closeButtonRejectsCheckbox = wrapper.find('#close-button-rejects')
    closeButtonRejectsCheckbox.setChecked(true)
    expect(store.dispatch).toHaveBeenCalledWith('setCloseButtonRejects', true)
  })

  it('updates titleValue via store action', async () => {
    const textField = wrapper.find('input[type="text"]')
    await textField.setValue('New Banner Title')
    expect(store.dispatch).toHaveBeenCalledWith('setTitleValue', 'New Banner Title')
  })
})
