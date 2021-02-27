import React from 'react'

import '../css/about.css';

function About(props) {
    return (
        <div>
            <section className='about text-section'>
                <h3>About ESRA</h3>
                <p className='paragraph'>
                    Explainable Scientific Research Assistant or ESRA is 
                    a literature discovery platform that aims to accelerate 
                    the literature review process. We propose 3 functionalities 
                    in the discovery system that are
                </p>
                <ol className='feature-list'>
                    <li>
                        <b>Scientific Knowledge Graph</b>
                        <ul className='sublist'>
                            <li>
                                which represents sophisticated interdisciplinary 
                                scientific information
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Dynamic paper explanation</b>
                        <ul className='sublist'>
                            <li>
                                based on most related keywords
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Related facts</b>
                        <ul className='sublist'>
                            <li>
                                which suggest top related keywords with their 
                                relationships.
                            </li>
                        </ul>
                    </li>
                </ol>
            </section>
            <section className='guideline text-section'>
                <h3>Guideline</h3>
                <p className='paragraph'>
                    There are three different pages in ESRA; home page, search result page, 
                    and paper page. When entering ESRA, users will be redirected to the home 
                    page which can input search query. After submitting the search query to 
                    ESRA, the application will then redirect the user to the search result page.
                     On the search result page, there are two main sections which are facts section 
                     and search result section. The facts section shows a list of facts related to 
                     the search query along with visualization of a fact graph. The search result 
                     section provided returned papers from ESRA which have explanations attached on 
                     each paper. When clicking on the paper title, the user will be redirected to 
                     a paper page which contains information of the paper and also provides a 
                     knowledge graph visualization of that paper.
                </p>
            </section>
        </div>
    )
}

export default About
