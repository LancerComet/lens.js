declare class Lens {
  private $container: Element
  private $target: Element
  private $lastSize: ISize
  private $mode: IMode

  /**
   * Get current height from target element.
   * 
   * @private
   * @returns {ISize}
   */
  private $getTargetCurrentSize () : ISize

  /**
   * Set to last size.
   * 
   * @private
   */
  private $setToLastSize () : void

  /**
   * Set to new size.
   * 
   * @param {ISize} newSize
   * @private
   */
  private $setNewSize (newSize: ISize) : void

  /**
   * Update last size.
   * 
   * @param {number} newHeight
   * @private
   */
  private $updateLastSize (newSize: ISize) : void

  /**
   * Observer callback.
   * 
   * @param {any} mutations
   * @private 
   */
  private $observeCallback (mutations: MutationEvent[]) : void

  /**
   * Update height.
   * 
   * @private
   */
  private $update () : void

  /**
   * Start to observe height changing.
   *
   * @param {object} [config] - Lens configuration.
   */
  observe (config: IConfig) : void

  /**
   * Stop height changing observation.
   * 
   * @returns void
   */
  disconnect () : void

  /**
   * Update height.
   * 
   * @returns void
   */
  update () : void

  /**
   * Log function.
   * 
   * @param {string} message
   */
  static log (message: string = '', type: 'log' | 'warn' | 'info' | 'error' = 'log') : void

  constructor (target: Element) : Lens
}

/**
 * Observing configuration.
 * 
 * @interface IConfig
 */
declare interface IConfig {
  /**
   * Enable deep watching.
   * Every change (e.g: Insert a new div) would be detected if enabled.
   * Default value: false
   * 
   * @default: false
   * @type {boolean}
   */
  deepWatch: boolean = false
  
  /**
   * Enable style watching.
   * Height will be updated when some element's style is changed if enabled.
   * Default value: true
   * 
   * @type {boolean}
   * @default: true
   * @memberOf IConfig
   */
  watchStyle: boolean = true
}


declare interface ISize {
  width: number
  height: number
}

declare interface IMode {
  width: boolean
  height: boolean
}