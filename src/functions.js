import { useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function getUrlParameter(name) {
    let regex = new RegExp('[?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    if (results == null)  
        return null;
    return results[1].replace('%20', ' ');
}

export {useQuery, getUrlParameter};