// import axios from "axios";
class CustomerService {
  constructor(realtimeDB) {
    this.collectionName = "customer";
    this.realtimeDB = realtimeDB;
  }

  async view(token) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async create(token, data) {
    const response = await axios.post(
      `${this.realtimeDB}${this.collectionName}/create`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
  async update(token, data) {
    const response = await axios.put(
      `${this.realtimeDB}${this.collectionName}/`,
      data,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async findById(token, id) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/detail?id=${id}`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
}
export default CustomerService;
