import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';

export class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totArtical: 0,
      categories: "general"

    };
  }

  async fetchNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.state.categories}&apiKey=69b0d927ffab43fc97163b391c96ad60&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totArtical: parsedData.totalResults,
      loading: false
    });
  }


  // previous
  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.fetchNews();
  }

  // next
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
      loading: true
    });
    this.fetchNews();
  }
  async componentDidMount() {
    this.fetchNews();
  }

  changeCate = (data) => {
    this.setState({ categories: data, page: 1, loading: true }, () => {
      // After updating state, call fetchNews to fetch news for the new category
      this.fetchNews();
    });
  }


  render() {
    return (
      <div className='container my-5 news'>
        <br />
        <h1 className='text-center'> <b>Newsy -Top headlines</b></h1>
        <div className="dropdown my-4">
          <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" onClick={() => this.changeCate("technology")}>Technology</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("business")}>Business</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("science")}>Science</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("health")}>Health</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("sports")}>Sports</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("entertainment")}>Entertainment</a></li>
            <li><a className="dropdown-item" onClick={() => this.changeCate("general")}>General</a></li>
          </ul>

        </div>
        {this.state.loading && <div className="view">
          <Spinner />
        </div>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imgUrl={element.urlToImage ? element.urlToImage : "https://bitsofco.de/img/Qo5mfYDE5v-350.avif"}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  publisher={element.source.name}

                />
              </div>
            );
          })}
        </div>
        <div className="container mt-5 d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlePrevClick}> &larr; Previous</button>
          <p>page : {this.state.page}</p>
          <button type="button" disabled={this.state.totArtical / this.props.pageSize <= this.state.page} className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;