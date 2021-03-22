import React from 'react'
import { getUrlParameter } from "../functions";
import { Dropdown } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
    className='sortby-toggle'
    href=""
    ref={ref}
    onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}
    >
        {children} &#x25bc;
    </a>
));

function SortByDropdown(props) {
    
    const getHref = (location, sortBy, sortOrder) => {
        const reg_sortby = /sortBy=[0-9]/i;
        const reg_sortorder = /sortOrder=[0-9]/i;
        let path = location.pathname;
        let params = location.search;
        params = params.replace(reg_sortby, `sortBy=${sortBy}`);
        params = params.replace(reg_sortorder, `sortOrder=${sortOrder}`);
        return path + params;
    }

    const getActive = (location, sortBy, sortOrder) => {
        let params = location.search;
        const reg_sortby = /sortBy=([0-9])/i;
        const reg_sortorder = /sortOrder=([0-9])/i;
        let query_sortby = 0;
        let query_sortorder = 0;
        if (reg_sortby.exec(params)!=null){
            query_sortby = parseInt(reg_sortby.exec(params)[1]);
        }
        if (reg_sortorder.exec(params)!=null){
            query_sortorder = parseInt(reg_sortorder.exec(params)[1]);
        }
        return (sortBy == query_sortby) && (sortOrder == query_sortorder);
    } 

    return (
        <Dropdown className='sortby-dropdown'>
            <Dropdown.Toggle as={CustomToggle}>
                Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
                <Dropdown.Header>Relevance</Dropdown.Header>
                <Dropdown.Item eventKey='1' 
                href={ getHref(props.location, 0, 0) }
                active={ getActive(props.location, 0, 0) }>
                    Most Relevant
                </Dropdown.Item>
                <Dropdown.Item eventKey='2' 
                href={ getHref(props.location, 0, 1) }
                active={ getActive(props.location, 0, 1) }>
                    Least Relevant
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Date</Dropdown.Header>
                <Dropdown.Item eventKey='3' 
                href={ getHref(props.location, 2, 0) }
                active={ getActive(props.location, 2, 0) }>
                    Newest First
                </Dropdown.Item>
                <Dropdown.Item eventKey='4' 
                href={ getHref(props.location, 2, 1) }
                active={ getActive(props.location, 2, 1) }>
                    Oldest First
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Citations</Dropdown.Header>
                <Dropdown.Item eventKey='5' 
                href={ getHref(props.location, 1, 0) }
                active={ getActive(props.location, 1, 0) }>
                    Most Citations
                </Dropdown.Item>
                <Dropdown.Item eventKey='6' 
                href={ getHref(props.location, 1, 1) }
                active={ getActive(props.location, 1, 1) }>
                    Least Citations
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortByDropdown
