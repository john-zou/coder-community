import React from "react";
import { useSelector } from "react-redux";
import { RootState, Group } from "../../initialData";

export default function GroupList() {
  const groups = useSelector<RootState, Group[]>((state) => state.groups);

  return (
    <>
      <h3>Groups</h3>
      {groups.map((group) => {
        return <p>&nbsp;&nbsp;&nbsp;&nbsp;{group.name}</p>;
      })}
    </>
  );
}
