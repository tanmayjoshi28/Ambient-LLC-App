import TASKS from '../../data/dummy-data';
import {CREATE_TASK, DELETE_TASK, SET_TASKS} from '../actions/tasks';
import Task from '../../models/task';

const initialState = {
    allTasks: [],
    assingedTasks:[]
};

export default(state = initialState,action) =>{
    switch(action.type){
        case SET_TASKS:
            return{
                allTasks:action.tasks,
                assingedTasks:action.tasks
            };
        case CREATE_TASK:
            console.log("URL TO STORE IN STATE IS :-" ,action.taskData.attachment);
            const newTask = new Task(action.taskData.id, action.taskData.tenderid, 
                                    action.taskData.heading, action.taskData.details, 
                                    action.taskData.priority, action.taskData.time, 
                                    action.taskData.date, action.taskData.attachment,
                                    action.taskData.ownerId, action.taskData.userAssignedId,
                                    action.taskData.deadlineDate, action.taskData.deadlineTime,
                                    action.taskData.acceptance, action.taskData.comment
                                    );
            return{
                ...state,
                allTasks:state.allTasks.concat(newTask),
                assingedTasks:state.assingedTasks.concat(newTask)
            };
        case DELETE_TASK:
            return {
                ...state,
                allTasks:state.allTasks.filter(task => task.taskId != action.taskId),
                assingedTasks:state.assingedTasks.filter(task => task.taskId != action.taskId),
            };
    } 
    return state;
}