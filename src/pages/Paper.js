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

const backendPaperUrl = 'http://localhost:8000/api/paper/get_paper';
const backendPaperList = 'http://localhost:8000/api/paper/paper_list';
const backendPaperD3 = 'http://localhost:8000/api/graph_d3';

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
    const [keywords, setKeywords] = useState(''); 

    const nodesHoverTooltip = useCallback((node) => {
        return `<div>${node.name}</div>`;
    },[]);
    let query = useQuery();

    useEffect(() => {

        setRefPage(1);
        setCitedPage(1);
        const paper_id = props.match.params.id;
        const q = getUrlParameter('q');
        setKeywords(q);

        let c = null;
        axios.get(backendPaperUrl, {
            params: {
                paper_id: paper_id,
            },
        }).then(res => {
            setPaper(res.data);
            document.title = res.data.paper_title + " | ESRA";
            c = res.data.cited_by;
            let refIds = res.data.cite_to.slice(0,10).join(',');
            return axios.get(backendPaperList, {
                params: {
                    paper_ids: refIds,
                    no_ex: true
                }
            })
        }).then(res => {
            setRefs(res.data);
            let cited_ids = c.slice(0,10).join(',');
            return axios.get(backendPaperList, {
                params: {
                    paper_ids: cited_ids,
                    no_ex: true
                }
            })
        }).then(res => {
            setCited(res.data);
        });
    }, [props.match.params]);

    useEffect(() => {
        if (paper.cite_to!=undefined){
            let refIds = paper.cite_to.slice((refPage-1)*10, refPage*10).join(',');
            axios.get(backendPaperList, {
                params: {
                    paper_ids: refIds,
                    no_ex: true
                }
            }).then(res => {
                setRefs(res.data);
            })
        }

    }, [refPage]);

    useEffect(() => {
        if (paper.cited_by!=undefined){
            let cited_ids = paper.cited_by.slice((citedPage-1)*10,citedPage*10).join(',');
            axios.get(backendPaperList, {
                params: {
                    paper_ids: cited_ids,
                    no_ex: true
                }
            }).then(res => {
                setCited(res.data);
            });
        }
    }, [citedPage]);

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
            </div>
            <br></br>
            <div className='paper-info-container'>
                <Tabs defaultActiveKey='paper'>
                    <Tab eventKey='paper' title='Paper knowledge'>
                    { (d3Data!=null && d3Data.nodes.length!=0) ? (
                        <ForceGraph 
                        key={props.match.params.id} 
                        linksData={d3Data.links} 
                        nodesData={d3Data.nodes} 
                        height='80vh'
                        nodesHoverTooltip={nodesHoverTooltip}/> ) :null }
                    </Tab>
                    <Tab 
                    eventKey='key-paper' 
                    title='Keyword to Paper' 
                    disabled={keywords=='' || keywords==undefined || keywords==null}>

                    </Tab>
                </Tabs>
                
            </div>
            <br></br>
            <div className='paper-info-container'>
                <div className='cite-tab'>
                    <Tabs defaultActiveKey='reference'>
                        <Tab eventKey='reference' title='Reference'>
                            <PaperList>
                                {refs.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
                            </PaperList>
                            { paper.cite_to!=undefined ? (<PaperPagination 
                            page={refPage}
                            refs={paper.cite_to}
                            prevHandler={(e) => setRefPage(refPage-1)}
                            nextHandler={(e) => setRefPage(refPage+1)} />):null }
                        </Tab>
                        <Tab eventKey='cited_by' title='Cited by'>
                            <PaperList>
                                {cited.map(paper => (<PaperItem key={paper.paper_id} paper={paper} keyword={''}></PaperItem>))}
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
