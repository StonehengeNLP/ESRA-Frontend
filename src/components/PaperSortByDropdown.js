import React from 'react'
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

function PaperSortByDropdown({onSelect, setFunc, ...props}) {

    return (
        <Dropdown className='sortby-dropdown'>
            <Dropdown.Toggle as={CustomToggle}>
                Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu align="right">
                <Dropdown.Header>Date</Dropdown.Header>
                <Dropdown.Item eventKey='1' 
                href=''
                active={props.ordering==1}
                onSelect={(e) => onSelect(e, setFunc)}>
                    Newest First
                </Dropdown.Item>
                <Dropdown.Item eventKey='2' 
                href=''
                active={props.ordering==2}
                onSelect={(e) => onSelect(e, setFunc)}>
                    Oldest First
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Citations</Dropdown.Header>
                <Dropdown.Item eventKey='3' 
                href=''
                active={props.ordering==3}
                onSelect={(e) => onSelect(e, setFunc)}>
                    Most Citations
                </Dropdown.Item>
                <Dropdown.Item eventKey='4' 
                href=''
                active={props.ordering==4}
                onSelect={(e) => onSelect(e, setFunc)}>
                    Least Citations
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PaperSortByDropdown
