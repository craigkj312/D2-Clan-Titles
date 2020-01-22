import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { getClan } from '../../utils/api';
import { getDate, formatDate } from '../../utils/utils';

import '../../style/ClanDetailsHeader.css';

class ClanDetailsHeader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            clanDetail: null
        }
    }

    componentDidMount() {
        getClan(this.props.groupId)
        .then(response => {
            this.setState({clanDetail: response.detail})
        })
    }

    generateMonthList = () => {

        let months = []

        const currentDate = new Date()

        for (let y = currentDate.getFullYear(); y >= 2017; y--) {
            let m = 11
            if (y === currentDate.getFullYear()) { m = currentDate.getMonth() }
            let limit = 0
            if (y === 2017) { limit = 8 }
            for (m; m >= limit; m--) {
                let date = getDate(m, y)
                months.push({label: formatDate(date), value: date})
            }
        }

        return months
    }

    navigateToPage(page) {
        this.props.history.push(`/c/${this.props.groupId}/${page}`)
    }

    render() {
        const { activeDate, changeDate, activePage } = this.props
        const { clanDetail } = this.state

        const dateString = formatDate(activeDate);
        let months = this.generateMonthList()

        const header = ( clanDetail ?
            <div className='clan-details-header'>
                <div className='clan-name-container'>
                    <div className='clan-name'>{clanDetail.name}</div>
                    <div className='clan-tag'>[{clanDetail.clanInfo.clanCallsign}]</div>
                    {activePage === 'titles' ? <Dropdown className='month-dropdown' value={dateString} options={months} onChange={val => changeDate(val.value)} /> : null }
                </div>
                <div className='page-nav-container'>
                        <div className={activePage === 'titles' ? 'page-switcher page-switcher-active' : 'page-switcher'} onClick={()=>this.navigateToPage('titles')}>Titles</div>
                        <div className={activePage === 'stats' ? 'page-switcher page-switcher-active' : 'page-switcher'}  onClick={()=>this.navigateToPage('stats')}>Stats</div>
                </div>
            </div>
        : null );

        return (header);
    }
}

ClanDetailsHeader.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

ClanDetailsHeader.contextTypes = {
    router: PropTypes.object
}

export default withRouter(ClanDetailsHeader);