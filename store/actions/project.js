import Project from '../../models/project';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GETPROJECTS = 'GETPROJECTS';

export const getProjects = () => {
    return async (dispatch,getState) =>{
      try{
        const response = await fetch('');
        if (!response.ok){
          throw new Error('Something Went Wrong');
        }
        const resData = await response.json();
        const loadedProjects = [];

        for(const key in resData){
          loadedProjects.push(new Project(resData[key].refNo, resData[key].name,resData[key].type));
        };

        dispatch({
          type:GETPROJECTS,
          projects:loadedProjects
        });
      }
      catch(err){
        throw err;
      }
    };
};

export const createProject  = (refNo,name,type) =>{
    return async (dispatch) => {
        console.log("HERE")
        const response = await fetch('',
        {method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            refNo,
            name,
            type
        })
        });
        const resData = await response.json();
        console.log(resData);
        
    dispatch({
        type:CREATE_PROJECT,
        projectData:{
            refNo,
            name,
            type
            }
        });
    };
};
