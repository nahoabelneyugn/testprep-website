from app import create_app, db
from models import User, Course, Payment

def init_db():
    app = create_app()
    with app.app_context():
        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()
        
        # Create sample user
        user = User(
            email='test@example.com',
            name='Test User'
        )
        user.set_password('password123')
        db.session.add(user)
        
        # Create sample courses
        sat_course = Course(
            name='SAT Complete Prep Course',
            description='Comprehensive SAT preparation course covering all sections of the test.',
            price=199.99,
            image_url='https://via.placeholder.com/300x200?text=SAT+Course'
        )
        
        ielts_course = Course(
            name='IELTS Academic Prep',
            description='Complete preparation for the IELTS Academic test with practice materials.',
            price=179.99,
            image_url='https://via.placeholder.com/300x200?text=IELTS+Course'
        )
        
        db.session.add(sat_course)
        db.session.add(ielts_course)
        
        # Commit all changes
        db.session.commit()
        print("Database initialized with sample data!")
        print(f"You can now log in with email: test@example.com and password: password123")

if __name__ == '__main__':
    init_db()
