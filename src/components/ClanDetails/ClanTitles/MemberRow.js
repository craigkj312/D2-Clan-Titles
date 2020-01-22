import React from 'react';

import '../../../style/ClanDetails.css';

export default class MemberRow extends React.Component {

    render() {

        const { rank, name, count } = this.props

        const row = (
            <div className='member-row'>
                <div className='row-left-side'>
                    <div className='row-rank'>{rank}</div>
                    <div className='row-name'>{name}</div>
                </div>
                <div>{count}</div>
            </div>
        );

        return (row);
    }
}