import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer from '../reducers/dataReducer';
import iconsReducer from '../reducers/iconsReducer';
import reduxThunk from 'redux-thunk';


export default () => {
    const store = createStore(
        combineReducers({
            data: dataReducer,
            icons: iconsReducer
        }),
        applyMiddleware(reduxThunk))

    return store
}