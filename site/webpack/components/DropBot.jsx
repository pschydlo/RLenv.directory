import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

import React, { Component } from 'react';

class DropBot extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          'active': this.props.text,
        };
      }

    handleClick(e, title) {
        e.preventDefault();

        let renderText = title;
        if(renderText == 'All') {
            let button = e.target.parentElement.parentElement.previousSibling;
            renderText = button.getAttribute('data-text');
        }
        this.setState({
            'active': renderText,
        });

        document.dispatchEvent(new MouseEvent('click'));

        this.props.onSelect(title)
    }
    

    render() {
        const activeKey = this.state.active;
        return (
            <DropdownButton className='Primary' title={this.state.active} id="dropDown" data-text={this.props.text}>
            {this.props.options.map(option => this.renderMenuItem(option))}
            </DropdownButton>
        )
    }

    renderMenuItem(option) {
        if(option == ':divider:') {
            return <MenuItem divider />
        } else {
            return <MenuItem key={option} onClick={(e) => this.handleClick(e, option)} onSelect={() => null}>{option}</MenuItem> 
        }
    }
}

export default DropBot;