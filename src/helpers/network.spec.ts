import NetworkHelper from "./network";

const ip1 = "192.168.1.114";
const ip2 = "192.168.2.114";
const mockedInterfaces = {
  en0: [
    {
      address: "fe80::3e07:54ff:fe66:f0f8",
      netmask: "ffff:ffff:ffff:ffff::",
      family: "IPv6" as "IPv6",
      mac: "3c:07:54:66:f0:f8",
      scopeid: 4,
      internal: false,
      cidr: "::1/128",
    },
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: false,
      cidr: "127.0.0.1/8",
    },
    {
      address: ip2,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f9",
      internal: false,
      cidr: "127.0.0.1/8",
    },
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: true,
      cidr: "127.0.0.1/8",
    },
  ],
};

test("should return only IPv4 interfaces", () => {
  const networkHelper = new NetworkHelper();

  const availableInterfaces =
    networkHelper.filterAvailableNetworkInterfaces(mockedInterfaces);

  expect(availableInterfaces).toEqual([
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: false,
      cidr: "127.0.0.1/8",
    },
    {
      address: ip2,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f9",
      internal: false,
      cidr: "127.0.0.1/8",
    },
  ]);
});

test("should return only not internal interfaces", () => {
  const networkHelper = new NetworkHelper();

  const availableInterfaces =
    networkHelper.filterAvailableNetworkInterfaces(mockedInterfaces);

  expect(availableInterfaces).toEqual([
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: false,
      cidr: "127.0.0.1/8",
    },
    {
      address: ip2,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f9",
      internal: false,
      cidr: "127.0.0.1/8",
    },
  ]);
});

test("should return only specified interface by interface address", () => {
  const networkHelper = new NetworkHelper();

  const availableInterfaces = networkHelper.filterAvailableNetworkInterfaces(
    mockedInterfaces,
    { interfaceAddress: ip1 }
  );

  expect(availableInterfaces).toEqual([
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: false,
      cidr: "127.0.0.1/8",
    },
  ]);
});

test("should return only specified interface by mac address", () => {
  const networkHelper = new NetworkHelper();

  const availableInterfaces = networkHelper.filterAvailableNetworkInterfaces(
    mockedInterfaces,
    { macAddress: "3c:07:54:66:f0:f8" }
  );

  expect(availableInterfaces).toEqual([
    {
      address: ip1,
      netmask: "255.255.255.0",
      family: "IPv4" as "IPv4",
      mac: "3c:07:54:66:f0:f8",
      internal: false,
      cidr: "127.0.0.1/8",
    },
  ]);
});
