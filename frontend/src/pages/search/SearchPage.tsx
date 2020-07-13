import React from "react";
import qs from "qs";
import {useLocation} from "react-router-dom";
import { SearchHomePage } from "./SearchHomePage";
import {Search} from "./Search";

export function SearchPage() {
    const location = useLocation();

    const parsed = qs.parse(location.search);
    const query = parsed["?q"];

    if (!query) {
        return <SearchHomePage />
    }

    return <Search query={query.toString()}/>
}