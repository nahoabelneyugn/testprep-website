from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data
courses = [
    {
        "id": 1,
        "name": "SAT Prep Course",
        "instructor": "Dr. Sarah Johnson",
        "rating": 4.8,
        "students": 1245,
        "price": 199.99,
        "duration": "8 weeks",
        "level": "Intermediate",
        "description": "Comprehensive SAT preparation course covering all sections of the exam with proven strategies and practice tests.",
        "image_url": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "syllabus": [
            "Week 1: Introduction to the SAT",
            "Week 2: Math Fundamentals",
            "Week 3: Advanced Math Concepts",
            "Week 4: Reading Comprehension",
            "Week 5: Writing and Language",
            "Week 6: Practice Tests & Strategies",
            "Week 7: Time Management",
            "Week 8: Final Review & Test Day Tips"
        ],
        "requirements": [
            "Basic understanding of high school math",
            "Willingness to complete weekly assignments",
            "Access to a computer with internet"
        ],
        "whatYoullLearn": [
            "Master all SAT math concepts",
            "Improve reading comprehension skills",
            "Enhance writing and grammar",
            "Test-taking strategies",
            "Time management techniques"
        ]
    },
    {
        "id": 2,
        "name": "IELTS Preparation",
        "instructor": "Prof. Michael Chen",
        "rating": 4.7,
        "students": 987,
        "price": 179.99,
        "duration": "6 weeks",
        "level": "All Levels",
        "description": "Master all sections of the IELTS exam with our proven strategies and practice materials.",
        "image_url": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "syllabus": [
            "Week 1: Introduction to IELTS",
            "Week 2: Listening Skills",
            "Week 3: Reading Strategies",
            "Week 4: Writing Tasks",
            "Week 5: Speaking Practice",
            "Week 6: Full Practice Tests"
        ],
        "requirements": [
            "Intermediate English level",
            "Headphones for listening practice",
            "Microphone for speaking practice"
        ],
        "whatYoullLearn": [
            "IELTS test format and strategies",
            "Academic and General Training modules",
            "Time management for each section",
            "Vocabulary and grammar for high scores",
            "Speaking test techniques"
        ]
    }
]

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify([{k: v for k, v in course.items() if k in ['id', 'name', 'description', 'price', 'image_url', 'duration', 'level']} for course in courses])

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = next((c for c in courses if c['id'] == course_id), None)
    if course is None:
        return jsonify({'error': 'Course not found'}), 404
    return jsonify(course)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
