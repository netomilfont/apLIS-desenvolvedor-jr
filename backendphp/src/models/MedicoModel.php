<?php

require_once __DIR__ . '/../config/Database.php';

class MedicoModel
{
    private PDO $conn;

    public function __construct()
    {
        $this->conn = Database::getInstance()->getConnection();
    }

    public function getAll(): array
    {
        $stmt = $this->conn->query(
            "SELECT id, nome, CRM, UFCRM FROM medicos ORDER BY id"
        );
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create(array $data): bool
    {
        $stmt = $this->conn->prepare(
            "INSERT INTO medicos (nome, CRM, UFCRM) VALUES (:nome, :CRM, :UFCRM)"
        );
        return $stmt->execute([
            ':nome'  => $data['nome'],
            ':CRM'   => $data['CRM'],
            ':UFCRM' => $data['UFCRM'],
        ]);
    }
}