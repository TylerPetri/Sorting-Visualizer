import React, {Component, useState, useEffect} from 'react';
import {RangeStepInput} from 'react-range-step-input';
import getMergeSortAnimations from '../sortingAlgorithms/Merge-Sort.js';
import getQuickSortAnimations from '../sortingAlgorithms/Quick-Sort';
import getHeapSortAnimations from '../sortingAlgorithms/Heap-Sort';
import getBubbleSortAnimations from '../sortingAlgorithms/Bubble-Sort';
import './SortingVisualizer.css';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [NUMBER_OF_ARRAY_BARS, setBars] = useState();
  const [ANIMATION_SPEED_MS, setSpeed] = useState(30);
  const [running, setRunning] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  const PRIMARY_COLOR = 'turquoise';
  const SECONDARY_COLOR = 'red';

  function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    resetArray();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  function resetArray() {
    let NUMBER_OF_ARRAY_BARS;
    let height;
    const array = [];

    if (windowDimensions.width < 640) {
      setBars(50);
      NUMBER_OF_ARRAY_BARS = 50;
    } else {
      setBars(100);
      NUMBER_OF_ARRAY_BARS = 100;
    }

    if (windowDimensions.height < 666) {
      height = 200;
      array.push(200);
    } else {
      height = 400;
      array.push(400);
    }
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS - 1; i++) {
      array.push(randomIntFromInterval(5, height));
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
        const [barOneIdx, barTwoIdx, height1, height2] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barOneStyle.height = `${height1}px`;
        barTwoStyle.height = `${height2}px`;
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
        <nav className="nav">
          <div className="btn-container">
            <button className="resetArrayBtn" onClick={() => resetArray()}>
              Generate New Array
            </button>
            <div className="sort">
              <button onClick={() => mergeSort()} className="funcBtn">
                Merge Sort
              </button>
              <button onClick={() => quickSort()} className="funcBtn">
                Quick Sort
              </button>
              <button onClick={() => heapSort()} className="funcBtn">
                Heap Sort
              </button>
              <button onClick={() => bubbleSort()} className="funcBtn">
                Bubble Sort
              </button>
            </div>
            <div className="fill"></div>
          </div>
        </nav>
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
