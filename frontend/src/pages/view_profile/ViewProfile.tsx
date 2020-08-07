import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { ViewProfileParams } from '../../App';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import { getLoggedInUser, getUserForViewProfile } from '../../reducers/userSlice';
import { RootState } from '../../reducers/rootReducer';
import { CurrentLoggedInUser, User } from '../../store/types';
import { OwnProfile } from "./OwnProfile";
import { OtherProfile } from './OtherProfile';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-top: 9.5vh;
`

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "g rid",
      gridTemplateAreas: `
        "banner banner banner"
        "card board space"
      `,
      gridTemplateColumns: "1fr 1.5fr 1fr",
      gridTemplateRows: "min-content auto",
      backgroundColor: "#E5E5E5",
      height: "100%",
    },
    banner: {
      gridArea: "banner",
      marginBottom: "1rem",
    },
    card: {
      gridArea: "card",
    },
    board: {
      gridArea: "board",
    },
  })
);

export function ViewProfile() {
  const { username } = useParams<ViewProfileParams>();
  const loggedInUsername = useSelector<RootState, string>(state => state.user?.userID);

  function child() {
    if (!username) {
      return <Redirect to="/" />
    }

    if (username === loggedInUsername) {
      return <OwnProfile />
    }

    if (!loggedInUsername || loggedInUsername !== username) {
      return <OtherProfile username={username} />
    }
  }

  return (<Container>{child()}</Container>);
}