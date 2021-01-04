import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import SearchbarSm from '../components/SearchbarSm';
import SearchHeader from '../components/SearchHeader';

import '../css/searchResult.css'

const testPaper =  {
    'title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': ['Red Sensei', 'H. Sasada'],
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo ipsam quia natus est sint, voluptatibus, quo placeat, quis repellendus inventore voluptate ad aliquam ullam at recusandae dolore maiores sunt!'
}


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaperList(props) {
    return (
        <Container className='paper-list'>
            { props.children }
        </Container>
    )
}


function PaperItem(props) {
    const paper = props.paper;
    const [more, setMore] = useState('none');
    const [isLess, setIsLess] = useState('view');

    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10} className='paper-item paper-container'>
                <h4 className='title'><strong>{paper.title}</strong></h4>
                <p className='conference'>{paper.conference}</p>
                <p className='authors'>{paper.authors.join(', ')}</p>
                <p className='affiliations'><i>{paper.affiliations}</i></p>
                <p className='explanation'>{paper.explanation}</p>
                <p className='abstract'>
                    <span style={{display:more}}>{paper.abstract}</span>
                    <span 
                    className='see-more' 
                    role='button'
                    onClick={(e) => {
                        isLess === 'view' ? setMore('inline'):setMore('none');
                        isLess === 'view' ? setIsLess('hide'):setIsLess('view');
                    }}
                    > {isLess} abstract</span>
                </p>
            </Col>
            <Col md={1}></Col>
        </Row>
    )
}

function SearchResult() {
    let q = useQuery();
    const query = q.get('q');
    return (
        <div className='h-100'>
            <SearchHeader></SearchHeader>
            {/* <header className='result-header'>
                <SearchbarSm q={query}/>
            </header> */}
            <br></br>
            <PaperList>
                <PaperItem paper={testPaper}></PaperItem>
                <PaperItem paper={testPaper}></PaperItem>
                <PaperItem paper={testPaper}></PaperItem>
            </PaperList>
            <br></br>
            <footer></footer>
        </div>
    )
}

export default SearchResult
