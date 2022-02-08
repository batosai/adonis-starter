export default () => ({
  isOpen: false,
  form: null,

  toggle() {
    this.isOpen = !this.isOpen
  },

  open() {
    this.isOpen = true
  },

  close() {
    this.isOpen = false
  },
})
