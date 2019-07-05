import React from 'react';

import '../../style/ClanDetails.css';

import MemberRow from './MemberRow';

export default class TitleTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            counts: []
        }
    }

    componentDidMount() {
        this.setCounts(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.setState({isLoading: true})
        this.setCounts(newProps)
    }

    setCounts = (p) => {
        const { memberProfiles, atDate, reqFunction } = p
        let memberMap = memberProfiles.map((member) => {
            return reqFunction(member, atDate)
        })
        Promise.all(memberMap)
        .then(response => {
            this.setState({isLoading: false, counts: response})
        })
    }

    render() {
        const { title, description } = this.props
        const { isLoading, counts } = this.state
        let sortedMembers = counts.sort(function(a,b){return b.count-a.count})

        const table = (
            <div className='title-table'>
                <div className='table-header'> 
                    <div>{title}</div>
                    <div className='table-sub-header'>{description}</div>
                </div>
                {isLoading ? <div className='loading'></div> :
                <div className='table-content'>
                    {sortedMembers.map((member, i) => {
                        return <MemberRow key={i} rank={i+1} name={member.name} count={member.count} />
                    })}
                </div>}
            </div>
        );

        return (table);
    }
}