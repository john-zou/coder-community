import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  account: {
    display: "flex",
    flexDirection: "row",
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

const TitleText = styled.span<{ isPost: boolean, isText: boolean, titleSrc?: string, titleOutSrc?: string }>`
  cursor: ${({ titleSrc, titleOutSrc }) => titleSrc || titleOutSrc ? "pointer" : "default"};
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

export const SubTitle = styled.p<{ subtitleIsDate: boolean, boldSub: boolean }>`
  margin-top: ${({ subtitleIsDate }) => subtitleIsDate ? "-1.1em" : "-0.8em"};
  fontSize: ${({ subtitleIsDate }) => subtitleIsDate ? "13px" : "15px"};
  color: ${({ subtitleIsDate }) => subtitleIsDate ? "gray" : "black"};
  font-weight: ${({ boldSub }) => boldSub ? "bold" : "400"};
  cursor: ${({ boldSub }) => boldSub ? "pointer" : ""};
`;

const Avatar = ({ small, pic, title, titleSrc, subtitle, extraText, extraTextOnClick, boldSub, isPost, isButton, isText, subtitleIsDate, titleOutSrc, previewContent }: { titleOutSrc?: string, pic?: string, title?: string, subtitle?: string, boldSub?: boolean, subtitleIsDate?: boolean, extraText?: string, isPost?: boolean, isButton?: boolean, isText?: boolean, titleSrc?: string, extraTextOnClick?: any, small?: boolean, previewContent?: boolean }) => {
  const classes = useStyles();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const history = useHistory();
  const previewContentRef = useRef(null)

  useEffect(() => {
    if (previewContent && previewContentRef.current) {
      previewContentRef.current.innerHTML += subtitle
    }
  }, [subtitle])

  return (
    <div className={classes.account}>
      {pic && <img className={small ? classes.smallAccountImg : classes.accountImg} src={pic} alt="avatar" />}
      <div className={classes.nameTime}>
        <p>
          <TitleText isPost={isPost} isText={isText}
            onClick={() => {
              if (titleSrc) {
                history.push(titleSrc)
              }
              if (titleOutSrc) {
                window.location.href = titleOutSrc
              }
            }}
            titleSrc={titleSrc} titleOutSrc={titleOutSrc}>
            {title}&nbsp;&nbsp;&nbsp;
          </TitleText>
          {!isButton && <ExtraText onClick={extraTextOnClick}>{extraText}</ExtraText>}
          {isButton && <SideButton buttonIsClicked={buttonIsClicked} onClick={() => setButtonIsClicked((prevState) => !prevState)}>{extraText}</SideButton>}
        </p>
        {previewContent ?
          <div style={{ marginTop: "-1.1em", fontSize: "15px", marginLeft: "-1em" }}>
            <div className="ql-snow" >
              <div className="ql-editor">
                <p ref={previewContentRef}></p>
              </div>
            </div>
          </div> :
          <SubTitle subtitleIsDate={subtitleIsDate} boldSub={boldSub}>{subtitle}</SubTitle>
        }
      </div>
    </div>
  );
};

export default Avatar;