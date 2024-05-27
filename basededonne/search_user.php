<?php
// Allow requests from any origin (for development purposes)
header('Access-Control-Allow-Origin: *');
// Allow only POST method
header('Access-Control-Allow-Methods: POST');
// Allow specific headers
header('Access-Control-Allow-Headers: Content-Type');

// Set content type to JSON
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloger";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the raw POST data
    $postData = file_get_contents("php://input");
    $data = json_decode($postData, true);

    // Validate and sanitize form inputs
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $hashedPassword = hash("sha256", $password); // Assuming passwords are hashed with SHA-256

    // SQL to search for user in the users table
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$hashedPassword'";

    // Execute query
    $result = $conn->query($sql);

    // Check if any results were found
    if ($result->num_rows > 0) {
        // User found, return user data
        $user = $result->fetch_assoc();
        echo json_encode(array("success" => true, "user" => $user));
    } else {
        // No user found with the provided credentials
        echo json_encode(array("success" => false, "error" => "Invalid email or password"));
    }
}

// Close connection
$conn->close();
?>
