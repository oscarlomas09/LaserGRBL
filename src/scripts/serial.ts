const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
import { Observable } from "rxjs";

export interface PortInfo {
  path: string;
  index?: number;
  manufacturer?: string;
  serialNumber?: string;
  pnpId?: string;
  locationId?: string;
  productId?: string;
  vendorId?: string;
}
export class Serial {
  private serialport: any;
  private parser: any;
  private devices: Array<PortInfo> = [];
  private isConnected: boolean = false;
  public error: string | null = null;
  public messages: Array<any> = [];
  public isInitialized: boolean = false;
  public dataObserver: Observable<string>;

  constructor() {
    this.listPorts();
  }
  sendMessage(msg: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.serialport.write(`${msg}\n`);
      this.serialport.drain(() => {
        resolve(msg);
      });
      this.serialport.once("error", (err: string) => {
        reject(err);
      });
    });
  }
  getLastMessage(): Array<string> {
    return this.messages.pop();
  }
  getDevices(): Array<PortInfo> {
    return this.devices;
  }
  async listPorts() {
    let devices: Array<PortInfo> = [];
    try {
      devices = await SerialPort.list();
    } catch (err) {
      this.error = err;
    }
    this.isInitialized = true;
    this.devices = devices;
  }
  connect(device: PortInfo): Promise<string> {
    return new Promise((resolve, reject) => {
      this.serialport = new SerialPort(device.path, { baudRate: 115200 });
      this.parser = new Readline();
      this.serialport.pipe(this.parser);
      this.setup();
      let timeout = setTimeout(() => {
        reject("Connection Timeout");
      }, 1000);
      this.serialport.once("open", () => {
        this.isConnected = true;
        clearTimeout(timeout);
        resolve("OK");
      });
      this.serialport.once("error", (error: string) => {
        this.isConnected = false;
        clearTimeout(timeout);
        reject(error);
      });
    });
  }
  setup() {
    this.dataObserver = new Observable(subscriber => {
      this.parser.on("data", (data: string) => {
        subscriber.next(data.toString());
      });
      this.serialport.on("error", (error: string) => {
        subscriber.error(error.toString());
      });
      this.serialport.on("close", () => {
        subscriber.complete();
      });
    });
  }
  disconnect(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.serialport) {
        this.serialport.close((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve("disconnected");
          }
        });
      }
    });
  }
}
