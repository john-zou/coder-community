import React from "react";

type Props = {
  message: string;
};

// Taken from posts reducer
function Message({ message }: Props) {
  return (
    <div>
      <li>
        <div
          style={{
            fontSize: "1em",
            float: "left",
            margin: "0 0",
            textDecoration: "none",
          }}
        >
          {message}
        </div>
      </li>
      <br />
      <br />
    </div>
  );
}
