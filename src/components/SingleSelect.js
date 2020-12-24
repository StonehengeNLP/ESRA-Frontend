import React, { Fragment, useState } from 'react'
import Select, {defaultTheme} from 'react-select';


const { colors } = defaultTheme;

const DropdownIndicator = (props) => {

    return (
        <div 
        style={{color:colors.neutral19, height:24, width:24, margin:'0 3px'}}
        role='button'
        onClick={() => console.log('k')}>
            <svg width='24' height='24' viewBox='0 0 24 24' focusable='false'>
            <path
            d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
            fill="currentColor"
            fillRule="evenodd"/>
            </svg>
        </div>
    );
};

function SingleSelect(props) {

    const [query, setQuery] = useState(props.q);

    let options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'test', label: query }
    ]

    const onSelectChange = (value) => {
        console.log(value);
        value == null ? setQuery(''):setQuery(value.label);
    };

    const customStyle = {
        container: (provided, state) => ({
            ...provided,
            width: '100%',
            display: props.isHome ? 'block':'flex',
            alignItems: props.isHome ? 'flex-start':'center',
            justifyContent: props.isHome ? 'flex-start':'center',
        }), 
        menu: (provided, state) => ({
            ...provided,
            width: props.width,
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: 'transparent',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            boxShadow: 'none',
            ":hover": {
                borderColor: 'transparent',
                borderLeft: props.isHome ? '3px solid #76B900':'none',
            },
            borderLeft: props.isHome ? '3px solid #76B900':'none',
            width: props.width,
            height: props.height,
            margin: '1% 0 1% 0',
        }),
    }
    
    return (
        <Fragment>
            <Select
            className='single-select'
            classNamePrefix='select'
            components= {{DropdownIndicator}}
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
            onChange={onSelectChange}
            >
            </Select>
        </Fragment>
    )
}

export default SingleSelect
