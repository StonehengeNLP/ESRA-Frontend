import React from 'react'
import { Container } from 'react-bootstrap'

function FactList(props) {
    return (
        <Container className='fact-container'>
            { props.children }
        </Container>
    )
}

export default FactList
