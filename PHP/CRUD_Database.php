<?php

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function connectToDB($in_database)
{
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
    if (isset($_POST['database_name']))
    {
        $database_name = json_decode(sanitize($_POST['database_name']));
        return $dbConn = mysqli_connect($server, $username, $password, $database_name);
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
    $dbConn = connectToDB(false);
    $databaseNames = array();
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);
    mysqli_close($dbConn);

    if ($result) {
        while ($row = $result->fetch_array()) {
            array_push($databaseNames, $row[0]);
        }
    }

    $return = new stdClass;
    $return->successs = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    return $json;
}

function showTables()
{
    $dbConn = connectToDB();
    $table_names = array();
    $query = "SHOW TABLES";
    $result = $dbConn->query($query);
    mysqli_close($dbConn);

    if ($result)
    {
      while ($row = $result->fetch_arr())
      {
        array_push($table_names, $row[0]);
      }
    }

    $return = new stdClass;
    $return->success = true;
    $return->error_message = "";
    $return->data['table_names'] = $table_names;
    $json = json_encode($return);
    return $json;

}
