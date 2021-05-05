import React, {Component, useState, useEffect} from 'react';
import {RangeStepInput} from 'react-range-step-input';
import getMergeSortAnimations from '../sortingAlgorithms/Merge-Sort.js';
import getQuickSortAnimations from '../sortingAlgorithms/Quick-Sort';
import getHeapSortAnimations from '../sortingAlgorithms/Heap-Sort';
import getBubbleSortAnimations from '../sortingAlgorithms/Bubble-Sort';
import './SortingVisualizer.css';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [NUMBER_OF_ARRAY_BARS, setBars] = useState(100);
  const [ANIMATION_SPEED_MS, setSpeed] = useState(30);
  const [running, setRunning] = useState(false);

  const PRIMARY_COLOR = 'turquoise';
  const SECONDARY_COLOR = 'red';

  useEffect(() => resetArray(), []);

  function resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 400));
    }
    setArray(array);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * 20);
    }
  }

  function quickSort() {
    const animations = getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx, newHeight1, newHeight2] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${newHeight1}px`;
        barTwoStyle.height = `${newHeight2}px`;
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = 'purple';
        setTimeout(() => {
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, 60);
      }, i * 60);
    }
  }

  function heapSort() {
    const animations = getHeapSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let temp = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = temp;
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = 'PURPLE';
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, ANIMATION_SPEED_MS);
      }, i * ANIMATION_SPEED_MS);
    }
  }

  function bubbleSort() {
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      setTimeout(() => {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let temp = barOneStyle.height;
        barOneStyle.height = barTwoStyle.height;
        barTwoStyle.height = temp;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
        setTimeout(() => (barTwoStyle.backgroundColor = PRIMARY_COLOR), 5);
      }, i * 5);
    }
  }

  function onChange(e) {
    const newVal = e.target.value;
    setSpeed(newVal);
  }
  function onChange2(e) {
    const newVal = e.target.value;
    setBars(newVal);
  }

  return (
    <>
      <div className="wrapper">
        <div className="btn-container">
          <button onClick={!running ? () => resetArray() : null}>
            Generate New Array
          </button>
          <button onClick={!running ? () => mergeSort() : null}>
            Merge Sort
          </button>
          <button onClick={!running ? () => quickSort() : null}>
            Quick Sort
          </button>
          <button onClick={!running ? () => heapSort() : null}>
            Heap Sort
          </button>
          <button onClick={!running ? () => bubbleSort() : null}>
            Bubble Sort
          </button>
        </div>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
      </div>
    </>
  );

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default SortingVisualizer;
