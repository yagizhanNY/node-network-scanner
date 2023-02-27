import NetworkHelper from "./helpers/network.js";
import { Filter } from "./interfaces/filter.interface.js";

export default class NetworkScanner {
  networkHelper;
  constructor() {
    this.networkHelper = new NetworkHelper();
  }
  getAllDevices = async () => {
    const networkInterfaces = this.networkHelper.getAllNetworkInterfaces();
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces(networkInterfaces);

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces
    );
  };

  getAllDevicesByFilter = async (filter: Filter) => {
    const networkInterfaces = this.networkHelper.getAllNetworkInterfaces();
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces(
        networkInterfaces,
        filter
      );

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces
    );
  };
}