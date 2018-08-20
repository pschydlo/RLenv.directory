import React, { Component } from 'react';

class Results extends Component {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <div>
        {this.props.results.map((env) => {
          <div key={env.name} className="card" style="width: 18rem;">
          <div className="card-body">
            <h5 className="card-title">{env['name']}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{env.short}</h6>
            <p className="card-text">{env.long}</p>
            <a href={env.url} className="card-link">More info</a>
          </div>
        </div> 
        })}
        </div>
      </div>
    );
  }
}

export default Results;