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

    public function getById(int $id): array|false
    {
        $stmt = $this->conn->prepare(
            "SELECT id, nome, CRM, UFCRM FROM medicos WHERE id = :id"
        );
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
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

    public function update(int $id, array $data): bool
    {
        $stmt = $this->conn->prepare(
            "UPDATE medicos SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM WHERE id = :id"
        );
        return $stmt->execute([
            ':nome'  => $data['nome'],
            ':CRM'   => $data['CRM'],
            ':UFCRM' => $data['UFCRM'],
            ':id'    => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->conn->prepare(
            "DELETE FROM medicos WHERE id = :id"
        );
        return $stmt->execute([':id' => $id]);
    }
}