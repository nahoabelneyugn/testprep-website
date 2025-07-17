from flask import Blueprint, jsonify, request, send_from_directory
from flask_login import login_required, current_user
from app import db
from models import User, Course, Payment

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return send_from_directory('../frontend', 'index.html')

@main.route('/api/courses')
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        'id': course.id,
        'name': course.name,
        'description': course.description,
        'price': course.price,
        'image_url': course.image_url
    } for course in courses])

@main.route('/api/payment/<int:course_id>')
@login_required
def get_payment_link(course_id):
    course = Course.query.get_or_404(course_id)
    
    payment_methods = [
        {
            'name': 'PayPal',
            'link': f'https://paypal.com/pay?amount={course.price}&currency=USD',
            'instructions': 'Send payment to your-email@example.com'
        },
        {
            'name': 'Venmo',
            'link': 'https://venmo.com',
            'instructions': 'Send payment to @YourUsername'
        },
        {
            'name': 'Cash App',
            'link': 'https://cash.app/YourUsername',
            'instructions': 'Send payment to $YourUsername'
        }
    ]
    
    return jsonify({
        'payment_methods': payment_methods,
        'course': {
            'id': course.id,
            'name': course.name,
            'price': course.price
        }
    })

@main.route('/api/verify-payment', methods=['POST'])
@login_required
def verify_payment():
    data = request.json
    course_id = data.get('course_id')
    payment_method = data.get('payment_method')
    transaction_id = data.get('transaction_id')
    
    if not all([course_id, payment_method, transaction_id]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    course = Course.query.get_or_404(course_id)
    
    # Create payment record
    payment = Payment(
        user_id=current_user.id,
        course_id=course_id,
        amount=course.price,
        payment_method=payment_method,
        transaction_id=transaction_id,
        status='completed'
    )
    
    db.session.add(payment)
    current_user.courses.append(course)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Payment verified successfully',
        'payment_id': payment.id
    })
