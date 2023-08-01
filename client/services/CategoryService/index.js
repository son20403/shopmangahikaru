class CategoryService {
  constructor(realtimeDB) {
    this.collectionName = "category";
    this.realtimeDB = realtimeDB;
  }
  async view(token) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async findById(id, token) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/detail?id=${id}`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async update(token, id, entity) {
    const response = await axios.put(
      `${this.realtimeDB}${this.collectionName}/update?id=${id}`,
      entity,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
  async create(entity, token) {
    const response = await axios.post(
      `${this.realtimeDB}${this.collectionName}/create`,
      entity,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
  async search(token, key) {
    const response = await axios.get(
      `${this.realtimeDB}${this.collectionName}/search?key=${key}`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
  async delete(id, token) {
    const response = await axios.delete(
      `${this.realtimeDB}${this.collectionName}/delete?id=${id}`,
      { headers: { token: `Bearer ${token}` } }
    );
    return response.data;
  }
}
export default CategoryService;
