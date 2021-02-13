import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react'
import SearchHeader from '../components/SearchHeader';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import FactList from '../components/FactList';
import FactItem from '../components/FactItem';
import { getUrlParameter } from "../functions";
import '../css/searchResult.css';
import { Pagination, Dropdown, Container, Col, Row, Spinner, Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css'
import ForceGraph from '../components/ForceGraph';
import DropdownContainer from '../components/DropdownContainer';
import SortByDropdown from '../components/SortByDropdown';
import DateRangeDropdown from '../components/DateRangeDropdown';

// const vars
const basedURL = process.env.REACT_APP_BACKEND_API
const backendPaperIds = basedURL + 'api/search';
const backendPaperList = basedURL + 'api/paper/paper_list';
const backendFacts = basedURL + 'api/facts';
const responseArraySize = 10;

function ResultPagination(props) {

    return (
        <Pagination className='page-pagination'>
            <Pagination.Prev disabled={props.page==1 ? true:false} onClick={props.prevHandler}/>
            <Pagination.Next disabled={props.length<10 ? true:false} onClick={props.nextHandler}/>
        </Pagination>
    )
}

const LoadingSpinner = () => {
    return (
        <div style={{display:'flex', justifyContent: 'center'}}>
            <br />
            <Spinner animation="grow" variant="dark" />
            <Spinner animation="grow" variant="dark" />
            <Spinner animation="grow" variant="dark" />
            <br />
        </div>
    )
}

function SearchResult(props) {

    let history = useHistory();
    const [page, setPage] = useState(1)
    const [keywords, setKeywords] = useState('');
    const [paperIds, setPaperIds] = useState([]);
    const [papers, setPapers] = useState([]);
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const nodesHoverTooltip = useCallback((node) => {
        return `<div>${node.name}</div>`;
    },[]);

    // fetch paper ids
    useEffect( () => {
        console.log(process.env.REACT_APP_BACKEND_API);
        setPapers([]);
        setLoading(true);
        let q = getUrlParameter('q')
        setKeywords(q);
        let page = parseInt(getUrlParameter('page'));
        setPage(page);
        let skip = (page-1)*10;
        let sortBy = getUrlParameter('sortBy');
        let sortOrder = getUrlParameter('sortOrder');
        let filterBy = getUrlParameter('filterBy');
        console.log(filterBy)

        document.title = q + ' - ESRA';

        const fetchPaperIds = async () => {
            const req = await axios.get(backendPaperIds, {
                params: {
                    q: q,
                    lim: responseArraySize,
                    skip: skip,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    filterYear: filterBy
                },
            }).then(res => {
                setPaperIds(res.data);
                if (res.data.paper_id.length > 0){
                    let serializedPaperIds = res.data.paper_id.join(',');
                    axios.get(backendPaperList, {
                        params: {
                            paper_ids: serializedPaperIds,
                            keywords: q
                        }
                    }).then(res => {
                        setPapers(res.data);
                        setLoading(false);
                    });
                }
            });
        };
        fetchPaperIds();
    }, [props.location.search]);
    
    // fetch facts
    useEffect( () => {
        if (keywords=='' || keywords==null)
            return null;
        axios.get(backendFacts, {
            params: {
                q: keywords
            }
        }).then(res => {
            setFacts(res.data);
        })
    }, [keywords]);

    return (
        <div className='h-100'>
            <SearchHeader></SearchHeader>
            <br></br>
            <br></br>
            <h3 className='indent-text'>Knowledge about "{keywords}"</h3>
            <br></br>
            <div className='facts-graph'>
                {/* <div className='flex-break' /> */}
                <div className='facts-gl-container'>
                    <div className='facts-list-container'>
                        <FactList>
                            {facts.facts!=undefined ? (facts.facts.map(fact => 
                                <FactItem 
                                relation_name={fact.relation_name} 
                                n_label={fact.n_label}
                                relations={fact.relations}
                                keywords={keywords}
                                />    
                            )):(<p>null</p>)}
                        </FactList>
                    </div>
                    <div className='facts-graph-container'>
                        { (facts!=null && facts!=[] && facts.nodes!=undefined && facts.links!=undefined) ? (
                            <ForceGraph 
                            key={props.location.search} 
                            linksData={facts.links} 
                            nodesData={facts.nodes} 
                            height="100%"
                            onPaperPage={false}
                            nodesHoverTooltip={nodesHoverTooltip}/> ) :null }
                    </div>
                </div>
            </div>
            <br />


            <h3 className='indent-text'>Search Result of "{keywords}"</h3>
            <br />
            <div className='search-tab'>
                <br />
                <DropdownContainer>
                    <DateRangeDropdown params={props.location.search} />
                    <SortByDropdown location={props.location}/>
                </DropdownContainer>
                <br />
                { loading ? <LoadingSpinner />:null }
                <PaperList>
                    {papers.map(paper => (<PaperItem key={paper.paper_id} paper={paper} keywords={keywords}></PaperItem>))}
                </PaperList>
                { paperIds!=[] ? (<ResultPagination
                page={page}
                length={paperIds.length}
                prevHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page-1))}
                nextHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page+1))}
                />):null }
            </div>
            <br></br>
            <footer></footer>
        </div>
    )
}

export default SearchResult