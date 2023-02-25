import NetworkHelper from "./helpers/network.js";

export default class NetworkScanner {
  networkHelper;
  constructor() {
    this.networkHelper = new NetworkHelper();
  }
  getAllDevices = async () => {
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces();

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces
    );
  };

  getAllDevicesByFilter = async (filter) => {
    const availableNetworkInterfaces =
      this.networkHelper.filterAvailableNetworkInterfaces(filter);

    return await this.networkHelper.getAvailableDevices(
      availableNetworkInterfaces
    );
  };
}

const networkScanner = new NetworkScanner();
//networkScanner.getAllDevices().then((res) => console.log(res));
networkScanner
  .getAllDevicesByFilter({ interfaceAddress: "192.168.1.86" })
  .then((res) => {
    console.log(res);
  });
