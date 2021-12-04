import '../css/admin.css'

import '@hotwired/turbo'

import Alpine from 'alpinejs'
import app from './scripts/init-alpine'

Alpine.data('app', app)

Alpine.start()
