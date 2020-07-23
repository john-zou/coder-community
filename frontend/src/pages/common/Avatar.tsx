import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

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
  smallAccountImg: {
    width: "2.2em",
    height: "2.2em",
    borderRadius: "50%",
    marginTop: "1em",
    marginRight: "0.3em",
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

const TitleText = styled.span<{ isPost: boolean, isText: boolean, titleSrc?: string }>`
  cursor: ${({titleSrc}) => titleSrc ? "pointer" : "default"};
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

const Avatar = ({ small, pic, title, titleSrc, subtitle, extraText, extraTextOnClick, isPost, isButton, isText, subtitleIsDate }: { pic: string, title?: string, subtitle?: string, subtitleIsDate?: boolean, extraText?: string, isPost?: boolean, isButton?: boolean, isText?: boolean, titleSrc?: string, extraTextOnClick?: any, small?: boolean }) => {
  const classes = useStyles();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const history = useHistory();
  return (
    <div className={classes.account}>
      <img className={small ? classes.smallAccountImg : classes.accountImg} src={pic} alt="avatar" />
      <div className={classes.nameTime}>
        <p>
          <TitleText isPost={isPost} isText={isText} onClick={titleSrc && (() => {history.push(titleSrc)})} titleSrc={titleSrc}>
            {title}&nbsp;&nbsp;&nbsp;
          </TitleText>
          {!isButton && <ExtraText onClick={extraTextOnClick}>{extraText}</ExtraText>}
          {isButton && <SideButton buttonIsClicked={buttonIsClicked} onClick={() => setButtonIsClicked((prevState) => !prevState)}>{extraText}</SideButton>}
          {/* {isButton && buttonIsClicked && <SideButtonClicked>{extraText}</SideButtonClicked>} */}
        </p>
        <p style={{ marginTop: subtitleIsDate? "-1.1em" : "-0.8em", fontSize: subtitleIsDate ? "13px" : "15px", color: subtitleIsDate ? "gray" : "black" }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Avatar;