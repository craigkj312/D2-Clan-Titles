import React from 'react';
import { getMenagerieCount } from '../../utils/utils';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class MenagerieTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            menagerieCounts: []
        }
    }

    componentDidMount() {
        this.setCount(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.setState({isLoading: true})
        this.setCount(newProps)
    }

    setCount = (p) => {
        const { memberList, atDate } = p
        let memberMap = memberList.map((member) => {
            return getMenagerieCount(member.destinyUserInfo.displayName, member.destinyUserInfo.membershipId, atDate)
        })
        Promise.all(memberMap)
        .then(response => {
            this.setState({isLoading: false, menagerieCounts: response})
        })
    }

    render() {
        const { isLoading, menagerieCounts } = this.state
        let sortedMembers = menagerieCounts.sort(function(a,b){return b.menagerieCount-a.menagerieCount})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>Shadow</div>
                    <div className='table-sub-header'>Menagerie Runs Completed.</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.name} count={member.menagerieCount} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}