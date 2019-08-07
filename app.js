const { Component } = React;
const { render } = ReactDOM;
const main = document.querySelector('#root');
const url = 'https://acme-users-api-rev.herokuapp.com/api/';


class App extends Component {
    constructor(){
        super();
        this.state = {
            view:'Companies',
            productCount: 0,
            companyCount: 0
        }
    }
    componentDidMount(){
        window.addEventListener('hashchange', (ev) => {
            const view = window.location.hash.slice(1);
            this.setState({view});
            console.log(view);
        })
    }

    render(){
        const {productCount, companyCount, view} = this.state;
        const productLink = React.createElement('li', null, `Products(${ productCount })`);
        const companyLink = React.createElement('li', null, `Companies(${ companyCount })`);
        const nav = React.createElement('nav', null, productLink, companyLink);
        const content = React.createElement(List, {view})
        console.log(view)
        return React.createElement('div', null, nav, content);
    }
}

class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            items:[],
            view: props.view
        }
    }

    componentDidMount(){
        const {view} = this.state;
        window.location.hash = view.toLowerCase();
        axios.get(`${url}${view.toLowerCase()}`)
            .then(response => {
                const items = response.data;
                console.log(items);
                this.setState({items, waitingitems: false});
            });
        
    }
    render(){
        const {items} = this.state;
        const count = items.length;
        return  items.map( item => React.createElement('li', {key: item.id}, item.name));
    }
}


render(React.createElement(App), main);
