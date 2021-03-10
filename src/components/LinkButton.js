import React from 'react'

function LinkButton(props) {
    return (
        <div className='link-button'>
            <a href={props.url} to='_blank' className='resource-link'>
                <span>{props.name}</span>
            </a>
        </div>
    )
}

export default LinkButton
