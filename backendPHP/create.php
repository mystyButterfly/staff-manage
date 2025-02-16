<?php
header("Access-Control-Allow-Origin: https://mystybutterfly.github.io/staff-manage");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204); // No Content
    exit;
}

// Database configuration
$host = 'localhost'; // Your database host
$port = '3306'; // Your database port
$db = 'peopledb'; // Your database name
$user = 'root'; // Your database username
$pass = ''; // Your database password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$age = $data['age'];
$occupation = $data['occupation'];
$city = $data['city'];
$id = random_int(1, 1000000); // Generate a unique ID

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO People (id, name, age, occupation, city) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssiss", $id, $name, $age, $occupation, $city);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "id" => $id]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>