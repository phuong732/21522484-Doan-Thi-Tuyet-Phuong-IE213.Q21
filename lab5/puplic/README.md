# Movie Review App - Frontend (ReactJS)

## Bài thực hành 5: Xây dựng Frontend với ReactJS

### Các chức năng đã hoàn thành

#### Bài 1: Kết nối Backend
- Cài đặt axios
- Tạo MovieDataService với các phương thức:
  - getAll() - Lấy danh sách phim
  - get(id) - Lấy chi tiết phim
  - find() - Tìm kiếm phim
  - createReview() - Tạo review mới
  - updateReview() - Cập nhật review
  - deleteReview() - Xóa review
  - getRatings() - Lấy danh sách ratings

#### Bài 2: MoviesList Component
- Hiển thị danh sách phim dạng Card
- Tìm kiếm theo Title
- Tìm kiếm theo Rating
- Phân trang

#### Bài 3: Movie Component (Chi tiết phim)
- Hiển thị thông tin chi tiết phim
- Hiển thị danh sách review

#### Bài 4: Hiển thị Review
- Hiển thị review với moment.js định dạng ngày
- Form thêm review mới

### Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start