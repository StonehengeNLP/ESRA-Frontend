import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";


function FactItem({ n, n_label, m, m_label, type, isSubject, papers, ...props }) {
    
    const [isHidden, setIsHidden] = useState(true)

    const get_label = (label) => {
        return label[0]=='BaseEntity' ? label[1]:label[0];
    }

    const process_type = (t) => {
        return t.replace('_', ' ');
    }

    const handleOnClick = (e) => {
        setIsHidden(!isHidden);
    }

    const getFacts = (n,m,n_label,m_label, isSubject, type) => {
        return ( isSubject ? 
                    `${n.bold()}(${get_label(n_label)}) ${process_type(type)} ${m}(${get_label(m_label)})`:
                    `${m}(${get_label(m_label)}) ${process_type(type)} ${n.bold()}(${get_label(n_label)})`
        )
    }
    
    const boldKeyword = (text) => {
        return {__html: text};
    }
    
    return (
        <div className='fact-item-container paper-item paper-container'>
            <p 
            className='fact-text'
            dangerouslySetInnerHTML={boldKeyword(getFacts(n,m,n_label,m_label,isSubject,type))}>
            </p>
            <p className='fact-text'>
                <span 
                className='see-more' 
                role='button'
                onClick={handleOnClick}>
                    Paper where this knowledge were extracted {isHidden ? '🞂':'🞃'}
                </span>
            </p>
            <ul style={{display:isHidden ? 'none':'inline'}}>
                {papers.map(paper => (
                    <li>
                        <span>
                            <Link
                            to={{
                                pathname: `/paper/${paper.id}/?q=${props.keywords}`,
                            }}>
                                {paper.title}
                            </Link>
                        </span>
                        <i class="fa fa-angle-right"></i>
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default FactItem
