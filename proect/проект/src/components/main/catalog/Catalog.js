import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {Input, Popover, Badge} from 'antd';
import {NavLink} from "react-router-dom";
import {renderData, renderItems} from "../../../store/actions/mainActions";
import {connect} from "react-redux";
import CatalogItem from "./CatalogItem";
import CartItem from "./CartItem";
import axios from 'axios';

class Catalog extends Component {

    state = {
      cart: [],
        term: ''
    };

    addToCart = (item) => {
        const cart = [...this.state.cart];
        const newItem = {
            name: item.name,
            price: item.price
        };
        cart.push(newItem);
        this.setState({cart});
    };

    searchHandler = event => {
        this.setState({term: event.target.value})
    };

    searchingFor = term => {
        return function(x) {
            return (x.name.toLowerCase()).includes(term.toLowerCase()) || !term
        }
    };

    takeOrder = async () => {
        console.log(this.props.price, this.props.count);
        console.log(this.state.cart[0].name);
        await axios.post(`https://coffee-shop-f5204.firebaseio.com/persons/${localStorage.userId}/${this.props.personId}/orders.json`, {
            name: this.state.cart[0].name,
            price: this.state.cart[0].price,
            date: new(Date)()
        })
    };

    componentDidMount() {
        this.props.renderItems();
        this.props.renderData();
    };

    filterByType = value => {
        this.props.filterByType(value);
    };

    render() {
        const { Search } = Input;
        return (
            <div className={'Catalog'}>
                <div className="Catalog__main container-fluid">
                    <div className="row">
                        <div className="Catalog__content container-fluid col-lg-12">
                            <div className="row">
                                <div className="Catalog__content_header col-lg-12">
                                    {localStorage.userName !== undefined ?
                                        <div className="enter">
                                            <NavLink to={'/cabinet'}>{localStorage.userName}</NavLink>
                                            <Search
                                                placeholder="Search items"
                                                onChange={this.searchHandler}
                                            />
                                        </div> :
                                        <div className="enter">
                                            <NavLink to={'/login'}>Sing in</NavLink>
                                            <NavLink to={'/reg'}>Sing up</NavLink>
                                            <Search
                                                placeholder="Search items"
                                                onChange={this.searchHandler}
                                            />
                                        </div>
                                    }
                                    <Popover
                                        placement="rightBottom"
                                        content={
                                            <div className="card">
                                                <div className="card-header">
                                                    <p>My cart</p>
                                                    <p>{this.state.cart.length} items</p>
                                                </div>
                                                {this.state.cart.length === 0 ? null :
                                                    this.state.cart.map((item, index) => {
                                                        return (
                                                            <CartItem
                                                                key={item+index}
                                                                name={item.name}
                                                                price={item.price}
                                                                takeOrder={this.takeOrder}
                                                            />
                                                        )
                                                    })
                                                }
                                                <div className="card-footer">
                                                    {localStorage.userName !== undefined ?
                                                        <Button variant={'success'} onClick={this.takeOrder}>Buy</Button> :
                                                        <NavLink to={'/login'}><Button variant={'success'}>Buy</Button></NavLink>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        trigger="click"
                                    >
                                        <Badge count={this.state.cart.length} className={'cart'}>
                                            <a href="/" className="head-example">
                                                <i className="fas fa-big fa-shopping-cart"/>
                                            </a>
                                        </Badge>
                                    </Popover>
                                </div>
                            </div>
                            <div className="Catalog__content_container">
                                <div className="row">
                                    {this.props.items.filter(this.searchingFor(this.state.term)).map((item, index) => {
                                        return (
                                            <CatalogItem
                                                key={item+index}
                                                id={item.key}
                                                name={item.name}
                                                type={item.type}
                                                material={item.material}
                                                count={item.count}
                                                price={item.price}
                                                addItem={() => this.addToCart(item)}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.mainReducer.items,
        personId: state.mainReducer.personId,
        price: state.mainReducer.price,
        count: state.mainReducer.count,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems()),
        renderData: () => dispatch(renderData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);