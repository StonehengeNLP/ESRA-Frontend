import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react'
import SearchHeader from '../components/SearchHeader';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import FactList from '../components/FactList';
import FactItem from '../components/FactItem';
import { getUrlParameter } from "../functions";
import '../css/searchResult.css'
import { Pagination, Dropdown, Container, Col, Row, Spinner, Tabs, Tab } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css'
import ForceGraph from '../components/ForceGraph';
import DropdownContainer from '../components/DropdownContainer';
import SortByDropdown from '../components/SortByDropdown';
import DateRangeDropdown from '../components/DateRangeDropdown';

// const vars
const backendPaperIds = 'http://localhost:8000/api/search';
const backendPaperList = 'http://localhost:8000/api/paper/paper_list';
const backendFacts = 'http://localhost:8000/api/facts';
const responseArraySize = 10;

// const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
//     <a
//     className='sortby-toggle'
//     href=""
//     ref={ref}
//     onClick={(e) => {
//         e.preventDefault();
//         onClick(e);
//     }}
//     >
//         {children} &#x25bc;
//     </a>
// ));

// function SortByDropdown(props) {

//     const getHref = (location, sortBy, sortOrder) => {
//         const reg_sortby = /sortBy=[0-9]/i;
//         const reg_sortorder = /sortOrder=[0-9]/i;
//         let path = location.pathname;
//         let params = location.search;
//         params = params.replace(reg_sortby, `sortBy=${sortBy}`);
//         params = params.replace(reg_sortorder, `sortOrder=${sortOrder}`);
//         return path + params;
//     }

//     const getActive = (location, sortBy, sortOrder) => {
//         let params = location.search;
//         const reg_sortby = /sortBy=([0-9])/i;
//         const reg_sortorder = /sortOrder=([0-9])/i;
//         let query_sortby = parseInt(reg_sortby.exec(params)[1]);
//         let query_sortorder = parseInt(reg_sortorder.exec(params)[1]);
//         return (sortBy == query_sortby) && (sortOrder == query_sortorder);
//     } 

//     return (
//         <Dropdown className='sortby-dropdown'>
//             <Dropdown.Toggle as={CustomToggle}>
//                 Sort By
//             </Dropdown.Toggle>
//             <Dropdown.Menu align="right">
//                 <Dropdown.Header>Relevance</Dropdown.Header>
//                 <Dropdown.Item eventKey='1' 
//                 href={ getHref(props.location, 0, 0) }
//                 active={ getActive(props.location, 0, 0) }>
//                     Most Relevant
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey='2' 
//                 href={ getHref(props.location, 0, 1) }
//                 active={ getActive(props.location, 0, 1) }>
//                     Least Relevant
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Header>Date</Dropdown.Header>
//                 <Dropdown.Item eventKey='3' 
//                 href={ getHref(props.location, 1, 0) }
//                 active={ getActive(props.location, 1, 0) }>
//                     Newest First
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey='4' 
//                 href={ getHref(props.location, 1, 1) }
//                 active={ getActive(props.location, 1, 1) }>
//                     Oldest First
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Header>Citations</Dropdown.Header>
//                 <Dropdown.Item eventKey='5' 
//                 href={ getHref(props.location, 2, 0) }
//                 active={ getActive(props.location, 2, 0) }>
//                     Most Citations
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey='6' 
//                 href={ getHref(props.location, 2, 1) }
//                 active={ getActive(props.location, 2, 1) }>
//                     Least Citations
//                 </Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     )
// }

// const CustomDateRange = React.forwardRef(({children, style, className, 'aria-labelledby': labeledBy, ...props}, ref) => {
//     const { createSliderWithTooltip } = Slider;
//     const Range = createSliderWithTooltip(Slider.Range);
//     const wrapperStyle = { width: "90%", margin: 20};
//     const maxYear = new Date().getFullYear();
//     const minYear = 1900;
//     const history = useHistory();

//     const handleOnAfterChange = (e) => {
//         let params = props.params;
//         const reg = /filterBy=([0-9]+)\-([0-9]+)/i;

//         if (params.search(reg) > -1) {
//             params = params.replace(reg, `filterBy=${e[0]}-${e[1]}`);
//         } 
//         else {
//             params = params + `&filterBy=${e[0]}-${e[1]}`;
//         }
//         history.push(`/search${params}`);
//     }

