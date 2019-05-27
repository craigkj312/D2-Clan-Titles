import React from 'react';
import { getStrikeCount } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class StrikeTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            strikeCounts: {}
        }
    }

    componentDidMount() {
        let strikeCounts = {}
        this.props.memberList.forEach((member) => {
            getStrikeCount(member.destinyUserInfo.membershipId)
            .then(response => {
                // console.log(member.destinyUserInfo.displayName, response)
                strikeCounts[member.destinyUserInfo.displayName] = response
                if (Object.keys(strikeCounts).length === this.props.memberList.length) {
                    this.setState({isLoading: false, strikeCounts: strikeCounts})
                }
            })
        })
    }

    render() {
        const { isLoading, strikeCounts } = this.state
        let sortedMembers = Object.keys(strikeCounts).sort(function(a,b){return strikeCounts[b]-strikeCounts[a]})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Vanguard</div>
                    <div className='table-sub-header'>Strikes and Nightfalls Completed.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member} count={strikeCounts[member]} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}