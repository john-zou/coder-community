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
import { convertArrToMap, getFollowingFollowersOfUser } from '../../util/helperFunctions';
import { TextFields } from './TextFields';
import RadioButtons from './RadioButtons';
import styled from '@emotion/styled';
import { withStyles, Theme } from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import PurpleButton from '../common/PurpleButton';
import { createGroup } from '../../reducers/groupsSlice';
import { UploadApi } from '../../api';
import { JwtLocalStorageKey } from '../../constants';
import { uploadPublicAsset } from "../../api-upload";

const TextWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const CreateGroupForm = ({ handleClose }) => {
  const [people, setPeople] = useState<string[]>([]);
  const [profileBannerFile, setProfileBanner] = useState<File>(null);
  const [profilePicFile, setProfilePic] = useState<File>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [_private, setPrivate] = useState(false);

  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const user = useSelector<RootState, User>(state => state.user);
  let followingFollowers: User[] = getFollowingFollowersOfUser(usersMap, user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creatingGroupLoading, setCreatingGroupLoading] = useState(false);

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

  const handleBannerImageChange = picture => {
    // picture is an array containing 1 file
    setProfileBanner(picture[0]);
  }
    ;

  const handleProfilePicChange = picture => {
    // picture is an array containing 1 file
    console.log(picture)
    setProfilePic(picture[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images if they exist
    let profilePic: string;
    let profileBanner: string;
    // upload profile pic
    if (profilePicFile) {
      console.log(profilePicFile)
      profilePic = await uploadPublicAsset(profilePicFile);
    }

    if (profileBannerFile) {
      profileBanner = await uploadPublicAsset(profileBannerFile);
    }

    const group = {
      name,
      description,
      private: _private,
      users: people,
      profilePic,
      profileBanner,
    };

    dispatch(createGroup(group)).then(unwrapResult).then(() => {
      setCreatingGroupLoading(true);
    }).catch(err => {
      setLoading(false);
      setError(err);
    })
    handleClose();
  }


  return (
    <>
      {creatingGroupLoading ? <Loading /> :
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ImageUploader
              buttonText='Upload cover photo'
              withPreview={true}
              withIcon={true}
              onChange={handleBannerImageChange}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              singleImage={true}
              buttonStyles={{ backgroundColor: "#6a6a6a" }}
            />
            <ImageUploader
              buttonText='Upload profile pic'
              withPreview={true}
              withIcon={false}
              onChange={handleProfilePicChange}
              imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              style={{ width: "50%" }}
              singleImage={true}
              buttonStyles={{ backgroundColor: "#6a6a6a" }}
            />
          </div>

          <TextFields name="Add Group Name" description="Add Group Description" setName={setName} setDescription={setDescription} />

          {/* https://material-ui.com/components/autocomplete/#Tags.tsx */}
          <TextWrapper>
            <AddMultiple label="Add People" options={followingFollowers} imgKey="profilePic" setItems={setPeople} panelWidth={500} />
          </TextWrapper>

          <div style={{ height: "25px" }}></div>

          <TextWrapper>
            <RadioButtons setItem={setPrivate} />
          </TextWrapper>

          <DialogActions>
            <div>
              <PurpleButton content="Create group" />
            </div>
          </DialogActions>
        </form>}
    </>
  )
}