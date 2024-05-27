const Eureka = require('eureka-js-client').Eureka;
const client = new Eureka({
  instance: {
    app: 'nodejs-service', 
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:3000/status',
    port: {
      '$': 3000, 
      '@enabled': 'true',
    },
    vipAddress: 'nodejs-service',
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
