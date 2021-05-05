export default function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

function swap(items, firstIndex, secondIndex) {
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function bubbleSort(array, animations) {
  let sorted = false;
  let round = 0;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1 - round; i++) {
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        animations.push([i, i + 1]);
        sorted = false;
      }
    }
    round++;
  }
  return array;
}
