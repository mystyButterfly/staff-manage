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
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Get data from POST request
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null; // Get the ID to delete

// Validate ID
if ($id === null || !is_numeric($id)) {
    echo json_encode(["status" => "error", "message" => "Valid ID is required"]);
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("DELETE FROM People WHERE id = ?");
if ($stmt === false) {
    // Log error for internal tracking
    error_log("Statement preparation failed: " . $conn->error);
    echo json_encode(["status" => "error", "message" => "Internal server error"]);
    exit;
}

$stmt->bind_param("i", $id);

// Execute the statement
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Record deleted successfully"]);
        // Log deletion for auditing
        error_log("Record with ID $id deleted successfully.");
    } else {
        echo json_encode(["status" => "error", "message" => "No record found with the provided ID"]);
    }
} else {
    // Log error for internal tracking
    error_log("Execution failed: " . $stmt->error);
    echo json_encode(["status" => "error", "message" => "Internal server error"]);
}

// Close connections
$stmt->close();
$conn->close();
?>
