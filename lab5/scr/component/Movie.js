import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, Form, Alert } from 'react-bootstrap';
import moment from 'moment';
import MovieDataService from '../services/movies';

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 3.1 Biến trạng thái movie
  const [movie, setMovie] = useState({
    _id: null,
    title: "",
    rated: "",
    plot: "",
    reviews: []
  });
  
  // State cho form thêm review
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // 3.2 Phương thức getMovie()
  const getMovie = (id) => {
    MovieDataService.get(id)
      .then(response => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        setErrorMsg("Không thể tải thông tin phim");
      });
  };

  // Thêm review mới
  const addReview = () => {
    if (!reviewText.trim() || !reviewerName.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ tên và nội dung review");
      return;
    }
    
    const data = {
      movie_id: id,
      name: reviewerName,
      review: reviewText
    };
    
    MovieDataService.createReview(data)
      .then(response => {
        setSuccessMsg("Đã thêm review thành công!");
        setReviewText("");
        setReviewerName("");
        getMovie(id); // Tải lại thông tin phim để hiển thị review mới
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch(e => {
        console.log(e);
        setErrorMsg("Có lỗi xảy ra khi thêm review");
        setTimeout(() => setErrorMsg(""), 3000);
      });
  };

  useEffect(() => {
    if (id) {
      getMovie(id);
    }
  }, [id]);

  return (
    <Container className="mt-4">
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      
      <Button variant="secondary" onClick={() => navigate('/movies')} className="mb-3">
        ← Back to Movies
      </Button>
      
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">{movie.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Rated: {movie.rated || 'Not rated yet'}
              </Card.Subtitle>
              
              <h5>Plot</h5>
              <p>{movie.plot || 'No plot information available.'}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 4.1 Hiển thị danh sách review */}
      <Row className="mt-4">
        <Col md={8}>
          <h3>Reviews</h3>
          {movie.reviews && movie.reviews.length > 0 ? (
            <ListGroup>
              {movie.reviews.map((review, index) => (
                <ListGroup.Item key={index}>
                  {/* 4.2 Định dạng ngày với momentjs */}
                  <h5>
                    {review.name + " reviewed on "}
                    {moment(review.date).format("Do MMMM YYYY")}
                  </h5>
                  <p className="mb-0">{review.review}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          )}
        </Col>
      </Row>

      {/* Form thêm review mới */}
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Add Your Review</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </Form.Group>
                
                <Button variant="primary" onClick={addReview}>
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
