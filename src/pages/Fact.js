import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import SearchHeader from '../components/SearchHeader';
import FactList from '../components/FactList';
import FactItem from '../components/FactItem';

const rela = {
    "facts": [
        {
            "relation_name": "BioBERT is compared to...",
            "n_label": "Method",
            "relations": [
                {
                    "m": "USE",
                    "m_label": "Method",
                    "paper_list": [
                        {
                            "id": 14537,
                            "title": "Adapting Multilingual Neural Machine Translation to Unseen Languages",
                            "arxiv_id": "1910.13998"
                        }
                    ]
                },
                {
                    "m": "BioELMo",
                    "m_label": "Method",
                    "paper_list": [
                        {
                            "id": 7859,
                            "title": "How Do Source-side Monolingual Word Embeddings Impact Neural Machine\n  Translation?",
                            "arxiv_id": "1806.01515"
                        }
                    ]
                }
            ]
        },
        {
            "relation_name": "BioBERT is BRUH",
            "n_label": "Method",
            "relations": [
                {
                    "m": "USE",
                    "m_label": "Method",
                    "paper_list": [
                        {
                            "id": 14537,
                            "title": "Adapting Multilingual Neural Machine Translation to Unseen Languages",
                            "arxiv_id": "1910.13998"
                        }
                    ]
                },
            ]
        },
        {
            "relation_name": "BioBERT is evaluated by...",
            "n_label": "Method",
            "relations": [
                {
                    "m": "biomedical text mining task",
                    "m_label": "Task",
                    "paper_list": [
                        {
                            "id": 7274,
                            "title": "Performance Impact Caused by Hidden Bias of Training Data for\n  Recognizing Textual Entailment",
                            "arxiv_id": "1804.08117"
                        }
                    ]
                },
                {
                    "m": "relevance-based sentence filtering task",
                    "m_label": "Task",
                    "paper_list": [
                        {
                            "id": 14537,
                            "title": "Adapting Multilingual Neural Machine Translation to Unseen Languages",
                            "arxiv_id": "1910.13998"
                        }
                    ]
                }
            ]
        },
        {
            "relation_name": "BioBERT is used for...",
            "n_label": "Method",
            "relations": [
                {
                    "m": "word embedding",
                    "m_label": "OtherScientificTerm",
                    "paper_list": [
                        {
                            "id": 10427,
                            "title": "Training on Synthetic Noise Improves Robustness to Natural Noise in\n  Machine Translation",
                            "arxiv_id": "1902.01509"
                        }
                    ]
                },
                {
                    "m": "sentence embedding",
                    "m_label": "OtherScientificTerm",
                    "paper_list": [
                        {
                            "id": 10427,
                            "title": "Training on Synthetic Noise Improves Robustness to Natural Noise in\n  Machine Translation",
                            "arxiv_id": "1902.01509"
                        }
                    ]
                }
            ]
        },
        {
            "relation_name": "BioBERT is a subtype of...",
            "n_label": "Method",
            "relations": [
                {
                    "m": "biomedical version of Elmo",
                    "m_label": "Method",
                    "paper_list": [
                        {
                            "id": 7859,
                            "title": "How Do Source-side Monolingual Word Embeddings Impact Neural Machine\n  Translation?",
                            "arxiv_id": "1806.01515"
                        }
                    ]
                }
            ]
        }
    ],
}

const placeholder = 'PLACEHOLDER';

const FactRow = (props) => {
    const items = [];

    for(const fact of props.facts.facts){
        console.log(fact);
        items.push(
            <Col md={3}>
                <FactList>
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

    return (
        <div className='h-100'>
            <SearchHeader />
            <br></br>
            <br></br>
            <h2 className='indent-text'>Facts about "placeholder"</h2>
            <br />
            <br />
            <Container fluid style={{'padding': '0 10%'}}>
                <FactRow facts={rela}/>
                {/* <Row>
                    <Col>
                        <FactList> 
                                <FactItem 
                                relation_name={'<RELATION_NAME>'} 
                                n_label={'<N_LABEL>'}
                                relations={rela}
                                keywords={'keywords'}
                                />
                        </FactList>
                    </Col>
                    <Col>
                        <FactList> 
                                <FactItem 
                                relation_name={'<RELATION_NAME>'} 
                                n_label={'<N_LABEL>'}
                                relations={rela}
                                keywords={'keywords'}
                                />
                        </FactList>
                    </Col><Col>
                        <FactList> 
                                <FactItem 
                                relation_name={'<RELATION_NAME>'} 
                                n_label={'<N_LABEL>'}
                                relations={rela}
                                keywords={'keywords'}
                                />
                        </FactList>
                    </Col><Col>
                        <FactList> 
                                <FactItem 
                                relation_name={'<RELATION_NAME>'} 
                                n_label={'<N_LABEL>'}
                                relations={rela}
                                keywords={'keywords'}
                                />
                        </FactList>
                    </Col>
                </Row> */}
            </Container>
        </div>
    )
}

export default Fact
