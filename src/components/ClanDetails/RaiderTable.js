import React from 'react';
import { getRaidCount } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class RaiderTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            raidCounts: []
        }
    }

    componentDidMount() {
        let memberMap = this.props.memberList.map((member) => {
            return getRaidCount(member.destinyUserInfo.displayName, member.destinyUserInfo.membershipId)
        })
        Promise.all(memberMap)
        .then(response => {
            this.setState({isLoading: false, raidCounts: response})
        })
    }

    render() {
        const { isLoading, raidCounts } = this.state
        let sortedMembers = raidCounts.sort(function(a,b){return b.raidCount-a.raidCount})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Raider</div>
                    <div className='table-sub-header'>Raids Completed.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.name} count={member.raidCount} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}