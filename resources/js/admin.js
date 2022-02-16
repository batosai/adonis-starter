import '../css/admin.css'

import '@hotwired/turbo'

import Editor from './scripts/editor'
import Datepicker from './scripts/datepicker'

import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import theme from './components/app/theme'
import sidebar from './components/app/sidebar'
import modal from './components/modal'
import dropdown from './components/dropdown'

Alpine.data('app', () => ({
  theme: theme(),
  sidebar: sidebar(),
}))
Alpine.data('modal', modal)
Alpine.data('dropdown', dropdown)

Alpine.plugin(focus)

Alpine.start()

document.addEventListener('turbo:load', () => {
  new Editor()
  new Datepicker()
})

document.addEventListener('turbo:frame-load', () => {
  new Datepicker()
})

document.addEventListener('turbo:stream-render', () => {
  new Datepicker()
})
