import { createStore, combineReducers, applyMiddleware } from 'redux';
import coordinatesReducer from '../reducers/coordinatesReducer';
import reduxThunk from 'redux-thunk';


export default () => {
    const store = createStore(
        combineReducers({
            coordinatesReducer
        }),
        applyMiddleware(reduxThunk))

    return store
}