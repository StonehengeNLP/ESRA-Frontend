import * as d3 from 'd3';
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function runForceGraph(container, linksData, nodesData){
    
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    

    const color = (d) => {
        let colorCode;
        switch(d.labels) {
            case 'Paper':
                colorCode = '#ececec';
                break;
            case 'Author':
                colorCode = '#B9D9F7';
                break;
            case 'Affiliation':
                colorCode = '#D9D1AA';
                break;
            case 'Method':
                colorCode = '#F7EAB9';
                break;
            case 'OtherScientificTerm':
                colorCode = '#FAA26A';
                break;
            case 'Task':
                colorCode = '#82F086';
                break;
            case 'Metric':
                colorCode = '#BA72FF';
                break;
            case 'Material':
                colorCode = '#FFFC00';
                break;
            case 'Abbreviation':
                colorCode = '#FC2869';
                break;
            default:
                colorCode = '#ececec';
        }
        return colorCode; 
    }

    const icon = (d) => {
        let iconCode;
        switch(d.labels) {
            case 'Paper':
                iconCode = "\uf15b";
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
                iconCode = "\uf11a";
        }
        return iconCode; 
    }

    const drag = (simulation) => {
        const dragstarted = (d) => {
            if (!d3.event.active)
                simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;

        }

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        const dragended = (d) => {
            if (!d3.event.active)
                simulation.alphaTarget(0);
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        return d3.drag()
                 .on('start', dragstarted)
                 .on('drag', dragged)
                 .on('end', dragended);
    }


    const simulation = d3
        .forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody().strength(-150))
        .force('x', d3.forceX())
        .force('y', d3.forceY());
    
    const svg = d3
        .select(container)
        .append('svg')
        .attr('viewbox', [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on('zoom', function () {
            svg.attr('transform', d3.event.transform);
        }));
    
    const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));
    
    const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 20)
        .attr("fill", d => {return color(d);})
        .call(drag(simulation));
    
    node.append('g')
        .append("text")
        .attr("class", "nodetext")
        .attr('text-anchor', 'end')
        .text(d => { return d.name; });
        
    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "fa")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .text(d => {return icon(d);})
        .call(drag(simulation));
    
    const name = svg.append("g")
        .attr("class", "names")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dx", "1.5em")
        .attr("dy", "0em")
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'central')
        .text(d => {return d.name;})
        .call(drag(simulation));

    simulation.on("tick", () => {
        //update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        // update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    
        // update label positions
        label
            .attr("x", d => { return d.x; })
            .attr("y", d => { return d.y; })
        
        name
            .attr("x", d => { return d.x; })
            .attr("y", d => { return d.y; })
        });
    
    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
}