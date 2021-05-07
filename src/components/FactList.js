import React from 'react'
import { Container } from 'react-bootstrap'

function FactList(props) {
    return (
        <Container className='fact-container' 
        style={{"height": props.height==null?'auto':props.height}}>
            { props.children }
        </Container>
    )
}

export default FactList
