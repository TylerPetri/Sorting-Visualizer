export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quicksort(array, animations);
  return animations;
}

function quicksort(array, animations) {
  function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }

  function partition(items, left, right) {
    var pivot = items[left];
    var i = left - 1;
    var j = right + 1;

    while (i < j) {
      i++;
      j--;

      while (items[i] < pivot) {
        i++;
      }

      while (items[j] > pivot) {
        j--;
      }

      if (i < j) {
        swap(items, i, j);
        animations.push([i, j, items[i], items[j]]);
      }
    }
    return j;
  }

  function quickSortAlgo(items, left, right) {
    var index;

    if (right > left) {
      index = partition(items, left, right);
      quickSortAlgo(items, left, index);
      quickSortAlgo(items, index + 1, right);
    }
    return items;
  }
  quickSortAlgo(array, 0, array.length - 1, animations);
}
