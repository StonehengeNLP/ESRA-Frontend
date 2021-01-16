import React, { useState } from 'react'
import { Link } from 'react-router-dom';

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
    
    return (
        <div className='fact-item-container paper-item paper-container'>
            <p className='fact-text'>{!isSubject ? 
                    `${n}(${get_label(n_label)}) ${process_type(type)} ${m}(${get_label(m_label)})`:
                    `${m}(${get_label(m_label)}) ${process_type(type)} ${n}(${get_label(n_label)})`}
            </p>
            <p className='fact-text'>
                <span 
                className='see-more' 
                onClick={handleOnClick}>
                    Paper where this knowledge were extracted {isHidden ? '🞂':'🞃'}
                </span>
            </p>
            <ul style={{display:isHidden ? 'none':'inline'}}>
                {papers.map(paper => (
                    <li>
                        <Link
                        to={{
                            pathname: `/paper/${paper.id}/`,
                        }}>
                            {paper.title}
                        </Link>
                    </li>)
                )}
            </ul>
        </div>
    )
}

export default FactItem
