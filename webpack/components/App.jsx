import ControlPanel from './ControlPanel';
import Results from './Results';
import React, { Component } from 'react';

var DATA_ENDPOINT = '/data/envs_public.json'
var TAG_ENDPOINT  = '/data/tags.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      envs: [],
      filtered_envs: [],
      tags: []
    };

    this.filterChange = this.filterChange.bind(this)
  }

  componentDidMount() {
    fetch(DATA_ENDPOINT)
      .then(response => response.json())
      .then(data => this.setState({
        loading: false,
        envs: data.envs,
        filtered_envs: data.envs,
        tags: this.state.tags
      }));

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

  filterChange(filter_opt){

    var envs = this.state.envs
    var filtered_envs = this.filterFn(envs, filter_opt)
  
    this.setState({
      filtered_envs: filtered_envs,
      envs: this.state.envs,
      loading: this.state.loading, 
      tags: this.state.tags
    })

    Object.keys(this.state.tags).forEach( key => { 
      console.log(key)
    })
  }

  filterFn(envs, filter_opt){
    var filtered_envs = []

    for (var i = 0; i < envs.length; i++) {
      var env = envs[i]

      if (filter_opt.complexity != null && env.complexity != filter_opt.complexity){
        continue      
      }
  
      if (filter_opt.agents != null && ((filter_opt.agents != 3 && env.num_agents != filter_opt.agents) || (filter_opt.agents == 3 && env.num_agents < 3) )){
        continue
      }

      console.log(env.tags)
      console.log(filter_opt.tags)

      if(filter_opt.tags != []){
        var present = true

        for(var j=0; j< filter_opt.tags.length; j++){
          // Check if the tag is present in the environment
          var curr_tag = filter_opt.tags[j]
          
          console.log(env.tags)
          console.log(curr_tag)

          if (env.tags.indexOf(curr_tag) == -1){
            present = false
            break
          }
        }
        
        if (present == false){
          continue
        }else{
          console.log("test")
        }
      }
      

      filtered_envs.push(env)
    }

    return filtered_envs
  }

  render() {

    const envs = this.state.filtered_envs;

    return (
      <div>
        <aside className="col-md-3">
            <ControlPanel tags={this.state.tags} onUpdate={this.filterChange}/>
        </aside>
        <main className="col-md-9">
            
            { this.state.loading ? (
            <div>loading</div>
            ) : (
              <div>
              {envs.map(env =>  
                  <div key={env.name} className="card">
                  <div className="card-body">
                    <p><span>{env.stars}</span><i className="fas fa-star"></i></p>
                    <h5 className="card-title">{env.name} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{env.short}</h6>
                    <p className="card-text">{env.long}</p>
                    <p>
                    {env.tags.map(tag =>
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