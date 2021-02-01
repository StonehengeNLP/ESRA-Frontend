import React, { Fragment, useState, useEffect, useCallback } from 'react';
import SearchHeader from '../components/SearchHeader';
import GraphVis from '../components/GraphVis';

import '../css/paper.css';
import axios from 'axios';
import {getUrlParameter, useQuery} from '../functions';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import { Tabs, Tab, Pagination } from 'react-bootstrap';
import ForceGraph from '../components/ForceGraph';
import DropdownContainer from '../components/DropdownContainer';
import SortByDropdown from '../components/SortByDropdown';
import PaperSortByDropdown from '../components/PaperSortByDropdown';

const basedURL = process.env.REACT_APP_BACKEND_API
const backendPaperUrl = basedURL + 'api/paper/get_paper';
const backendPaperList = basedURL + 'api/paper/paper_list';
const backendRef = basedURL + 'api/citePaper';
const backendPaperD3 = basedURL + 'api/graph_d3';
const backendKwGraph = basedURL + 'api/kwGraph';

function PaperPagination(props) {
    return (
        <Pagination className='page-pagination'>
            <Pagination.Prev disabled={props.page==1 ? true:false} onClick={props.prevHandler} />
            <Pagination.Next disabled={props.page*10>props.refs.length ? true:false} onClick={props.nextHandler}/>
        </Pagination>
    )
}

