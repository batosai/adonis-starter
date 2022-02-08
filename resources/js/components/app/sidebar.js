export default () => ({
  isOpen: false,

  toggle() {
    this.sidebar.isOpen = !this.sidebar.isOpen
  },

  open() {
    this.sidebar.isOpen = true
  },

  close() {
    this.sidebar.isOpen = false
  },
})
