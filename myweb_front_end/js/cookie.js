function set_cookie(name, value, expires, path, domain, secure)
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

function get_cookie(name) {
var start = document.cookie.indexOf(name + "=");
var len = start + name.length + 1;
if ((!start) && (name != document.cookie.substring(0, name.length )))
{
return null;
}
if (start == -1) return null;
var end = document.cookie.indexOf(";", len);
if (end == -1) end = document.cookie.length;
return (document.cookie.substring(len, end));
}
// JavaScript Document