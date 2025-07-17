import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia,
  Grid,
  Box,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RefreshIcon from '@mui/icons-material/Refresh';
import CourseDetail from './pages/CourseDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500
    }
  }
});

// Sample data as fallback
const sampleCourses = [
  {
    id: 1,
    name: "SAT Prep Course",
    description: "Comprehensive SAT preparation with practice tests and personalized feedback from experienced tutors.",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "8 weeks",
    level: "Intermediate"
  },
  {
    id: 2,
    name: "IELTS Preparation",
    description: "Master all sections of the IELTS exam with our proven strategies and practice materials.",
    price: 179.99,
    image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "6 weeks",
    level: "All Levels"
  }
];

const API_URL = 'http://localhost:5000/api/courses';

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCourses(data);
      setUsingSampleData(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Could not connect to the server. Using sample data.');
      setCourses(sampleCourses);
      setUsingSampleData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleRefresh = () => {
    fetchCourses();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1,
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none'
              }
            }}
          >
            Test Prep Academy
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleRefresh}
            disabled={loading}
            aria-label="refresh"
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Test Prep Academy
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Prepare for your exams with our expert-led courses
          </Typography>
          
          {error && (
            <Alert severity="warning" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
              {error}
            </Alert>
          )}
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <Card 
                  component={Link}
                  to={`/course/${course.id}`}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image_url}
                    alt={course.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {course.duration} • {course.level}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${course.price.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary"
                      size="large"
                      sx={{ mx: 1, mb: 1 }}
                      component={Link}
                      to={`/course/${course.id}`}
                    >
                      View Course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {usingSampleData && (
          <Alert severity="info" sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
            You're currently viewing sample data. Make sure your backend server is running for real data.
          </Alert>
        )}
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
