import NetworkHelper from "./helpers/network";
import { Device } from "./interfaces/device.interface";
import { Filter } from "./interfaces/filter.interface";

export default class NetworkScanner {
  networkHelper;
  constructor() {
    this.networkHelper = new NetworkHelper();
  }
  getAllDevices = async (port?: number): Promise<Device[]> => {
    const networkInterfaces = this.networkHelper.getAllNetworkInterfaces();
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces(networkInterfaces);

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces,
      port
    );
  };

  getAllDevicesByFilter = async (
    filter: Filter,
    port?: number
  ): Promise<Device[]> => {
    const networkInterfaces = this.networkHelper.getAllNetworkInterfaces();
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces(
        networkInterfaces,
        filter
      );

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces,
      port
    );
  };
}
