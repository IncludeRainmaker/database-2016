function fetch_data_php(method, server, username, password)
{

    return $.ajax({
            url: 'PHP/GetDatabases.php',
            type: 'POST',
            data: {method: method, server: server, username: username, password: password}
        });
}

/**
 * This function will call the give
 * @param  {string} php_function [function to run]
 * @return {[type]}              [description]
 */
function call_php(php_function)
{
    var server, username, password, method;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    method = JSON.stringify()
    ajax = theAjax(php_function, server, username, password);
    ajax.done(processData);
    ajax.fail(function (){alert("Failure");});
}

function loadDatabasesList()
{
    var php_function = "getDatabases";
    call_php(php_function);
    return;
}

function processData(response_in)
{
    var response = JSON.parse(response_in);
    var html = "";

    $.each (response.data['database_names'], function(key, value)
    {
        $("#databases").append($('<option>',{
            value: value.toString(),
            text:  value.toString()}));
    });
}
