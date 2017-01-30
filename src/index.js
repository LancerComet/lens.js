/**
 * Lens.js.
 * Bring transition to height changing.
 * 
 * By LancerComet at 20:45, 2017.01.29.
 * # Carry Your World #
 * 
 * @author: LancerComet
 * @version: 1.0.0
 * @license: MIT
 */

const MutationObserver = window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver

/**
 * Lens Object.
 * 
 * @class Lens
 */
class Lens {
  /**
   * Creates an instance of Lens.
   * 
   * @param {HTMLElement} target - Target element to watch.
   */
  constructor (selector) {
    if (!MutationObserver) {
      return Lens.log('Your browser doesn\'t support Lens.js.', 'warn')
    }

    const target = document.querySelector(selector)    

    if (!selector || !target) {
      return Lens.log('Please provide a vaild selector.', 'error')
    }
    
    // Create a container element to contain target element.
    // We will change container's height, not the target node.
    // But we will get height value from target node.
    const targetStyle = getComputedStyle(target)
    const container = document.createElement('div')
    container.className = 'lens-transition'
    container.dataset.lens = selector
    
    const parentNode = target.parentNode
    const nextSibling = target.nextSibling

    parentNode.removeChild(target)
    container.appendChild(target)

    nextSibling
      ? parentNode.insertBefore(container, nextSibling)
      : parentNode.appendChild(container)

    this.$target = target
    this.$container = container

    this.$observer = null
    this.$observing = false

    this.$lastSize = {
      width: 0, height: 0
    }

    this.$mode = {
      width: true, height: true
    }

    const currentSize = this.$getTargetCurrentSize()
    this.$updateLastSize(currentSize)
    this.$setNewSize(currentSize)
  }

  /**
   * Get current size from target element.
   * 
   * @private
   * @returns {ISize}
   */
  $getTargetCurrentSize () {
    const size = this.$target.getBoundingClientRect()
    return {
      width: size.width,
      height: size.height
    }
  }

  /**
   * Get current size from container element.
   * 
   * @private
   * @returns {ISize}
   */
  $getContainerSize () {
    const size = this.$container.getBoundingClientRect()
    return {
      width: size.width, height: size.height
    }
  }

  /**
   * Set to last height.
   * 
   * @private
   */
  $setToLastSize () {
    this.$container.style.width = this.$lastSize.width + 'px'
    this.$container.style.height = this.$lastSize.height + 'px'
  }

  /**
   * Set to new size.
   * 
   * @param {ISize} newSize
   * @private
   */
  $setNewSize (newSize) {
    if (this.$mode.width) { this.$container.style.width = newSize.width + 'px' || 0 }
    if (this.$mode.height) { this.$container.style.height = newSize.height + 'px' || 0 }
  }

  /**
   * Update last size.
   * 
   * @param {ISize} newSize
   * @private
   */
  $updateLastSize (newSize) {
    if (this.$mode.width) { this.$lastSize.width = newSize.width || 0 }
    if (this.$mode.height) { this.$lastSize.height = newSize.height || 0 }
  }

  /**
   * Observer callback.
   * 
   * @param {any} mutations
   * @private 
   */
  $observeCallback (mutations) {
    // Execute until last.
    for (let i = 0, length = mutations.length; i < length; i++) {
      if (i + 1 !== length) { continue }
      this.$update()
    }
  }

  /**
   * Update height.
   * 
   * @private
   */
  $update () {
    if (!MutationObserver) { return }

    const newSize = this.$getTargetCurrentSize()

    // Set to last size first.
    this.$setToLastSize()

    // Set target's height to target height.
    this.$setNewSize(newSize)
    this.$updateLastSize(newSize)
  }

  /**
   * Start to observe height changing.
   *
   * @param {object} [config] - Lens configuration.
   */
  observe (config) {
    if (this.$observing || !MutationObserver) { return }

    // Default observe configuration.
    const observeConfig = {
      childList: true,
      attributes: true
    }
    
    // Configuration from param.
    config = config || {}

    if (config.watchStyle === false) {
      observeConfig.attributes = false
    }

    if (config.deepWatch === true) {
      observeConfig.characterData = true
      observeConfig.subtree = true
    }

    if (config.width === false) {
      this.$mode.width = false
    }

    if (config.height === false) {
      this.$mode.height = false
    }

    const observer = new MutationObserver(this.$observeCallback.bind(this))
    observer.observe(this.$target, observeConfig)

    this.$observer = observer
    this.$observing = true
  }

  /**
   * Stop height changing observation.
   * 
   * @returns void
   */
  disconnect () {
    this.$observer.disconnect()
    this.$observer = null
    this.$observing = false
  }

  /**
   * Update height.
   * 
   * @returns void
   */
  update () {
    this.$update()
  }

  /**
   * Log function.
   * 
   * @param {string} message
   */
  static log (message = '', type = 'log') {
    window.console && console[type](`[Lens.js] ${message}`)
  }
}
