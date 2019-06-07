import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer from '../reducers/dataReducer';
import reduxThunk from 'redux-thunk';


export default () => {
    const store = createStore(
        combineReducers({
            data: dataReducer
        }),
        applyMiddleware(reduxThunk))

    return store
}