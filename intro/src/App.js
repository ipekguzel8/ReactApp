import CategoryLists from "./CategoryLists";
import Navi from "./Navi";
import ProductList from "./ProductList";
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
export default class App extends Component {
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  state = { currentCategory: "", products: [] };
  componentDidMount() {
    this.getProducts();
  }
  getProducts = (id) => {
    let url = "http://localhost:3000/products";
    if (id) {
      url += "?categoryId=" + id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };

    return (
      <div>
        <Container>
          <Row>
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryLists
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={productInfo.title}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={categoryInfo.title}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
