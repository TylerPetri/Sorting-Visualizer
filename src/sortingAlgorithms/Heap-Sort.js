export function getHeapSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  heapsort(arr, animations);
  return animations;
}

function heapsort(arr, animations) {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    animations.push([0, i]);
    heapify(arr, i, 0, animations);
  }
}

const heapify = (arr, n, i, animations) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let children = [];

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (left < n) {
    children.push(left);
  }
  if (right < n) {
    children.push(right);
  }

  if (largest !== i) {
    swap(arr, i, largest);
    animations.push([i, largest]);
    heapify(arr, n, largest, animations);
  }
};

function swap(items, firstIndex, secondIndex) {
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}
