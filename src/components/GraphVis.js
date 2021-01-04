import React from 'react'
import { Fragment } from 'react'
import { Graph } from 'react-d3-graph'

import '../css/graph.css'

function GraphVis() {

    const data = {
        nodes: [
            {
                id: 'DoubleBERT: pretrained BERT for Dharma understanding',
                color: 'red'
            },
            {id: 'DoubleBERT'},
            {id: 'Red Sensei'},
            {id: 'H. Sasada'},
            {id: 'BERT'},
            {id: 'Dharma'},
            {id: 'understanding'},
            {id: 'religion'},
            {id: 'ELMO'},
        ],
        links: [
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'DoubleBERT'
            },
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'Red Sensei'
            },
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'H. Sasada'
            },
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'BERT'
            },
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'Dharma'
            },
            {
                source: 'DoubleBERT: pretrained BERT for Dharma understanding',
                target: 'understanding'
            },
            {source: 'Dharma', target: 'understanding'},
            {source: 'religion', target: 'Dharma'},
            {source: 'ELMO', target: 'BERT'},
        ],
    }

    const newConfig = {
        collapsible: true,
        minZoom: 1,
    }

    return (
        <div className='paper-info-container graph-vis-container'>
            <Graph
            id='graph-vis-69'
            className='graph-vis'
            data={data}
            config={newConfig}
            >
            </Graph>
        </div>
    )
}

export default GraphVis
