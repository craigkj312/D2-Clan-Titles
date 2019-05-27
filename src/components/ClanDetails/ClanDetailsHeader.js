import React from 'react';
import Dropdown from 'react-dropdown';
import { getClan } from '../../utils/api';
import { formatDate } from '../../utils/utils';

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

    render() {
        const { activeDate, changeDate } = this.props
        const { clanDetail } = this.state

        const dateString = formatDate(activeDate);

        let months = [
            {label:'May 2019', value: new Date('May 2019') },
            {label:'April 2019', value: new Date('April 2019') },
            {label:'March 2019', value: new Date('March 2019')  },
        ]

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