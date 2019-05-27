import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getClanMembers } from '../utils/api';

import '../style/ClanDetails.css';

import ClanDetailsHeader from '../components/ClanDetails/ClanDetailsHeader';
import RaiderTable from '../components/ClanDetails/RaiderTable';
import PvPTable from '../components/ClanDetails/PvPTable';
import GambitTable from '../components/ClanDetails/GambitTable';
import StrikeTable from '../components/ClanDetails/StrikeTable';


class ClanDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            memberList: []
        }
    }

    componentDidMount() {

        const { groupId } = this.props.match.params;

        getClanMembers(groupId)
        .then(response => {
            this.setState({isLoading: false, memberList: response.results})
        })
    }

    render() {

        const { isLoading, memberList } = this.state
        const { groupId } = this.props.match.params;

        const home = (
            <div className='clan-details'>
            {isLoading ? <div className='loading'></div> :
            <div>
                <ClanDetailsHeader groupId={groupId} />
                <div className='clan-details-content'>
                    <RaiderTable memberList={memberList} />
                    <PvPTable memberList={memberList} />
                    <GambitTable memberList={memberList} />
                    <StrikeTable memberList={memberList} />
                </div>
            </div>}
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