import axios from 'axios';
import React, {useState, useEffect} from 'react'
import SearchHeader from '../components/SearchHeader';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import { getUrlParameter } from "../functions";
import '../css/searchResult.css'
import { Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// const vars
const backendPaperIds = 'http://localhost:8000/api/search';
const backendPaperList = 'http://localhost:8000/api/paper/paper_list';
const responseArraySize = 10;

function ResultPagination(props) {

    return (
        <Pagination>
            <Pagination.Prev disabled={props.page==1 ? true:false} onClick={props.prevHandler}/>
            <Pagination.Next disabled={props.length<10 ? true:false} onClick={props.nextHandler}/>
        </Pagination>
    )
}

function SearchResult(props) {

    let history = useHistory();
    const [page, setPage] = useState(1)
    const [keywords, setKeywords] = useState('');
    const [paperIds, setPaperIds] = useState([]);
    const [papers, setPapers] = useState([]);

    // fetch paper ids
    useEffect( () => {
        setPapers([]);
        let q = getUrlParameter('q')
        setKeywords(q);
        let page = parseInt(getUrlParameter('page'));
        setPage(page);
        let skip = (page-1)*10;
        
        document.title = q + ' - ESRA';

        const fetchPaperIds = async () => {
            const req = await axios.get(backendPaperIds, {
                params: {
                    q: q,
                    lim: responseArraySize,
                    skip: skip
                },
            }).then(res => {
                setPaperIds(res.data);
                
                let serializedPaperIds = res.data.join(',');
                axios.get(backendPaperList, {
                    params: {
                        paper_ids: serializedPaperIds,
                        keywords: q
                    }
                }).then(res => {
                    setPapers(res.data);
                });
            });
        };
        fetchPaperIds();
    }, [props.location.search]);
    
    return (
        <div className='h-100'>
            <SearchHeader></SearchHeader>
            <br></br>
            <PaperList>
                {papers.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
            </PaperList>
            <br></br>
            { paperIds!=[] ? (<ResultPagination
            page={page}
            length={paperIds.length}
            prevHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page-1))}
            nextHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page+1))}
            />):null }
            <footer></footer>
        </div>
    )
}

export default SearchResult
