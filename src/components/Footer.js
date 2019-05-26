import React from 'react';
// import { Link } from 'react-router-dom';

import '../style/Footer.css';

export default class Footer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        const footer = (
            <div className='footer'> 
                CrucibleWorkshop is not associated or affiliated with Bungie. Destiny is a registered trademark of Bungie Inc.
            </div>
        );

        return (footer);
    }
}