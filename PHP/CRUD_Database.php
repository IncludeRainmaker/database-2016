<?php

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function connectToDB()
{
    // retrieve and sanitize posted values.
    $server = get_post_val('server');
    $username = get_post_val('username');
    $password = get_post_val('password');

    if (isset($_POST['database_name']))
    {
        $database_name = json_decode(sanitize($_POST['database_name']));
        $dbConn = mysqli_connect($server, $username, $password, $database_name);
    }
    else
    {
        $dbConn = mysqli_connect($server, $username, $password);
    }

    return $dbConn;
}

/**
 * This function performs the call get the databases.
 * @return {array}
 */
function getDatabases()
{
    $dbConn = connectToDB();
    $databaseNames = array();
    $query = "SHOW DATABASES;";
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
    mysqli_close($dbConn);
    return $json;
}

function get_post_val($input)
{
    if (isset($_POST[$input]))
    {
        return json_decode(sanitize($_POST[$input]));
    }

    return "";
}

function createDatabase()
{
    $dbConn = connectToDB();
    $query = "CREATE DATABASE " + get_post_val('createdbname');
    $result = $dbConn->query($query);

    if(!$result)
    {
      die(mysqli_error());
    }

    mysqli_close($dbConn);

    return;
}
