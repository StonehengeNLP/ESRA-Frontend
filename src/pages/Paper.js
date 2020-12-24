import React, { Fragment } from 'react'
import SearchHeader from '../components/SearchHeader'

import '../css/paper.css'

const testPaper =  {
    'title': 'DoubleBERT: pretrained BERT for Dharma understanding',
    'authors': ['Red Sensei', 'H. Sasada'],
    'affiliations': 'Gang of Four',
    'conference': 'GoF Con 2021',
    'explanation': 'DoubleBERT is a model presented by Red Sensei at GoF Con 2021',
    'abstract': 'I, Red Sensei, hereby presents deep pretreined bidirectional transformer for Dharma understaning called DoubleBERT',
    'cc': 2019,
}

function Paper() {


    return (
        <Fragment>
            <SearchHeader></SearchHeader>
            <br></br>
            <br></br>
            <div className='paper-info-container'>
                <h3 className='paper-title'>{testPaper.title}</h3>
                <h4 className='title'><strong>{testPaper.title}</strong></h4>
                <p className='conference'>{testPaper.conference}</p>
                <p className='authors'>{testPaper.authors.join(', ')}</p>
                <p className='affiliations'><i>{testPaper.affiliations}</i></p>
                <p className='explanation'>{testPaper.explanation}</p>
                <p className='citation'><span className='cc'>{testPaper.cc}</span> citations</p>
                <p className='abstract'>{testPaper.abstract}</p>
            </div>
        </Fragment>
    )
}

export default Paper
