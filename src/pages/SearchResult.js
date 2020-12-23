import React from 'react'
import { useLocation } from 'react-router-dom'
import SearchbarSm from '../components/SearchbarSm';

import '../css/searchResult.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResult() {
    let q = useQuery();
    return (
        <div>
            <header>
                <SearchbarSm q={q.get('q')}/>
            </header>
            Search result {q.get("q")}
        </div>
    )
}

export default SearchResult