function Paper(props) {
    const [paper, setPaper] = useState({});
    const [refs, setRefs] = useState([]);
    const [cited, setCited] = useState([]);
    const [refPage, setRefPage] = useState(1);
    const [citedPage, setCitedPage] = useState(1);
    const [d3Data, setD3Data] = useState(null);
    const [kwGraph, setKwGraph] = useState(null);
    const [keywords, setKeywords] = useState(''); 
    const [refOrdering, setRefOrdering] = useState(1);
    const [citeOrdering, setCiteOrdering] = useState(1);

    const nodesHoverTooltip = useCallback((node) => {
        return `<div>${node.name}</div>`;
    },[]);
    let query = useQuery();

    const dropdownOnSelectHandler = useCallback((e, setFunc) => {
        setFunc(parseInt(e));
    })

    const getFieldAndOrder = (n) => {
        switch(n) {
            case 1:
                return [0, 0];
                break;
            case 2:
                return [0, 1];
                break;
            case 3: 
                return [1, 0];
                break;
            case 4:
                return [1, 1];
                break;
            default:
                return [0, 0];
        }
    }

    useEffect(() => {

        setRefPage(1);
        setCitedPage(1);
        const paper_id = props.match.params.id;
        const q = getUrlParameter('q');
        setKeywords(q);

        axios.get(backendPaperUrl, {
            params: {
                paper_id: paper_id,
            },
        }).then(res => {
            setPaper(res.data);
            document.title = res.data.paper_title + " | ESRA";
            let fieldAndOrder = getFieldAndOrder(refOrdering);
            let field = fieldAndOrder[0];
            let order = fieldAndOrder[1];
            let type = 0;
            return axios.post(backendRef, {
                paper_id: paper_id,
                skip: (refPage-1)*10,
                field: field,
                ordering: order,
                type: type
            })
        }).then(res => {
            setRefs(res.data);
            let fieldAndOrder = getFieldAndOrder(citeOrdering);
            let field = fieldAndOrder[0];
            let order = fieldAndOrder[1];
            let type = 1;
            return axios.post(backendRef, {
                paper_id: paper_id,
                skip: (citedPage-1)*10,
                field: field,
                ordering: order,
                type: type
            })
        }).then(res => {
            setCited(res.data);
        });
    }, [props.match.params]);

    useEffect(() => {
        let fieldAndOrder = getFieldAndOrder(refOrdering);
        let field = fieldAndOrder[0];
        let order = fieldAndOrder[1];
        if (paper.cite_to!=undefined){
            axios.post(backendRef, {
                paper_id: paper.paper_id,
                skip: (refPage-1)*10,
                field: field,
                ordering: order,
                type: 0
            }).then(res => {
                setRefs(res.data);
            })
        }

    }, [refPage, refOrdering]);

    useEffect(() => {
        if (paper.cited_by!=undefined){
            let fieldAndOrder = getFieldAndOrder(citeOrdering);
            let field = fieldAndOrder[0];
            let order = fieldAndOrder[1];
            axios.post(backendRef, {
                paper_id: paper.paper_id,
                skip: (citedPage-1)*10,
                field: field,
                ordering: order,
                type: 1
            }).then(res => {
                setCited(res.data);
            })
        }
    }, [citedPage, citeOrdering]);

    useEffect(() => {
        const paper_id = props.match.params.id;
        axios.get(backendPaperD3, {
            params: {
                'paper_id': paper_id,
                'limit': 30,
            },
        }).then(res => {
            setD3Data(res.data);
        })
    }, [props.match.params])

    useEffect(() => {
        if (keywords==null || keywords=='' || keywords==undefined)
            return ;
        axios.get(backendKwGraph, {
            params:{
                keywords: keywords,
                paper_id: props.match.params.id,
                limit: 30
            }
        }).then(res => {
            setKwGraph(res.data);
        })
        
    }, [keywords])

    return (
        <Fragment>
            <SearchHeader></SearchHeader>
            <br></br>
            <br></br>
            <div className='paper-info-container'>
                <h3 className='paper-title'>{paper.paper_title}</h3>
                <p className='conference'>{paper.conference=='nan' ? '':paper.conference}</p>
                <p className='authors'>{[... new Set(paper.authors)].join(', ')}</p>
                <p className='affiliations'><i>{[... new Set(paper.affiliations)].join(', ')}</i></p>
                <p className='citation'><span className='cc'>{paper.citation_count}</span> citations</p>
                <p className='abstract'>{paper.abstract}</p>
                <br /> 
                <h4>Knowledge graph</h4>
            </div>
            <br></br>
            <div className='paper-info-container'>
                <Tabs defaultActiveKey='paper'>
                    <Tab eventKey='paper' title='Paper knowledge'>
                    { (d3Data!=null && d3Data!=[] && d3Data.nodes.length!=0) ? (
                        <ForceGraph 
                        key={props.match.params.id} 
                        linksData={d3Data.links} 
                        nodesData={d3Data.nodes} 
                        height='80vh'
                        id='1'
                        onPaperPage={true}
                        nodesHoverTooltip={nodesHoverTooltip}/> ) :null }
                    </Tab>
                    <Tab 
                    eventKey='key-paper' 
                    title='Keyword to Paper' 
                    disabled={keywords=='' || keywords==undefined || keywords==null}>
                        { (kwGraph!=null && kwGraph!=[] && kwGraph.nodes.length!=0) ? (
                        <ForceGraph 
                        linksData={kwGraph.links} 
                        nodesData={kwGraph.nodes} 
                        height='80vh'
                        id='2'
                        onPaperPage={true}
                        nodesHoverTooltip={nodesHoverTooltip}/> ) :null }
                    </Tab>
                </Tabs>
                
            </div>
            <br></br>
            <div className='paper-info-container'>
                <div className='cite-tab'>
                    <Tabs defaultActiveKey='reference'>
                        <Tab eventKey='reference' title='Reference'>
                            <DropdownContainer>
                                <PaperSortByDropdown 
                                onSelect={dropdownOnSelectHandler} 
                                setFunc={setRefOrdering}
                                ordering={refOrdering}/>
                            </DropdownContainer>
                            <PaperList>
                                {refs.map(paper => (<PaperItem key={paper.paper_id} paper={paper} keywords={undefined}></PaperItem>))}
                            </PaperList>
                            { paper.cite_to!=undefined ? (<PaperPagination 
                            page={refPage}
                            refs={paper.cite_to}
                            prevHandler={(e) => setRefPage(refPage-1)}
                            nextHandler={(e) => setRefPage(refPage+1)} />):null }
                        </Tab>
                        <Tab eventKey='cited_by' title='Cited by'>
                        <DropdownContainer>
                                <PaperSortByDropdown 
                                onSelect={dropdownOnSelectHandler} 
                                setFunc={setCiteOrdering}
                                ordering={citeOrdering}/>
                            </DropdownContainer>
                            <PaperList>
                                {cited.map(paper => (<PaperItem key={paper.paper_id} paper={paper} keywords={undefined}></PaperItem>))}
                            </PaperList>
                            { paper.cited_by!=undefined ? (<PaperPagination 
                            page={citedPage}
                            refs={paper.cited_by}
                            prevHandler={(e) => setCitedPage(citedPage-1)}
                            nextHandler={(e) => setCitedPage(citedPage+1)} />):null }
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <br></br>
            <footer></footer>
        </Fragment>
    )
}

export default Paper
