import React from "react";
import { SearchBar } from "../messenger/SearchBar";
import { DiscussionCard } from "./DiscussionCard";

export const DiscussionTab = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
      {/* <SearchBar /> */}
      <DiscussionCard></DiscussionCard>

    </div>
  )
}