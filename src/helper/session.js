import jwtDecode from "jwt-decode";
export function setSession(data){
    sessionStorage.setItem('token', data.token);
}

export function getSession(){
    if(!sessionStorage.getItem('token')) return false;
    return  jwtDecode(sessionStorage.getItem('token'));
}


export function clearSession(){
    return sessionStorage.clear();
}