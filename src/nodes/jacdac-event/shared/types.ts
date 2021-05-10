export interface JacdacEventOptions {
  /**
   * A filter to select a specific device, long device id or short device id
   */
  device?: string
  /**
   * A filter to select a specific service. Name or code of the service
   */
  service?: string
  /**
   * A filter to select a specific event. Name or code of the event
   */
  event?: string
}
