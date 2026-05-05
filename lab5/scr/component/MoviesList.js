import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Container } from 'react-bootstrap';
import MovieDataService from '../services/movies';

const MoviesList = () => {
  // 2.1 Khởi tạo các biến trạng thái
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 2.2 Phương thức lấy danh sách phim
  const retrieveMovies = () => {
    MovieDataService.getAll(currentPage)
      .then(response => {
        setMovies(response.data.movies);
        setTotalPages(response.data.total_pages);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // 2.2 Phương thức lấy danh sách ratings
  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        setRatings(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // 2.5 Tìm theo title
  const findByTitle = () => {
    MovieDataService.find(searchTitle, "title")
      .then(response => {
        setMovies(response.data.movies);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // 2.5 Tìm theo rating
  const findByRating = () => {
    if (searchRating === "") {
      retrieveMovies();
    } else {
      MovieDataService.find(searchRating, "rated")
        .then(response => {
          setMovies(response.data.movies);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  // Xử lý thay đổi input search title
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // Xử lý thay đổi select search rating
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  // 2.2 useEffect để gọi sau khi giao diện render
  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, [currentPage]);

  return (
    <Container className="mt-4">
      <h2>Movie List</h2>
      
      {/* 2.3 Search Form */}
      <Row className="mb-4">
        <Col md={5}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={findByTitle}
            className="mt-2"
          >
            Search
          </Button>
        </Col>
        
        <Col md={5}>
          <Form.Group>
            <Form.Control
              as="select"
              onChange={onChangeSearchRating}
              value={searchRating}
            >
              <option value="">All Ratings</option>
              {ratings.map((rating, index) => {
                return (
                  <option key={index} value={rating}>
                    {rating}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={findByRating}
            className="mt-2"
          >
            Search
          </Button>
        </Col>
      </Row>

      {/* 2.4 Hiển thị movies bằng Card */}
      <Row>
        {movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <Col key={movie._id} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      <strong>Rated:</strong> {movie.rated || 'N/A'}<br />
                      <strong>Year:</strong> {movie.year || 'N/A'}
                    </Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="info">View Reviews</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>
            <p>No movies found.</p>
          </Col>
        )}
      </Row>

      {/* Phân trang (tuỳ chọn nâng cao) */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <Button 
              variant="secondary" 
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <span className="mx-3">Page {currentPage + 1} of {totalPages}</span>
            <Button 
              variant="secondary" 
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MoviesList;