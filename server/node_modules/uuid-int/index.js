const Generator = (id, seed) => {
  const getNow = () => Math.floor((Date.now() - seed) / 1000);
  let counter = 0;
  let nextTime = 0;
  const next = () => {
    counter = 0;
    nextTime = getNow() + 1;
  };
  const uuid = () => {
    const now = getNow();
    if (now < nextTime) {
      if (counter > 4095) {
        throw Error('uuid out of range');
      }
    } else {
      next();
    }

    const time = (nextTime & 0x1ffffffff) * 2097152;
    const uid = (id & 0x1ff) * 4096;
    const count = counter & 0xfff;
    const uuid = time + uid + count;

    counter++;

    return uuid;
  };
  return { id, seed, uuid };
};

module.exports = (id, seed = 0) => {
  if (typeof id !== 'number') {
    throw Error('id need be number');
  }
  if (typeof seed !== 'number') {
    throw Error('seed need be number');
  }
  id = parseInt(id);
  seed = parseInt(seed);
  if (id < 0 || id > 511) {
    throw Error('d must be >=0 or <= 511');
  }
  if (seed < 0 || seed > Date.now()) {
    throw Error('seed must <= now');
  }
  const gen = Generator(id, seed);
  gen.id = id;
  gen.seed = seed;
  return gen;
};
