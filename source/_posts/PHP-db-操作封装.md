---
title: PHP db 操作封装
date: 2019-01-24 11:17:28
tags:
  - PHP
  - db
  - pdo
categories:
  - 日常记录
---
### 使用示例
```php
require __DIR__ . '/DB.php';

$conf = [
    'dsn' => 'mysql:dbname=db_test;host=localhost;port=3306;charset=utf8',
    'username' => 'root',
    'password' => '******'
];
$db = new DB($conf);
$db->insert('user', ['name' => 'test']);
$db->update('user', ['name' => 'bedisdover'], 'id = 1')
$db->fetch('SELECT * FROM t_user WHERE id = :id', ['id' => 1]);
```

### 源码
<!--more-->
```php
class DB
{

    private $pdo;

    /**
     * @param $conf array
     */
    public function __construct($conf)
    {
        $this->pdo = new PDO($config['dsn'], $config['username'], $config['password']);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    private function exec($sql, $params = [])
    {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            return $stmt;
        } catch (PDOException $e) {
            exit("db err");
        }
    }

    public function beginTx()
    {
        return $this->pdo->beginTransaction();
    }

    public function inTx()
    {
        return $this->pdo->inTransaction();
    }

    public function rollback()
    {
        return $this->pdo->rollBack();
    }

    public function commit()
    {
        return $this->pdo->commit();
    }

    public function execute($sql, $params = [], $lastInsertID = false)
    {
        $stmt = self::exec($sql, $params);

        if ($lastInsertID) {
            return $this->pdo->lastInsertId();
        } else {
            return $stmt->rowCount();
        }
    }

    public function fetch($sql, $params = [])
    {
        $stmt = self::exec($sql, $params);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchAll($sql, $params = [])
    {
        $stmt = self::exec($sql, $params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($table, $data = [], $condition = '')
    {
        $sql = "UPDATE ${table} SET ";
        $fields = [];
        $params = [];
        foreach ($data as $field => $value) {
            $fields[] = '`' . $field . '`=:field_' . $field;
            $params['field_' . $field] = $value;
        }
        $sql .= implode(',', $fields);
        if (!empty($condition)) {
            $sql .= ' WHERE ' . $condition;
        }

        return self::execute($sql, $params);
    }

    public function insert($table, $data = [])
    {
        $sql = "INSERT INTO ${table}";
        $fields = [];
        $params = [];
        foreach ($data as $field => $value) {
            $fields[] = '`' . $field . '`';
            $params[] = ':' . $field;
        }
        $sql .= '(' . implode(",", $fields) . ') VALUES (' . implode(",", $params) . ')';

        return self::execute($sql, $data, true);
    }
}
```
