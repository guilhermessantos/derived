var input = $( '.cal-header-value' );

function derivate(exp) {
	var xPowMatch = exp.match( /([+-]?\d+)x\^(-?\d+)/ );
	var xMatch    = exp.match( /([+-]?\d+)x/ );

  	if ( xPowMatch ) {
    	return ( xPowMatch[1]* xPowMatch[2])+'x^'+(xPowMatch[2]-1);
  	} else if ( xMatch ) {
    	return xMatch[1];
  	}
}

function getFuncList(func) {
  	func = func.replace( /\bx/g, '1$&' );
  	return func.replace( /[-+]?\d+x/g, ' $&' ).trim().split( /\s/ );
}

$( 'button' ).on( 'click', function() {
	var button 		= $( this ).val()
	  , lastResult 	= input.val()
	  , result 		= input.val( lastResult + button )
	;

	if ( $( this ).data( 'result' ) == '='  ) {
		var funcList = getFuncList( lastResult );

		funcList = funcList.map(function(e, i) {
		  return derivate(e);
		});

		input.val( funcList.join('') );
	} else if ( $( this ).data( 'del' ) == '' ) {
		input.val('');
	} else if ( $( this ).data( 'del-one' ) == '<' ) {
		var slice = input.val().slice(0,-1);
		input.val( slice );
	}
});