import DropBot from './DropBot';
import React, { Component } from 'react';

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter_opt: {}
    };

    this.complexitySelect = this.complexitySelect.bind(this);
    this.agentsSelect = this.agentsSelect.bind(this);
    this.sortSelect = this.sortSelect.bind(this);
  }

  complexitySelect(level){
    var filter_opt = this.state.filter_opt
    filter_opt['complexity'] = level.toLowerCase()

    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  agentsSelect(num){
    var num = parseInt(num[0])

    var filter_opt = this.state.filter_opt
    filter_opt['agents'] = num

    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  sortFunc(attribute, order){
    return function(a,b) {
      return (a[attribute] > b[attribute]) ? 1*order : ((b[attribute] > a[attribute]) ? -1*order : 0);
    }
  }

  sortSelect(sort){
    var sort_dict = {"Stars asc.": this.sortFunc("stars", 1), 
                     "Stars desc.": this.sortFunc("stars", -1), 
                     "Name asc.": this.sortFunc("name", 1),
                     "Name desc.": this.sortFunc("name", -1)}
    
    this.props.onSort(sort_dict[sort])
  }

  render() {
    return (
      <div>
      
      <DropBot onSelect={this.sortSelect} options={["Stars asc.", "Stars desc.", "Name asc.", "Name desc."]} text="Sort"/>
       
      <DropBot onSelect={this.agentsSelect} options={["1", "2", "3+"]} text="Agents"/>

      <DropBot onSelect={this.complexitySelect} options={["Low", "Medium", "High"]} text="Complexity"/>



      </div> 
    )
  }
}

export default ControlPanel;