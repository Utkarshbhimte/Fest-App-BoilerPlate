import React, {Component} from 'react';

class Header extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div className="header-wrap">
                <header>
                    <a className="logout" onClick={() => this.props.logout()}> > </a>
                    <h3 >Awesome Fest 2017</h3>
                    <div className="tabs-wrap">
                        <div onClick={() => this.props.onTabClick('0')}
                             className={ this.props.activeTab===0 ? 'active tab fav' : 'tab fav '}>MY SCHEDULE</div>
                        <div onClick={() => this.props.onTabClick('1')}
                             className={ this.props.activeTab===1 ? 'active tab day' : 'tab day'}>1</div>
                        <div onClick={() => this.props.onTabClick('2')}
                             className={ this.props.activeTab===2 ? 'active tab day' : 'tab day'}>2</div>
                        <div onClick={() => this.props.onTabClick('3')}
                             className={ this.props.activeTab===3 ? 'active tab day' : 'tab day'}>i</div>
                    </div>
                </header>
            </div>
        );
    }
}
export default Header;
