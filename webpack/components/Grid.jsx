import React, { Component } from 'react';

class GridView extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    var envs = this.props.envs

    return (
        <div>
          {envs.map(env =>  
              <div key={env.name} className="card">
              <div className="card-body">
                <p><span>{env.stars}</span><i className="fas fa-star"></i></p>
                <a href={env.url} className="card-link"><h5 className="card-title">{env.name} <i className="fas fa-link"></i></h5></a>
                {/*<h6 className="card-subtitle mb-2 text-muted">{env.short_descr}</h6>*/}
                <p className="card-text">{env.long_descr}</p>
                <div className="tag-group">
                {env.tags.slice(0,2).map(tag =>
                  <div key={tag} className="label label-success">{tag}</div>
                )}
                </div>
              </div>
              </div>
          )}
        </div> 

    );
  }
}

export default GridView;