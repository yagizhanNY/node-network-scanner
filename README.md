## Node Network Scanner

This library is for scan local network and find available devices.

### Installation

```bash
npm install node-network-scanner
# or
yarn add node-network-scanner
# or
pnpm add node-network-scanner
```

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

### Output

```json
[
  { "ipAddress": "192.168.1.1", "macAddress": "..." },
  { "ipAddress": "192.168.1.20", "macAddress": "..." },
  { "ipAddress": "192.168.1.21", "macAddress": "..." },
  { "ipAddress": "192.168.1.27", "macAddress": "..." },
  { "ipAddress": "192.168.1.86", "macAddress": "..." },
  { "ipAddress": "192.168.1.136", "macAddress": "..." }
]
```

**I am still trying to optimize the performance of pinging devices.**
