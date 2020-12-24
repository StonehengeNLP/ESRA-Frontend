import React from 'react'
import Searchbar from '../components/Searchbar'
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../css/home.css'
import SingleSelect from '../components/SingleSelect'

function home() {
    return (
        <div className='h-100 w-100 home'>
            <div className="home-search align-items-center">
                <Container className="h-100 align-items-center">
                    <Row className="h-75 align-items-center">
                        <Col xs md>
                            <h1>ESRA</h1>
                            <h4>Explanable Scientific Research Assistant</h4>
                            <SingleSelect q="" width='75%' height='7vh'></SingleSelect>
                            <p>
                                <span className='trendy'>Trendy Search: </span><a href="#">Red Sensei</a>, <a href="#">DoubleBERT</a>, 
                                <Link to={{ pathname: '/search', query: { key: 'Bonk' } }}>Bonk</Link>
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