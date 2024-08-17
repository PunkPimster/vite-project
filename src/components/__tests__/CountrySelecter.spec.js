import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CountrySelecter from '@/components/CountrySelecter.vue' // Ajusta la ruta según tu proyecto
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
      targetCountries: ''
    }
  },
  actions: {
    setTargetCountry: vi.fn()
  }
})

describe('CountrySelecter', () => {
  let wrapper

  beforeEach(() => {
    vi.spyOn(store, 'dispatch')
    wrapper = mount(CountrySelecter, {
      global: {
        plugins: [vuetify, store]
      }
    })
  })

  it('renders correctly', () => {
    // Busca por clases CSS generadas por Vuetify en lugar del nombre del componente
    expect(wrapper.find('.v-card').exists()).toBe(true)

    // Busca el texto dentro del v-card-title, que está dentro de un b-tag
    expect(wrapper.find('.v-card-title b').text()).toBe('Target countries')
  })

  it('updates targetCountries via store action when selecting "US"', async () => {
    const usRadio = wrapper.find('#us-users')
    await usRadio.setChecked(true)

    expect(store.dispatch).toHaveBeenCalledWith('setTargetCountry', 'US')
  })

  it('updates targetCountries via store action when selecting "EU"', async () => {
    const euRadio = wrapper.find('#eu-users')
    await euRadio.setChecked(true)

    expect(store.dispatch).toHaveBeenCalledWith('setTargetCountry', 'EU')
  })

  it('updates targetCountries via store action when selecting "Worldwide"', async () => {
    const worldRadio = wrapper.find('#worldwide-users')
    await worldRadio.setChecked(true)

    expect(store.dispatch).toHaveBeenCalledWith('setTargetCountry', 'world')
  })
})
