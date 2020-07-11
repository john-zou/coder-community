import React from "react";
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

const TitleText = styled.span<{ isPost: boolean }>`
  font-weight: bold;
  color: ${({ isPost }) => isPost ? "#5D67E9" : "#5DCBAF"}
`;

const ExtraText = styled.p`
  color: black;
  font-size: small;
`;

const SideButton = styled.span`
  color: #5D67E9;
  font-size: small;
`;

const Avatar = ({ pic, title, subtitle, extraText, isPost, isButton }: { pic: string, title: string, subtitle: string, extraText: string, isPost?: boolean, isButton?: boolean }) => {
  const classes = useStyles();
  return (
    <div className={classes.account}>
      <img className={classes.accountImg} src={pic} alt="" />
      <div className={classes.nameTime}>
        <p>
          <TitleText isPost={isPost}>
            {title}&nbsp;&nbsp;&nbsp;
          </TitleText>
          {!isButton && <ExtraText>{extraText}</ExtraText>}
          {isButton && <SideButton>{extraText}</SideButton>}
        </p>
        <p style={{ marginTop: "-0.8em", fontSize: "small" }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Avatar;