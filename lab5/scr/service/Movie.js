import axios from "axios";

const BASE_URL = 'http://localhost:80/api/v1';

class MovieDataService {
  // Lấy danh sách phim có phân trang
  getAll(page = 0) {
    return axios.get(`${BASE_URL}/movies?page=${page}`);
  }

  // Lấy chi tiết phim theo ID
  get(id) {
    return axios.get(`${BASE_URL}/movies/id/${id}`);
  }

  // Tìm kiếm phim theo title hoặc rated
  find(query, by = "title", page = 0) {
    return axios.get(`${BASE_URL}/movies?${by}=${query}&page=${page}`);
  }

  // Tạo review mới
  createReview(data) {
    return axios.post(`${BASE_URL}/movies/review`, data);
  }

  // Cập nhật review
  updateReview(data) {
    return axios.put(`${BASE_URL}/movies/review`, data);
  }

  // Xóa review
  deleteReview(id, userId) {
    return axios.delete(`${BASE_URL}/movies/review`, {
      data: { review_id: id, userId: userId }
    });
  }

  // Lấy danh sách ratings
  getRatings() {
    return axios.get(`${BASE_URL}/movies/ratings`);
  }
}

export default new MovieDataService();
