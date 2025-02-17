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
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['id'], $data['name'], $data['age'], $data['occupation'], $data['city'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    exit;
}

// Sanitize inputs
$id = filter_var($data['id'], FILTER_SANITIZE_NUMBER_INT);
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$age = filter_var($data['age'], FILTER_SANITIZE_NUMBER_INT);
$occupation = filter_var($data['occupation'], FILTER_SANITIZE_STRING);
$city = filter_var($data['city'], FILTER_SANITIZE_STRING);

// Prepare and bind
$stmt = $conn->prepare("UPDATE People SET name = ?, age = ?, occupation = ?, city = ? WHERE id = ?");
if ($stmt === false) {
    error_log("SQL prepare error: " . $conn->error); // Log the error instead of displaying it
    echo json_encode(["status" => "error", "message" => "Database error."]);
    exit;
}

$stmt->bind_param("sissi", $name, $age, $occupation, $city, $id);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Person updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No records updated. Check if the ID exists."]);
    }
} else {
    error_log("SQL execute error: " . $stmt->error); // Log the error instead of displaying it
    echo json_encode(["status" => "error", "message" => "Database error."]);
}

// Close connections
$stmt->close();
$conn->close();
?>
