import React from "react";

export default function GroupList() {
  const groups = ["Group 1", "Group 2"];

  return (
    <>
      <h3>Groups</h3>
      {groups.map((group) => {
        return <p>&nbsp;&nbsp;&nbsp;&nbsp;{group}</p>;
      })}
    </>
  );
}
