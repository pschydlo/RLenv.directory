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

        this.setState({
            'active': title,
        });

        document.dispatchEvent(new MouseEvent('click'));

        this.props.onSelect(title)
    }
    

    render() {
        const activeKey = this.state.active;
        return (
            <DropdownButton className='Primary' title={this.state.active} id="dropDown">
            {this.props.options.map(option =>
                <MenuItem key={option} onClick={(e) => this.handleClick(e, option)} onSelect={() => null}>{option}</MenuItem>
            )}
            </DropdownButton>
        )
    }
}

export default DropBot;