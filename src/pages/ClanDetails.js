import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getClanMembers, getProfile } from '../utils/api';

import '../style/ClanDetails.css';

import ClanTitles from './ClanTitles';
import ClanStats from './ClanStats';

import ClanDetailsHeader from '../components/ClanDetails/ClanDetailsHeader';

class ClanDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            activeDate: new Date(),
            memberProfiles: []
        }

        this.changeDate = this.changeDate.bind(this)
    }

    componentDidMount() {

        const { groupId } = this.props.match.params;

        getClanMembers(groupId)
        .then(response => {
            // console.log(response.results)
            let memberProfileRequests = response.results.map((member) => {
                let type = member.destinyUserInfo.membershipType
                let id = member.destinyUserInfo.membershipId
                return getProfile(type, id, [100, 200])
            })
            Promise.all(memberProfileRequests)
            .then(response => {
                console.log(response)
                this.setState({isLoading: false, memberProfiles: response})
            })
        })
    }

    changeDate(newDate) {
        console.log('setting date: ', newDate)
        this.setState({activeDate: newDate})
    }

    render() {

        const { isLoading, activeDate, memberProfiles } = this.state
        const { groupId, page } = this.props.match.params;

        const home = (
            <div className='clan-details'>
                <ClanDetailsHeader groupId={groupId} activeDate={activeDate} changeDate={this.changeDate} activePage={page} />
                { page === 'titles' ? <ClanTitles isLoading={isLoading} activeDate={activeDate} memberProfiles={memberProfiles} /> : null }
                { page === 'stats' ? <ClanStats isLoading={isLoading} activeDate={activeDate} memberProfiles={memberProfiles} /> : null }
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