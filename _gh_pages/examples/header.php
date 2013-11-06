<?php

if ($_GET["url"]){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $_GET["url"]);
    curl_setopt($curl, CURLOPT_FILETIME, true);
    curl_setopt($curl, CURLOPT_NOBODY, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $header = curl_exec($curl);
    $info = curl_getinfo($curl);
    curl_close($curl);
    //print($header['http_code']);
    print_r($info['http_code']);
}