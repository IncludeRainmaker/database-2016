/**
 * Name: Ajax.js
 *
 * Description: This class handels DB Crud.
 *
 * Author: Austin M. Rademacher <a-rademacher@onu.edu>
 *
 */

/**
 * [fetch_data_php description]
 * @param  {string} method   [desired php method]
 * @param  {string} server   [server ip]
 * @param  {string} username [username]
 * @param  {string} password [password]
 * @return {array}           [database info]
 */
function execute_php(method, server, username, password, dbname)
{
    return $.ajax({
            url: 'PHP/CRUD_Database.php',
            type: 'POST',
            data: {method: method, server: server, username: username, password: password,
                   database_name: ""}
        });
}

/**
 * This function will call the give
 * @param  {string} php_function [function to run in php]
 * @return {[type]}              [description]
 */
function build_ajax(php_function, db_name)
{
    var server, username, password, method;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    method = JSON.stringify(php_function);
    db_name = JSON.stringify(db_name);
    ajax = execute_php(php_function, server, username, password, db_name);
    return ajax;
}

/*
    NOTE: End Connect functions
 */

/**
 * Empties the Option, so know values populated only once.
 * @param  {string} id [description]
 * @return {NULL}    [nothing]
 */
 function empty_select(id)
 {
     $(id).children().remove().end();
 }


// NOTE: Start Describe Databases
/**
 * loadDatabasesList
 * @return {[type]} [List of databases]
 */
function loadDatabasesList()
{
    empty_select("#databases")
    var php_function = "getDatabases";
    var dbname = "";
    ajax = build_ajax(php_function, dbname);
    ajax.done(process_database);
    ajax.fail(function (){alert("Failure");});
    $('.nav-tabs a[href="#database_tab"]').tab('show');
    return;
}

function process_database(response_in)
{
    var response = JSON.parse(response_in);

    $.each (response.data['database_names'], function(key, value)
    {
        $("#databases").append($("<option>",{
            value: value.toString(),
            text:  value.toString()}));
    });
}
// NOTE: End Describe Databases

// NOTE: Start Create Database

function createDatabase()
{
    var php_function = "createDatabase";
    var dbname = "";
    ajax = build_ajax(php_function, dbname);
}


function build_table_html(response_in)
{
  var response = JSON.parse(response_in);

  $.each (response.data['table_names'], function(key, value)
  {
      $("#tables_select").append($("<option>",{
          value: value.toString(),
          text:  value.toString()}));
  });
}

function show_tables()
{
  var php_function = "showTables";
  var dbname = $("#databases option:selected").val();
  ajax = build_ajax(php_function, dbname);
  ajax.done(build_table_html);
  $('.nav-tabs a[href="#tables_tab"]').tab('show');
  return;
}
