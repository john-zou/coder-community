import React, {useEffect, useState} from "react";
import {User} from "../../store/types";
import {RootState} from "../../reducers/rootReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {fetchUserByUsername} from "../../reducers/usersSlice";
import {NotFoundError} from "../common/NotFoundError";
import {unwrapResult} from "@reduxjs/toolkit";


export function OtherProfile({username}: {username: string}) {
    const user = useSelector<RootState, User>(state => state.users[username]);
    const [notFound, setNotFound] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserByUsername(username))
                .then(unwrapResult)
                .catch(err => setNotFound(true));
        }
    }, []);

    if (notFound) {
        return <NotFoundError />
    }

    return <h1>Hello, you are viewing {username}'s profile!</h1>
}