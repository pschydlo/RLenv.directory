import TagButton from './TagButton';
import React, { Component } from 'react';

class TagPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter_opt: { 
        tags: []
      }
    };

    this.tagToggle = this.tagToggle.bind(this);
  }

  tagToggle(tag){

    var tags = this.state.filter_opt.tags
    if ((tags.indexOf(tag) > -1)) {
      tags = tags.filter(e => e !== tag);
    }else{
      tags.push(tag)
    }
    
    var filterFn = function(env)
    {
      // Iterate over all tags
      for(var tag in tags){
        // Check if the tag is present in the environment
        if (env.tags.indexOf(tag) == -1) return false
      }
      
      return true
    }

    var filter_opt = this.state.filter_opt
    filter_opt['tags'] = filterFn
     
    this.setState({
      filter_opt: filter_opt
    })

    this.props.onUpdate(filter_opt)
  }

  render() {
    var tags = this.props.tags

    return (
      <div>
      <h3>Tags</h3>
      {Object.keys(tags).map( tag => 
      <TagButton key={tag} onToggle={this.tagToggle} tagName={tag} tagCount={tags[tag]}/>
      )}
      </div> 
    )
  }
}

export default TagPanel;