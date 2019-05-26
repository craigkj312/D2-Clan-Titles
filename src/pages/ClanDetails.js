import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getProfile, getActivities } from '../utils/api';

import '../style/ClanDetails.css';

class ClanDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        const { type, id } = this.props.match.params;

        // getManifest();

        getProfile(type, id, ["Profiles","Characters","CharacterActivities"])
        .then(response => {
            this.setState({isLoading: false})
            let characterData = response.characters.data;
            let character = characterData[Object.keys(characterData)[1]]
            console.log(character)
            getActivities(character, 20, "AllPvP", 0);
        })
    }

    render() {

        const home = (
            this.state.isLoading ? <div className='loading'></div> :
            <div className='user-details'>  
            </div>
        );

        return (home);
    }
}

ClanDetails.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

ClanDetails.contextTypes = {
    router: PropTypes.object
}

export default withRouter(ClanDetails);