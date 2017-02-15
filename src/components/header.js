import React, {Component} from 'react';

class Header extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div className="header-wrap">
                <header>
                    <h3>Awesome Fest 2017</h3>
                    <div className="tabs-wrap">
                        <div onClick={() => this.props.onTabClick('0')}
                             className={ this.props.activeTab===0 ? 'active tab fav' : 'tab fav '}>REGISTERED</div>
                        <div onClick={() => this.props.onTabClick('1')}
                             className={ this.props.activeTab===1 ? 'active tab day' : 'tab day'}>1</div>
                        <div onClick={() => this.props.onTabClick('2')}
                             className={ this.props.activeTab===2 ? 'active tab day' : 'tab day'}>2</div>
                    </div>
                </header>
            </div>
        );
    }
}
export default Header;
