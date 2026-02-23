<?php
// Essential headers for REST API
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';

// Instantiate database and connect
$database = new Database();
$db = $database->getConnection();

// Get the HTTP method (GET, POST, PUT, DELETE)
$request_method = $_SERVER["REQUEST_METHOD"];

// Handle Preflight OPTIONS request (Browser safety check)
if ($request_method == "OPTIONS") {
    http_response_code(200);
    exit();
}

switch($request_method) {
    case 'GET':
        // FETCH ALL DATA
        $query = "SELECT id, name, shape, color, created_at FROM shapes_data ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $data_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($data_arr, $row);
        }
        echo json_encode($data_arr);
        break;

    case 'POST':
        // ADD NEW DATA
        // Get raw posted JSON data
        $data = json_decode(file_get_contents("php://input"));

        // Bonus: Input Validation
        if(!empty($data->name) && !empty($data->shape) && !empty($data->color)) {
            $query = "INSERT INTO shapes_data SET name=:name, shape=:shape, color=:color";
            $stmt = $db->prepare($query);

            // Sanitize input to prevent Cross-Site Scripting (XSS)
            $name = htmlspecialchars(strip_tags($data->name));
            $shape = htmlspecialchars(strip_tags($data->shape));
            $color = htmlspecialchars(strip_tags($data->color));

            // Bind data
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":shape", $shape);
            $stmt->bindParam(":color", $color);

            if($stmt->execute()) {
                http_response_code(201); // 201 Created
                echo json_encode(array("message" => "Item created successfully."));
            } else {
                http_response_code(503); // 503 Service Unavailable
                echo json_encode(array("message" => "Unable to create item."));
            }
        } else {
            http_response_code(400); // 400 Bad Request
            echo json_encode(array("message" => "Incomplete data. Name, shape, and color are required."));
        }
        break;

    case 'PUT':
        // EDIT EXISTING DATA
        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->id) && !empty($data->name) && !empty($data->shape) && !empty($data->color)) {
            $query = "UPDATE shapes_data SET name=:name, shape=:shape, color=:color WHERE id=:id";
            $stmt = $db->prepare($query);

            $stmt->bindParam(":name", htmlspecialchars(strip_tags($data->name)));
            $stmt->bindParam(":shape", htmlspecialchars(strip_tags($data->shape)));
            $stmt->bindParam(":color", htmlspecialchars(strip_tags($data->color)));
            $stmt->bindParam(":id", htmlspecialchars(strip_tags($data->id)));

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Item updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update item."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Incomplete data for update."));
        }
        break;

    case 'DELETE':
        // DELETE DATA
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->id)) {
            $query = "DELETE FROM shapes_data WHERE id=:id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":id", htmlspecialchars(strip_tags($data->id)));

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Item deleted successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete item."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "ID is required for deletion."));
        }
        break;

    default:
        // INVALID REQUEST METHOD
        http_response_code(405); // 405 Method Not Allowed
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>