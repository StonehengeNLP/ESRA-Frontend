import React, { useEffect, useRef } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image';
import runForceGraph from "./ForceGraphGenerator";


function ForceGraph({ linksData, nodesData }) {
    
    const containerRef = useRef(null);

    useEffect(() => {
        let destroyFn;
        if (containerRef.current) {
            const { destroy } = runForceGraph(containerRef.current, linksData, nodesData);
            destroyFn = destroy;
        }
        return destroyFn;
    }, []);

    return (
        <div ref={containerRef} className='force-container'>    
        </div>
    )
}

export default ForceGraph
