import Task from '../../models/task';

export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_TASKS = 'SET_TASKS';

export const fetchTasks = () =>{
    return async dispatch => {
        try{
            const response = await fetch('');
            if (!response.ok){
                throw new Error('Something Went Wrong');
            }
            const resData = await response.json();
            const loadedTasks = [];
            for (const key in resData){
                loadedTasks.push(new Task(key, resData[key].tenderid, resData[key].heading, 
                                            resData[key].details, resData[key].priority,
                                            resData[key].time, resData[key].date, 
                                            resData[key].attachment,resData[key].ownerId,
                                            resData[key].userAssignedId,resData[key].deadlineDate,
                                            resData[key].deadlineTime, resData[key].acceptance,
                                            resData[key].comment
                                            )
                                    )
            }
            dispatch({
                type:SET_TASKS,
                tasks : loadedTasks
            });
        }
        catch(err){
            throw err;
        }
    };
};

export const createTask  = (tenderid, heading, details, priority, time, date, attachment,userAssignedId, deadlineDate, deadlineTime) =>{
    return async (dispatch,getState) => {
        console.log(deadlineDate);
        console.log(deadlineTime);

        const acceptance = false;
        const comment = "";
        const ownerId = getState().auth.userId;

        const response = await fetch('',
        {method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            tenderid,
            heading, 
            details, 
            priority,
            time,
            date,
            attachment,
            ownerId,
            userAssignedId,
            deadlineDate,
            deadlineTime,
            acceptance,
            comment
        })
        });
        const resData = await response.json();
        console.log(resData);
        
    dispatch({
        type:CREATE_TASK,
        taskData:{
            id:resData.name,
            tenderid, 
            heading, 
            details, 
            priority,
            time,
            date,
            attachment,
            ownerId,
            userAssignedId,
            deadlineDate,
            deadlineTime,
            acceptance,
            comment
            }
        });
    };
};

export const deleteTask  = (taskid) =>{
    return async dispatch => {
        const response = await fetch(`https://task-management-1baac.firebaseio.com/tasks/${taskid}.json`,
        {method:'DELETE'}
        );

    if (!response.ok){
        throw new Error('');
    }
    dispatch( {
        type:DELETE_TASK,
        taskId:taskid
        });
    };
};
