import User from '../../models/user';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const GETUSERS = 'GETUSERS';

export const getusers = () => {
  return async (dispatch,getState) =>{
    try{
      const response = await fetch('');
      if (!response.ok){
        throw new Error('Something Went Wrong');
      }
      const resData = await response.json();
      const loadedUsers = [];
      for(const key in resData){
        loadedUsers.push(new User(resData[key].email, resData[key].tokenId,
                                  resData[key].userId, resData[key].username,
                                  resData[key].adminStatus
                                  )
                        );
      };
      dispatch({
        type:GETUSERS,
        users:loadedUsers
      });
    }
    catch(err){
      throw err;
    }
  };
};

export const signup = (email, password,username) => {
  return async dispatch => {
    /// REGESTERING USER IN FIREBASE AUTH
    const response1 = await fetch(
      '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response1.ok) {
      throw new Error('Something went wrong!');
    }

    const resData1 = await response1.json();

    const userId = resData1.localId;
    const tokenId = resData1.idToken;

    /// REGISTERING USER IN REALTIME DATABASE
    const adminStatus = false;
    const response2 = await fetch('',
        {method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username,
            userId,
            email,
            tokenId,
            adminStatus
        })
        });
    
    if (!response2.ok) {
      throw new Error('Something went wrong!');
    }

    const resData2 = await response2.json();
    
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errResponse = await response.json()
      const errorId  = errResponse.error.message;
      let message = 'Something went wrong !';
      if (errorId === 'EMAIL_NOT_FOUND'){
          message = 'This Email not found';
      }
      else if (errorId ==='INVALID_PASSWORD'){
          message = 'Incorrrect Password';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch({
       type: LOGIN ,
       token:resData.idToken,
       userId:resData.localId
      });
  };
};
