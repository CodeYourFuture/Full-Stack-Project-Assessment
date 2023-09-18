import urid from './index.js';

console.log("urid()                      =>", urid());
console.log("urid(24)                    =>", urid(24));
console.log("urid(8, 'num')              =>", urid(8, 'num'));
console.log("urid(8, 'alpha')            =>", urid(8, 'alpha'));
console.log("urid(8, 'alphanum')         =>", urid(8, 'alphanum'));
console.log("urid('num')                 =>", urid('num'));
console.log("urid('alpha')               =>", urid('alpha'));
console.log("urid('alphanum')            =>", urid('alphanum'));
console.log("urid('Alpha')               =>", urid('Alpha'));
console.log("urid('ALPHA')               =>", urid('ALPHA'));
console.log("urid('ALPHANUM')            =>", urid('ALPHANUM'));
console.log("urid('hex')                 =>", urid('hex'));
console.log("urid('HEX')                 =>", urid('HEX'));
console.log("urid('ABCD-')               =>", urid('ABCD-'));