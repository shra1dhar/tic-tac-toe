import React from "react";

function Square(props) {
  let cls = props.bgcolor ? "square square-win" : "square";
  return (
    <button className={cls} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
