import React from 'react';
import { getClan } from '../../utils/api';

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
        const { clanDetail } = this.state

        const header = ( clanDetail ?
            <div className='clan-details-header'>
                <div className='clan-name'>{clanDetail.name}</div>
                <div className='clan-tag'>[{clanDetail.clanInfo.clanCallsign}]</div>
            </div>
        : null );

        return (header);
    }
}