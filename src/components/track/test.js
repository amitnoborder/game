import { useEffect, useState } from "react";
import Freezeframe from "freezeframe";
import io from "socket.io-client";
var num_lap = 1,
  results = [];
  const socket = io("http://localhost:5000");
const Track = () => {
  let imgObj = null;
  let imgObj2 = null;
  let imgObj3 = null;
  const [isActive, setIsActive] = useState(false);
  const [isActiveReset, setIsActiveReset] = useState(true);


  useEffect(() => {
    imgObj = document.getElementById("img1");
    imgObj.style.position = "relative";
    imgObj.style.left = "0px";
    imgObj2 = document.getElementById("img2");
    imgObj2.style.position = "relative";
    imgObj2.style.left = "0px";
    imgObj3 = document.getElementById("img3");
    imgObj3.style.position = "relative";
    imgObj3.style.left = "0px";
  }, []);

  function Horse(id, x, y) {
    this.element = document.getElementById(id);
    this.speed = Math.random() * 10 + 10;
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.number = parseInt(id.replace(/[\D]/g, ""));
    this.lap = 0; //

    // console.log("hi",this.element)
    this.moveRight = function () {
      var horse = this;

      // console.log(this.speed);
      // console.log(horse.x);
      setTimeout(function () {
        horse.x++;
        horse.element.style.left = horse.x + "vw";
        // imgObj.style.left = horse.x + "vw";
        // imgObj2.style.left = horse.x + "vw";
        // imgObj3.style.left = horse.x + "vw";

        if (horse.lap == num_lap && horse.x > horse.originX + 6) {
          horse.arrive();
        } else {
          if (horse.x < 82.5 - horse.number * 2.5) {
            horse.moveRight();
          } else {
            horse.arrive();
          }
        }
      }, 2000 / this.speed);
      console.log(this.speed,"kjisf");
      
    };
    this.run = function () {
      this.element.className = "horse runRight";
      this.moveRight();
    };
    this.arrive = function () {
      this.element.className = "horse standRight";
      this.lap = 0;

      var tds = document.querySelectorAll("#results .result");
      tds[results.length].innerHTML = this.number;

      results.push(this.number);
      // new Freezeframe()
      setIsActiveReset(false);
    };
  }
  const startGame = (e) => {
    setIsActive(true);
    setIsActiveReset(true);
    var horse1 = new Horse("img1", 3, 4);
    var horse2 = new Horse("img2", 3, 8);
    var horse3 = new Horse("img3", 3, 8);
    socket.emit("start", "jjfs");
    horse1.run();
    horse2.run();
    horse3.run();
  };
  const resetGame = () => {
    window.location.reload();
    // results.push(this.number);
  };
  return (
    <>
      <div>
        <div id="img1" className="firstObject">
          <img src="https://static.tumblr.com/8ae7bdfb56dd90a5532414e7382b2a8b/8t5jvua/Qtfn41f8z/tumblr_static_5q5lm0kslo08s400cssgw0040.gif" />
        </div>
        <div id="img2" className="secondObject">
          <img src="https://static.tumblr.com/8ae7bdfb56dd90a5532414e7382b2a8b/8t5jvua/Qtfn41f8z/tumblr_static_5q5lm0kslo08s400cssgw0040.gif" />
        </div>
        <div id="img3" className="thirdObject">
          <img src="https://static.tumblr.com/8ae7bdfb56dd90a5532414e7382b2a8b/8t5jvua/Qtfn41f8z/tumblr_static_5q5lm0kslo08s400cssgw0040.gif" />
        </div>
        <div className="vl"></div>
      </div>
      <table id="results">
        <thead>
          <tr>
            <th>Results</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st :</td>
            <td className="result img1"></td>
          </tr>
          <tr>
            <td>2nd :</td>
            <td className="result img2"></td>
          </tr>
          <tr>
            <td>3nd :</td>
            <td className="result img3"></td>
          </tr>
          
        </tbody>
      </table>

      <div className="btn_wrap">
        <div className="move">
          <button disabled={isActive} id="start" onClick={startGame}>
            start
          </button>
        </div>
        <div id="reset" className="reset">
          <button disabled={isActiveReset} onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>

      <br />
    </>
  );
};
export default Track;
