# Generate unique random id with urid

Generate unique/random id based on the given size and character set. Default id size is 16 characters and it is randomly generated from [0-9a-bA-B] characters.

## Install

`npm install urid`

## Usage

```js
import urid from urid
const id = urid();
```

## urid() function

 Call the function `urid()` with two optional parameter values (`size`, `charset`) to get desired result.

 ```js
    const size = 20;
    // charset can be any string or name of a predefined string 
    // (num, alpha, Alpha, APLHA, alphanum, ALPHANUM, hex, HEX)
    // Please note the case of the characters.
    const charset = 'ALPHANUM'; 
    urid(size, charset);
```

## Examples

```js
const id = urid(); // qRpky22nKJ4vkbFZ

// Set the size
urid(8); //ZDJLC0Zq

// Use the character set
urid('num'); // 4629118294212196
urid('alpha'); // ebukmhyiagonmmbm
urid('alphanum'); // nh9glmi1ra83979b

// Use size with character set
urid(12, 'alpha'); // wwfkvpkevhbg

// use custom character set
urid(6, '0123456789ABCDEF'); // EC58F3
urid('0123456789ABCDEF'); // 6C11044E128FB44B

// some more samples
urid()               // t8BUFCUipSEU4Ink
urid(24)             // lHlr1pIzAUAOyn1soU8atLzJ
urid(8, 'num')       // 12509986
urid(8, 'alpha')     // ysapjylo
urid(8, 'alphanum')  // jxecf9ad

// example of all character sets
urid('num')          // 5722278852141945
urid('alpha')        // fzhjrnrkyxralgpl
urid('alphanum')     // l5o4kfnrhr2cj39w
urid('Alpha')        // iLFVgxzzUFqxzZmr
urid('ALPHA')        // ALGFUIJMZJILJCCI
urid('ALPHANUM')     // 8KZYKY6RJWZ89OWH
urid('hex')          // 330f726055e92c51
urid('HEX')          // B3679A52C69723B1

// custom character set
urid('ABCD-')        // ACA-B-DBADCD-DCA
```

## LICENSE

MIT

## Author

Created by [Jiten Bansal](https://bansal.io)
