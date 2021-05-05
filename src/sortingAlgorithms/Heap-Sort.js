export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapsort(array, animations);
  return animations;
}

function heapsort(array, animations) {
  function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }

  function maxHeap() {
    let current = 0;
    let index = 0;
    for (let i = 0; i < array.length; i++) {
      if (current < array[i]) {
        current = array[i];
        index = i;
      }
    }
    swap(array, 0, index);
    animations.push([index]);
  }
  maxHeap();
}
