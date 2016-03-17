/**
 * [fetch_data_php description]
 * @param  {string} method   [desired php method]
 * @param  {string} server   [server ip]
 * @param  {string} username [username]
 * @param  {string} password [password]
 * @return {array}           [database info]
 */
function execute_php(method, server, username, password)
{

    return $.ajax({
            url: 'PHP/GetDatabases.php',
            type: 'POST',
            data: {method: method, server: server, username: username, password: password}
        });
}

/**
 * This function will call the give
 * @param  {string} php_function [function to run in php]
 * @return {[type]}              [description]
 */
function build_ajax(php_function)
{
    var server, username, password, method;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    method = JSON.stringify()
    ajax = execute_php(php_function, server, username, password);
    ajax.done(processData);
    ajax.fail(function (){alert("Failure");});
}
/**
 * Sets focus to Database tabs. 
 */
function set_db_focus()
{
    $('.nav-tabs a[href="#database_tab"]').tab('show');
}

function loadDatabasesList()
{
    var php_function = "getDatabases";
    build_ajax(php_function);
    set_db_focus();
    return;
}

function loadTablesList()
{
    var php_function = "describeTables";
    build_ajax(php_function);
}

function processData(response_in)
{
    var response = JSON.parse(response_in);
    var html = "";

    $.each (response.data['database_names'], function(key, value)
    {
        $("#databases").append($('<option>',{
            onclick: "loadTablesList(this)",
            value: value.toString(),
            text:  value.toString()}));
    });
}
