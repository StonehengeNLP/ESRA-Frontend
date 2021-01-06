import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import SearchHeader from '../components/SearchHeader';
import PaperList from '../components/PaperList';
import PaperItem from '../components/PaperItem';

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
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
