import React from "react";
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Heloo", action);
      return { ...state, isAuthenticated: true, role: action.role, name: action.name };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "NONE":
      return { ...state, isDrawerOpen: true }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    isSeller: false,
    isDrawerOpen: false,
    name: localStorage.getItem("name"),
    role: localStorage.getItem("role") || 'USER',
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, signOut, removeItem };

// ###########################################################

function removeItem(dispatch) {
  dispatch({type: 'NONE'})

}
function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    // axios.post('http://localhost:5000/api/auth/signin', {
    //   email: login,
    //   password: password
    // }).then(res => {
    //   console.log(res);
    //   if (res.data) {
    //     localStorage.setItem('id_token', res.data.accessToken);
    //     setError(null)
    //     setIsLoading(false)
    //     dispatch({ type: 'LOGIN_SUCCESS' })
    //     history.push('/app/dashboard')
    //   }
    // }).catch(err => {
    //   dispatch({ type: "LOGIN_FAILURE" });
    //   setError(true);
    //   setIsLoading(false);
    // })

    // setTimeout(() => {
    //   localStorage.setItem('id_token', 1)
    //   setError(null)
    //   setIsLoading(false)
    //   dispatch({ type: 'LOGIN_SUCCESS' })

    //   history.push('/app/dashboard')
    // }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function registerUser(dispatch, name, login, password, history, setIsLoading, setError) {
  if (!!login && !!password) {
    axios.post('http://localhost:5000/api/auth/signup', {
      firstName: name,
      lastName: name,
      email: login,
      password: password
    }).then(res => {
      console.log(res);
      if (res.data) {
        localStorage.setItem('id_token', res.data.accessToken);
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' })

        history.push('/app/dashboard')
      }
    }).catch(err => {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    })

    // setTimeout(() => {
    //   localStorage.setItem('id_token', 1)
    //   setError(null)
    //   setIsLoading(false)
    //   dispatch({ type: 'LOGIN_SUCCESS' })

    //   history.push('/app/dashboard')
    // }, 2000);
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
