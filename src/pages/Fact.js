import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SearchHeader from '../components/SearchHeader';
import { getUrlParameter } from "../functions";
import PageFooter from '../components/PageFooter';

import '../css/fact.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const basedURL = process.env.REACT_APP_BACKEND_API
const backendFacts = basedURL + 'api/facts';

const icon = (d) => {
    let iconCode;
    var label = d;
    switch(label) {
        case 'Paper':
            iconCode = "\uf15c";
            break;
        case 'Author':
            iconCode = "\uf007";
            break;
        case 'Affiliation':
            iconCode = "\uf19c";
            break;
        case 'Method':
            iconCode = "\uf0ad";
            break;
        case 'OtherScientificTerm':
            iconCode = "\uf610";
            break;
        case 'Task':
            iconCode = "\uf0ae";
            break;
        case 'Metric':
            iconCode = "\uf681";
            break;
        case 'Material':
            iconCode = "\uf70e";
            break;
        case 'Abbreviation':
            iconCode = "\uf303";
            break;
        default:
            iconCode = "\uf128";
    }
    return iconCode; 
}

const FactRow = (props) => {
    const items = [];

    for(const fact of props.facts.facts){
        items.push(
            <Col lg={3}>
                <FactBox
                relation_name={fact.relation_name}
                n_label={fact.n_label}
                relations={fact.relations}
                keywords={props.keywords}
                />
            </Col>
        )
    }

    const rows = [];

    for(var i=0; i<items.length; i=i+4){
        rows.push(
            <Row style={{'margin-top':'2em'}}>
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

const FactBoxItem = (props) => {
    const [isHidden, setIsHidden] = useState(true)

    const handleOnClick = (e) => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }
    return (
        <li class="todo-list">
            <div class="list-item-view">
                <div>
                    <a href={`/search?q=${props.m}&page=1&sortBy=0&sortOrder=0`} className='relation-name fact-link neutral-link'>{`${props.m} (${props.m_label})`}</a>
                </div>
                <div>
                    <span 
                    onClick={props.papers.length>0 ? handleOnClick:null} 
                    className='arrow' style={{display:props.papers.length>0 ? 'inline':'none'}}>
                        {isHidden ? '🞂':'🞃'}
                    </span>
                </div>
            </div>
            <div 
            style={{display:isHidden ? 'none':'block'}}>
                <ul>
                    {props.papers.map(paper => 
                        <li className='fact-papers'>
                            <span className='minipaper'>
                                <Link className='fact-link neutral-link'
                                to={{	
                                    pathname: `/paper/${paper.id}/?q=${props.keywords}`,	
                                }}
                                >
                                    <i class="far fa-file-alt"></i> {paper.title}
                                </Link>
                            </span>
                        </li>    
                    )}
                    
                </ul>
            </div>
        </li>
    )
}

const FactBox = ({relation_name, n_label, relations, keywords, ...props}) => {
    return (
        <div id="app-container" class="app-container">
            <div class="app-header">
                <div>
                    <h5 class="relation-name">{relation_name}</h5>
                </div>
                {/* <div class="task-count">
                    <span class='fa'>{`${icon(n_label)}`}</span>
                    <span> {`${n_label}`}</span>
                </div> */}
            </div>
            <div class="app-body">
                <ul>
                    {relations.map(relation => 
                        <FactBoxItem 
                        m={relation.m}
                        m_label={relation.m_label}
                        papers={relation.paper_list}
                        keywords={keywords}
                        />
                    )}
                </ul>
            </div>
        </div>
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
                q: q,
                limit: 1000
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
                    keywords={keywords}
                    />    
                ):(<p>null</p>)}
            </Container>
            <PageFooter/>
        </div>
    )
}

export default Fact
