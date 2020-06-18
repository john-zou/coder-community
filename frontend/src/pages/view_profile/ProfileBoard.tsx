import React, { useState } from "react";
import { Tabs, Paper, Tab, makeStyles, Typography } from "@material-ui/core";
import SimpleCard from "../home/Card";

// For tabs
const Posts = "Posts";
const Saved = "Saved";

export function ProfileBoard(props) {
  const [tabIdx, setTabIdx] = useState(0);

  function handleTabChange(_, newValue) {
    setTabIdx(newValue);
  }

  return (
    <>
      <Tabs
        value={tabIdx}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab
          label={Posts}
          style={{
            fontFamily: "roboto",
            textTransform: "none",
            fontWeight: tabIdx === 0 ? "bold" : "lighter",
          }}
        />
        <Tab
          label={Saved}
          style={{
            fontFamily: "roboto",
            textTransform: "none",
            fontWeight: tabIdx === 1 ? "bold" : "lighter",
          }}
        />
      </Tabs>
      {tabIdx === 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
        </div>
      ) : (
        <h1>Saved (To do)</h1>
      )}
    </>
  );
}
