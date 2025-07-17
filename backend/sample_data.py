from . import app, db, models

def create_sample_courses():
    # Create tables
    with app.app_context():
        db.create_all()
        
        # Add sample courses
        courses = [
            {
                'name': 'SAT Complete Prep Course',
                'description': 'Comprehensive SAT preparation course covering all sections of the test. Includes practice tests, video lessons, and personalized study plans.',
                'price': 299.99,
                'image_url': 'https://via.placeholder.com/300x200?text=SAT+Course'
            },
            {
                'name': 'IELTS Academic Prep',
                'description': 'Intensive IELTS preparation course focusing on academic English skills. Includes writing, speaking, reading, and listening practice.',
                'price': 399.99,
                'image_url': 'https://via.placeholder.com/300x200?text=IELTS+Course'
            },
            {
                'name': 'SAT Math Intensive',
                'description': 'Focused SAT math preparation course with advanced problem-solving techniques and practice tests.',
                'price': 199.99,
                'image_url': 'https://via.placeholder.com/300x200?text=SAT+Math'
            },
            {
                'name': 'IELTS Speaking Mastery',
                'description': 'Specialized course focusing on IELTS speaking section with mock tests and personalized feedback.',
                'price': 149.99,
                'image_url': 'https://via.placeholder.com/300x200?text=IELTS+Speaking'
            }
        ]

        for course_data in courses:
            course = models.Course(
                name=course_data['name'],
                description=course_data['description'],
                price=course_data['price'],
                image_url=course_data['image_url']
            )
            db.session.add(course)

        db.session.commit()

if __name__ == '__main__':
    create_sample_courses()
