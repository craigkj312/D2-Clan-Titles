import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { searchClans } from '../utils/api';

import '../style/Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            clanName: ""
        }

        this.submitName = this.submitName.bind(this)
    }

    submitName() {

        const { clanName } = this.state

        searchClans(clanName)
        .then(response => {
            if (response && response.detail && response.detail.groupId) {
                this.props.history.push(`/c/${response.detail.groupId}`)
            }
        })
    }

    render() {

        const { isLoading } = this.state;

        const home = (
            isLoading ? <div className='loading'></div> :
            <div className='home'>
                <div className='home-title-container'>
                    <div className='home-title-top'> Clan </div>
                    <div className='home-title-bottom'> Titles </div>
                </div>
                <div className='search-container'>
                    <input className='search-field' 
                        placeholder='Enter Clan Name' 
                        onChange={e => {this.setState({clanName: e.target.value})}}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                this.submitName()
                            }
                        }}
                    />
                    <div className='press-enter'> Press Enter </div>
                </div>
            </div>
        );

        return (home);
    }
}

Home.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

Home.contextTypes = {
    router: PropTypes.object
}

export default withRouter(Home);