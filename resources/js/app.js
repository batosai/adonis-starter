import '../css/app.css'

import '@hotwired/turbo'
import Alpine from 'alpinejs'

// import './scripts/charts-bars'
import './scripts/charts-lines'
import './scripts/charts-pie'
import app from './scripts/init-alpine'

Alpine.data('app', app)

Alpine.start()
