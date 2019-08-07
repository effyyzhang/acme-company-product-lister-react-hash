const { Component } = React;
const { render } = ReactDOM;
const main = document.querySelector("#root");
const url = "https://acme-users-api-rev.herokuapp.com/api/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: "products",
      products: [],
      companies: []
    };
  }
  componentDidMount() {
    window.addEventListener("hashchange", ev => {
      const view = window.location.hash.slice(1);
      this.setState({ view });
    });

    Promise.all([
      axios.get(`${url}products`),
      axios.get(`${url}companies`)
    ]).then(responses => {
      const [productsResponse, companiesResponse] = responses;
      this.setState({
        products: productsResponse.data,
        companies: companiesResponse.data
      });
    });
  }

  render() {
    const { products, companies, view } = this.state;
    const productLink = React.createElement(
      "a",
      { href: "#products", className: view === "products" ? "selected" : "" },
      `Products(${products.length})`
    );
    const companyLink = React.createElement(
      "a",
      { href: "#companies", className: view === "companies" ? "selected" : "" },
      `Companies(${companies.length})`
    );
    const nav = React.createElement("nav", null, productLink, companyLink);

    const content = React.createElement(List, {
      view,
      items: view === "products" ? products : companies
    });
    return React.createElement("div", null, nav, content);
  }
}

const List = props => {
  const { items, view } = props;

  // Products get description
  if (view === "products") {
    return items.map(item =>
      React.createElement(
        "li",
        { key: item.id },
        `${item.name} - ${item.description}`
      )
    );
  }
  return items.map(item =>
    React.createElement("li", { key: item.id }, item.name)
  );
};

render(React.createElement(App), main);
