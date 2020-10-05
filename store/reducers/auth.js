import {LOGIN, SIGNUP, GETUSERS} from '../actions/auth';

const initialState ={
    token: null,
    userId: null,
    allUsers: [],
}
export default (state = initialState, action) =>{
    switch (action.type){
        case LOGIN:
            return{
                ...state,
                token:action.token,
                userId:action.userId,
                allUsers:state.allUsers
            };

        case SIGNUP:
            return{
                state
            };

        case GETUSERS:
            return{
                ...state,
                token:state.token,
                userId:state.userId,
                allUsers:action.users
            };

        default:{
            return state;
        }
    };
}