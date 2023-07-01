import { networkInterfaces } from 'os';

function getIPAdress() {
    var interfaces = networkInterfaces();
    //console.log('interfaces',interfaces);
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

export {
  getIPAdress
}