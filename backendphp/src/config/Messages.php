<?php

class Messages
{
    private static array $messages = [
        'pt' => [
            'created'   => 'Médico criado com sucesso',
            'updated'   => 'Médico atualizado com sucesso',
            'deleted'   => 'Médico deletado com sucesso',
            'notFound'  => 'Médico não encontrado',
            'required'  => 'Campos nome, CRM e UFCRM são obrigatórios',
            'serverErr' => 'Erro interno do servidor',
        ],
        'en' => [
            'created'   => 'Doctor created successfully',
            'updated'   => 'Doctor updated successfully',
            'deleted'   => 'Doctor deleted successfully',
            'notFound'  => 'Doctor not found',
            'required'  => 'Fields nome, CRM and UFCRM are required',
            'serverErr' => 'Internal server error',
        ],
    ];

    public static function get(): array
    {
        $lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'pt';
        $lang = strtolower(substr($lang, 0, 2));
        return self::$messages[$lang] ?? self::$messages['pt'];
    }
}