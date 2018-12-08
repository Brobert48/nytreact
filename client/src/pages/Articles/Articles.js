import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import FavBtn from "../../components/FavBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    Articles: [],
    topic: "",
    start: "",
    end: "",
    favs: ""
  };

  componentDidMount() {
    this.loadFavs();
  }

  loadFavs = () => {
    API.getFavs()
      .then(res =>
        this.setState({favs: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadFavs())
      .catch(err => console.log(err));
  };

  saveArticle = data =>{
    API.postArticle(data)
    .then(res => this.loadFavs())
    .catch(err=>console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.start && this.state.end) {
      API.getArticles(this.state.topic, this.state.start, this.state.end)
        .then(res => {
           console.log(res);
           this.setState({Articles: res.data.response.docs})
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Col class="center" size="md">
        <Row>Search</Row>
          <Row>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Date (YYYYMMDD)"
              />
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Date (YYYYMMDD)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.start && this.state.end)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Row>
          <Row>Search Results</Row>
          <Row>
            {this.state.Articles.length ? (
              <List>
                
                {this.state.Articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={article.web_url}>
                      <strong>
                        {article.headline.print_headline} {" "} {article.byline.original}
                      </strong>
                    </Link>
                    <FavBtn onClick={() => this.saveArticle({
                      title: article.headline.print_headline,
                      date:article.pub_date,
                      url: article.web_url,
                      by: article.byline.original,
                      })} />
                  </ListItem>
                ))}
              </List>
            ) :(<h2>No Results</h2>)}
        </Row>
        <Row>Saved Articles</Row>
          <Row>
            {this.state.favs.length ? (
              <List>
                {this.state.favs.map(fav => (
                  <ListItem key={fav._id}>
                    <Link to={fav.url}>
                      <strong>
                        {fav.title} {" "} {fav.by}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(fav._id)} />
                  </ListItem>
                ))}
              </List>
            ) :(<h2>No Favorites</h2>)}
            
        </Row>
        </Col>
        {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> 
           </Row> */}
      </Container>
    );
  }
}

export default Articles;
