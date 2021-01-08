import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Graph } from 'react-d3-graph'

import '../css/graph.css'

import FileSvg from '../svgs/file-svgrepo.svg'

function GraphVis(props) {

    // test 
    const [data, setData] = useState({})
    const [isBusy, setIsBusy] = useState(true);
    
    useEffect(() => {
        setIsBusy(false);
    }, [props.paper_title]);

    useEffect(() => {
        if (!isBusy) {
            axios.get('http://localhost:8000/api/graph', {
                params: {
                    keyword: 'bert',
                    paper_title: props.paper_title,
                    limit: 10,
                },
            }).then(res => {
                setData(res.data);
            });
        }
    }, [props.paper_title]);


    const newConfig = {
        collapsible: true,
        initialZoom: 1.5,
        automaticRearrangeAfterDropNode: true,
        node: {
            size: 600,
        },
        link: {
            renderLabel: true,
        }
    }

    return (
        <div className='paper-info-container graph-vis-container'>
            <div className='graph-wrapper'>
                <Graph
                id='graph-vis-69'
                className='graph-vis'
                data={data}
                config={newConfig}
                >
                </Graph>
            </div>
        </div>
    )
}

export default GraphVis
