<?php

class Database
{
    private static ?Database $instance = null;
    private PDO $conn;

    private function __construct()
    {
        $host = getenv('DB_HOST') ?: 'localhost';
        $name = getenv('DB_NAME') ?: 'aplis_db';
        $user = getenv('DB_USER') ?: 'aplis';
        $pass = getenv('DB_PASS') ?: 'aplis123';

        try {
            $this->conn = new PDO(
                "mysql:host=$host;dbname=$name;charset=utf8",
                $user,
                $pass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erro de conexão com o banco de dados"]);
            exit();
        }
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->conn;
    }
}