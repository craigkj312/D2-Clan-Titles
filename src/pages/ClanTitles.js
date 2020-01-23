import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { 
    getRaidCount, 
    getCrucibleWins, 
    getGambitWins, 
    getStrikeCount, 
    getIBWins } from '../utils/titles';

import '../style/ClanDetails.css';

import TitleTable from '../components/ClanDetails/ClanTitles/TitleTable';

class ClanTitles extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {

        const { isLoading, activeDate, memberProfiles } = this.props

        const titles = (
            isLoading ? 
                <div className='loading'></div> 
            :
                <div className='clan-details-scroll'>
                    <div className='clan-details-content'>
                        <TitleTable title="Raider" description="Raids Completed." reqFunction={getRaidCount} memberProfiles={memberProfiles} atDate={activeDate} />
                        <TitleTable title="Gladiator" description="Wins in the Crucible." reqFunction={getCrucibleWins} memberProfiles={memberProfiles} atDate={activeDate} />
                        <TitleTable title="Dredgen" description="Wins in Gambit and Gambit Prime." reqFunction={getGambitWins} memberProfiles={memberProfiles} atDate={activeDate} />
                        <TitleTable title="Vanguard" description="Strikes and Nightfalls Completed." reqFunction={getStrikeCount} memberProfiles={memberProfiles} atDate={activeDate} />
                        <TitleTable title="Iron Lord" description="Wins in Iron Banner." reqFunction={getIBWins} memberProfiles={memberProfiles} atDate={new Date("1/21/2020")} />
                    </div>
                </div>
            );

        return (titles);
    }
}

ClanTitles.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

ClanTitles.contextTypes = {
    router: PropTypes.object
}

export default withRouter(ClanTitles);