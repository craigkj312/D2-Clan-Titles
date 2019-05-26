import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getClanMembers } from '../utils/api';

import '../style/ClanDetails.css';

class ClanDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {

        const { groupId } = this.props.match.params;

        getClanMembers(groupId)
        .then(response => {
            // this.setState({isLoading: false})
        })
    }

    render() {

        const { isLoading } = this.state

        const home = (
            isLoading ? <div className='loading'></div> :
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