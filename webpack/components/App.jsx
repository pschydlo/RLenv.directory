import ControlPanel from './ControlPanel';
import TagPanel from './TagPanel';
import Results from './Results';
import React, { Component } from 'react';


var DATA_ENDPOINT = '/data/envs.json'
var TAG_ENDPOINT  = '/data/tags.json'

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize component state
    this.state = {
      loading: true,
      envs: [],
      filtered_envs: [],
      tags: [],
      filter_opt: {}
    };

    // React boilerplate
    this.filterChange = this.filterChange.bind(this)
    this.sortEnvs = this.sortEnvs.bind(this)
    this.updateSortFn = this.updateSortFn.bind(this)
  }

  // Fetch environments
  componentDidMount() {
    fetch(DATA_ENDPOINT)
      .then(response => response.json())
      .then(data => this.setState({
        loading: false,
        envs: data.envs,
        filtered_envs: data.envs,
        tags: this.state.tags
      }));

    // Fetch tags 
    fetch(TAG_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      this.setState({
      loading: this.state.loading,
      envs: this.state.envs,
      filtered_envs: this.state.filtered_envs,
      tags: data})}
    )
  }

  // Filter update callback, receives new filter options from child components
  filterChange(new_filter_opt){

    var filter_opt = this.state.filter_opt 

    // Iterate over received options and add new constraints to the filter.
    for (var key in new_filter_opt){
      filter_opt[key] = new_filter_opt[key]
    }

    // Filter the environments with the constraint verifier method ('checkEnv')
    var filtered_envs = this.state.envs.filter(env => this.checkEnv(env, filter_opt))
  
    this.setState({
      filtered_envs: filtered_envs,
      filter_opt: filter_opt
    })
  }

  // Sort update callback, receives request for sorting from child components
  updateSortFn(sortFn){
    this.setState({
      sortFn: sortFn
    })
  }

  // Function to verify if environment is within the filter constraints
  checkEnv(env, filter_opt){

    // Iterates over all filter constraints
    for(var key in filter_opt){
      if(!filter_opt[key](env)) return false
    }
    return true
  }

  // Returns sorted environments
  sortEnvs(sortFn){
    // check if sort requested
    if (!('sortFn' in this.state)) return this.state.filtered_envs
    
    return this.state.filtered_envs.sort(this.state.sortFn)
  }


  render() {

    const envs = this.sortEnvs(this.state.filtered_envs);

    return (
      <div>
        <aside className="col-md-3">
            <TagPanel tags={this.state.tags} onUpdate={this.filterChange}/>
        </aside>
        <main className="col-md-9">
            <ControlPanel onSort={this.updateSortFn} onUpdate={this.filterChange}/>
            
            { this.state.loading ? (
            <div>loading</div>
            ) : (
            <Results results={envs} />
            )}
        </main>
      </div>
    );
  }
}


export default App;