import DropBot from './DropBot';
import React, { Component } from 'react';

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    // Initialize filter with no constraints
    this.state = {
      filter_opt: {}
    };

    // React boilerplate
    this.complexitySelect = this.complexitySelect.bind(this);
    this.agentsSelect = this.agentsSelect.bind(this);
    this.sortSelect = this.sortSelect.bind(this);
    this.updateFilterOptions = this.updateFilterOptions.bind(this)
  }

  // Callback function for agent dropdown selection
  complexitySelect(level){
    var level = level.toLowerCase()

    var filterFn = function(env)
    { 
      if (level == 'all') return true
      if (env.complexity != level) return false 
      return true
    }

    this.updateFilterOptions('complexity', filterFn)
  }


  // Callback function for agent dropdown selection
  agentsSelect(num_agents){
    // Extract the number of agents
    var num = parseInt(num_agents[0])

    var filterFn = function(env) 
    { 
      if (num_agents == 'All') return true
      if ((num != 3 && env.num_agents != num) || (num == 3 && env.num_agents < 3) ) return false
      return true
    }
          
    this.updateFilterOptions('agents', filterFn)
  }

  updateFilterOptions(key, value){
    // Add the filter constraint to filter options
    var filter_opt = this.state.filter_opt
    filter_opt[key] = value

    // Update component state
    this.setState({
      filter_opt: filter_opt
    })

    // Communicate filter update to parent component
    this.props.onUpdate(filter_opt)
  }

  // Callback function for sort dropdown selection
  sortSelect(selected){
    // Dictionary which contains the sorting function associated to every selected option.
    var sort_dict = {"Stars asc." : this.sortFunc("stars", 1), 
                     "Stars desc.": this.sortFunc("stars", -1), 
                     "Name asc."  : this.sortFunc("name", 1),
                     "Name desc." : this.sortFunc("name", -1)}
    
    // Communicate the sort request to the parent component
    this.props.onSort(sort_dict[selected])
  }

  // Generic comparison function which gets sent to parent for use
  sortFunc(attribute, order){
    return function(a,b) {
      return (a[attribute] > b[attribute]) ? 1*order : ((b[attribute] > a[attribute]) ? -1*order : 0);
    }
  }

  // Component render function
  render() {
    return (
      <div>
      
        <DropBot onSelect={this.sortSelect} options={["Stars asc.", "Stars desc.", "Name asc.", "Name desc."]} text="Sort"/>
        
        <DropBot onSelect={this.agentsSelect} options={["1", "2", "3+", "<hr/>", "All"]} text="Agents"/>

        <DropBot onSelect={this.complexitySelect} options={["Low", "Medium", "High", "<hr/>", "All"]} text="Complexity"/>

      </div> 
    )
  }
}

export default ControlPanel;