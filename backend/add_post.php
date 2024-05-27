<?php
// Set CORS headers to allow requests from different origins (adjust the allowed origin as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Set content type to JSON
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bloger";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("error" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set default values if not provided
    $userId = isset($data['userId']) ? $conn->real_escape_string($data['userId']) :1;
    $title = isset($data['title']) ? $conn->real_escape_string($data['title']) : '';
    $content = isset($data['content']) ? $conn->real_escape_string($data['content']) : '';
    $category = isset($data['category']) ? $conn->real_escape_string($data['category']) : 'design';
    $featuredImage = isset($data['featuredImage']) ? $conn->real_escape_string($data['featuredImage']) : 'default.png';

    // Check required fields
    if (empty($title) || empty($content)) {
        http_response_code(400);
        echo json_encode(array("error" => "Title and content are required fields"));
        exit();
    }

    // SQL to insert data into posts table
    $sql = "INSERT INTO posts (user_id, title, content, category,featured_image, created_at) VALUES ('$userId', '$title', '$content', '$category', '$featuredImage', NOW())";

    // Execute SQL query
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => "New post created successfully", "id" => $conn->insert_id));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error creating post: " . $conn->error));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "Invalid request method"));
}

// Close connection
$conn->close();
?>
