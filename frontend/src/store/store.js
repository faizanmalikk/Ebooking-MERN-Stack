import { configureStore} from '@reduxjs/toolkit'
import { hotelsApi } from '../services/hotelsApi';
import { userApi } from '../services/userApi';

const store = configureStore({
    reducer : {
        [hotelsApi.reducerPath]  : hotelsApi.reducer,
        [userApi.reducerPath]  : userApi.reducer,
      
    
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(hotelsApi.middleware)
    .concat(userApi.middleware)
})

export default store;