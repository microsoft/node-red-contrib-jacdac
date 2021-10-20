export interface JacdacConfigOptions {
    /**
     * Connect to physical bus using USB, requires LIBUSB
     */
    usb?: boolean
    /**
     * Connect to physical bus using serial, requires serialport
     */
    serial?: boolean
}
