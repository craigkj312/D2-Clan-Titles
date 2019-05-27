import React from 'react';
import { getGambitWins } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class PvPTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            winCounts: {}
        }
    }

    componentDidMount() {
        let winCounts = {}
        this.props.memberList.forEach((member) => {
            getGambitWins(member.destinyUserInfo.membershipId)
            .then(response => {
                winCounts[member.destinyUserInfo.displayName] = response
                if (Object.keys(winCounts).length === this.props.memberList.length) {
                    this.setState({isLoading: false, winCounts: winCounts})
                }
            })
        })
    }

    render() {
        const { isLoading, winCounts } = this.state
        let sortedMembers = Object.keys(winCounts).sort(function(a,b){return winCounts[b]-winCounts[a]})

        const table = (
            <div className='title-table'>
                <div className='table-header'> Dredgen </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member} count={winCounts[member]} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}