import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import SearchbarSm from '../components/SearchbarSm';

import '../css/searchResult.css'

const testPaper =  {
    'title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': 'Red Sensei',
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'I, Red Sensei, hereby presents deep pretreined bidirectional transformer for Dharma understaning called DoubleBERT'
}


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaperList(props) {
    return (
        <ul className='paper-list'> { props.children } </ul>
    )
}

function PaperItem(props) {
    const paper = props.paper
    return (
        <Container>
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <li className='paper-item paper-container'>
                        <h4><strong>{paper.title}</strong></h4>
                        <p className='authors'>{paper.authors}</p>
                        <p className='affiliations'>{paper.affiliations}</p>
                        <p className='conference'>{paper.conference}</p>
                        <p className='explanation'>{paper.explanation}</p>
                    </li>
                </Col>
                <Col md={1}></Col>
            </Row>
        </Container>
    )
}

function SearchResult() {
    let q = useQuery();
    const query = q.get('q');
    return (
        <div className='h-100'>
            <header className='result-header'>
                <SearchbarSm q={query}/>
            </header>
            <h2>Search results: {query}</h2>
            <PaperList>
                <PaperItem paper={testPaper}></PaperItem>
                <PaperItem paper={testPaper}></PaperItem>
                <PaperItem paper={testPaper}></PaperItem>
            </PaperList>
        </div>
    )
}

export default SearchResult
