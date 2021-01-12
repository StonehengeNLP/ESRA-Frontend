import * as d3 from 'd3';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from '../css/forceGraph.module.css';

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
        .force('charge', d3.forceManyBody().strength(-300).distanceMin(90))
        .force("center", d3.forceCenter().x(width * .5).y(height * .5))
        .force('x', d3.forceX(width/2).strength(0.1))
        .force('y', d3.forceY(height/2).strength(0.1));
        // .force("collide",d3.forceCollide().radius(d => d.r * 10));
    
    const svg = d3
        .select(container)
        .append('svg')
        .attr('viewbox', [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on('zoom', function () {
            g.attr('transform', d3.event.transform);
        }));
    
    const g = svg.append('g');

    const link = g
        .append('g')
        .attr('stroke', '#fff')
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));
    
    const node = g
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
        
    const label = g.append("g")
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
    
    const name = g.append("g")
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