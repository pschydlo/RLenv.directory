import TagButton from './TagButton';
import React, { Component } from 'react';

class TagPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter_opt: {},
      tags: []
    };

    this.tagToggle = this.tagToggle.bind(this);
  }

  tagToggle(tag){

    var tags = this.state.tags

    console.log(tags)
    console.log(tag)

    if ((tags.indexOf(tag) > -1)) {
      tags = tags.filter(e => e !== tag);
    }else{
      tags.push(tag)
    }

    console.log(tags)
    console.log(tag)
    
    var filterFn = function(env)
    {
      if(tags.length == 0) return true

      // Iterate over all tags
      for(var i = 0; i < tags.length; i++){
        // Check if the tag is present in the environment
        if (env.tags.indexOf(tags[i]) == -1) return false
      }

      return true
    }

    var filter_opt = this.state.filter_opt
    filter_opt['tags'] = filterFn
     
    this.setState({
      filter_opt: filter_opt,
      tags: tags
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