export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapsort(array, animations);
  return animations;
}

function swap(items, firstIndex, secondIndex) {
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}

function heapsort(array, animations) {}
