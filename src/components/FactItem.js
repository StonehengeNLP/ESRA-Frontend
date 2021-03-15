import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

function FactIcon({ label, ...props }) {

    const icon = (d) => {
        let iconCode;
        switch(d) {
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

    return (
        <span data-text={label.replace('_', ' ')} className='mat-tooltip'>
            <span className='fa'>{icon(label)}</span>
        </span>
    )
}

function FactRelation(props) {

    const [isHidden, setIsHidden] = useState(true)

    const handleOnClick = (e) => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }

    return (
        <li>
            <span 
            className='subitem'
            >
                <FactIcon label={props.m_label} /> <a className='fact-link neutral-link' href={`/search?q=${props.m}&page=1&sortBy=0&sortOrder=0`}>{ props.m }</a> <span onClick={props.papers.length>0 ? handleOnClick:null} className='arrow' style={{display:props.papers.length>0 ? 'inline':'none'}}>{isHidden ? '🞂':'🞃'}</span>
                <div 
                className='papers-div'
                style={{display:isHidden ? 'none':'block'}}>
                    <ul>
                        {props.papers.map(paper => 
                            <li>
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
            </span>
        </li>
    )
}


function FactItem(props) {
    
    return (
        <div className='fact-item-container paper-item paper-container'>
            <h6 className='fact-header'>
                <FactIcon label={props.n_label}/> {props.relation_name}
            </h6>
            <ul>
                {props.relations!=undefined ? props.relations.map(relation => 
                    <FactRelation 
                    m={relation.m}
                    m_label={relation.m_label}
                    papers={relation.paper_list}
                    keywords={props.keywords}
                    />
                ):null}
                
            </ul>
        </div>
    )
}

export default FactItem
