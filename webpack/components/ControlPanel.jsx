import TagButton from './TagButton';
import DropBot from './DropBot';
import React, { Component } from 'react';

class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter_opt: { 
        tags: [],
        complexity: null,
        agents: null
      }
    };

    this.tagToggle = this.tagToggle.bind(this);
    this.complexitySelect = this.complexitySelect.bind(this);
    this.agentsSelect = this.agentsSelect.bind(this);
  }

  tagToggle(tag){

    var tags = this.state.filter_opt.tags
    if ((tags.indexOf(tag) > -1)) {
      tags = tags.filter(e => e !== tag);
    }else{
      tags.push(tag)
    }
    
    var filter_opt = this.state.filter_opt
    filter_opt.tags = tags
    
    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  complexitySelect(level){
    var filter_opt = this.state.filter_opt
    filter_opt.complexity = level.toLowerCase()

    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  agentsSelect(num){
    var num = parseInt(num[0])

    var filter_opt = this.state.filter_opt
    filter_opt.agents = num

    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  render() {
    var tags = this.props.tags

    return (
      <div>
      <h2>Filter</h2>
       
       <h3>Nº Agents</h3>
       
       <DropBot onSelect={this.agentsSelect} options={["1", "2", "3+"]} text="Agents"/>

       <h3>Complexity</h3>
       
       <DropBot onSelect={this.complexitySelect} options={["Low", "Medium", "High"]} text="Complexity"/>

       <h3>Tag</h3>

      {Object.keys(tags).map( tag => 
      <TagButton onToggle={this.tagToggle} tagName={tag} tagCount={tags[tag]}/>
      )}

      </div> 
    )
  }
}

export default ControlPanel;