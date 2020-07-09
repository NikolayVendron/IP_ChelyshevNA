import React, {Component} from 'react';
import {Button} from "antd";
import {connect} from "react-redux";
import {orderData} from "../../../store/actions/mainActions";

class CartItem extends Component {
    state = {
      count: 1
    };

    componentDidUpdate() {
        const price = this.props.price*this.state.count;
        const count = this.state.count;
        this.props.orderData(price, count);
    };

    plusCount = () => {
      this.setState(prevState => {
          return {
              ...prevState,
              count: prevState.count + 1
          }
      })
    };
    minusCount = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                count: prevState.count - 1
            }
        })
    };
    render() {
        return (
            <div className={'card-body CartItem'}>
                <div className="CartItem__name">
                    <h6>Name:</h6>
                    <h6>{this.props.name}</h6>
                </div>
                <div className="CartItem__count">
                    <p>Count:</p>
                    <div className={'cart-buttons'}>
                        <Button onClick={this.plusCount}>+</Button>
                        {this.state.count > 1 ?
                            <Button onClick={this.minusCount}>-</Button> :
                            <Button disabled>-</Button>
                        }
                    </div>
                    <p>{this.state.count}</p>
                </div>
                <div className="CartItem__price">
                    <p>Price</p>
                    <h6><b>{this.props.price*this.state.count}$</b> for {this.state.count} pc</h6>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        orderData: (price, count) =>  dispatch(orderData(price, count)),
    }
}

export default connect(null, mapDispatchToProps)(CartItem);