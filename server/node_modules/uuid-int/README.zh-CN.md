# uuid-int

uuid-int for nodejs

## 快速开始

安装

```
npm install --save uuid-int
```
使用

```
const UUID = require('uuid-int');

// 设定一个int类型的id, 范围在 [0, 511]之间
const id = 0;

// 使用id初始化
const generator = UUID(id);

// 生成
const uuid = generator.uuid();
console.log(uuid); // 3270411116609537
```

## 原理

思路来源于 **snowflake**

大多 js 还停留在无 int64 的状态，即 int 最大值是 2^53。

53 位 bit 是这样分配的

32bit 时间戳秒：能用最多100多年
9bit 机器：最多512台机器/线程
12bit 自增：每秒最多4096个
