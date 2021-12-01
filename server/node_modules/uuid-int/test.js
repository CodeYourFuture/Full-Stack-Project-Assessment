const assert = require('power-assert');
const UUID = require('./index');

assert.throws(() => UUID(), Error, 'need id');
assert.throws(() => UUID(-1), Error, 'id out of range');
assert.throws(() => UUID(512), Error, 'id out of range');
assert.throws(() => UUID('28'), Error, 'id must be number');
assert.throws(() => UUID(2, Date.now() + 1), Error, 'seed out of range');
assert.throws(() => UUID(2, -1), Error, 'seed out of range');
assert.throws(() => UUID(2, '392'), Error, 'seed must be number');

const t0 = UUID(0, Date.now());
assert(t0.uuid() === 0x200000);

const t1 = UUID(1);
const t2 = UUID(2);
assert(t1.id === 1);
assert(t2.id === 2);
assert(((t1.uuid() !== t1.uuid()) !== t2.uuid()) !== t2.uuid());

for (let i = 0; i < 1000; i++) {
  assert(t1.uuid() !== t2.uuid());
}
const map = {};
const t3 = UUID(3);
for (let i = 0; i < 4096; i++) {
  const uuid = t3.uuid();
  if (map[uuid]) {
    assert(false);
  } else {
    map[uuid] = 1;
  }
}

const t4 = UUID(4);
let catchError = false;
for (let i = 0; i < 4097; i++) {
  try {
    t4.uuid();
  } catch (error) {
    catchError = true;
  }
}
assert(catchError);
