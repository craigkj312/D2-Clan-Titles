import React from 'react';
import Dropdown from 'react-dropdown';
import { getClan } from '../../utils/api';
import { getDate, formatDate } from '../../utils/utils';

import '../../style/ClanDetailsHeader.css';

export default class ClanDetailsHeader extends React.Component {

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

    render() {
        const { activeDate, changeDate } = this.props
        const { clanDetail } = this.state

        const dateString = formatDate(activeDate);
        let months = this.generateMonthList()

        const header = ( clanDetail ?
            <div className='clan-details-header'>
                <div className='clan-name-container'>
                    <div className='clan-name'>{clanDetail.name}</div>
                    <div className='clan-tag'>[{clanDetail.clanInfo.clanCallsign}]</div>
                    <Dropdown className='month-dropdown' value={dateString} options={months} onChange={val => changeDate(val.value)} />
                </div>
            </div>
        : null );

        return (header);
    }
}