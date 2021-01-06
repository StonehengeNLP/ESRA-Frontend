import React, { Fragment, useState, useEffect } from 'react';
import SearchHeader from '../components/SearchHeader';
import GraphVis from '../components/GraphVis';

import '../css/paper.css';
import axios from 'axios';
import useQuery from '../functions.js';

const testPaper =  {
    'title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': ['Red Sensei', 'H. Sasada'],
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo ipsam quia natus est sint, voluptatibus, quo placeat, quis repellendus inventore voluptate ad aliquam ullam at recusandae dolore maiores sunt!',
    'cc': 2019,
}

const backendPaperUrl = 'http://localhost:8000/api/paper/get_paper'

function Paper(props) {
    let params = useQuery();
    const [paper, setPaper] = useState([]);
    const paper_id = props.match.params.id; 

    useEffect(() => {
        axios.get(backendPaperUrl, {
            params: {
                paper_id: paper_id,
            },
        }).then(res => {
            setPaper(res.data);
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
            <footer></footer>
        </Fragment>
    )
}

export default Paper
