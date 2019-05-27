import React from 'react';
import { getCrucibleWins } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class PvPTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            winCounts: []
        }
    }

    componentDidMount() {
        let memberMap = this.props.memberList.map((member) => {
            return getCrucibleWins(member.destinyUserInfo.displayName, member.destinyUserInfo.membershipId)
        })
        Promise.all(memberMap)
        .then(response => {
            this.setState({isLoading: false, winCounts: response})
        })
    }

    render() {
        const { isLoading, winCounts } = this.state
        let sortedMembers = winCounts.sort(function(a,b){return b.crucibleWins-a.crucibleWins})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Gladiator</div>
                    <div className='table-sub-header'>Wins in the Crucible.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.name} count={member.crucibleWins} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}