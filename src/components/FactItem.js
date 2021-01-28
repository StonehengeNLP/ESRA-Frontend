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
            <h4>Lorem is...</h4>
            <ul>
                <li><i className='fas fa-question'></i> lorem ipsum</li>
                <li><i className='fas fa-question'></i> lorem ipsum</li>
                <li><i className='fas fa-question'></i> lorem ipsum</li>
            </ul>
        </div>
    )
}

export default FactItem
