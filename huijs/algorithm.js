// 冒泡排序
export function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
// 选择排序
export function selectSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
// 插入排序
export function insertSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}
// 希尔排序
export function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 5) {
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}
// 归并排序
export function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var middle = Math.floor(arr.length / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
// 快速排序
export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2),
        pivot = arr.splice(pivotIndex, 1)[0],
        left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
// 堆排序
export function heapSort(arr) {
    var len = arr.length;
    buildMaxHeap(arr);
    for (var i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0, len);
    }
    return arr;
}
function buildMaxHeap(arr) {
    var len = arr.length;
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len);
    }
}
function heapify(arr, i, len) {
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest, len);
    }
}
function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
// 基数排序
export function radixSort(arr) {
    var mod = 10,
        dev = 1,
        maxNum = arr[0],
        bucket = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxNum) {
            maxNum = arr[i];
        }
    }
    while (maxNum / dev > 1) {
        bucket = [];
        for (var i = 0; i < mod; i++) {
            bucket[i] = [];
        }
        for (var i = 0; i < arr.length; i++) {
            var loc = parseInt(arr[i] / dev) % mod;
            bucket[loc].push(arr[i]);
        }
        arr = [];
        for (var i = 0; i < mod; i++) {
            arr = arr.concat(bucket[i]);
        }
        dev *= mod;
    }
    return arr;
}
// 桶排序
export function bucketSort(arr) {
    var len = arr.length,
        max = arr[0],
        min = arr[0];
    for (var i = 1; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        } else if (arr[i] < min) {
            min = arr[i];
        }
    }
    var bucketCount = Math.floor((max - min) / len) + 1;
    var bucketArr = new Array(bucketCount);
    for (var i = 0; i < bucketCount; i++) {
        bucketArr[i] = [];
    }
    for (var i = 0; i < len; i++) {
        var loc = Math.floor((arr[i] - min) / len);
        bucketArr[loc].push(arr[i]);
    }
    arr = [];
    for (var i = 0; i < bucketCount; i++) {
        arr = arr.concat(bucketSort(bucketArr[i]));
    }
    return arr;
}
// 计数排序
export function countingSort(arr) {
    var len = arr.length,
        max = arr[0],
        min = arr[0];
    for (var i = 1; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        } else if (arr[i] < min) {
            min = arr[i];
        }
    }
    var bucketCount = Math.floor((max - min) / len) + 1;
    var bucketArr = new Array(bucketCount);
    for (var i = 0; i < bucketCount; i++) {
        bucketArr[i] = 0;
    }
    for (var i = 0; i < len; i++) {
        var loc = Math.floor((arr[i] - min) / len);
        bucketArr[loc]++;
    }
    for (var i = 1; i < bucketCount; i++) {
        bucketArr[i] += bucketArr[i - 1];
    }
    var result = new Array(len);
    for (var i = len - 1; i >= 0; i--) {
        var loc = Math.floor((arr[i] - min) / len);
        result[--bucketArr[loc]] = arr[i];
    }
    return result;
}
