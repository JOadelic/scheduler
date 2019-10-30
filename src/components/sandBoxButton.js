// import React from "react";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { Fragment } from "react";
import "./styles.scss";
// 2.1
function Button(props) {
  //3
  // function onClicked(event) {
  //   console.log("Button Clicked");
  // }
  //4
  return (
    <button onClick={props.onClick} /*3 onClick={onClicked}*/>
      {props.children}
    </button>
  );
}
//2 works with 1
// OR POSSIBLE TO KEEP IT SIMPLE IF THE FUNCTION DOESN'T HAVE MANY LINES
// function Button(props) {
//   return (
//     <button onClick={(event) => console.log("Button Clicked")}>
//       {props.children}
//     </button>
//   );
// }
//1 works with 2 (but has to delete the onClick event. To keep it, works with 2.1 & 4)
// function Application(props) {
//   return (
//     <main>
//       <Button onClick={event => console.log("Button Clicked FROM APPLICATION")}>
//         Reset
//       </Button>
//     </main>
//   );
// }
//1.1 works with 2.1
// function Application(props) {
//   const [count, setCount] = useState(0);
//   return (
//     <main>
//       <Button onClick={event => setCount(count + 1)}>Increment</Button>
//       <h1>Button was clicked {count} times.</h1>
//     </main>
//   );
// }
// 5 Separated example for controled components, works alone
// function Application(props) {
//   const [name, setName] = useState("");
//   if (name) {
//     return (
//       <main>
//         <input
//           value={name}
//           onChange={event => setName(event.target.value)}
//           placeholder="Please enter your name"
//         />
//         <h1>Hello, {name}.</h1>
//       </main>
//     );
//   }
//   return (
//     <main>
//       <input
//         value={name}
//         onChange={event => setName(event.target.value)}
//         placeholder="Please enter your name"
//       />
//     </main>
//   );
// }
//5.1 is the same as 5 but refactored, works with button 2.1
function Application(props) {
  const [name, setName] = useState("");
  function reset() {
    setName("");
  }
  return (
    <main>
      <input
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder="Please enter your name"
      />
      {name && (
        <Fragment>
          <h1>Hello, {name}.</h1>
          <Button onClick={reset}>Reset</Button>
        </Fragment>
      )}
    </main>
  );
}
ReactDOM.render(<Application />, document.getElementById("root"));