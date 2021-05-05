import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/Merge-Sort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/Quick-Sort';
import {getHeapSortAnimations} from '../sortingAlgorithms/Heap-Sort';
import {getBubbleSortAnimations} from '../sortingAlgorithms/Bubble-Sort'
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 30;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 250));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 5);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
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
          setTimeout(()=> {
            barTwoStyle.backgroundColor = PRIMARY_COLOR
            barOneStyle.backgroundColor = PRIMARY_COLOR
          } , 40)
        }, i * 40);
    }
  }

  heapSort() {
    // const animations = getHeapSortAnimations(this.state.array);
    // console.log(animations)
    // for (let i = 0; i < animations.length; i++){
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //    setTimeout(() => {
    //       const [barOneIdx, barTwoIdx, height] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       const barTwoStyle = arrayBars[barTwoIdx].style;
    //       barOneStyle.height = `${height}px`
    //    }, i * ANIMATION_SPEED_MS)
    // }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array)
    for (let i = 0; i < animations.length; i++){
      const arrayBars = document.getElementsByClassName('array-bar')
      setTimeout(() => {
        const [barOneIdx, barTwoIdx] = animations[i]
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        let temp = barOneStyle.height
        barOneStyle.height = barTwoStyle.height
        barTwoStyle.height = temp
      }, i * ANIMATION_SPEED_MS)
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="wrapper">
        <div className="btn-container">
        <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort (5 ms)</button>
          <button onClick={() => this.quickSort()}>Quick Sort (40 ms)</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
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
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
