import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import Aux from '../../../hoc/Auxs/Aux';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <Aux>
            <p> CurrentPrice: <strong>{props.currentPrice.toFixed(2)}</strong></p>
            {controls.map((el) => (
                <BuildControl
                    key={el.type}
                    label={el.label}
                    ingredientAdded={() => props.ingredientAdded(el.type)}
                    ingredientRemoved={() => props.ingredientRemoved(el.type)}
                    disabled={props.disabled[el.type]}></BuildControl>
            ))}
            <button
                className={classes.OrderButton}
                disabled={props.currentPrice === 0}
                onClick={() => props.orderClicked()}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </Aux>

    </div>
)
export default buildControls;