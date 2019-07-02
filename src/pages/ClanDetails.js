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
import MenagerieTable from '../components/ClanDetails/MenagerieTable';

class ClanDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            activeDate: new Date(),
            memberList: []
        }

        this.changeDate = this.changeDate.bind(this)
    }

    componentDidMount() {

        const { groupId } = this.props.match.params;

        getClanMembers(groupId)
        .then(response => {
            this.setState({isLoading: false, memberList: response.results})
        })
    }

    changeDate(newDate) {
        console.log('setting date: ', newDate)
        this.setState({activeDate: newDate})
    }

    render() {

        const { isLoading, activeDate, memberList } = this.state
        const { groupId } = this.props.match.params;

        const home = (
            <div className='clan-details'>
            {isLoading ? <div className='loading'></div> :
            <div className='clan-details-scroll'>
                <ClanDetailsHeader groupId={groupId} activeDate={activeDate} changeDate={this.changeDate} />
                <div className='clan-details-content'>
                    <RaiderTable memberList={memberList} atDate={activeDate} />
                    <PvPTable memberList={memberList} atDate={activeDate} />
                    <GambitTable memberList={memberList} atDate={activeDate} />
                    <StrikeTable memberList={memberList} atDate={activeDate} />
                    <MenagerieTable memberList={memberList} atDate={activeDate} />
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