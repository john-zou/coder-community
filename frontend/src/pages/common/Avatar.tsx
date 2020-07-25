import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";

const useStyles = makeStyles({
  account: {
    display: "flex",
    flexDirection: "row",
    // paddingTop: "1em",
  },
  accountImg: {
    width: "3em",
    height: "3em",
    borderRadius: "50%",
    marginTop: "0.5em",
  },
  imgTitle: {
    display: "flex",
    flexDirection: "row",
  },
  nameTime: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.5em",
  },
});

const TitleText = styled.span<{ isPost: boolean, isText: boolean }>`
  font-weight: bold;
  color: ${({ isPost, isText }) => isPost ? "#5D67E9" : isText ? "black" : "#5DCBAF"}
`;

const ExtraText = styled.span`
  color: black;
  font-size: small;
`;

export const SideButton = styled.span <{ buttonIsClicked: boolean }>`
  color: ${({ buttonIsClicked }) => buttonIsClicked ? "white" : "#5D67E9"};
  font-size: small;
  background-color: ${({ buttonIsClicked }) => buttonIsClicked ? "#5D67E9" : "white"};
  min-width: fit-content;
  padding: 5px 10px 5px 10px;
  border: 1px solid #5D67E9; 
  border-radius: 5px;
  cursor: pointer;
`

const Avatar = ({ pic, title, subtitle, extraText, isPost, isButton, isText }: { pic: string, title?: string, subtitle?: string, extraText?: string, isPost?: boolean, isButton?: boolean, isText?: boolean }) => {
  const classes = useStyles();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  return (
    <div className={classes.account}>
      <img className={classes.accountImg} src={pic} alt="" />
      <div className={classes.nameTime}>
        <p>
          <TitleText isPost={isPost} isText={isText}>
            {title}&nbsp;&nbsp;&nbsp;
          </TitleText>
          {!isButton && <ExtraText>{extraText}</ExtraText>}
          {isButton && <SideButton buttonIsClicked={buttonIsClicked} onClick={() => setButtonIsClicked((prevState) => !prevState)}>{extraText}</SideButton>}
          {/* {isButton && buttonIsClicked && <SideButtonClicked>{extraText}</SideButtonClicked>} */}
        </p>
        <p style={{ marginTop: "-0.8em", fontSize: "16px" }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Avatar;