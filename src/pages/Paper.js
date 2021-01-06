import React, { Fragment, useState, useEffect } from 'react';
import SearchHeader from '../components/SearchHeader';
import GraphVis from '../components/GraphVis';

import '../css/paper.css';
import axios from 'axios';
import useQuery from '../functions.js';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';
import { Tabs, Tab } from 'react-bootstrap';

const testPaper =  {
    'paper_title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': ['Red Sensei', 'H. Sasada'],
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo ipsam quia natus est sint, voluptatibus, quo placeat, quis repellendus inventore voluptate ad aliquam ullam at recusandae dolore maiores sunt!',
    'cc': 2019,
}

const backendPaperUrl = 'http://localhost:8000/api/paper/get_paper'
const backendPaperList = 'http://localhost:8000/api/paper/paper_list'


function Paper(props) {
    let params = useQuery();
    const [paper, setPaper] = useState([]);
    const [refs, setRefs] = useState([]);
    const [cited, setCited] = useState([]);
    const paper_id = props.match.params.id; 

    useEffect(() => {
        let c = null;
        axios.get(backendPaperUrl, {
            params: {
                paper_id: paper_id,
            },
        }).then(res => {
            setPaper(res.data);
            document.title = res.data.paper_title;
            c = res.data.cited_by;
            let refIds = res.data.cite_to.join(',');
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
    }, []);

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
            <GraphVis />
            <br></br>
            <div className='paper-info-container'>
                <div className='cite-tab'>
                    <Tabs defaultActiveKey='reference'>
                        <Tab eventKey='reference' title='Reference'>
                            <PaperList>
                                {refs.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
                            </PaperList>
                        </Tab>
                        <Tab eventKey='cited_by' title='Cited by'>
                            <PaperList>
                                {cited.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
                            </PaperList>
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
