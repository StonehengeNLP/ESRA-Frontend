import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import '../css/home.css'
import SingleSelect from '../components/SingleSelect'
import PageFooter from '../components/PageFooter'

function home() {
    return (
        <div className='h-100 w-100 home'>
            <div className="home-search align-items-center">
                <Container className="h-100 align-items-center">
                    <Row className="h-75 align-items-center">
                        <Col xs md>
                            <h1>ESRA</h1>
                            <h4>Explainable Scientific Research Assistant</h4>
                            <SingleSelect q="" width='75%' height='7vh' isHome={true}></SingleSelect>
                            <p>
                                <span className='trendy'>or Try: </span><Link to='/search?q=BERT'>BERT</Link>, <Link to='/search?q=language representation model'>language representation model</Link>, <Link to='/search?q=squad'>squad</Link>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <PageFooter />
        </div>
        
        
    )
}

export default home


// style={{height: '100vh !important'}}