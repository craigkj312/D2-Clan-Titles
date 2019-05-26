import React from 'react';
import { getClan } from '../../utils/api';

import '../../style/ClanDetails.css';

export default class RaiderTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
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

        const table = (
            <div className='title-table'>
                <div className='table-header'> Raider </div>
                {isLoading ? <div className='loading'></div> :
                <div>
                    
                </div>}
            </div>
        );

        return (table);
    }
}