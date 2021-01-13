import * as d3 from 'd3';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from '../css/forceGraph.module.css';

const legend = [
    'Paper', 'Author', 'Affiliation', 'Method', 'OtherScientificTerm',
    'Task', 'Metric', 'Material', 'Abbreviation',
]

export default function runForceGraph(container, linksData, nodesData, nodesHoverTooltip){
    
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const tooltip = document.querySelector('#graph-tooltip');
    if (!tooltip) {
        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add(styles.tooltip);
        tooltipDiv.style.opacity = '0';
        tooltipDiv.id = 'graph-tooltip';
        document.body.appendChild(tooltipDiv);
    }
    
    const div = d3.select('#graph-tooltip');

    const addTooltip = (hoverTooltip, d, x, y) => {
        
        div.transition()
           .duration(200)
           .style('opacity', 0.9);
        
        div.html(hoverTooltip(d))
           .style('left', `${x}px`)
           .style('top', `${y-28}px`);
    }

    const removeTooltip = () => {
        div.transition()
           .duration(200)
           .style('opacity', 0);
    }

    const color = (d) => {
        let colorCode;
        switch(d) {
            case 'Paper':
                colorCode = '#cccccc';
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
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
                 .on('start', dragstarted)
                 .on('drag', dragged)
                 .on('end', dragended);
    }


    const simulation = d3
        .forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(90))
        .force('charge', d3.forceManyBody().strength(-1000).distanceMax(1000))
        .force("center", d3.forceCenter().x(width * .5).y(height * .5))
        .force("collide",d3.forceCollide().radius(d => d.r * 10));
    
    const svg = d3
        .select(container)
        .append('svg')
        .attr('viewbox', [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on('zoom', function () {
            g.attr('transform', d3.event.transform);
        }));
    
    // gelement canvas
    const g = svg.append('g');

    // Arrow head
    g.append("defs").append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', '0')
        .attr('refY', '0')
        .attr('orient', 'auto')
        .attr('markerWidth', '6')
        .attr('markerHeight', '6')
        .attr('xoverflow', 'visible')
        .append("path")
        .attr("fill", '#000')
        .style('opacity', 0.6)
        .attr("d", "M0,-5 L10,0 L0,5");
    
    // legend box
    const boxRadius = 5;
    svg.append('rect')
        .attr('x', width - 170)
        .attr('y', 27.5)
        .attr('rx', `${boxRadius}px`)
        .attr('ry', `${boxRadius}px`)
        .attr('height', legend.length*25)
        .attr('width', 145)
        .style('fill', '#fff')
        .style('stoke', '#acacac')
        .style('stoke-width', '1px');


    // legend dot
    svg.selectAll('legendDot')
        .data(legend)
        .enter()
        .append('circle')
        .attr('cx', width - 150)
        .attr('cy', (d,i) => {return 40 + i*25})
        .attr('r', 7)
        .style('fill', (d) => {return color(d);})
        .style('stroke', '#000')
        .style('stroke-width', '1px')
        .style('stroke-opacity', 0.6);
    
    // legend text
    svg.selectAll('legendText')
        .data(legend)
        .enter()
        .append('text')
        .attr('x', width - 140)
        .attr('y', (d,i) => {return 41 + i*25})
        .text((d) => d)
        .style('font-size', '12px')
        .style('fill', (d) => {return color(d);})
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle')
        .style('stroke', '#000')
        .style('stroke-width', '0.2px')
        .style('stroke-opacity', 0.6);

        
    const link = g
        .append('g')
        .attr('stroke', '#000')
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", '1.5px')
        .attr('marker-end', 'url(#arrow)');
    
    const nodeRadius = 30;
    const node = g
        .append("g")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", 1)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("fill", (d) => {return color(d.labels);})
        .call(drag(simulation));
    
    node.append('g')
        .append("text")
        .attr("class", "nodetext")
        .attr('text-anchor', 'end')
        .text(d => { return d.name; });
        
    const label = g.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "fa")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '20px')
        .attr('dy', '-0.25em')
        .text(d => {return icon(d);})
        .call(drag(simulation));
    
    const name = g.append("g")
        .attr("class", "names")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("dy", "1.1em")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '10px')
        .text(d => {return (d.name.length<=8 ? d.name:d.name.slice(0,6)+"...");})
        .call(drag(simulation));

    const linkLabel = g.append('g')
        .attr('class', 'link-label')
        .selectAll('text')
        .data(links)
        .enter()
        .append('text')
        .attr('class', 'link-label-text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .text(l => { return l.label; })
        .call(drag(simulation));

    label
        .on('mouseover', (d) => { addTooltip(nodesHoverTooltip,d,d3.event.pageX,d3.event.pageY); })
        .on('mouseout', () => { removeTooltip(); }); 

    simulation.on("tick", () => {
        //update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => {
                let dx = Math.abs(d.target.x-d.source.x);
                let dy = Math.abs(d.target.y-d.source.y);
                let angle = Math.atan(dx/dy);
                let marginX = nodeRadius * Math.sin(angle) * 1.4;
                return d.target.x<d.source.x ? d.target.x+marginX:d.target.x-marginX;
            })
            .attr("y2", d => {
                let dx = Math.abs(d.target.x-d.source.x);
                let dy = Math.abs(d.target.y-d.source.y);
                let angle = Math.atan(dx/dy);
                let marginY = nodeRadius * Math.cos(angle) * 1.4;
                return d.target.y<d.source.y ? d.target.y+marginY:d.target.y-marginY;
            });
        
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
        
        linkLabel
            .attr("x", d => { 
                return d.source.x < d.target.x ? (d.source.x + (d.target.x-d.source.x)/2) : (d.target.x + (d.source.x-d.target.x)/2);
             })
            .attr("y", d => {
                return d.source.y < d.target.y ? (d.source.y + (d.target.y-d.source.y)/2) : (d.target.y + (d.source.y-d.target.y)/2);
            })
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