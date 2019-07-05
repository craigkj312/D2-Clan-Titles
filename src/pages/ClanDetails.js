import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { createCharactersMap } from '../utils/utils';
import { getClanMembers, getProfile } from '../utils/api';
import { 
    getRaidCount, 
    getCrucibleWins, 
    getGambitWins, 
    getStrikeCount, 
    getMenagerieCount,
    getCoSCount,
    getPvPSniperKills,
    getLoWKills } from '../utils/titles';

import '../style/ClanDetails.css';

import ClanDetailsHeader from '../components/ClanDetails/ClanDetailsHeader';
import TitleTable from '../components/ClanDetails/TitleTable';

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
            let memberProfileRequests = response.results.map((member) => {
                return getProfile(4, member.destinyUserInfo.membershipId, [100, 200])
            })
            Promise.all(memberProfileRequests)
            .then(response => {
                // console.log(response)
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
        const { groupId } = this.props.match.params;

        const home = (
            <div className='clan-details'>
            {isLoading ? <div className='loading'></div> :
            <div className='clan-details-scroll'>
                <ClanDetailsHeader groupId={groupId} activeDate={activeDate} changeDate={this.changeDate} />
                <div className='clan-details-content'>
                    <TitleTable title="Raider" description="Raids Completed." reqFunction={getRaidCount} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Gladiator" description="Wins in the Crucible." reqFunction={getCrucibleWins} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Dredgen" description="Wins in Gambit and Gambit Prime." reqFunction={getGambitWins} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Vanguard" description="Strikes and Nightfalls Completed." reqFunction={getStrikeCount} memberProfiles={memberProfiles} atDate={activeDate} />
                </div>
                <div className='clan-details-section-header'>
                    <div>Seasonal Titles</div>
                    <div className='clan-details-section-subheader'>Monthly titles only available during the Season of Opulence</div>
                </div>
                <div className='clan-details-content'>
                    <TitleTable title="Shadow" description="Menagerie Runs Completed." reqFunction={getMenagerieCount} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Sorrow Bearer" description="Crown of Sorrow Raids Completed." reqFunction={getCoSCount} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Revoker" description="Crucible Sniper Kills." reqFunction={getPvPSniperKills} memberProfiles={memberProfiles} atDate={activeDate} />
                    <TitleTable title="Dances With Wolves" description="Crucible Lord of Wolves Kills." reqFunction={getLoWKills} memberProfiles={memberProfiles} atDate={activeDate} />
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