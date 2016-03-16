function theAjax(method, server, username, password)
{

    return $.ajax({
            url: 'GetDatabases.php',
            type: 'POST',
            data: {method: method, server: server, username: username, password: password}
        });
}

function loadDatabasesList() {

  doAjax();
  return;
}

function doAjax()
{
    var server, username, password;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    ajax = theAjax("getDatabases", server, username, password);
    ajax.done(processData);
    ajax.fail(function (){alert("Failure");});
}


function processData(response_in)
{
    var response = JSON.parse(response_in);
    var html = "";
    /*
    if (response.success)
    {
        alert("Success in processData");
    */
        $.each (response.data['database_names'], function(key, value)
        {
            $("#databases")
                .append($('<option>', {
                value: value.toString(),
                text:  value.toString()}));
        });
}
