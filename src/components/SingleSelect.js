import axios from 'axios';
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Select, {defaultTheme} from 'react-select';
import AsyncSelect from 'react-select/async';


const { colors } = defaultTheme;

const debug = false;
const autoCompletePath = process.env.REACT_APP_BACKEND_API + 'api/complete';

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

function useReactSelectFocusFix() {
    const selectRef = useRef()
    useEffect(() => {
        if (selectRef.current && selectRef.current.select) {
            selectRef.current.select.getNextFocusedOption = () => null
        }
    }, [selectRef.current])
    return selectRef
}

function SingleSelect(props) {

    const [inputValue, setInputValue] = useState(props.q);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isDnKey, setIsDnKey] = useState(false);
    const history = useHistory();
    
    const selectRef = React.useRef(null)
      
    useEffect(() => {
        let select = selectRef.current?.select?.select

    
        if (select) {
            const original = select.getNextFocusedOption.bind(select)
            
            select.getNextFocusedOption = () => null;

        }
    }, [selectRef.current])

    const onSelectChange = (value) => {
        // debug mode
        if (debug) {
            console.log(value);
        }

        value == null ? setSelectedValue(''):setSelectedValue(value.label);
        if (value != null) {
            history.push('/search?q=' + value.label + '&page=1&sortBy=0&sortOrder=0');
        }
    };

    const onInputChange = (value) => {
        // debug mode
        if (debug) {
            // console.log(value);
            history.push(`/search?q=${value.label}&page=1&sortBy=0&sortOrder=0`);
        }
        setInputValue(value);
    };

    const onKeyDown = (e) => {
        if (e.keyCode==13 && !isDnKey) {
            history.push(`/search?q=${inputValue}&page=1&sortBy=0&sortOrder=0`);
        }
        if (e.keyCode==40 || e.keyCode==38) {
            setIsDnKey(true);
        }
        if (e.keyCode==13 || e.keyCode==27) {
            setIsDnKey(false);
        }
    }

    const loadOptions = async(inputValue) => {
        const res = await axios.get(autoCompletePath, {
            params: {
                keywords: inputValue
            },
        }).then(response => response.data);
        
        // debug
        if (debug) {
            console.log(res);
        }

        return res;
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

    // const filterOption = (option, inputValue) {
        
    // }

    
    return (
        <Fragment>
            <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            className='single-select'
            classNamePrefix='select'
            components={{DropdownIndicator}}
            isDisabled={false}
            isClearable={true}
            isLoading={false}
            isRtl={false}
            isSearchable={true}
            name='search bar'
            styles={customStyle}
            placeholder='Search any topics'
            defaultInputValue={inputValue}
            onChange={onSelectChange}
            onInputChange={onInputChange}
            // onInputChange={(value: string) =>{ selectRef.select.getNextFocusedOption = ()=>null; }}
            getOptionLabel={e => e.label}
            getOptionValue={e => e.value}
            onSelectChange={e => console.log(e)}
            onKeyDown={onKeyDown}
            ref={selectRef}
            >
            </AsyncSelect>
        </Fragment>
    )
}

export default SingleSelect
