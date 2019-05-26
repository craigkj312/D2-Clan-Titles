import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Header.css';

export default class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        const header = (
            <div className='header'> 
                <Link className='header-title' to='/'>
                    <span className='header-title-crucible'>Crucible</span> 
                    <span className='header-title-workshop'>Workshop</span>
                </Link>
            </div>
        );

        return (header);
    }
}