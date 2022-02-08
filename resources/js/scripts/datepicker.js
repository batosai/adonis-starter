import flatpickr from 'flatpickr'
import { French } from 'flatpickr/dist/l10n/fr'

export default class Datepicker {
  constructor() {
    flatpickr('.date', {
      altInput: true,
      altFormat: 'j F Y',
      dateFormat: 'Y-m-d',
      inline: true,
      locale: French,
    })

    flatpickr('.datetime', {
      altInput: true,
      altFormat: 'j F Y H:i',
      dateFormat: 'Y-m-d H:i',
      inline: true,
      enableTime: true,
      time_24hr: true,
      defaultHour: 10,
      position: 'auto center',
      locale: French,
    })
  }
}
