import {GETPROJECTS} from '../actions/project';

const initialState ={
    allProjects: [],
}
export default (state = initialState, action) =>{
    switch (action.type){
        case GETPROJECTS:
            return{
                ...state,
                allProjects:action.projects
            };

        default:{
            return state;
        }
    };
}