import React, { Fragment, useState } from 'react'
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

function SingleSelect(props) {

    const customStyle = {
        container: (provided, state) => ({
            ...provided,
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: 'transparent',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            boxShadow: 'none',
            ":hover": {
                borderColor: 'transparent',
                borderLeft: '3px solid #76B900',
            },
            borderLeft: '3px solid #76B900',
            width: props.width,
            height: props.height,
            margin: '1% 0 1% 0',
        }),
    }

    const [query, setQuery] = useState(props.q)
    
    return (
        <Fragment>
            <Select
            className='single-select'
            classNamePrefix='select'
            isDisabled={false}
            isClearable={true}
            isLoading={false}
            isRtl={false}
            isSearchable={true}
            name='search bar'
            options={options}
            styles={customStyle}
            placeholder='Search any topics'
            defaultInputValue={query}
            >
            </Select>
        </Fragment>
    )
}

export default SingleSelect
