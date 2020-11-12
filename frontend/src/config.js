import SessionService from './services/SessionService';
const sessionService = new SessionService();

const config = {
    apiUrl: process.env.API_URL || 'http://localhost:30001',
    uploadsPath: process.env.UPLOADS_URL || 'http://localhost:9000',
    axios: {
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + sessionService.getToken()
        }
    }


};
export default config;