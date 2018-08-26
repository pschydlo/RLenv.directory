import ControlPanel from './ControlPanel';
import TagPanel from './TagPanel';
import Results from './Results';
import React, { Component } from 'react';

var DATA_ENDPOINT = '/data/envs.json'
var TAG_ENDPOINT  = '/data/tags.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      envs: [],
      filtered_envs: [],
      tags: [],
      filter_opt: {}
    };

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

  filterChange(new_filter_opt){

    var filter_opt = this.state.filter_opt 

    for (var key in new_filter_opt){
      filter_opt[key] = new_filter_opt[key]
    }

    console.log(filter_opt)

    var envs = this.state.envs
    var filtered_envs = this.filterFn(envs, filter_opt)
  
    this.setState({
      filtered_envs: filtered_envs,
      filter_opt: filter_opt
    })
  }

  updateSortFn(sortFn){
    this.setState({
      sortFn: sortFn
    })
  }

  sortEnvs(sortFn){
    if (!('sortFn' in this.state)) return this.state.filtered_envs

    var filtered_envs = this.state.filtered_envs
    filtered_envs.sort(this.state.sortFn)

    return filtered_envs
  }

  filterFn(envs, filter_opt){
    var filtered_envs = []

    for (var i = 0; i < envs.length; i++) {
      var env = envs[i]

      if (!this.checkEnv(env, filter_opt)) continue
     
      filtered_envs.push(env)
    }

    return filtered_envs
  }

  checkEnv(env, filter_opt){
    
    for(var key in filter_opt){
      switch(key){
        case("complexity"):
          if (env.complexity != filter_opt[key]) return false
          break

        case("agents"):
          if ((filter_opt[key] != 3 && env.num_agents != filter_opt[key]) || (filter_opt[key] == 3 && env.num_agents < 3) ) return false
          break
        
        case("tags"):
          var present = true

          for(var j=0; j< filter_opt[key].length; j++){
            // Check if the tag is present in the environment
            var curr_tag = filter_opt[key][j]
  
            if (env.tags.indexOf(curr_tag) == -1){
              present = false
              break
            }
          }
          
          if (present == false){
            return false
          }
          break
      }
    }

    return true
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
              <div>
              {envs.map(env =>  
                  <div key={env.name} className="card">
                  <div className="card-body">
                    <p><span>{env.stars}</span><i className="fas fa-star"></i></p>
                    <h5 className="card-title">{env.name} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{env.short_descr}</h6>
                    <p className="card-text">{env.long_descr}</p>
                    <p>
                    {env.tags.slice(0,2).map(tag =>
                      <div className="label label-success">{tag}</div>
                    )}
                    </p>
                    <a href={env.url} className="card-link">More info</a>
                  </div>
                  </div>
              )}
              </div>  
            )}
        </main>
      </div>
    );
  }
}


export default App;