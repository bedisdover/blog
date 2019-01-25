---
title: PHP http 操作封装
date: 2019-01-25 19:16:42
tags:
  - PHP
  - http
  - curl
categories: 日常记录
---
### 使用示例
```php
require __DIR__ . '/Http.php';

Http::get('www.test.com/user?id=1');

$data = [
  'name' => 'bedisdover',
  'age' => 10
];

Http::post('www.test.com/create', $data);

Http::put('www.test.com/modify', $data);
```
### 源码
<!--more-->
```php
class Http
{
    private static function send($ch)
    {
        $response = curl_exec($ch);

        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($code == 200) {
            return json_decode($response, true);
        }

        return false;
    }

    /**
     * 发送 HTTP 请求
     * @param $url string 请求地址
     * @param $method string 请求方法
     * @param $data array 请求数据
     * @return array|bool HTTP 返回码为 200 时，返回 HTTP response，否则返回 false
     */
    private static function sendRequest($url, $method, $data = [])
    {
        $headers = [
            'Content-Type:' . 'application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_URL, $url);

        if (in_array($method, ['POST', 'PUT'])) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $ret = self::send($ch);

        curl_close($ch);

        return $ret;
    }

    /**
     * 发送GET请求.
     *
     * @param string $api
     * @return array|bool
     */
    public static function get($api)
    {
        return self::sendRequest($api, 'GET');
    }

    /**
     * 发送POST请求.
     *
     * @param string $api
     * @param array $fields
     * @return array|bool
     */
    public static function post($api, $fields = [])
    {
        return self::sendRequest($api, 'POST', $fields);
    }

    /**
     * 发送 PUT 请求
     * @param $api
     * @param array $fields
     * @return array|bool
     */
    public static function put($api, $fields = [])
    {
        return self::sendRequest($api, 'PUT', $fields);
    }
}
```
