import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class TagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
                        input: '',
                        items: this.props.tags,
                        tags: []
                     } 
    }

    changeFn(value){
        var tags = Object.keys(this.props.tags).map(item => item)

        var items = this.filterInputs(value, tags)
        this.setState({input: value, items: items})
        
    }

    selectFn(label){
        var tags = this.tagToggle(label)
        this.setState({ input: ''})
    }

    filterInputs(text, items){
        var items = items.filter(item => item.toLowerCase().includes(text.toLowerCase()))
        console.log(items)
        return items
    }

    updateItems(){
        var tags = Object.keys(this.props.tags).map(item => item)
        var items = this.filterInputs(this.state.input, tags)
        this.setState({ items: items})
        console.log(items)
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
    
        var filter_opt = {}
        filter_opt['tags'] = filterFn
         
        this.setState({
          tags: tags
        })
    
        this.props.onUpdate(filter_opt)

        return tags
      }


    render() {

        return (
            <div className="tagInput">
            <spann className="label-wrapper">{this.state.tags.map( tag => 
               <div className="label label-success" key={tag}>{tag} <spann onClick={(e) => this.tagToggle(tag)}>x</spann> </div>
            )}
            </spann>
            <spann className="input-wrapper">
            <Autocomplete
                
                value={this.state.input}
                items={this.state.items}
                wrapperStyle={{ float: 'left' }}
                getItemValue={(item) => item}
                onChange={(event, value) => this.changeFn(value)}
                onSelect={label => this.selectFn(label)}
                inputProps={{ placeholder: 'Type tag ' , onClick: (e) => this.updateItems()}}
                renderMenu={children => (
                <div className="menu">
                    {children}
                </div>
                )}
                renderItem={(item, isHighlighted) => (
                <div
                    className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                    key={item}
                >{item}</div>
                )}
            />
            </spann>

            </div>  
        )
    }
    }

    export default TagInput;
