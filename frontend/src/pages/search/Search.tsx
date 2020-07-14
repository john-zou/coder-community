import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Loading} from "../common/Loading";
import {NotFoundError} from "../common/NotFoundError";
import {AppDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {search} from "../../reducers/search";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorPage from "../common/ErrorPage";
import Card from "../home/Card";
import {FlexSpace} from "../view_profile/OwnProfile";

const Header = styled.h2`
  text-align: center;
`

const Container = styled.div`
  margin-top: 10vh;
  height: 90vh;
`

const Content = styled.div`
  display: flex;
`

export function Search({query}: {query:string}) {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setLoading(true);
        dispatch(search({query}))
            .then(unwrapResult)
            .then(
            dto =>
            {
                setLoading(false);
                setResults(dto.posts);
            }
        ).catch(err => {
            setLoading(false);
            setError(err);
        })
    }, [query]);

    if (!results || loading) {
        return <Loading />
    }

    if (results.length === 0) {
        return <NotFoundError />
    }

    if (error) {
        return <ErrorPage error={error} />
    }

    // Show search results
    return (
        <Container>
            <Header>{results.length} results for: {query}</Header>
            <Content>
            <FlexSpace />
            <div>
            {results.map((post, idx) => <Card postID={post._id} key={idx} />)}
            </div>
            <FlexSpace />
            </Content>
        </Container>
    )
}