import ControlPanel from './ControlPanel';
import Results from './Results';
import React, { Component } from 'react';

var DATA_ENDPOINT = '/data/envs.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      envs: [],
      filtered_envs: []
    };

    this.filterChange = this.filterChange.bind(this)
  }

  componentDidMount() {
    fetch(DATA_ENDPOINT)
      .then(response => response.json())
      .then(data => this.setState({
        loading: false,
        envs: data.envs,
        filtered_envs: data.envs
      }));
  }

  filterChange(filter_opt){
    console.log(filter_opt)

    var envs = this.state.envs
    var filtered_envs = this.filterFn(envs, filter_opt)
  
    this.setState({
      filtered_envs: filtered_envs,
      envs: this.state.envs,
      loading: false
    })
    
    console.log(filter_opt)
    console.log(filtered_envs)
    console.log(this.state.envs)
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

      filtered_envs.push(env)
    }

    return filtered_envs
  }

  render() {

    const envs = this.state.filtered_envs;

    return (
      <div>
        <aside className="col-md-3">
            <ControlPanel onUpdate={this.filterChange}/>
        </aside>
        <main className="col-md-9">
            
            { this.state.loading ? (
            <div>loading</div>
            ) : (
              <div>
              {envs.map(env =>  
                  <div key={env.name} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{env.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{env.short}</h6>
                    <p className="card-text">{env.long}</p>
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