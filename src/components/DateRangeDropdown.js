import React from 'react'
import { useHistory } from 'react-router-dom';
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css'
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

const CustomDateRange = React.forwardRef(({children, style, className, 'aria-labelledby': labeledBy, ...props}, ref) => {
    const { createSliderWithTooltip } = Slider;
    const Range = createSliderWithTooltip(Slider.Range);
    const wrapperStyle = { width: "90%", margin: 20};
    const maxYear = new Date().getFullYear();
    const minYear = 1900;
    const history = useHistory();

    const handleOnAfterChange = (e) => {
        let params = props.params;
        const reg = /filterBy=([0-9]+)\-([0-9]+)/i;

        if (params.search(reg) > -1) {
            params = params.replace(reg, `filterBy=${e[0]}-${e[1]}`);
        } 
        else {
            params = params + `&filterBy=${e[0]}-${e[1]}`;
        }
        history.push(`/search${params}`);
    }

    return (
        <div 
        ref={ref}
        className={className}
        style={style}
        aria-labelledby={labeledBy}>
            <p style={{margin: "5px 0 0px 15px"}}>Year:</p>
            <div style={wrapperStyle}>
                <Range 
                min={minYear}
                max={maxYear} 
                defaultValue={props.defaultValue} 
                tipFormatter={value => `${value}`} 
                marks={{ 1900:minYear, 2021:maxYear }}
                onAfterChange={(e) => {handleOnAfterChange(e)}}
                />
            </div>
        </div>
    )
})

function DateRangeDropdown(props) {
    const getDefaultValue = () => {
        const reg = /([0-9]+)-([0-9]+)/i;
        const filterBy = getUrlParameter('filterBy');
        
        // check null query param
        if (filterBy==null) {
            return [1950, new Date().getFullYear()];
        }
        let res = reg.exec(filterBy);
        let y1 = parseInt(res[1]);
        let y2 = parseInt(res[2]); 
        return y1<y2 ? [y1,y2]:[y2,y1];
    }

    return (
        <Dropdown className='date-dropdown'>
            <Dropdown.Toggle as={CustomToggle}>
                Date Range
            </Dropdown.Toggle>
            <Dropdown.Menu 
            as={CustomDateRange} 
            defaultValue={getDefaultValue()} 
            className='date-menu' 
            params={props.params}
            />
        </Dropdown>
    )
}

export default DateRangeDropdown
