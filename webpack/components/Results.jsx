import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import GridView from './Grid';
import DetailView from './Detail';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = 
      { 
        perPage: 16,
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
        { (this.props.viewMode == 'grid') ? (
          <GridView envs={envs}/>
        ) : (
          <DetailView envs={envs}/>
        )}
        
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