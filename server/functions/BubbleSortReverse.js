function BubbleSortReverse(data) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].rating > data[i + 1].rating) {
        [data[i], data[i + 1]] = [data[i + 1], data[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return data;
}

module.exports = { BubbleSortReverse };
exports.BubbleSortReverse = BubbleSortReverse;
