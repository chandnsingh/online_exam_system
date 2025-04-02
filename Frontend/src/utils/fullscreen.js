export default class FullscreenHandler {
    constructor() {
      this.blockedKeys = new Set(['F11', 'F12', 'Control', 'Alt', 'Tab', 'Meta'])
    }
  
    enter() {
      const elem = document.documentElement
      if (elem.requestFullscreen) elem.requestFullscreen()
      this.blockEvents()
    }
  
    exit() {
      if (document.exitFullscreen) document.exitFullscreen()
      this.unblockEvents()
    }
  
    blockEvents() {
      document.addEventListener('contextmenu', this.preventDefault)
      document.addEventListener('keydown', this.handleKeyDown)
    }
  
    unblockEvents() {
      document.removeEventListener('contextmenu', this.preventDefault)
      document.removeEventListener('keydown', this.handleKeyDown)
    }
  
    preventDefault = (e) => {
      e.preventDefault()
      return false
    }
  
    handleKeyDown = (e) => {
      if (this.blockedKeys.has(e.key) || e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault()
        alert('This action is not allowed during exam!')
      }
    }
  }