import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import SearchHeader from '../components/SearchHeader';
import FactList from '../components/FactList';
import FactItem from '../components/FactItem';
import { getUrlParameter } from "../functions";
import PageFooter from '../components/PageFooter';

const placeholder = 'PLACEHOLDER';
const basedURL = process.env.REACT_APP_BACKEND_API
const backendFacts = basedURL + 'api/facts';

const FactRow = (props) => {
    const items = [];

    for(const fact of props.facts.facts){
        // console.log(fact);
        items.push(
            <Col lg={3}>
                <FactList height={'90%'}>
                    <FactItem 
                    relation_name={fact.relation_name}
                    n_label={fact.n_label}
                    relations={fact.relations}
                    keywords={placeholder}
                    />
                </FactList>
            </Col>
        )
    }

    const rows = [];

    for(var i=0; i<items.length; i=i+4){
        rows.push(
            <Row>
                {items.slice(i, i+4)}
            </Row>
        )
    }

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    )
}

function Fact() {
    
    const [facts, setFacts] = useState([]);
    const [keywords, setKeywords] = useState('');

    useEffect(() => {
        let q = getUrlParameter('q');
        // for dev mode
        if (q===null)
            q = "PLACEHOLDER";
        setKeywords(q);
        document.title = `Facts of ${q}` + ' - ESRA';

        axios.get(backendFacts, {
            params: {
                q: q
            }
        }).then(res => {
            setFacts(res.data);
        })
    }, [])
    return (
        <div className='h-100'>
            <SearchHeader />
            <br></br>
            <h2 className='indent-text' style={{'fontSize': '48px'}}>
                {`All Facts About "${keywords}"`}
            </h2>

            <br />
            <Container fluid style={{'padding': '0 10%', 'margin-bottom': '5%'}}>
                {facts.facts!=undefined ? (
                    <FactRow 
                    facts={facts}
                    />    
                ):(<p>null</p>)}
            </Container>
            <PageFooter/>
        </div>
    )
}

export default Fact
