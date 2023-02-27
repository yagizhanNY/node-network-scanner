import { getIPRange } from "get-ip-range";
import os from "os";
import ping from "ping";
import cp from "child_process";
import { Filter } from "../interfaces/filter.interface";
import { Device } from "../interfaces/device.interface";

export default class NetworkHelper {
  getAllNetworkInterfaces = () => {
    return os.networkInterfaces();
  };
  filterAvailableNetworkInterfaces = (
    networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>,
    filter?: Filter
  ) => {
    let availableNetworkInterfaces: os.NetworkInterfaceInfo[] = [];

    for (const [networkInterfaceKey, networkInterfaceObject] of Object.entries(
      networkInterfaces
    )) {
      networkInterfaceObject!.map((obj) => {
        if (obj.family === "IPv4" && obj.internal === false) {
          if (filter) {
            if (
              filter.interfaceAddress === obj.address ||
              filter.macAddress === obj.mac
            ) {
              availableNetworkInterfaces.push(obj);
            }
          } else {
            availableNetworkInterfaces.push(obj);
          }
        }
      });
    }
    return availableNetworkInterfaces;
  };

  getAvailableDevices = async (
    availableNetworkInterfaces: os.NetworkInterfaceInfo[]
  ): Promise<Device[]> => {
    let availableDevices = [];
    for await (let availableInterface of availableNetworkInterfaces) {
      const ipAddresses = getIPRange(availableInterface.cidr!);
      const res = await Promise.all(ipAddresses.map(pingDevice));
      for await (let device of res) {
        if (device.alive === true) {
          const macAddress = getMacAddress(device.host);
          availableDevices.push({
            ipAddress: device.host,
            macAddress: macAddress,
          });
        }
      }
    }
    return availableDevices;
  };
}

const pingDevice = async (ipAddress: string) => {
  return await ping.promise.probe(ipAddress, { timeout: 3 });
};

const getMacAddress = (ipAddress: string) => {
  const TEN_MEGA_BYTE = 1024 * 1024 * 10;
  const ONE_MINUTE = 60 * 1000;
  const options = {
    maxBuffer: TEN_MEGA_BYTE,
    timeout: ONE_MINUTE,
  };
  const isWindows = process.platform.includes("win32");

  if (isWindows === false) {
    const cmd = `arp -a ${ipAddress}`;

    const result = String(cp.execSync(cmd, options));
    if (result.includes("entries no match found.")) return "";
    return result.split(" ").filter(Boolean)[3];
  } else if (isWindows === true) {
    const cmd = `arp -a ${ipAddress}`;

    const result = String(cp.execSync(cmd, options));
    return result.split("\n")[3]?.split(" ").filter(Boolean)[1];
  } else {
    return undefined;
  }
};
