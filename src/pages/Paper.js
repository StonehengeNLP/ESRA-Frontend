import React, { Fragment, useState, useEffect } from 'react';
import SearchHeader from '../components/SearchHeader';
import GraphVis from '../components/GraphVis';

import '../css/paper.css';
import axios from 'axios';
import {useQuery} from '../functions';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import { Tabs, Tab, Pagination } from 'react-bootstrap';

const backendPaperUrl = 'http://localhost:8000/api/paper/get_paper'
const backendPaperList = 'http://localhost:8000/api/paper/paper_list'

function PaperPagination(props) {
    return (
        <Pagination>
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
    
    useEffect(() => {

        setRefPage(1);
        setCitedPage(1);
        const paper_id = props.match.params.id; 

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
            <GraphVis paper_title={paper.paper_title} />
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
                                {cited.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
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
