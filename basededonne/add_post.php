<?php
// Set CORS headers to allow requests from different origins (adjust the allowed origin as needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

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
    echo json_encode(array("error" => "Connection failed: " . $conn->connect_error));
    exit();
}

// Get the raw POST data
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($data['userId']) && isset($data['title']) && isset($data['content']) && isset($data['category'])) {
    $userId = $conn->real_escape_string($data['userId']);
    $title = $conn->real_escape_string($data['title']);
    $content = $conn->real_escape_string($data['content']);
    $category = $conn->real_escape_string($data['category']);

    // SQL to insert data into posts table
    $sql = "INSERT INTO posts (user_id, title, content, category, created_at) VALUES ('$userId', '$title', '$content', '$category', NOW())";

    // Execute SQL query
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("success" => "New post created successfully"));
    } else {
        echo json_encode(array("error" => "Error creating post: " . $conn->error));
    }
} else {
    echo json_encode(array("error" => "Invalid input"));
}

// Close connection
$conn->close();
?>
