<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    // The constructor runs automatically when the class is instantiated
    public function __construct() {
        $server_host = $_SERVER['HTTP_HOST'];

        // Check if we are running locally (XAMPP/WAMP)
        if ($server_host == 'localhost' || $server_host == '127.0.0.1') {
            $this->host = "localhost";
            $this->db_name = "alphv_assessment";
            $this->username = "root"; 
            $this->password = "";     
        } else {
            // Live DigitalOcean Credentials
            $this->host = "localhost"; 
            $this->db_name = "alphv_assessment";
            $this->username = "alphv_user";
            $this->password = "EvaRay@2026"; 
        }
    }

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // Set error mode to exception to catch errors cleanly
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>