import React from 'react'
import Searchbar from '../components/Searchbar'
import {Container, Row, Col} from 'react-bootstrap'
import '../css/home.css'


function home() {
    return (
        // <div className="h-100 align-items-center">
        //     <Container className="h-100 align-items-center justify-content-center" >
        //         <Row className='align-items-center h-100'>
        //             <Col md={4}>md=4</Col>
        //             <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
        //         </Row>
        //     </Container>
        // </div>
        <div className="h-100 align-items-center">
                <Container className="h-100 align-items-center">
                    <Row className="h-75 align-items-center">
                        <Col xs md>
                            <h1>ESRA</h1>
                            <h4>Explanable Scientific Research Assistant</h4>
                            <Searchbar />
                        </Col>
                    </Row>
            </Container>
        </div>
    )
}

export default home


// style={{height: '100vh !important'}}