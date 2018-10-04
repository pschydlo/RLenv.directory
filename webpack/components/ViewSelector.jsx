import React, { Component } from 'react';

class ViewSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
        selected: 'grid'
    }

    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(view){
    this.setState({
        selected: view
    })

    this.props.onViewChange(view)
  }
 
  render() {
    return (
    <div className="view-selector">
        <button onClick={() => this.clickHandler('grid')}  className={"btn btn-light " + (this.state.selected == 'grid' ? 'view-selected' : '')}> <i className="fas fa-grip-horizontal"></i></button>
        <button onClick={() => this.clickHandler('detail')} className={"btn btn-light " + (this.state.selected == 'grid' ? '' : 'view-selected')}> <i  className="fas fa-align-justify"></i></button>
    </div>
    );
  }
}

export default ViewSelector;