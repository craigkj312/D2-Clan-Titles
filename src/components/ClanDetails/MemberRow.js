import React from 'react';

import '../../style/ClanDetails.css';

export default class MemberRow extends React.Component {

    render() {

        const { rank, name, count } = this.props

        const row = (
            <div className='member-row'>
                <div>{rank}</div>
                <div>{name}</div>
                <div>{count}</div>
            </div>
        );

        return (row);
    }
}