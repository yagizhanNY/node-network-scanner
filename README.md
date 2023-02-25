## Network Scanner

This library is for scan local network and find available devices.

### Usage

Find all available devices on local network.

```javascript
const networkScanner = new NetworkScanner();
networkScanner.getAllDevices().then((res) => console.log(res));
```

Find all available devices on specific network interface by interface address.

```javascript
const networkScanner = new NetworkScanner();
networkScanner
  .getAllDevicesByFilter({ interfaceAddress: "192.168.1.86" })
  .then((res) => {
    console.log(res);
  });
```

Find all available devices on specific network interface by mac address.

```javascript
const networkScanner = new NetworkScanner();
networkScanner
  .getAllDevicesByFilter({ mac: "xx-xx-xx-xx-xx-xx" })
  .then((res) => {
    console.log(res);
  });
```

**I am still trying to optimize the performance of pinging devices.**

**Library haven't published yet, still under development.**
