// import axios from "axios";
class AuthService {
  constructor(realtimeDB) {
    this.collectionName = "auth";
    this.realtimeDB = realtimeDB;
  }
  async register(entity) {
    const response = await axios.post(
      `${this.realtimeDB}${this.collectionName}/register`,
      entity
    );
    return response.data;
  }
  async login(entity) {
    const response = await axios.post(
      `${this.realtimeDB}${this.collectionName}/login`,
      entity
    );
    return response.data;
  }
  async getCustomer(token) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/getCustomer`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
}
export default AuthService;
