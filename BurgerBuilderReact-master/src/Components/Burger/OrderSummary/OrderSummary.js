import React from 'react';
import Aux from '../../../hoc/Auxs/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

        const ingredientSummary = Object.keys(props.ingredientSummary)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredientSummary[igKey]}
                    </li>
                )
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following orders</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> CurrentPrice: <strong>{props.currentPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={props.cancelClicked}>CANCEL</Button>
                <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
            </Aux>
        )
    }

export default orderSummary;