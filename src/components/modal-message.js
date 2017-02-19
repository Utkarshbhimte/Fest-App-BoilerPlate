/**
 * Created by utkarsh on 19/02/17.
 */
import React, {Component} from 'react';
import moment from 'moment'
import $ from 'jquery'

class ModalMessage extends Component {
    componentDidMount(){
        let typeClass = this.props.msgType ? 'success' : 'error';
        const $UserMsg = $('.user-message')
            setTimeout(function(){
                $UserMsg.addClass(typeClass).addClass('entry').delay(1000).queue(()=>{
                    $UserMsg.addClass('exit');
                })
            }.bind(this),1000)

    }

    render()
    {
        // ${this.props.msgType ? 'success' : 'error'}
        return (
            <div className={`user-message`}>
                {this.props.message}
            </div>
        );
    }
}

ModalMessage.propTypes = {};
ModalMessage.defaultProps = {};

export default ModalMessage;

