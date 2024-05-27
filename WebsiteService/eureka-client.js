const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'websiteservice',
    hostName: 'websiteservice',
    ipAddr: 'websiteservice',
    statusPageUrl: 'http://websiteservice:3001/status',
    port: {
      '$': 3001,
      '@enabled': 'true',
    },
    vipAddress: 'websiteservice',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'eurekaserver',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

client.start((error) => {
  console.log(error || 'Eureka client started successfully!');
});

module.exports = client;
