/**
 * Created by utkarsh on 16/02/17.
 */
import React, {Component} from 'react';

class Admin extends Component {
    constructor(){
        super();
        this.state = {
            events: null,
            activeTab: 1
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    // Filtering the Events acc to the Tabs
    onTabClick = (state) => {
        this.setState({
            activeTab : parseInt(state)
        })
    };


    render() {
        return (
            <div>
                <Header onTabClick={this.onTabClick}
                        activeTab={this.state.activeTab}/>
            </div>
        );
    }
}

Admin.propTypes = {};
Admin.defaultProps = {};

export default Admin;
