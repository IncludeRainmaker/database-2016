<?php

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getDatabases() {
    // retrieve and sanitize posted values.
    if (isset($_POST['server']))
    {
        $server = json_decode(sanitize($_POST['server']));
    }
    if (isset($_POST['username']))
    {
        $username = json_decode(sanitize($_POST['username']));
    }
    if (isset($_POST['password']))
    {
        $password = json_decode(sanitize($_POST['password']));
    }

    $databaseNames = array();

    $dbConn = mysqli_connect($server, $username, $password);
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);

    if ($result) {
        while ($row = $result->fetch_array()) {
            array_push($databaseNames, $row[0]);
        }
    }
    
    $return = new stdClass;
    $return->succsss = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    echo $json;
}
