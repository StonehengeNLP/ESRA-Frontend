import React, {Fragment} from 'react'
import { useLocation } from 'react-router-dom'
import SingleSelect from './SingleSelect';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchHeader() {

    let q = useQuery();
    const query = q.get('q');

    return (
        <Fragment>
            <header className='result-header'>
                <SingleSelect q={query} width='50%' height='50%' isHome={false}></SingleSelect>
            </header>
        </Fragment>
    )
}

export default SearchHeader
