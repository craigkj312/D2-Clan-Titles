import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getClanMembers } from '../utils/api';
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
            memberList: []
        }

        this.changeDate = this.changeDate.bind(this)
    }

    componentDidMount() {

        const { groupId } = this.props.match.params;

        getClanMembers(groupId)
        .then(response => {
            // console.log(response.results)
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
                    <TitleTable title="Raider" description="Raids Completed." reqFunction={getRaidCount} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Gladiator" description="Wins in the Crucible." reqFunction={getCrucibleWins} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Dredgen" description="Wins in Gambit and Gambit Prime." reqFunction={getGambitWins} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Vanguard" description="Strikes and Nightfalls Completed." reqFunction={getStrikeCount} memberList={memberList} atDate={activeDate} />
                </div>
                <div className='clan-details-section-header'>
                    <div>Seasonal Titles</div>
                    <div className='clan-details-section-subheader'>Monthly titles only available during the Season of Opulence</div>
                </div>
                <div className='clan-details-content'>
                    <TitleTable title="Shadow" description="Menagerie Runs Completed." reqFunction={getMenagerieCount} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Sorrow Bearer" description="Crown of Sorrow Raids Completed." reqFunction={getCoSCount} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Revoker" description="Crucible Sniper Kills." reqFunction={getPvPSniperKills} memberList={memberList} atDate={activeDate} />
                    <TitleTable title="Dances With Wolves" description="Crucible Lord of Wolves Kills." reqFunction={getLoWKills} memberList={memberList} atDate={activeDate} />
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