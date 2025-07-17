import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircleOutline as PlayIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const LearningPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Sample data - in a real app, this would come from an API
  const course = {
    id: courseId,
    name: "SAT Prep Course",
    modules: [
      {
        id: 1,
        title: "Introduction to SAT",
        lessons: [
          { id: 1, title: "Course Overview", duration: "10 min", completed: true },
          { id: 2, title: "SAT Format and Scoring", duration: "15 min", completed: true },
          { id: 3, title: "Study Plan", duration: "20 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "Math Section",
        lessons: [
          { id: 4, title: "Algebra Fundamentals", duration: "45 min", completed: false },
          { id: 5, title: "Problem Solving", duration: "1 hour", completed: false }
        ]
      }
    ]
  };

  // Find the current lesson
  const currentLesson = course.modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === parseInt(lessonId || course.modules[0].lessons[0].id));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper 
        elevation={3} 
        sx={{ 
          width: sidebarOpen ? 300 : 0,
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'width 0.3s',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Course Content</Typography>
          <IconButton onClick={toggleSidebar} size="small">
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'grey.100',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle2">
                  Module {moduleIndex + 1}: {module.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {module.lessons.length} lessons
                </Typography>
              </Box>
              <List component="div" disablePadding>
                {module.lessons.map((lesson) => (
                  <ListItem
                    key={lesson.id}
                    button
                    selected={lesson.id === currentLesson.id}
                    onClick={() => navigate(`/course/${courseId}/learn/${lesson.id}`)}
                    sx={{
                      pl: 4,
                      '&.Mui-selected': {
                        bgcolor: 'primary.light',
                        '&:hover': {
                          bgcolor: 'primary.light',
                        }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {lesson.completed ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <PlayIcon color={lesson.id === currentLesson.id ? "primary" : "action"} />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={lesson.title} 
                      secondary={lesson.duration}
                      primaryTypographyProps={{
                        color: lesson.id === currentLesson.id ? 'primary' : 'textPrimary'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>
          ))}
        </Box>
      </Paper>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate(`/course/${courseId}`)}
          >
            Back to Course
          </Button>
          {!sidebarOpen && (
            <IconButton onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {currentLesson.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Module: {course.modules.find(m => m.lessons.some(l => l.id === currentLesson.id))?.title}
          </Typography>
          
          {/* Video Player Placeholder */}
          <Box 
            sx={{ 
              width: '100%', 
              height: 0, 
              pb: '56.25%', // 16:9 aspect ratio
              position: 'relative',
              bgcolor: 'black',
              borderRadius: 2,
              overflow: 'hidden',
              mb: 3
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.7)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.6)',
                  cursor: 'pointer'
                }
              }}
            >
              <PlayIcon sx={{ fontSize: 80 }} />
            </Box>
          </Box>

          {/* Lesson Content */}
          <Typography variant="body1" paragraph>
            This is where the lesson content would be displayed. In a real application, this would include:
          </Typography>
          <ul>
            <li>Video player for the lesson</li>
            <li>Lesson transcript</li>
            <li>Downloadable resources</li>
            <li>Practice exercises</li>
            <li>Discussion forum</li>
          </ul>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button 
              variant="outlined" 
              onClick={() => {
                // Find previous lesson
                const allLessons = course.modules.flatMap(m => m.lessons);
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                if (currentIndex > 0) {
                  const prevLesson = allLessons[currentIndex - 1];
                  navigate(`/course/${courseId}/learn/${prevLesson.id}`);
                }
              }}
              disabled={course.modules[0].lessons[0].id === currentLesson.id}
            >
              Previous
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                // Mark as completed and go to next lesson
                const allLessons = course.modules.flatMap(m => m.lessons);
                const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                
                if (currentIndex < allLessons.length - 1) {
                  const nextLesson = allLessons[currentIndex + 1];
                  // In a real app, you would save the progress to the backend here
                  navigate(`/course/${courseId}/learn/${nextLesson.id}`);
                } else {
                  // Course completed
                  alert('Congratulations! You have completed this course!');
                  navigate(`/course/${courseId}`);
                }
              }}
            >
              {course.modules[course.modules.length - 1].lessons[
                course.modules[course.modules.length - 1].lessons.length - 1
              ].id === currentLesson.id ? 'Complete Course' : 'Mark Complete & Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LearningPage;
