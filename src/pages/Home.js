import React from 'react'
import Searchbar from '../components/Searchbar'
import {Container, Row, Col, Button} from 'react-bootstrap'
import '../css/home.css'


function home() {
    return (
        <div className='h-100'>
            <div className="home-search align-items-center">
                <Container className="h-100 align-items-center">
                    <Row className="h-75 align-items-center">
                        <Col xs md>
                            <h1>ESRA</h1>
                            <h4>Explanable Scientific Research Assistant</h4>
                            <Searchbar />
                            <p>
                                Trendy Search: <a href="#">Red Sensei</a>, <a href="#">DoubleBERT</a>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="home-footer">
            </footer>
        </div>
        
        
    )
}

export default home


// style={{height: '100vh !important'}}