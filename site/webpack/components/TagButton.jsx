import React, { Component } from 'react';

class TagButton extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }

  handleClick(e, name) {
    e.preventDefault();

    this.setState({
      active: !this.state.active
    });

    this.props.onToggle(name)
  }

  render() {
    return (
        <button onClick={(e) => this.handleClick(e, this.props.tagName)} type="button" className={"btn " + (this.state.active ? 'btn-primary' : 'btn-default' )} > {this.props.tagName} <span className="badge">{this.props.tagCount}</span></button> 
    )
  }
}

export default TagButton;
