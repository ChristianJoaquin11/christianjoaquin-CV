<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = strip_tags($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = strip_tags($_POST["subject"]);
    $message = strip_tags($_POST["message"]);

    $to = "christianjoaquin03@example.com"; // <- replace with your email address
    $headers = "From: $name <$email>";
    $fullMessage = "Name: $name\nEmail: $email\n\nSubject: $subject\n\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Message sent successfully!";
    } else {
        http_response_code(500);
        echo "Failed to send email.";
    }
}
?>