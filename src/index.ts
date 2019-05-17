import { IConfig } from './types'

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

const MutationObserver = window['MutationObserver'] ||
  window['WebKitMutationObserver'] ||
  window['MozMutationObserver']

/**
 * Lens Object.
 * 
 * @class Lens
 */
class Lens {
  private _target: HTMLElement = null
  private _container: HTMLElement = null
  private _isObserving: boolean = false
  private _observer: MutationObserver = null

  private readonly _lastSize = {
    width: 0,
    height: 0
  }

  private readonly watchMode = {
    width: true,
    height: true
  }

  /**
   * Get current size from target element.
   * 
   * @private
   * @returns {ISize}
   */
  private _getTargetCurrentSize () {
    const size = this._target.getBoundingClientRect()
    return {
      width: size.width,
      height: size.height
    }
  }

  /**
   * Init elements.
   *
   * @private
   * @memberof Lens
   */
  private initElement () {
    const element = this._target

    const container = document.createElement('div')
    container.className = 'lens-transition'

    const parentNode = element.parentNode
    const nextSibling = element.nextSibling

    parentNode.removeChild(element)
    container.appendChild(element)

    nextSibling
      ? parentNode.insertBefore(container, nextSibling)
      : parentNode.appendChild(container)

    this._container = container
  }

  /**
   * Update last size.
   * 
   * @param {ISize} newSize
   * @private
   */
  private _updateLastSize (newSize) {
    if (this.watchMode.width) {
      this._lastSize.width = newSize.width || 0
    }
    if (this.watchMode.height) {
      this._lastSize.height = newSize.height || 0
    }
  }

  /**
   * Get current size from container element.
   * 
   * @private
   * @returns {ISize}
   */
  private _getContainerSize () {
    const { width, height } = this._container.getBoundingClientRect()
    return {
      width,
      height
    }
  }

  /**
   * Set to last height.
   * 
   * @private
   */
  private _setToLastSize () {
    this._container.style.width = this._lastSize.width + 'px'
    this._container.style.height = this._lastSize.height + 'px'
  }

  /**
   * Set to new size.
   * 
   * @param {ISize} newSize
   * @private
   */
  private _setNewSize (newSize) {
    if (this.watchMode.width) {
      this._container.style.width = newSize.width + 'px' || '0'
    }
    if (this.watchMode.height) {
      this._container.style.height = newSize.height + 'px' || '0'
    }
  }

  /**
   * Observer callback.
   * 
   * @param {any} mutations
   * @private 
   */
  private _observeCallback (mutations) {
    // Execute until last.
    for (let i = 0, length = mutations.length; i < length; i++) {
      if (i + 1 !== length) { continue }
      this._update()
    }
  }

  /**
   * Update height.
   * 
   * @private
   */
  private _update () {
    if (!MutationObserver) { return }

    const newSize = this._getTargetCurrentSize()

    // Set to last size first.
    this._setToLastSize()

    // Set target's height to target height.
    this._setNewSize(newSize)
    this._updateLastSize(newSize)
  }

  /**
   * Start to observe height changing.
   *
   * @param {object} [config] - Lens configuration.
   */
  observe (config: IConfig) {
    if (this._isObserving || !MutationObserver) { return }

    // Default observe configuration.
    const observeConfig: any = {
      childList: true,
      attributes: true
    }
    
    // Configuration from param.
    config = config || Object.create(null)

    if (config.watchStyle === false) {
      observeConfig.attributes = false
    }

    if (config.deepWatch === true) {
      observeConfig.characterData = true
      observeConfig.subtree = true
    }

    if (config.width === false) {
      this.watchMode.width = false
    }

    if (config.height === false) {
      this.watchMode.height = false
    }

    const observer = new MutationObserver(this._observeCallback.bind(this))
    observer.observe(this._target, observeConfig)

    this._observer = observer
    this._isObserving = true
  }

  /**
   * Stop height changing observation.
   * 
   * @returns void
   */
  disconnect () {
    this._observer.disconnect()
    this._observer = null
    this._isObserving = false
  }

  /**
   * Update height.
   * 
   * @returns void
   */
  update () {
    this._update()
  }

  /**
   * Creates an instance of Lens.
   * 
   * @param {HTMLElement|string} target Target element to watch.
   */
  constructor (target: HTMLElement | string) {
    if (!MutationObserver) {
      log('Your browser doesn\'t support Lens.js.', 'warn')
      return
    }

    const element: HTMLElement = (typeof target === 'string')
      ? document.querySelector(target)
      : target

    if (!target || !element) {
      log('Please provide a vaild selector or element.', 'error')
      return
    }

    this._target = element
    
    // Create a container element to contain target element.
    // We will change container's height, not the target node.
    // But we will get height value from target node.
    this.initElement()
    
    const currentSize = this._getTargetCurrentSize()
    this._updateLastSize(currentSize)
    this._setNewSize(currentSize)
  }
}

export {
  Lens
}

function log (message: string = '', type: string = 'log') {
  window.console && console[type](`[Lens.js] ${message}`)
}
