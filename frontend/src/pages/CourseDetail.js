import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Rating
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch this data from your API
  const course = {
    id: courseId,
    name: "SAT Prep Course",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 1245,
    price: 199.99,
    duration: "8 weeks",
    level: "Intermediate",
    description: "Comprehensive SAT preparation course covering all sections of the exam with proven strategies and practice tests.",
    image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    syllabus: [
      "Week 1: Introduction to the SAT",
      "Week 2: Math Fundamentals",
      "Week 3: Advanced Math Concepts",
      "Week 4: Reading Comprehension",
      "Week 5: Writing and Language",
      "Week 6: Practice Tests & Strategies",
      "Week 7: Time Management",
      "Week 8: Final Review & Test Day Tips"
    ],
    requirements: [
      "Basic understanding of high school math",
      "Willingness to complete weekly assignments",
      "Access to a computer with internet"
    ],
    whatYoullLearn: [
      "Master all SAT math concepts",
      "Improve reading comprehension skills",
      "Enhance writing and grammar",
      "Test-taking strategies",
      "Time management techniques"
    ]
  };

  const handleEnroll = () => {
    // In a real app, this would redirect to payment or add to cart
    alert(`Enrolling in ${course.name}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Courses
      </Button>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {course.name}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={course.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {course.rating} ({course.students} students)
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom>
            Course Description
          </Typography>
          <Typography paragraph>
            {course.description}
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            What You'll Learn
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {course.whatYoullLearn.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box display="flex" alignItems="flex-start">
                  <CheckCircleIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography>{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" gutterBottom>
            Course Syllabus
          </Typography>
          <Paper elevation={2} sx={{ mb: 4 }}>
            <List>
              {course.syllabus.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                  {index < course.syllabus.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Course Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Box 
              component="img"
              src={course.image_url}
              alt={course.name}
              sx={{ 
                width: '100%', 
                borderRadius: 1,
                mb: 2
              }}
            />
            
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h5" component="div">
                ${course.price.toFixed(2)}
              </Typography>
              <Chip 
                label={course.level} 
                color="primary" 
                variant="outlined" 
                size="small" 
              />
            </Box>

            <Box display="flex" alignItems="center" mb={3}>
              <AccessTimeIcon color="action" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Duration: {course.duration}
              </Typography>
            </Box>

            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              onClick={handleEnroll}
              sx={{ mb: 2 }}
            >
              Enroll Now
            </Button>

            <Button 
              fullWidth 
              variant="outlined" 
              size="large"
              onClick={() => alert('Added to cart!')}
            >
              Add to Cart
            </Button>

            <Box mt={3}>
              <Typography variant="subtitle2" gutterBottom>
                This course includes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Full lifetime access" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Certificate of completion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Access on mobile and TV" />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CourseDetail;
