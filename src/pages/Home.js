import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { searchUsers } from '../utils/api';

import '../style/Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            users: []
        }

        this.fieldChanged = this.fieldChanged.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    componentDidMount() {

    }

    fieldChanged(newVal) {
        if (newVal.length > 2) {
            searchUsers(newVal)
            .then(response => {
                // console.log(response)
                if (response && response.length > 0) {
                    this.setState({users: response})
                }
            })
        }
    }

    selectUser(user) {
        this.props.history.push(`/u/${user.membershipType}/${user.membershipId}`)
    }

    render() {

        const { isLoading, users } = this.state;

        const home = (
            isLoading ? <div className='loading'></div> :
            <div className='home'>
                <input className='search-field' 
                    placeholder='Battle.net | PSN | Xbox Live' 
                    onChange={e => this.fieldChanged(e.target.value)} 
                />
                <ul className='user-list'>
                {users.length > 0 ? 
                    users.map((user, index) => (
                        <li className='user-list-row' key={index} onClick={() => this.selectUser(user)}>
                            {user.displayName}
                        </li>
                    ))
                : null}
                </ul>
            </div>
        );

        return (home);
    }
}

Home.propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.any
}

Home.contextTypes = {
    router: PropTypes.object
}

export default withRouter(Home);

//.filter(user => !inputValue || user.includes(inputValue))