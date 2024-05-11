export function clearLocalStorage() {
    localStorage.removeItem('loginData');
    window.location.href = '/'; 
}