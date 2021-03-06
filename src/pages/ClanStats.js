import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { getHistoricalStatsForAccount } from '../utils/api';

import '../style/ClanDetails.css';
import '../style/ClanStats.css';

import MemberRow from '../components/ClanDetails/ClanTitles/MemberRow';

class ClanStats extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tableLoading: true,
            memberStats: [],
            tableStats:[],
            activeMode: {label:'PvP', value:'allPvP'},
            activeStat: {label:'Total Matches', value:'activitiesEntered'}
        }

        this.modeOptions = [
            {label:'PvP', value:'allPvP'}, 
            {label:'PvE', value:'allPvE'}
        ]
        this.statPvPOptions = [
            {label:'Total Matches', value:'activitiesEntered'},
            {label:'Matches Won', value:'activitiesWon'},
            {label:'Time Played', value:'secondsPlayed'},
            {label:'Kills', value:'kills'},
            {label:'Deaths', value:'deaths'},
            {label:'Assists', value:'assists'},
            {label:'Opponents Defeated', value:'opponentsDefeated'},
            {label:'Average Kill Distance', value:'averageKillDistance'},
            {label:'Longest Kill Distance', value:'longestKillDistance'},
            {label:'Average Lifespan', value:'averageLifespan'},
            {label:'Longest Life', value:'longestSingleLife'},
            {label:'K/D', value:'killsDeathsRatio'},
            {label:'KDA', value:'killsDeathsAssists'},
            {label:'Efficiency', value:'efficiency'},
            {label:'Kills (Single Game)', value:'bestSingleGameKills'},
            {label:'Precision Kills', value:'precisionKills'},
            {label:'Precision Kills (Single Game)', value:'mostPrecisionKills'},
            {label:'Longest Spree', value:'longestKillSpree'},
            {label:'Suicides', value:'suicides'},
            {label:'Resurrections Performed', value:'resurrectionsPerformed'},
            {label:'Resurrections Received', value:'resurrectionsReceived'},
            {label:'Objectives Completed', value:'objectivesCompleted'},
            {label:'Win/Loss', value:'winLossRatio'},
            {label:'Orbs Dropped', value:'orbsDropped'},
            {label:'Orbs Gathered', value:'orbsGathered'},
            {label:'Biggest Quitter', value:'remainingTimeAfterQuitSeconds'},
            {label:'Auto Rifle Kills', value:'weaponKillsAutoRifle'},
            {label:'Beam Rifle Kills', value:'weaponKillsBeamRifle'},
            {label:'Bow Kills', value:'weaponKillsBow'},
            {label:'Fusion Rifle Kills', value:'weaponKillsFusionRifle'},
            {label:'Grenade Launcher Kills', value:'weaponKillsGrenadeLauncher'},
            {label:'Hand Cannon Kills', value:'weaponKillsHandCannon'},
            {label:'Linear Fusion Rifle Kills', value:'weaponKillsTraceRifle'},
            {label:'Machine Gun Kills', value:'weaponKillsMachineGun'},
            {label:'Pulse Rifle Kills', value:'weaponKillsPulseRifle'},
            {label:'Rocket Launcher Kills', value:'weaponKillsRocketLauncher'},
            {label:'Scout Rifle Kills', value:'weaponKillsScoutRifle'},
            {label:'Shotgun Kills', value:'weaponKillsShotgun'},
            {label:'Sniper Kills', value:'weaponKillsSniper'},
            {label:'SMG Kills', value:'weaponKillsSubmachinegun'},
            {label:'Side Arm Kills', value:'weaponKillsSideArm'},
            {label:'Sword Kills', value:'weaponKillsSword'},
            {label:'Ability Kills', value:'weaponKillsAbility'},
            {label:'Grenade Kills', value:'weaponKillsGrenade'},
            {label:'Melee Kills', value:'weaponKillsMelee'},
            {label:'Super Kills', value:'weaponKillsSuper'},
            {label:'Relic Kills', value:'weaponKillsRelic'},
            {label:'Best Weapon', value:'weaponBestType'}
        ]
        this.statPvEOptions = [
            {label:'Total Activites', value:'activitiesEntered'},
            {label:'Activities Cleared', value:'activitiesCleared'},
            {label:'Time Played', value:'secondsPlayed'},
            {label:'Public Events', value:'publicEventsCompleted'},
            {label:'Heroic Public Events', value:'heroicPublicEventsCompleted'},
            {label:'Adventures', value:'adventuresCompleted'},
            {label:'Highest Light Level', value:'highestLightLevel'},
            {label:'Kills', value:'kills'},
            {label:'Deaths', value:'deaths'},
            {label:'Assists', value:'assists'},
            {label:'Opponents Defeated', value:'opponentsDefeated'},
            {label:'Average Kill Distance', value:'averageKillDistance'},
            {label:'Longest Kill Distance', value:'longestKillDistance'},
            {label:'Average Lifespan', value:'averageLifespan'},
            {label:'Longest Life', value:'longestSingleLife'},
            {label:'K/D', value:'killsDeathsRatio'},
            {label:'KDA', value:'killsDeathsAssists'},
            {label:'Efficiency', value:'efficiency'},
            {label:'Kills (Single Activity)', value:'bestSingleGameKills'},
            {label:'Precision Kills', value:'precisionKills'},
            {label:'Precision Kills (Single Activity)', value:'mostPrecisionKills'},
            {label:'Longest Spree', value:'longestKillSpree'},
            {label:'Suicides', value:'suicides'},
            {label:'Resurrections Performed', value:'resurrectionsPerformed'},
            {label:'Resurrections Received', value:'resurrectionsReceived'},
            {label:'Objectives Completed', value:'objectivesCompleted'},
            {label:'Score', value:'score'},
            {label:'Orbs Dropped', value:'orbsDropped'},
            {label:'Orbs Gathered', value:'orbsGathered'},
            {label:'Biggest Quitter', value:'remainingTimeAfterQuitSeconds'},
            {label:'Auto Rifle Kills', value:'weaponKillsAutoRifle'},
            {label:'Beam Rifle Kills', value:'weaponKillsBeamRifle'},
            {label:'Bow Kills', value:'weaponKillsBow'},
            {label:'Fusion Rifle Kills', value:'weaponKillsFusionRifle'},
            {label:'Grenade Launcher Kills', value:'weaponKillsGrenadeLauncher'},
            {label:'Hand Cannon Kills', value:'weaponKillsHandCannon'},
            {label:'Linear Fusion Rifle Kills', value:'weaponKillsTraceRifle'},
            {label:'Machine Gun Kills', value:'weaponKillsMachineGun'},
            {label:'Pulse Rifle Kills', value:'weaponKillsPulseRifle'},
            {label:'Rocket Launcher Kills', value:'weaponKillsRocketLauncher'},
            {label:'Scout Rifle Kills', value:'weaponKillsScoutRifle'},
            {label:'Shotgun Kills', value:'weaponKillsShotgun'},
            {label:'Sniper Kills', value:'weaponKillsSniper'},
            {label:'SMG Kills', value:'weaponKillsSubmachinegun'},
            {label:'Side Arm Kills', value:'weaponKillsSideArm'},
            {label:'Sword Kills', value:'weaponKillsSword'},
            {label:'Ability Kills', value:'weaponKillsAbility'},
            {label:'Grenade Kills', value:'weaponKillsGrenade'},
            {label:'Melee Kills', value:'weaponKillsMelee'},
            {label:'Super Kills', value:'weaponKillsSuper'},
            {label:'Relic Kills', value:'weaponKillsRelic'},
            {label:'Best Weapon', value:'weaponBestType'}
        ]

        this.sortData = this.sortData.bind(this)

    }

    componentDidMount() {
        const { memberProfiles } = this.props;
        this.requestStats(memberProfiles)
    }

    componentWillReceiveProps(props) {
        const { memberProfiles } = props;
        this.setState({tableLoading: true})
        this.requestStats(memberProfiles)
    }

    requestStats(memberProfiles) {
        let memberStatsRequests = memberProfiles.map((member) => {
            let type = member.profile.data.userInfo.membershipType
            let id = member.profile.data.userInfo.membershipId
            let name = member.profile.data.userInfo.displayName
            return getHistoricalStatsForAccount(name, id, type, ['general'])
        })
        Promise.all(memberStatsRequests)
        .then(response => {
            console.log(response)
            let defaultMap = response.map(function(r){ 
                return {
                    name: r.playerName,
                    value: r.stats.mergedAllCharacters.results.allPvP.allTime.activitiesEntered.basic.value,
                    displayValue: r.stats.mergedAllCharacters.results.allPvP.allTime.activitiesEntered.basic.displayValue,
                }
            })
            let sortedStats = defaultMap.sort(function(a,b){return b.value-a.value})
            this.setState({tableLoading: false, memberStats: response, tableStats: sortedStats})
        })
    }

    sortData(newMode, newStat) {
        let { memberStats, activeMode } = this.state
        let stat = newStat
        if (newMode.value !== activeMode.value) {
            stat = newMode.value === 'allPvE' ? this.statPvEOptions[0] : this.statPvPOptions[0]
        }
        let statMap = memberStats.map(function(r){ 
            return {
                name: r.playerName,
                value: r.stats.mergedAllCharacters.results[newMode.value].allTime[stat.value].basic.value,
                displayValue: r.stats.mergedAllCharacters.results[newMode.value].allTime[stat.value].basic.displayValue,
            }
        })
        let sortedStats = statMap.sort(function(a,b){return b.value-a.value})
        this.setState({activeMode: newMode, activeStat: stat, tableStats: sortedStats})
    }

    render() {

        const { tableLoading, tableStats, activeMode, activeStat } = this.state
        const { isLoading } = this.props

        const statOptions = activeMode.value === 'allPvE' ? this.statPvEOptions : this.statPvPOptions

        const stats = (
            <div className='clan-stats'>
                { isLoading || tableLoading ? 
                    <div className='loading'></div> 
                :
                    <div className='clan-stats-content'>
                        <div className='filter-bar'>
                            <Dropdown key='mode' className='stat-dropdown' value={activeMode} options={this.modeOptions} onChange={m => this.sortData(m, activeStat)} />
                            <Dropdown key='stat' className='stat-dropdown' value={activeStat} options={statOptions} onChange={s => this.sortData(activeMode, s)} />
                        </div>
                        <div className='stats-table-content'>
                            {tableStats.map((member, i) => {
                                return <MemberRow key={i} rank={i+1} name={member.name} count={member.displayValue} />
                            })}
                        </div>
                    </div>
                }
            </div>
        );

        return (stats);
    }
}

ClanStats.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

ClanStats.contextTypes = {
    router: PropTypes.object
}

export default withRouter(ClanStats);