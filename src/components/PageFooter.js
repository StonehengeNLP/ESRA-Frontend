import React from 'react'
import { Link } from 'react-router-dom'

import '../css/footer.css'

function PageFooter() {
    return (
        <footer className="page-footer">
            <Link className='footer-link' to={{pathname: '/'}}>Home</Link>
            <Link className='footer-link' to={{pathname: '/about'}}>About</Link>
        </footer>
    )
}

export default PageFooter
