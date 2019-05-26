import React from 'react';
import { getClan } from '../../utils/api';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class PvPTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        // getClan(this.props.groupId)
        // .then(response => {
        //     this.setState({clanDetail: response.detail})
        // })
    }

    render() {
        const { isLoading } = this.state
        const { memberList } = this.props

        const table = (
            <div className='title-table'>
                <div className='table-header'> Top Frag </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {memberList.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.destinyUserInfo.displayName} count={0} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}