import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = 
      { 
        perPage: 12,
        offset: 0,
        currentPage: 0
      }

    this.handlePageClick = this.handlePageClick.bind(this);
    this.pageCount = this.pageCount.bind(this);
    this.getEntries = this.getEntries.bind(this);
  }

  pageCount(data){
    var count = Math.ceil(data.length/this.state.perPage)
    return count
  };

  handlePageClick(data){
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState(
      {
        offset: offset,
        currentPage: selected
      })
  };

  getEntries(){
    var envs = this.props.results.slice(this.state.offset, this.state.offset + this.state.perPage)
    
    // If selected page is above number of pages and there is content to show
    if(envs.length == 0 && this.props.results.length != 0){
      this.setState(
        { 
          currentPage: 0,
          offset: 0
        })
    }

    return envs
  }

  render() {
    var envs = this.getEntries()

    return (
      <div>
        <div>
          {envs.map(env =>  
              <div key={env.name} className="card">
              <div className="card-body">
                <p><span>{env.stars}</span><i className="fas fa-star"></i></p>
                <h5 className="card-title">{env.name} </h5>
                <h6 className="card-subtitle mb-2 text-muted">{env.short_descr}</h6>
                <p className="card-text">{env.long_descr}</p>
                <div className="tag-group">
                {env.tags.slice(0,2).map(tag =>
                  <div key={tag} className="label label-success">{tag}</div>
                )}
                </div>
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
                       activeClassName={"active"} 
                       forcePage={this.state.currentPage}/>
        </div>
      </div>

        
    );
  }
}

export default Results;