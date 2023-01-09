import { useEffect, useState } from "react";
import Freezeframe from "freezeframe";
import io from "socket.io-client";
var num_lap = 1,
  results = [],
  val = 0;

let auto = 0;
// const auto =
const socket = io("http://localhost:5000");
const Track = () => {
  let imgObj = null;
  let imgObj2 = null;
  let imgObj3 = null;
  const [isActive, setIsActive] = useState(false);
  const [isActiveReset, setIsActiveReset] = useState(true);
  const [test, setTest] = useState(false);

  useEffect(() => {
    imgObj = document.getElementById("img1");
    imgObj.style.position = "relative";
    imgObj.style.left = "0vw";
    imgObj2 = document.getElementById("img2");
    imgObj2.style.position = "relative";
    imgObj2.style.left = "0vw";
    imgObj3 = document.getElementById("img3");
    imgObj3.style.position = "relative";
    imgObj3.style.left = "0vw";
  }, []);

  const resulthandler = (number) => {
    var tds = document.querySelectorAll("#results .result");
    tds[results.length].innerHTML = number.number;
    results.push(number);
    setIsActiveReset(false);
  };

  // const valuehandler = (e,speed) =>{
  //   setTimeout(() => {
  //   imgObj.style.left = e + "vw";
  //   imgObj2.style.left = e + "vw";
  //   imgObj3.style.left = e + "vw";
  //   }, 2000/speed);

  // }
  const ramdon = () => {
    return Number(String(Math.random() * (4 - 1) + 1)[0]);
  };
  useEffect(() => {
    let i = 0;
    let auto1 = Math.random() * (2 - 1) + 1;
    let auto2 = Math.random() * (2 - 1) + 1;
    let auto3 = Math.random() * (2 - 1) + 1;
    
    socket.on("receive_message", (e) => {
      i++;
      console.log(auto1, auto2, auto3);

      if (e.results) {
        resulthandler(e);
      } else {
        imgObj.style.left = e + "vw";
        imgObj2.style.left = e  + "vw";
        imgObj3.style.left = e  + "vw";
        // valuehandler(e,speed)
        // valuehandler(e)
        // valuehandler(e)
      }
    });
  }, []);
  const startGame = (e) => {
    setIsActive(true);
    setIsActiveReset(true);
    socket.emit("start", "dlsd");
  };
  const resetGame = () => {
    window.location.reload();
  };
  return (
    <>
      <div id="img">
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
