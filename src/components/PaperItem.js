import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PaperItem(props) {
    const paper = props.paper;
    const paper_id = paper.paper_id;
    const keyword = props.keyword;
    const [more, setMore] = useState('none');
    const [isLess, setIsLess] = useState('view');

    const boldKeyword = (text, keyword) => {
        if (keyword == null || keyword == [] || keyword == undefined)
            return {__html: text};
        
        const boldFunc = (t) => {return t.bold()};
        let out = text;
        let k;
        for (k of keyword) {
            let reg = new RegExp(`${k}`, 'ig');
            out = out.replaceAll(reg, boldFunc);
        }
        return {__html: out};
    }

    return (
        <Row>
            <Col md={1}></Col>
            <Col md={10} className='paper-item paper-container'>
                <Link
                to={{
                    pathname: `/paper/${paper_id}/?q=${keyword}`,
                }}
                >
                    <h4 className='title'><strong>{paper.paper_title}</strong></h4>
                </Link>
                <p className='conference'>{paper.conference=='Nan' ? '':paper.conference}</p>
                <p className='authors'>{[... new Set(paper.authors)].join(', ')}</p>
                <p className='affiliations'><i>{[... new Set(paper.affiliations)].join(', ')}</i></p>
                { paper.explanation ? 
                    (<p 
                    className='explanation' 
                    dangerouslySetInnerHTML={boldKeyword(`<strong>Explanation: </strong>${paper.explanation}`,paper.explanation_keywords)}/>)
                    :null }
                <p className='abstract'>
                    <span 
                    style={{display:more}} 
                    dangerouslySetInnerHTML={boldKeyword(paper.abstract, paper.explanation_keywords)} />
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
