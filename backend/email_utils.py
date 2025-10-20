import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_verification_email(recipient_email: str, verification_link: str):
    # --- ΑΛΛΑΓΗ: Ασπρόμαυρο θέμα για το email ---
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; color: #000000; padding: 20px;">
        <div style="max-width: 580px; margin: auto; background-color: #ffffff; border: 2px solid #000000; padding: 40px; text-align: center;">
            <h2 style="font-size: 24px; margin-bottom: 20px; color: #000000;">Καλώς ήρθατε στο Block MBT!</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #333333;">Σας ευχαριστούμε για την εγγραφή σας. Παρακαλώ πατήστε το παρακάτω κουμπί για να ενεργοποιήσετε τον λογαριασμό σας:</p>
            <a href="{verification_link}" 
               style="background-color: #000000; color: #ffffff; padding: 15px 30px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; margin: 25px 0; border: 1px solid #000000;">
               Ενεργοποίηση Λογαριασμού
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #666666;">Αν δεν κάνατε εσείς αυτή την εγγραφή, παρακαλώ αγνοήστε αυτό το email.</p>
        </div>
    </body>
    </html>
    """

    message = Mail(
        from_email='blockmbtco@gmail.com', 
        to_emails=recipient_email,
        subject='Ενεργοποίηση Λογαριασμού - Block MBT',
        html_content=html_content
    )
    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        
        print(f"Email sent to {recipient_email}, status code: {getattr(response, 'status_code', 'unknown')}")
    except Exception as e:
        print(f"Error sending email: {e}")


def send_contact_form_email(name: str, sender_email: str, subject: str, message_body: str):
    """
    Στέλνει το περιεχόμενο της φόρμας επικοινωνίας στο email του ιδιοκτήτη.
    """
    owner_email = os.environ.get("OWNER_EMAIL")
    if not owner_email:
        print("OWNER_EMAIL is not set in .env file. Cannot send contact form email.")
        return

    # 1. Κάνουμε την αντικατάσταση του '\n' σε μια νέα μεταβλητή
    formatted_message = message_body.replace('\n', '<br>')

    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #1A1B1E; border-bottom: 2px solid #eee; padding-bottom: 10px;">Νέο Μήνυμα από τη Φόρμα Επικοινωνίας</h2>
            <p><strong>Όνομα:</strong> {name}</p>
            <p><strong>Email Αποστολέα:</strong> <a href="mailto:{sender_email}">{sender_email}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <h3><strong>Θέμα:</strong> {subject}</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #1A1B1E;">
                <p style="margin: 0;">{formatted_message}</p>
            </div>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">Αυτό το email στάλθηκε αυτόματα από τη φόρμα επικοινωνίας του website σας.</p>
        </div>
    </body>
    </html>
    """

    message = Mail(
        from_email='blockmbtco@gmail.com',
        to_emails=owner_email,
        subject=f"Νέο Μήνυμα: {subject}",
        html_content=html_content
    )
    try:
        sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sendgrid_client.send(message)
        print(f"Contact form email sent to {owner_email}, status code: {response.status_code}")
    except Exception as e:
        print(f"Error sending contact form email: {e}")