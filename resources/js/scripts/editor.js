import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

export default class Editor {
  constructor() {
    this.className = 'wysiwyg'
    this.editors = Array.prototype.slice.call(
      document.querySelectorAll('.editor'),
      0,
    )

    this.init()
  }

  init() {
    if (this.editors.length > 0) {
      this.editors.forEach(el => {
        el.classList.add('hidden')
        const container = document.createElement('div')
        container.classList.add(this.className)
        container.innerHTML = el.value
        el.parentNode.appendChild(container)

        const editor = new Quill(`.${this.className}`, {
          theme: 'snow',
          readOnly: false,
          // debug: 'info',
          // modules: {
          //   toolbar: '#toolbar'
          // },
          // placeholder: 'Compose an epic...',
        })

        editor.on('text-change', () => {
          el.innerHTML = editor.root.innerHTML
        })
      })
    }
  }
}
