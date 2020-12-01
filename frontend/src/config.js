import SessionService from './services/SessionService';
const sessionService = new SessionService();

const config = {
    apiUrl: process.env.REACT_APP_SERVICES_HOST,
    uploadsPath: '/uploads/images',
    axios: {
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + sessionService.getToken()
        }
    }


};
export default config;