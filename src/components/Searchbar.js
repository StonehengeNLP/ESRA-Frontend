import React, {useState, useEffect} from 'react'

import '../css/searchbar.css'

function Searchbar() {
    
    const [keyword, setKeyword] = useState("")

    const onClickSearch = () => {
        console.log(keyword);
    }

    return (
        <div className="search-bar">
                <input
                className='input-lg'
                id="search"
                type="text"
                placeholder="Search any topics"
                onChange={(e)=>setKeyword(e.target.value)}
                ></input>
                <div className="search-button" role="button" onClick={onClickSearch}>
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="7vh" height="7vh" viewBox='0 0 32 32'>
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                        </path>
                    </svg>
                </div>
        </div>
    )
}

export default Searchbar
