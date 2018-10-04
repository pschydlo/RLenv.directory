import React, { Component } from 'react';

class DetailView extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    var envs = this.props.envs

    return (
        <div>
        <table>
        <tr>
            <th className="th-name">Name</th>
            {/*<th>Description</th>*/}
            <th className="th-stars"><i className="fas fa-star"></i> Stars</th>
            <th className="th-agents">Agents</th>
            <th className="th-tags">Tags</th>
        </tr>
          {envs.map(env => 
          <tr key={env.name}>
              <td>{env.name}</td>
              {/*<td>{env.long_descr}</td>*/}
              <td>{env.stars}</td>
              <td>{env.num_agents}</td>
              <td>
              {env.tags.slice(0,2).map(tag =>
                  <div key={tag} className="label label-success">{tag}</div>
                )}
               </td>
              {/*<div className="card-body">
                <p><span></span></p>
                <a href={env.url} className="card-link"><h5 className="card-title"> <i className="fas fa-link"></i></h5></a>
                <h6 className="card-subtitle mb-2 text-muted">{env.short_descr}</h6>
                <p className="card-text"></p>
                <div className="tag-group">*/}
          </tr>
          )}
          
          </table>
        </div> 

    );
  }
}

export default DetailView;