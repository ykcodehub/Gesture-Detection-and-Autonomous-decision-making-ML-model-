import React, { useEffect, useState } from "react";
import "./my.css";
function App() {
  useEffect(() => {
    async function hold() {
      let x = await fetch("http://localhost:3535/sethold");
    }
    hold();
    console.log("setup hold")
  }, []);

  let directionMap = {};
  directionMap.left = "left";
  directionMap.right = "right";
  directionMap.up = "up";
  directionMap.down = "down";
  directionMap.hold = "hold";

  let [direction, setDirection] = useState(directionMap.hold);
  let [cordinateX, setcordinateX] = useState(0);
  let [cordinateY, setcordinateY] = useState(0);
  let isWon = false;
  function checkwin() {
    if (
      cordinateX > 150 &&
      cordinateX < 185 &&
      cordinateY > 150 &&
      cordinateY < 185
    ) {
      window.location.reload();
      window.location.reload();
      alert("You won Game");
      isWon = true;
      return;
    }
  }

  useEffect(() => {
    let intervalId;

    const handleDirectionChange = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
          console.log(direction);
        if (direction == directionMap.down) {
          let maxDown = 400;
          if (maxDown > cordinateY) {
            console.log("down",cordinateX,cordinateY,"->",cordinateX,cordinateY++)
            setcordinateY(cordinateY++);
          }
        }
        if (direction == directionMap.up) {
          let maxUp = 0;
          if (maxUp < cordinateY) {
            setcordinateY(cordinateY--);
          }
        }
        if (direction == directionMap.left) {
          let maxLeft = 0;
          if (maxLeft < cordinateX) {
            setcordinateX(cordinateX--);
          }
        }
        if (direction == directionMap.right) {
          let maxRight = 400;
          if (maxRight > cordinateX) {
            setcordinateX(cordinateX++);
          }
        }

        checkwin();
      }, 20);
    };
    if (isWon == false) {
      handleDirectionChange();
    }
    return () => clearInterval(intervalId);
  }, [direction]);

  // ----------------------------------

  useEffect(() => {
    setInterval(async () => {
      let response = await fetch("http://localhost:3535/state");
      let data = await response.json();
      let newState = data.state;

      //   console.log(newState);
      setDirection(newState);
    }, 50);
  }, []);
  function handleState() {}

  async function handleUp() {
    let x = await fetch("http://localhost:3535/setup");
    setDirection(directionMap.up);
  }
  async function handleDown() {
    let x = await fetch("http://localhost:3535/setdown");
    setDirection(directionMap.down);
  }
  async function handleLeft() {
    let x = await fetch("http://localhost:3535/setleft");
    setDirection(directionMap.left);
  }
  async function handleRight() {
    let x = await fetch("http://localhost:3535/setright");
    setDirection(directionMap.right);
  }
  async function handleHold() {
    let x = await fetch("http://localhost:3535/sethold");
    setDirection(directionMap.hold);
  }

  async function handleState() {
    let response = await fetch("http://localhost:3535/state");
    let data = await response.json();
    let newState = data.state;

    console.log(newState);
  }

  return (
    <div className="myapp">
      <div className="appcontainer">
        <p>Game Application</p>
        <div>
          <button onClick={handleUp}>up</button>
          <button onClick={handleDown}>Down</button>
          <button onClick={handleLeft}>Left</button>
          <button onClick={handleRight}>Right</button>
          <button onClick={handleHold}>Hold</button>
          <button onClick={handleState}>State</button>
        </div>
        <div className="gameContainer">
          <div className="target"></div>
          <div
            className="object"
            style={{ top: cordinateY, left: cordinateX }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
