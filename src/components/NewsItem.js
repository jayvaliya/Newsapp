import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, url, author, date, publisher } = this.props;

    return (
      <div className="card mx-2 my-3">

        <img src={imgUrl} className="card-img-top" alt="Image not found." />

        <div className="card-body">
          <h5 className="card-title"><b>{title}<span class="badge mx-1 rounded-pill bg-secondary">{publisher}</span></b></h5>
          {/* <p className="card-text">{description}</p> */}
          <p class="card-text"><small class="text-muted">published by {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
          <a href={url} rel='noreferrer' target='_blank' className="btn btn-sm btn-dark">Read more</a>
        </div>

      </div>
    )
  }
}