//     return (
//         <div 
//         ref={ref}
//         className={className}
//         style={style}
//         aria-labelledby={labeledBy}>
//             <p style={{margin: "5px 0 0px 15px"}}>Year:</p>
//             <div style={wrapperStyle}>
//                 <Range 
//                 min={minYear}
//                 max={maxYear} 
//                 defaultValue={props.defaultValue} 
//                 tipFormatter={value => `${value}`} 
//                 marks={{ 1900:minYear, 2021:maxYear }}
//                 onAfterChange={(e) => {handleOnAfterChange(e)}}
//                 />
//             </div>
//         </div>
//     )
// })

// function DateRangeDropdown(props) {

//     const getDefaultValue = () => {
//         const reg = /([0-9]+)-([0-9]+)/i;
//         const filterBy = getUrlParameter('filterBy');
        
//         // check null query param
//         if (filterBy==null) {
//             return [1950, new Date().getFullYear()];
//         }
//         let res = reg.exec(filterBy);
//         let y1 = parseInt(res[1]);
//         let y2 = parseInt(res[2]); 
//         return y1<y2 ? [y1,y2]:[y2,y1];
//     }

//     return (
//         <Dropdown className='date-dropdown'>
//             <Dropdown.Toggle as={CustomToggle}>
//                 Date Range
//             </Dropdown.Toggle>
//             <Dropdown.Menu 
//             as={CustomDateRange} 
//             defaultValue={getDefaultValue()} 
//             className='date-menu' 
//             params={props.params}
//             />
//         </Dropdown>
//     )
// }

// function DropdownContainer(props) {

//     return (
//         <Container>
//             <Row>
//                 <Col md={1}></Col>
//                 <Col md={10} className='dropdown-container'>
//                     {props.children}
//                 </Col>
//                 <Col md={1}></Col>
//             </Row>
//         </Container>
//     )
// }

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
                if (res.data.length > 0){
                    let serializedPaperIds = res.data.join(',');
                    axios.get(backendPaperList, {
                        params: {
                            paper_ids: serializedPaperIds,
                            keywords: q
                        }
                    }).then(res => {
                        setPapers(res.data);
                    });
                }
            });
            setLoading(false);
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
                <div className='facts-graph-container'>
                    { (facts!=null && facts!=[] && facts.nodes!=undefined && facts.links!=undefined) ? (
                        <ForceGraph 
                        key={props.match.params.id} 
                        linksData={facts.links} 
                        nodesData={facts.nodes} 
                        height="100%"
                        onPaperPage={false}
                        nodesHoverTooltip={nodesHoverTooltip}/> ) :null }
                </div>
            </div>
            <br />


            <h3 className='indent-text'>Search Result of "{keywords}"</h3>
            <br />
            <div className='search-tab'>
                <Tabs defaultActiveKey='search-result'>
                    <Tab eventKey='search-result' title='Search result'>
                        <br />
                        <DropdownContainer>
                            <DateRangeDropdown params={props.location.search} />
                            <SortByDropdown location={props.location}/>
                        </DropdownContainer>
                        <br />
                        { loading ? <LoadingSpinner />:null }
                        <PaperList>
                            {papers.map(paper => (<PaperItem key={paper.paper_id} paper={paper} keyword={keywords}></PaperItem>))}
                        </PaperList>
                        { paperIds!=[] ? (<ResultPagination
                        page={page}
                        length={paperIds.length}
                        prevHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page-1))}
                        nextHandler={(e) => history.push("/search?q=" + keywords + "&page=" + (page+1))}
                        />):null }
                    </Tab>
                    <Tab eventKey='facts' title='Facts'>
                        { facts.facts!=undefined ? (
                            <FactList>
                                {facts.facts.map(fact => 
                                            (<FactItem 
                                                n={fact.key}
                                                n_label={fact.n_labels}
                                                m={fact.name}
                                                m_label={fact.m_labels}
                                                type={fact.type}
                                                isSubject={fact.isSubject}
                                                papers={fact.papers}
                                                keywords={keywords}/>)
                                            )}
                            </FactList>):null }
                    </Tab>
                </Tabs>
            </div>
            <br></br>
            <footer></footer>
        </div>
    )
}

export default SearchResult