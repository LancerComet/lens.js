/* tslint:disable */

declare namespace LensJs {
  /**
   * Lens JS class.
   *
   * @export
   * @class Lens
   */
  export class Lens {
    /**
     * Start to observe size changing.
     *
     * @param {object} [config] - Lens configuration.
     */
    observe (config: IConfig) : void

    /**
     * Stop size changing observation.
     * 
     * @returns void
     */
    disconnect () : void

    /**
     * Force to update layout.
     * 
     * @returns void
     */
    update () : void
  }

  /**
   * Observing configuration.
   * 
   * @interface IConfig
   */
  interface IConfig {
    /**
     * Enable deep watching.
     * Every change (e.g: Insert a new div) would be detected if enabled.
     * Default value: false
     * 
     * @default: false
     * @type {boolean}
     */
    deepWatch: boolean
    
    /**
     * Enable style watching.
     * Height will be updated when some element's style is changed if enabled.
     * Default value: true
     * 
     * @type {boolean}
     * @default: true
     * @memberOf IConfig
     */
    watchStyle: boolean

    /**
     * Is enable width watching.
     * Default value is true.
     *
     * @type {boolean}
     * @memberof IConfig
     */
    width: boolean

    /**
     * Is enable height watching.
     * Default value is true.
     *
     * @type {boolean}
     * @memberof IConfig
     */
    height: boolean
  }
}

export = LensJs
