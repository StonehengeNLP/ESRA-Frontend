import React from 'react'
import { getUrlParameter } from "../functions";
import { Col, Container, Row } from 'react-bootstrap'

function DropdownContainer(props) {
    return (
        <Container>
            <Row>
                <Col md={1}></Col>
                <Col md={10} className='dropdown-container'>
                    {props.children}
                </Col>
                <Col md={1}></Col>
            </Row>
        </Container>
    )
}

export default DropdownContainer