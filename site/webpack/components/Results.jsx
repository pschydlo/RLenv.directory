import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = 
      { 
        perPage: 12,
        offset: 0
      }

    this.handlePageClick = this.handlePageClick.bind(this);
    this.pageCount = this.pageCount.bind(this);
  }

  pageCount(data){
    return Math.ceil(data.length/this.state.perPage) - 1
  };

  handlePageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    console.log(offset)

    this.setState({offset: offset})
  };

  render() {
    var envs = this.props.results.slice(this.state.offset, this.state.offset + this.state.perPage)
  
    return (
      <div>
        <h2>Results:</h2>
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
        <div className="flex-container">
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.pageCount(this.props.results)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      </div>

        
    );
  }
}

export default Results;