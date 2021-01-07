import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PaperItem(props) {
    const paper = props.paper;
    const paper_id = paper.paper_id;
    const [more, setMore] = useState('none');
    const [isLess, setIsLess] = useState('view');

    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10} className='paper-item paper-container'>
                <Link
                to={{
                    pathname: '/paper/' + paper_id,
                }}
                >
                    <h4 className='title'><strong>{paper.paper_title}</strong></h4>
                </Link>
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

export default PaperItem
