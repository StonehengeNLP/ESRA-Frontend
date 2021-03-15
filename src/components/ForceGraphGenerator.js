import * as d3 from 'd3';
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from '../css/forceGraph.module.css';

const legend = [
    'Paper', 'Author', 'Affiliation', 'Method', 'OtherScientificTerm',
    'Task', 'Metric', 'Material', 'Abbreviation',
]

export default function runForceGraph(container, linksData, nodesData, nodesHoverTooltip, id, onPaperPage){
    
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));
    // console.log(container.parentElement.parentElement);
    const containerRect = onPaperPage ? 
        container.parentElement.parentElement.getBoundingClientRect():container.getBoundingClientRect();
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

    const textBoxColor = (l) => {
        let color;
        switch(l.label) {
            case 'hyponym_of':
                color = '#F03EBF';
                break;
            case 'refer_to':
                color = '#FC2869';
                break;
            case 'related_to':
                color = '#1B67F5';
                break;
            case 'used_for':
                color = '#D4F00E';
                break;
            case 'author_of':
                color = '#88A2FC';
                break;
            case 'affiliate_with':
                color = '#D9D1AA';
                break;
            case 'appear_in':
                color = '#95DEEF';
                break;
            case 'feature_of':
                color = '#CFD9B6';
                break;
            case 'evaluate_for':
                color = '#35F51E';
                break;
            case 'part_of':
                color = '#F0C3B7';
                break;
            case 'compare':
                color = '#0CF8A6';
                break;
            case 'cite':
                color = '#F56C00';
                break;
            default:
                color = '#FFFFFF';
        }
        return color;
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
        .force('link', d3.forceLink(links).id(d => d.id).distance(130))
        .force('charge', d3.forceManyBody().strength(-800).distanceMax(170))
        .force("center", d3.forceCenter().x(width * .5).y(height * .5))
        .force("collide",d3.forceCollide().radius(d => d.r * 10));
    
    const svg = d3
        .select(container)
        .html('')
        .append('svg')
        .attr('class', `g-${id}`)
        .attr('viewbox', [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on('zoom', function () {
            g.attr('transform', d3.event.transform);
        }));
    
    // gelement canvas
    const g = svg.append('g');

    // Arrow head
    g.append("defs").append('marker')
        .attr('id', `arrow-${id}`)
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

    const linkG = g
        .append('g')
        .attr('fill', 'none')
        .style("stroke-width", '1.5px');
    
    const link = linkG
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .style('stroke', '#000')
        .attr('marker-end', `url(#arrow-${id})`)
        .attr('id', (d) => `g-${id}-link-${d.id}`);
    
    const linkText = linkG
        .selectAll('text')
        .data(links)
        .enter()
        .append('text')
        .attr('class', 'link-label-text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('id', (l) => `g-${id}-link-label-${l.id}`)
        .text(l => { return l.label.replace('_', ' '); })
        .attr('fill', '#000')
        .call(drag(simulation));
    

    const getTextWH = (label) => {
        let wh;
        switch(label) {
            case 'hyponym_of':
                wh = [53.97, 12.81];
                break;
            case 'refer_to':
                wh = [33.08, 12.81];
                break;
            case 'related_to':
                wh = [43.27, 12.81];
                break;
            case 'used_for':
                wh = [36.77, 12.81];
                break;
            case 'author_of':
                wh = [41.75, 12.81];
                break;
            case 'affiliate_with':
                wh = [63.97, 12.81];
                break;
            case 'appear_in':
                wh = [41.47, 12.81];
                break;
            case 'feature_of':
                wh = [43.81, 12.81];
                break;
            case 'evaluate_for':
                wh = [52.64, 12.81];
                break;
            case 'part_of':
                wh = [30.45, 12.81];
                break;
            case 'compare':
                wh = [39.16, 12.81];
                break;
            case 'cite':
                wh = [16.03, 12.81];
                break;
            default:
                wh = [63.97, 12.81];
        }
        return wh;
    } 

    const linkBox = linkG
        .selectAll('rect')
        .data(links)
        .enter()
        .append('rect')
        .attr('class', 'link-rect')
        .attr('width', (l) => getTextWH(l.label)[0] + 10)
        .attr('height', (l) => getTextWH(l.label)[1] + 2)
        .attr('fill', (l) => textBoxColor(l));

    // raise text element 
    linkText.raise();

    const nodeNameOnClick = (d) => {
        // if (window.confirm(`Would you like to search for ${d.name}`)) {
        window.location.href = `/search?q=${d.name}&page=1&sortBy=0&sortOrder=0`;
        // }
    }
    const nodeRadius = 35;
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
        .attr('class', 'node-name')
        .style('cursor', 'pointer')
        .attr("dy", "1.1em")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '10px')
        .text(d => {return (d.name.length<=8 ? d.name:d.name.slice(0,8)+"...");})
        .on('click', nodeNameOnClick)
        .call(drag(simulation));

    
    name
        .on('mouseover', (d) => { addTooltip(nodesHoverTooltip,d,d3.event.pageX,d3.event.pageY); })
        .on('mouseout', () => { removeTooltip(); }); 

    // calculate svg curve
    const setPath = (d) => {
        let dr = (d.linkNum===1 && d.counter===0) ? 0:500/d.linkNum;
        return `M ${d.source.x},${d.source.y}` +
               `A ${dr} ${dr} 0 0 1 ${d.target.x},${d.target.y}`;
    }

    simulation.on("tick", () => {
        
        // change from g element to path element
        // update link's svg path 
        link
            .attr('d', (d) => {
                return setPath(d);
            });

        // update link's svg arrow position on node edge
        link
            .attr('d', function(d) {
                let pl = this.getTotalLength(),
                    r = nodeRadius + 8.48528, // radius + arrow's marker size(Math.sqrt(6**2 + 6**2))
                    m = this.getPointAtLength(pl - r),
                    dr = (d.linkNum===1 && d.counter===0) ? 0:500/d.linkNum/3;
                return `M ${d.source.x},${d.source.y}` + 
                       `A ${dr} ${dr} 0 0 1 ${m.x},${m.y}`;
            });

        linkText
            .attr('x', (d) => {
                let path = document.getElementById(`g-${id}-link-${d.id}`);
                const len = path.getTotalLength() + 15;
                return path.getPointAtLength(len/2).x + 5;
            })
            .attr('y', (d) => {
                let path = document.getElementById(`g-${id}-link-${d.id}`);
                const len = path.getTotalLength() + 15;
                return path.getPointAtLength(len/2).y + 5;
            });
        
        linkBox
            .attr('x', (d) => {
                let textBox = document.getElementById(`g-${id}-link-label-${d.id}`);
                return textBox.getAttribute('x') - 5 - getTextWH(d.label)[0]/2;
            })
            .attr('y', (d) => {
                let textBox = document.getElementById(`g-${id}-link-label-${d.id}`);
                return textBox.getAttribute('y') - 4 - getTextWH(d.label)[1]/2;
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