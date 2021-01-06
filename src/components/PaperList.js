import React from 'react'
import { Container } from 'react-bootstrap';

function PaperList(props) {
    return (
        <Container className='paper-list'>
            { props.children }
        </Container>
    )
}

export default PaperList
