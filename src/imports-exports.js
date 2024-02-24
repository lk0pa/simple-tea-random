const where = process.argv[ 2 ];
if ( !where ) throw new Error( "Specify a folder to enumerate" );
const path = require( "path" ).resolve( where );
require( "fs" )
    .readdirSync( path )
    .map( f => [ f, f.replace( /[^a-zA-Z0-9._]/g, "_" ).split( "." ) ] )
    .map( ( [ f, name ] ) => ( [ f, name.slice( 0, name.length - 1 ).join( "_" ) ] ) )
    .map( ( [ f, name ] ) => "import " + name + " from \"" + where + "/" + f + "\";export { " + name + " };" )
    .forEach( x => console.log( x ) );