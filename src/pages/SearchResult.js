import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import SearchbarSm from '../components/SearchbarSm';
import SearchHeader from '../components/SearchHeader';

import '../css/searchResult.css'

const testPaper =  {
    'paper_title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': ['Red Sensei', 'H. Sasada'],
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure explicabo ipsam quia natus est sint, voluptatibus, quo placeat, quis repellendus inventore voluptate ad aliquam ullam at recusandae dolore maiores sunt!'
}

// const vars
const backendPaperIds = 'http://localhost:8000/api/search';
const backendPaperList = 'http://localhost:8000/api/paper/paper_list';
const responseArraySize = 10;

// async function getPaperIds(keywords, skip) {
//     const paperIds = await axios.get(backendPaperIds, {
//         params: {
//             q: keywords,
//             lim: responseArraySize,
//             skip: skip
//         }
//     }).then(res => res.data);
//     return paperIds;
// }

// async function getPapers(paperIds) {
//     let serializedPaperIds = paperIds.join(',');
//     const papers = await axios.get(backendPaperList, {
//         params: {
//             paper_ids: serializedPaperIds
//         }
//     }).then(
//         res => res.data
//     )
//     return papers;
// }

function PaperList(props) {
    return (
        <Container className='paper-list'>
            { props.children }
        </Container>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaperItem(props) {
    const paper = props.paper;
    const paper_id = paper.paper_id;
    const [more, setMore] = useState('none');
    const [isLess, setIsLess] = useState('view');

    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10} className='paper-item paper-container'>
                <h4 className='title'><strong>{paper.paper_title}</strong></h4>
                <p className='conference'>{paper.conference=='nan' ? '':paper.conference}</p>
                <p className='authors'>{[... new Set(paper.authors)].join(', ')}</p>
                <p className='affiliations'><i>{[... new Set(paper.affiliations)].join(', ')}</i></p>
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
    
    let params = useQuery();
    const page = params.get('page');
    let skip = (page-1)*10;
    const keywords = params.get('q');

    const [paperIds, setPaperIds] = useState([]);
    const [papers, setPapers] = useState([]);

    // fetch paper ids
    useEffect( () => {
        console.log('useEffect');
        const fetchPaperIds = async () => {
            const req = await axios.get(backendPaperIds, {
                params: {
                    q: keywords,
                    lim: responseArraySize,
                    skip: skip
                },
            }).then(res => {
                setPaperIds(res.data);
                
                let serializedPaperIds = res.data.join(',');
                console.log(serializedPaperIds);
                axios.get(backendPaperList, {
                    params: {
                        paper_ids: serializedPaperIds,
                        keywords: keywords
                    }
                }).then(res => {
                    setPapers(res.data);
                });
            });
        };
        fetchPaperIds();
    }, []);
    
    return (
        <div className='h-100'>
            <SearchHeader></SearchHeader>
            <br></br>
            <PaperList>
                {papers.map(paper => (<PaperItem key={paper.paper_id} paper={paper}></PaperItem>))}
            </PaperList>
            <br></br>
            <footer></footer>
        </div>
    )
}

export default SearchResult
