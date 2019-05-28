import React from 'react';
import { getStrikeCount } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class StrikeTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            strikeCounts: []
        }
    }

    componentDidMount() {
        this.setStrikeCount(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.setState({isLoading: true})
        this.setStrikeCount(newProps)
    }

    setStrikeCount = (p) => {
        const { memberList, atDate } = p
        let memberMap = memberList.map((member) => {
            return getStrikeCount(member.destinyUserInfo.displayName, member.destinyUserInfo.membershipId, atDate)
        })
        Promise.all(memberMap)
        .then(response => {
            this.setState({isLoading: false, strikeCounts: response})
        })
    }

    render() {
        const { isLoading, strikeCounts } = this.state
        let sortedMembers = strikeCounts.sort(function(a,b){return b.strikeCount-a.strikeCount})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Vanguard</div>
                    <div className='table-sub-header'>Strikes and Nightfalls Completed.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.name} count={member.strikeCount} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}