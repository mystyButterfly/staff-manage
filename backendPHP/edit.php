<?php
header("Access-Control-Allow-Origin: https://mystybutterfly.github.io/staff-manage");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: PUT, OPTIONS");
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

// Get data from PUT request
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$name = $data['name'];
$age = $data['age'];
$occupation = $data['occupation'];
$city = $data['city'];

// Prepare and bind
$stmt = $conn->prepare("UPDATE People SET name = ?, age = ?, occupation = ?, city = ? WHERE id = ?");
$stmt->bind_param("sisss", $name, $age, $occupation, $city, $id);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Record updated successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "No record found with the given ID."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
