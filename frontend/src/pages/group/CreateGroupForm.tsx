import React, { useState, useEffect } from 'react';
import ImageUploader from "react-images-upload";
import AddMultiple from './AddMuliple';
import { RootState } from '../../reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../store/types';
import { Dictionary, unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { Loading } from '../common/Loading';
import ErrorPage from '../common/ErrorPage';
import { fetchUsersByIDs } from '../../reducers/usersSlice';

export const CreateGroupForm = (props) => {
  const [pictures, setPictures] = useState([]);
  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  const user = useSelector<RootState, User>(state => state.user);
  const followingFollowers: User[] = [];
  user.followers.concat(user.following).forEach((_id) => {
    if (usersMap[_id]) {
      followingFollowers.push(usersMap[_id])
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user.followers.length > 0 || user.following.length > 0) {
      setLoading(true);
      dispatch(fetchUsersByIDs(user.following.concat(user.followers)))
        .then(unwrapResult).then( //must set dispatch to any to use .then
          () => {
            setLoading(false)
          }
        ).catch(error => {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  if (!followingFollowers || loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }
  // const users = Object.values(usersMap).filter((u) => (u._id !== user._id));

  // console.log(users);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  return (
    <form>
      {/* https://github.com/jakehartnell/react-images-upload#readme */}
      <ImageUploader
        {...props}
        withPreview={true}
        withIcon={true}
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        buttonText='Choose cover photo'
      />
      {/* Group name, description, privacy (radio button) Invite people(search list) */}

      {/* https://material-ui.com/components/autocomplete/#Tags.tsx */}
      <AddMultiple label="Add People" options={followingFollowers} />

    </form>
  )
}