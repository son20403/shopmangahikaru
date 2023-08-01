class CommentService {
  constructor(realtimeDB) {
    this.collectionName = "comment";
    this.realtimeDB = realtimeDB;
  }
  async create(token, entity) {
    const response = await axios.post(
      `${this.realtimeDB}${this.collectionName}/create`,
      entity,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async view(token) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async getById(token, id) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/detail?id=${id}`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
}
export default CommentService;
