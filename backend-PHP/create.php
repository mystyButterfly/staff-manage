<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204); // No Content
    exit;
}

// Database configuration
$host = 'infinityfree.com'; // Your database host
$port = '007';
$db = 'people_db'; // Your database name
$user = 'username'; // Your database username
$pass = 'password'; // Your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request<?php
// Sample rate limit configuration
$max_requests = 100; // maximum requests allowed
$time_frame = 3600; // time frame in seconds (1 hour)
$ip_address = $_SERVER['REMOTE_ADDR'];

// Simple rate limiting (consider using a more robust method in production)
session_start();
if (!isset($_SESSION['requests'])) {
    $_SESSION['requests'] = [];
}
$current_time = time();
$_SESSION['requests'] = array_filter($_SESSION['requests'], function($timestamp) use ($current_time, $time_frame) {
    return $timestamp > $current_time - $time_frame;
});
if (count($_SESSION['requests']) >= $max_requests) {
    http_response_code(429); // Too Many Requests
    echo json_encode(["status" => "error", "message" => "Rate limit exceeded."]);
    exit;
}
$_SESSION['requests'][] = $current_time;

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize input data
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$age = filter_var($data['age'], FILTER_VALIDATE_INT);
$occupation = filter_var($data['occupation'], FILTER_SANITIZE_STRING);
$city = filter_var($data['city'], FILTER_SANITIZE_STRING);

// Check for required fields and validate age
if (empty($name) || empty($occupation) || empty($city) || $age === false) {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Invalid input data."]);
    exit;
}

$id = random_int(1, 1000000); // Generate a unique ID

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO People (id, name, age, occupation, city) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiss", $id, $name, $age, $occupation, $city);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "id" => $id]);
} else {
    // Log error message without exposing it to the user
    error_log("Database insert error: " . $stmt->error);
    echo json_encode(["status" => "error", "message" => "Database error."]);
}

// Close connections
$stmt->close();
$conn->close();
?>
