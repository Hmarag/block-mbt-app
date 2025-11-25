import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, ReplyTo

def send_verification_email(recipient_email: str, verification_link: str):
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; color: #000000; padding: 20px;">
        <div style="max-width: 580px; margin: auto; background-color: #ffffff; border: 2px solid #000000; padding: 40px; text-align: center;">
            <h2 style="font-size: 24px; margin-bottom: 20px; color: #000000;">Καλώς ήρθες στο Block MBT!</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Ευχαριστούμε για την εγγραφή σου. Παρακαλώ, επιβεβαίωσε το email σου πατώντας το παρακάτω κουμπί:</p>
            <a href="{verification_link}" 
               style="background-color: #000000; color: #ffffff; padding: 15px 30px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; margin: 25px 0; border: 1px solid #000000;">
               Επιβεβαίωση Email
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #666666;">Αν δεν έκανες εσύ αυτή την εγγραφή, μπορείς να αγνοήσεις αυτό το email.</p>
        </div>
    </body>
    </html>
    """
    message = Mail(
        from_email='noreply@blockmbt.com', # <-- ΑΛΛΑΓΗ
        to_emails=recipient_email,
        subject='Επιβεβαίωση Λογαριασμού - Block MBT',
        html_content=html_content
    )
    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        print(f"Verification email sent to {recipient_email}, status code: {getattr(response, 'status_code', 'unknown')}")
    except Exception as e:
        print(f"Error sending email: {e}")

def send_password_reset_email(recipient_email: str, reset_link: str):
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; color: #000000; padding: 20px;">
        <div style="max-width: 580px; margin: auto; background-color: #ffffff; border: 2px solid #000000; padding: 40px; text-align: center;">
            <h2 style="font-size: 24px; margin-bottom: 20px; color: #000000;">Αίτημα Αλλαγής Κωδικού</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Λάβαμε ένα αίτημα για την αλλαγή του κωδικού σας. Πατήστε το παρακάτω κουμπί για να ορίσετε έναν νέο κωδικό:</p>
            <a href="{reset_link}" 
               style="background-color: #000000; color: #ffffff; padding: 15px 30px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; margin: 25px 0; border: 1px solid #000000;">
               Αλλαγή Κωδικού
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #666666;">Αν δεν κάνατε εσείς αυτό το αίτημα, παρακαλώ αγνοήστε αυτό το email. Ο σύνδεσμος θα λήξει σε 15 λεπτά.</p>
        </div>
    </body>
    </html>
    """
    message = Mail(
        from_email='noreply@blockmbt.com', # <-- ΑΛΛΑΓΗ
        to_emails=recipient_email,
        subject='Αλλαγή Κωδικού - Block MBT',
        html_content=html_content
    )
    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        print(f"Password reset email sent to {recipient_email}, status code: {getattr(response, 'status_code', 'unknown')}")
    except Exception as e:
        print(f"Error sending password reset email: {e}")

def send_contact_form_email(name: str, sender_email: str, subject: str, message_body: str):
    admin_email = "hvmarag@gmail.com"
    html_content = f"""
    <html>
    <body>
        <h3>Νέο Μήνυμα από τη Φόρμα Επικοινωνίας</h3>
        <p><strong>Όνομα:</strong> {name}</p>
        <p><strong>Email:</strong> {sender_email}</p>
        <p><strong>Θέμα:</strong> {subject}</p>
        <hr>
        <p><strong>Μήνυμα:</strong></p>
        <p>{message_body.replace(os.linesep, '<br>')}</p>
    </body>
    </html>
    """
    message = Mail(
        from_email='noreply@blockmbt.com', # <-- ΑΛΛΑΓΗ
        to_emails=admin_email,
        subject=f"Νέο Μήνυμα: {subject}",
        html_content=html_content
    )
    # --- ΒΕΛΤΙΩΣΗ: Όταν πατάς "Απάντηση", απαντάς απευθείας στον χρήστη ---
    message.reply_to = ReplyTo(sender_email, name)
    
    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        print(f"Contact form email sent, status code: {getattr(response, 'status_code', 'unknown')}")
    except Exception as e:
        print(f"Error sending contact form email: {e}")