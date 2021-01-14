import React, { useEffect, useRef } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import runForceGraph from "./ForceGraphGenerator";


function ForceGraph({ linksData, nodesData, nodesHoverTooltip }) {
    
    const containerRef = useRef(null);

    useEffect(() => {
        console.log('graph');
        let destroyFn;
        if (containerRef.current) {
            const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodesHoverTooltip);
            destroyFn = destroy;
        }
        return destroyFn;
    }, [linksData, nodesData]);

    return (
        <div ref={containerRef} className='force-container'>    
        </div>
    )
}

export default ForceGraph
