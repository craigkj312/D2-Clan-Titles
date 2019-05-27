import React from 'react';
import { getRaidCount } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class RaiderTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            raidCounts: {}
        }
    }

    componentDidMount() {
        let raidCounts = {}
        this.props.memberList.forEach((member) => {
            getRaidCount(member.destinyUserInfo.membershipId)
            .then(response => {
                // console.log(member.destinyUserInfo.displayName, response)
                raidCounts[member.destinyUserInfo.displayName] = response
                if (Object.keys(raidCounts).length === this.props.memberList.length) {
                    this.setState({isLoading: false, raidCounts: raidCounts})
                }
            })
        })
    }

    render() {
        const { isLoading, raidCounts } = this.state
        let sortedMembers = Object.keys(raidCounts).sort(function(a,b){return raidCounts[b]-raidCounts[a]})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Raider</div>
                    <div className='table-sub-header'>Raids Completed.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member} count={raidCounts[member]} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}