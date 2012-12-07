/**
 *  Math JavaScript Library v3.0.0
 *  https://github.com/aantthony/javascript-cas
 *  
 * Copyright 2010 Anthony Foster. All rights reserved.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function(undefined){
	"use strict";
	var _;function deprecated(message){
	var err = new Error(message).stack;
	if(!err){
		return console.warn('Deprecated: ' + message);
	}
    console.warn(err.replace(/^Error\: /, 'Deprecated: '));
}

var startTime = new Date();var crossProduct = String.fromCharCode(215);
function Language(language) {
	var operators = {};
	var op_precedence = 0;
	
	function op(v, assoc,arg_c) {
		//Register an operator
		var memsave = [assoc, op_precedence++, arg_c];
		if (typeof v === 'object') {
			for (var i=0; i<v.length; i++) {
				operators[v[i]] = memsave;
			}
		} else {
			operators[v] = memsave;
		}
	}
	language.forEach(function(o) {
		op(o[0], o[1] || L, (o[2] === undefined) ? 2 : o[2]);
	});
	this.operators = operators;
	Language.build.call(this);
}
_ = Language.prototype;
_.precedence = function (v) {
    //deprecated('Slow');
	if (!this.operators[v]) {
		throw('Precedence of ' + v + ' not known!');
	}
	return this.operators[v][1];
};

_.postfix = function (o) {
	var op = this.operators[o];
	return op[0] === 0 && op[2] === 1;
};
_.unary = function (o) {
	var unary_secondarys = ['+', '-', '±'];
	return (unary_secondarys.indexOf(o) != -1) ? ('@' + o) : false;
};

_.assoc = function(o) {
	return this.operators[o][1] === true;
};

_.Number = function(o) {
	// Support for integers
	var predefined = {
		'0': Global.Zero,
		'1': Global.One
	};
	if(predefined[o]) {
		return predefined[o];
	}
	
	if (/^[\d]+$/.test(o)) {
		return new Expression.Integer(Number(o));
	} else if(/^[\d]*\.[\d]+$/.test(o)){
		var d_place = o.indexOf(".");
		// 12.345 -> 12345 / 1000
		// 00.5 -> 5/10
		var denom_p = o.length - d_place - 1;
		var d = Math.pow(10, denom_p);
		var n = Number(o.replace(".", ""));
		
		return new Expression.Rational(n, d).reduce();
	}
	return predefined[o] || new Expression.NumericalReal(Number(o));
};var Construct = {};

Construct.Number = function (o) {
	var predefined = {
		'0': Global.Zero,
		'1': Global.One
	};
	if(predefined[o]) {
		return predefined[o];
	}
	
	if (/^[\d]+$/.test(o)) {
		return new Expression.Integer(Number(o));
	} else if(/^[\d]*\.[\d]+$/.test(o)){
		var d_place = o.indexOf(".");
		// 12.345 -> 12345 / 1000
		// 00.5 -> 5/10
		var denom_p = o.length - d_place - 1;
		var d = Math.pow(10, denom_p);
		var n = Number(o.replace(".", ""));
		
		return new Expression.Rational(n, d).reduce();
	}
	return predefined[o] || new Expression.NumericalReal(Number(o));
};
Construct.String = function (s) {
	return s;
};
Construct.Single = function (s) {
	// Single latex chars for x^3, x^y etc (NOT x^{abc})
	var n = Math.round(s);
	if(n == s) {
		return new Expression.Integer(n);
	}
	return s;
};var Global = {};/* Jison generated parser */
var calculator = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"S":4,"EOF":5,"e":6,"stmt":7,"=":8,"!=":9,"<":10,">":11,"<=":12,">=":13,"csl":14,",":15,"vector":16,"(":17,")":18,"+":19,"-":20,"*":21,"/":22,"POWER{":23,"}":24,"_{":25,"_SINGLE":26,"SQRT{":27,"FRAC{":28,"{":29,"^SINGLE":30,"identifier":31,"number":32,"IDENTIFIER":33,"LONGIDENTIFIER":34,"DECIMAL":35,"INTEGER":36,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"=",9:"!=",10:"<",11:">",12:"<=",13:">=",15:",",17:"(",18:")",19:"+",20:"-",21:"*",22:"/",23:"POWER{",24:"}",25:"_{",26:"_SINGLE",27:"SQRT{",28:"FRAC{",29:"{",30:"^SINGLE",33:"IDENTIFIER",34:"LONGIDENTIFIER",35:"DECIMAL",36:"INTEGER"},
productions_: [0,[3,2],[4,1],[4,1],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[14,3],[14,3],[16,3],[6,3],[6,3],[6,3],[6,3],[6,4],[6,4],[6,2],[6,3],[6,6],[6,2],[6,2],[6,2],[6,3],[6,1],[6,1],[6,1],[31,1],[31,1],[32,1],[32,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2:this.$ = $$[$0];
break;
case 3:this.$ = $$[$0];
break;
case 4:this.$ = ['=', $$[$0-2], $$[$0]];
break;
case 5:this.$ = ['!=', $$[$0-2], $$[$0]];
break;
case 6:this.$ = ['<', $$[$0-2], $$[$0]];
break;
case 7:this.$ = ['>', $$[$0-2], $$[$0]];
break;
case 8:this.$ = ['<=', $$[$0-2], $$[$0]];
break;
case 9:this.$ = ['>=', $$[$0-2], $$[$0]];
break;
case 10:this.$ = [',.', $$[$0-2], $$[$0]];
break;
case 11:this.$ = [',', $$[$0-2], $$[$0]];
break;
case 12:this.$ = $$[$0-1];
break;
case 13:this.$ = ['+', $$[$0-2], $$[$0]];
break;
case 14:this.$ = ['-', $$[$0-2], $$[$0]];
break;
case 15:this.$ = ['*', $$[$0-2], $$[$0]];
break;
case 16:this.$ = ['/', $$[$0-2], $$[$0]];
break;
case 17:this.$ = ['^', $$[$0-3], $$[$0-1]];
break;
case 18:this.$ = ['_', $$[$0-3], $$[$0-1]];
break;
case 19:this.$ = ['_', $$[$0-1], Construct.Single(yytext.substring(1))];
break;
case 20:this.$ = ['sqrt', $$[$0-1]];
break;
case 21:this.$ = ['frac', $$[$0-4], $$[$0-1]];
break;
case 22:this.$ = ['^', $$[$0-1], Construct.Single(yytext.substring(1))];
break;
case 23:this.$ = ['@-', $$[$0]]
break;
case 24:this.$ = ['default', $$[$0-1], $$[$0]];
break;
case 25:this.$ = $$[$0-1]
break;
case 26:this.$ = $$[$0];
break;
case 27:this.$ = $$[$0];
break;
case 28:this.$ = $$[$0];
break;
case 29:this.$ = yytext;
break;
case 30:this.$ = yytext.substring(1);
break;
case 31:this.$ = Construct.Number(yytext);
break;
case 32:this.$ = Construct.Number(yytext);
break;
}
},
table: [{3:1,4:2,6:3,7:4,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{1:[3]},{5:[1,16]},{5:[2,2],6:25,8:[1,26],9:[1,27],10:[1,28],11:[1,29],12:[1,30],13:[1,31],16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,2],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,3],24:[2,3]},{6:32,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:33,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:34,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:35,14:36,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,26],8:[2,26],9:[2,26],10:[2,26],11:[2,26],12:[2,26],13:[2,26],15:[2,26],17:[2,26],18:[2,26],19:[2,26],20:[2,26],21:[2,26],22:[2,26],23:[2,26],24:[2,26],25:[2,26],26:[2,26],27:[2,26],28:[2,26],30:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26]},{5:[2,27],8:[2,27],9:[2,27],10:[2,27],11:[2,27],12:[2,27],13:[2,27],15:[2,27],17:[2,27],18:[2,27],19:[2,27],20:[2,27],21:[2,27],22:[2,27],23:[2,27],24:[2,27],25:[2,27],26:[2,27],27:[2,27],28:[2,27],30:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27]},{5:[2,28],8:[2,28],9:[2,28],10:[2,28],11:[2,28],12:[2,28],13:[2,28],15:[2,28],17:[2,28],18:[2,28],19:[2,28],20:[2,28],21:[2,28],22:[2,28],23:[2,28],24:[2,28],25:[2,28],26:[2,28],27:[2,28],28:[2,28],30:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28]},{5:[2,29],8:[2,29],9:[2,29],10:[2,29],11:[2,29],12:[2,29],13:[2,29],15:[2,29],17:[2,29],18:[2,29],19:[2,29],20:[2,29],21:[2,29],22:[2,29],23:[2,29],24:[2,29],25:[2,29],26:[2,29],27:[2,29],28:[2,29],30:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29]},{5:[2,30],8:[2,30],9:[2,30],10:[2,30],11:[2,30],12:[2,30],13:[2,30],15:[2,30],17:[2,30],18:[2,30],19:[2,30],20:[2,30],21:[2,30],22:[2,30],23:[2,30],24:[2,30],25:[2,30],26:[2,30],27:[2,30],28:[2,30],30:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30]},{5:[2,31],8:[2,31],9:[2,31],10:[2,31],11:[2,31],12:[2,31],13:[2,31],15:[2,31],17:[2,31],18:[2,31],19:[2,31],20:[2,31],21:[2,31],22:[2,31],23:[2,31],24:[2,31],25:[2,31],26:[2,31],27:[2,31],28:[2,31],30:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31]},{5:[2,32],8:[2,32],9:[2,32],10:[2,32],11:[2,32],12:[2,32],13:[2,32],15:[2,32],17:[2,32],18:[2,32],19:[2,32],20:[2,32],21:[2,32],22:[2,32],23:[2,32],24:[2,32],25:[2,32],26:[2,32],27:[2,32],28:[2,32],30:[2,32],33:[2,32],34:[2,32],35:[2,32],36:[2,32]},{1:[2,1]},{6:37,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:38,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:39,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:40,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:41,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{4:42,6:3,7:4,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,19],8:[2,19],9:[2,19],10:[2,19],11:[2,19],12:[2,19],13:[2,19],15:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19],21:[2,19],22:[2,19],23:[2,19],24:[2,19],25:[2,19],26:[2,19],27:[2,19],28:[2,19],30:[2,19],33:[2,19],34:[2,19],35:[2,19],36:[2,19]},{5:[2,22],8:[2,22],9:[2,22],10:[2,22],11:[2,22],12:[2,22],13:[2,22],15:[2,22],17:[2,22],18:[2,22],19:[2,22],20:[2,22],21:[2,22],22:[2,22],23:[2,22],24:[2,22],25:[2,22],26:[2,22],27:[2,22],28:[2,22],30:[2,22],33:[2,22],34:[2,22],35:[2,22],36:[2,22]},{5:[2,24],6:25,8:[2,24],9:[2,24],10:[2,24],11:[2,24],12:[2,24],13:[2,24],15:[2,24],16:9,17:[1,8],18:[2,24],19:[2,24],20:[2,24],21:[2,24],22:[2,24],23:[1,21],24:[2,24],25:[2,24],26:[2,24],27:[2,24],28:[2,24],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:43,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:44,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:45,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:46,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:47,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:48,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[1,49],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[1,50],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,23],6:25,8:[2,23],9:[2,23],10:[2,23],11:[2,23],12:[2,23],13:[2,23],15:[2,23],16:9,17:[1,8],18:[2,23],19:[2,23],20:[2,23],21:[2,23],22:[2,23],23:[1,21],24:[2,23],25:[2,23],26:[2,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,15:[1,52],16:9,17:[1,8],18:[1,51],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{15:[1,54],18:[1,53]},{5:[2,13],6:25,8:[2,13],9:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],15:[2,13],16:9,17:[1,8],18:[2,13],19:[2,13],20:[2,13],21:[1,19],22:[1,20],23:[1,21],24:[2,13],25:[2,13],26:[2,13],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,14],6:25,8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],15:[2,14],16:9,17:[1,8],18:[2,14],19:[2,14],20:[2,14],21:[2,23],22:[2,23],23:[1,21],24:[2,14],25:[2,14],26:[2,14],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,15],6:25,8:[2,15],9:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],15:[2,15],16:9,17:[1,8],18:[2,15],19:[2,15],20:[2,15],21:[2,15],22:[2,15],23:[1,21],24:[2,15],25:[2,15],26:[2,15],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,16],6:25,8:[2,16],9:[2,16],10:[2,16],11:[2,16],12:[2,16],13:[2,16],15:[2,16],16:9,17:[1,8],18:[2,16],19:[2,16],20:[2,16],21:[2,16],22:[2,16],23:[1,21],24:[2,16],25:[2,16],26:[2,16],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[1,55],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{24:[1,56]},{5:[2,4],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,4],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,5],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,5],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,6],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,6],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,7],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,7],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,8],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,8],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,9],6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[2,9],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,20],8:[2,20],9:[2,20],10:[2,20],11:[2,20],12:[2,20],13:[2,20],15:[2,20],17:[2,20],18:[2,20],19:[2,20],20:[2,20],21:[2,20],22:[2,20],23:[2,20],24:[2,20],25:[2,20],26:[2,20],27:[2,20],28:[2,20],30:[2,20],33:[2,20],34:[2,20],35:[2,20],36:[2,20]},{29:[1,57]},{5:[2,25],8:[2,25],9:[2,25],10:[2,25],11:[2,25],12:[2,25],13:[2,25],15:[2,25],17:[2,25],18:[2,25],19:[2,25],20:[2,25],21:[2,25],22:[2,25],23:[2,25],24:[2,25],25:[2,25],26:[2,25],27:[2,25],28:[2,25],30:[2,25],33:[2,25],34:[2,25],35:[2,25],36:[2,25]},{6:58,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],15:[2,12],17:[2,12],18:[2,12],19:[2,12],20:[2,12],21:[2,12],22:[2,12],23:[2,12],24:[2,12],25:[2,12],26:[2,12],27:[2,12],28:[2,12],30:[2,12],33:[2,12],34:[2,12],35:[2,12],36:[2,12]},{6:59,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,17],8:[2,17],9:[2,17],10:[2,17],11:[2,17],12:[2,17],13:[2,17],15:[2,17],17:[2,17],18:[2,17],19:[2,17],20:[2,17],21:[2,17],22:[2,17],23:[2,17],24:[2,17],25:[2,17],26:[2,17],27:[2,17],28:[2,17],30:[2,17],33:[2,17],34:[2,17],35:[2,17],36:[2,17]},{5:[2,18],8:[2,18],9:[2,18],10:[2,18],11:[2,18],12:[2,18],13:[2,18],15:[2,18],17:[2,18],18:[2,18],19:[2,18],20:[2,18],21:[2,18],22:[2,18],23:[2,18],24:[2,18],25:[2,18],26:[2,18],27:[2,18],28:[2,18],30:[2,18],33:[2,18],34:[2,18],35:[2,18],36:[2,18]},{6:60,16:9,17:[1,8],20:[1,7],27:[1,5],28:[1,6],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,15:[2,11],16:9,17:[1,8],18:[2,11],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,15:[2,10],16:9,17:[1,8],18:[2,10],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{6:25,16:9,17:[1,8],19:[1,17],20:[1,18],21:[1,19],22:[1,20],23:[1,21],24:[1,61],25:[1,22],26:[1,23],27:[1,5],28:[1,6],30:[1,24],31:10,32:11,33:[1,12],34:[1,13],35:[1,14],36:[1,15]},{5:[2,21],8:[2,21],9:[2,21],10:[2,21],11:[2,21],12:[2,21],13:[2,21],15:[2,21],17:[2,21],18:[2,21],19:[2,21],20:[2,21],21:[2,21],22:[2,21],23:[2,21],24:[2,21],25:[2,21],26:[2,21],27:[2,21],28:[2,21],30:[2,21],33:[2,21],34:[2,21],35:[2,21],36:[2,21]}],
defaultActions: {16:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 'TEXT'
break;
case 2:return 17
break;
case 3:return 18
break;
case 4:return 28
break;
case 5:return 27
break;
case 6:return 21
break;
case 7:return 12
break;
case 8:return 13
break;
case 9:return 9
break;
case 10:return 34
break;
case 11:return 33
break;
case 12:return 35
break;
case 13:return 36
break;
case 14:return 8
break;
case 15:return 21
break;
case 16:return 21
break;
case 17:return 22
break;
case 18:return 20
break;
case 19:return 19
break;
case 20:return 10
break;
case 21:return 11
break;
case 22:return 13
break;
case 23:return 12
break;
case 24:return 9
break;
case 25:return '&&'
break;
case 26:return 26
break;
case 27:return 30
break;
case 28:return 25
break;
case 29:return 23
break;
case 30:return '!'
break;
case 31:return '%'
break;
case 32:return 15
break;
case 33:return '?'
break;
case 34:return ':'
break;
case 35:return 17
break;
case 36:return 18
break;
case 37:return 29
break;
case 38:return 24
break;
case 39:return '['
break;
case 40:return ']'
break;
case 41:return 5
break;
case 42:return 'INVALID'
break;
}
};
lexer.rules = [/^(?:\s+)/,/^(?:\$[^\$]*\$)/,/^(?:\\left\()/,/^(?:\\right\))/,/^(?:\\frac\{)/,/^(?:\\sqrt\{)/,/^(?:\\cdot\b)/,/^(?:\\le\b)/,/^(?:\\ge\b)/,/^(?:\\ne\b)/,/^(?:\\[a-zA-Z]+)/,/^(?:[a-zA-Z])/,/^(?:[0-9]+\.[0-9]*)/,/^(?:[0-9]+)/,/^(?:=)/,/^(?:\*)/,/^(?:\.)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:<)/,/^(?:>)/,/^(?:>=)/,/^(?:>=)/,/^(?:!=)/,/^(?:&&)/,/^(?:_[^\(\{])/,/^(?:\^[^\(\{])/,/^(?:_\{)/,/^(?:\^\{)/,/^(?:!)/,/^(?:%)/,/^(?:,)/,/^(?:\?)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:$)/,/^(?:.)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = calculator;
exports.Parser = calculator.Parser;
exports.parse = function () { return calculator.parse.apply(calculator, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    var source, cwd;
    if (typeof process !== 'undefined') {
        source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
    } else {
        source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}function Context() {
	
}
_ = Context.prototype = Object.create(Global);
_.reset = function() {
	this.splice(0);
};
_.impliesExpression = function(expr) {
	return false;
};
_.learn = function(expr) {
	this.equations.push(expr);
};/*
Todo:
 * Don't evaluate/compute until fully lexed (for parsing ambiguous expressions)
*/

Language.build = function () {
	this.parse = function (s, base) {
		if(s === '') {
			return undefined;
		}
		
		var root = Object.create({});
		var context = root;
		
		var free = {};
		var bound = {};
		
		function down(vars) {
			context = Object.create(context);
			var i;
			for(i in vars) {
				if(vars.hasOwnProperty(i)) {
					context[i] = vars[i];
				}
			}
		}
		function up(entity) {
			context = context.__proto__;
			return entity;
		}
		/*
			Evaluate AST tree (top-down)
			
			Examples:
				* y=x^2
					['=', y, ['^', x, 2]]
		
		*/
		var loose = false;
		function evaluate(ast) {
			if(typeof ast === 'string') {
				var symbol;
				if(symbol = context[ast]) {
					return symbol;
				} else if(symbol = base[ast]) {
					bound[ast] = symbol;
				} else {
					free[ast] = symbol = new Expression.Symbol.Real(ast);
				}
				return root[ast] = symbol;
			}
			if(typeof ast === 'object') {
				
				var ast1 = evaluate(ast[1]);
				
				if(ast.length === 3) {
					switch (ast[0]) {
						case 'frac':
							ast[0] = '/';
							break;
						case '_':
							// Don't bind underneath
							if(ast[1] === 'sum') {
								var limit = ast[2];
								if (limit[0] === '=') {
									// dummy variable: 
									var x = new Expression.Symbol.Real(limit[1]);
									
									// lower limit
									var a = evaluate(limit[2]);
									var summinator = new Expression.Sum.Real(x, a);
									summinator.vars = {};
									summinator.vars[x.symbol] = x;
									return summinator;
								}
							}
							break;
					}
					if(ast[0] === 'default' && ast1.vars) {
						down(ast1.vars);
							var result = ast1[ast[0]](evaluate(ast[2]));
							delete result.vars;
						return up(result);
					}
					return ast1[ast[0]](evaluate(ast[2]));
				}
				if(ast.length === 2) {
					switch(ast[0]) {
						case 'sqrt':
							return Global.sqrt.default(evaluate(ast[1]));
					}
					
					return evaluate(ast[1])[ast[0]]();
				}
				if(ast.length === 4) {
					return evaluate(ast[1])[ast[0]](evaluate(ast[1]), evaluate(ast[2]));
				}
			}
			return ast;
		}
		
		
		// Parse using context free grammar ([graph]/grammar/calculator.jison)
		var ast = calculator.parse(s);
		var result = evaluate(ast);
		result._ast = ast;
		if(root !== context) {
			throw('Context still open');
		}
		
		result.unbound = free;
		result.bound = bound;
		return result;
	};
};
function Expression(e, c) {
	var n = language.parse(e, c);
	return n;
}
//_ = Object.create(Array.prototype);
//_ = {};
_ = Expression.prototype;
_.valueOf = null;
_.identity = function () {
    deprecated('Slow');
	return this;
};

_.toString = null;
_.imageURL = function () {
	return 'http://latex.codecogs.com/gif.latex?' + encodeURIComponent(this.s('text/latex').s);
};
_.image = function () {
	var image = new Image();
	image.src = this.imageURL();
	return image;
};
_.sub = function () {
	return this;
};
_.lim = function (x, y) {
	return this.sub(x, y);
};
// Global Root operators:
_[','] = function (x) {
	if(x instanceof Expression.Statement) {
		return new Expression.Conditional(x, this);
	}
	return Expression.Vector([this, x]);
};
_['='] = function (x) {
	return new Expression.Statement(this, x, '=');
};
_['!='] = function (x) {
	return new Expression.Statement(this, x, '!=');
};

_['>'] = function (x) {
	return new Expression.Statement(this, x, '>');
};
_['>='] = function (x) {
	return new Expression.Statement(this, x, '>=');
};
_['<'] = function (x) {
	return new Expression.Statement(this, x, '<');
};
_['<='] = function (x) {
	return new Expression.Statement(this, x, '<=');
};

_['*'] = function (x) {
	if(x === Global.Zero) {
		return x;
	}
	if(x === Global.One) {
		return this;
	}
	return new Expression.List([this, x], '*');
};

_[crossProduct] = function (x) {
	return this['*'](x);
};
_.default = function (x) {
	return this['*'](x);
};

_['/'] = function (x) {
	return new Expression.List([this, x], '/');
};

_['+'] = function (x) {
	return new Expression.List([this, x], '+');
};

_['-'] = function (x) {
	return new Expression.List([this, x], '-');
};

_['@-'] = function (x) {
	return new Expression.List([this], '@-');
};

_['^'] = function (x) {
	return new Expression.List([this, x], '^');
};

_['%'] = function (x) {
	return new Expression.List([this, x], '%');
};








// =========== List ============ //
Expression.List = function(e, operator) {
    e.__proto__ = Expression.List.prototype;
	e.operator = operator;
	return e;
};
_ = Expression.List.prototype = Object.create(_);
_.constructor = Expression.List;


_.sub = function (x, y) {
	var a = this[0].sub(x, y);
	if(this.length === 1) {
		return a[this.operator]();
	}
	var b = this[1].sub(x, y);
	
	return a[this.operator || 'default'](b);
};

_['@-'] = function () {
	if(this.operator === '@-') {
		return this[0];
	}
	return new Expression.List([this], '@-');
};
/*
// TODO: Linked list?
function Multiset(x) {
	x.__proto__ = Multiset.prototype;
	return x;
}
Multiset.prototype.intersect = function () {
	
};
Multiset.prototype.union = function (x){
	return Multiset(Array.prototype.concat.call(this, x));
};
Multiset.prototype.add = function (x){
	this[this.length] = x;
	return this;
};
Multiset.prototype.remove = function (x) {
	var i = this.indexOf(x);
	this[i] = this[this.length - 1];
	this.length--;
	return this;
};
Multiset.prototype.map = function (x) {
	return Multiset(Array.prototype.map.call(this, x));
};
Multiset.prototype.filter = function (x) {
	return Multiset(Array.prototype.filter.call(this, x));
};
*/
function MultiSet(A, m) {
	this.A = A || [];
	this.m = m || [];
}
_ = MultiSet.prototype;
_.add = function (x) {
	// CHeck if it already exists
	var i = this.A.indexOf(x);
	if (i === -1) {
		var l = this.length;
		this.A[l] = x;
		this.m[l] = 1;
	} else {
		this.m[i]++;
	}
	return this;
};
_.remove = function (x) {
	var i = this.A.indexOf(x);
	this.m[i]--;
	return this;
};
_.intersect = function (x) {
	// -> Multiset
	throw ('What is multiset intersection?');
};
_.map = function (x) {
	// Assumes x has no side effects and is not many to one
	// TODO: Should this supply m(A) ?
	return MultiSet(Array.prototype.map.call(this.A, x), this.m);
};
MultiSet.fromArray = function (arr) {
	throw ('NYI');
	// O(n^2 ?)
	var A = [];
	var m = [];
	return new MultiSet(A, m);
};function Set(x) {
	x.__proto__ = Set.prototype;
	return x;
};
_ = Set.prototype;
_.intersect = function (set) {
	// O(n^2)
	var i;
	var i_l = this.length;
	var j;
	var j_l = set.length;
	var s = new Set([]);
	for (i = 0; i < i_l; i++) {
		// Find in second set:
		for (j = 0; j < j_l; j++) {
			var a = this[i];
			var b = set[j];
			if (a === b) {
				s[s.length] = (a);
				break;
			}
			var my_val = (a)['-'](b);
			if(my_val === Global.Zero) {
				s[s.length] = (a);
				break;
			}
		}
	}
	return a;
}; 
_.union = function (set) {
	// TODO: check for duplicates
	return Set(Array.prototype.concat.call(this, set));
}
_.remove = function (x) {
	// O(1 + lookup[n])
	var i = this.indexOf(x);
	this[i] = this[this.length - 1];
	this.length--;
	return this;
}
_.add = function (x) {
	// O(1 + lookup[n])
	if (this.indexOf(x) === -1) {
		this[this.length] = x;
	}
	return this;
};
_.map = function (f) {
	return Set(Array.prototype.map.call(this, f));
};
_.compose = function (set) {
	
};
_.cardinality = function () {
	return this.length;
};

function InfiniteSet(x) {
	
}
InfiniteSet.aleph_0 = {
	'>': function (x) {
		if(x instanceof Expression.NumericalReal) {
			return Expression.True;
		}
	}
};
_ = InfiniteSet.prototype = Object.create(Set.prototype);

_.cardinality = function () {
	return InfiniteSet.cardinality;
};
Expression.TruthValue = function TruthValue(v) {

};

_ = Expression.TruthValue.prototype = Object.create(Expression.prototype);

Expression.True = new Expression.TruthValue();
Expression.False = new Expression.TruthValue();

//Only difference:
Expression.False['~'] = function () {
	return Expression.True;
};


_['~'] = function () {
	return Expression.False;
};
_['V'] = function (e) {
	return e === Expression.True ? e : this;
};
_['^'] = function (e) {
	return e === Expression.True ? this : e;
};


Expression.Statement = function (x, y, operator) {
	var arr = [x,y];
	arr.operator = operator;
	arr.__proto__ = Expression.Statement.prototype;
	return arr;
};
//todo: truth value type?
_ = Expression.Statement.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Statement;
_['='] = function () {
	
};
_['<'] = function () {
	// a < b < c
	// (a < b) = b
	// b < c
	
	// a < (b < c)
	// a < b .. (b < c) = b
	// (a < b) = a.
};
_.solve = function (vars) {
	// a = b
	// If b has an additive inverse?
	
	// a - b = 0
	var a_b = (this.a)['-'](this.b);
	/*
	Examples:
	(1,2,3) - (x,y,z) = 0 (solve for x,y,z)
	(1,2,3) - x = 0 (solve for x)
	*/
	return a_b.roots(vars);
};
var left, right;
var L = left = 0;
var R = right = 1;

var language = new Language([
	[';'],			/*L / R makes no difference???!??!? */
	[','],
	[['=', '+=', '-=', '*=', '/=', '%=', '&=', '^=', '|='],R],
	[['?',':'],R,2],
	[['∨']],
	[['&&']],
	[['|']],
	[['??????']],//XOR
	[['&']],
	[['==', '≠', '!==', '===']],
	[['<', '<=', '>', '>='],L],
	[['>>', '<<']],
	['±', R, 2],
	[['+'], true],
	[['-'], L],
	[['∫', '∑'], R, 1],
	[['*', '%'], R],
	[crossProduct, R],
	[['@+', '@-', '@±'], R, 1], //unary plus/minus
	[['¬'], L, 1],
	['default', R, 2], //I changed this to R for 5sin(t)
	['∘', R, 2],
	[['/']],
	[['^']],//e**x
	['!', L, 1],
	[['~'], R, 1], //bitwise negation
	[['++', '++', '.', '->'],L,1],
	[['::']],
	[['_'], L, 2],
	['var', R, 1],
	['break', R, 0],
	['throw', R, 1],
	['\'', L, 1],
	['\u221A', R, 1], // Sqrt
	['#', R, 1]	/*anonymous function*/
]);

/*
 Language spec columns in order of _increasing precedence_:
 * operator string representation(s). These are different operators, but share all properties.
 * Associativity
 * Operand count (Must be a fixed number) 
 * (TODO??) commute group? - or should this be derived?
 * (TODO?) associative? commutative?  - Should be calculated?
 * (TODO?) Identity?
*/

var mathematica = new Language([
	[';'],
	[','],
	[['=', '+=']]
]);Expression.Constant = function() {
	throw new Error('Expression.Constant created directly');
};
_ = Expression.Constant.prototype = Object.create(Expression.prototype);
_.simplify = function() {
	return this;
};
_.differentiate = function() {
	return Global.Zero;
};
_.default = function (x){
	return this['*'](x);
};Expression.Symbol = function Symbol(str) {
    //Req: str is a String
	this.symbol = str;
};

_ = Expression.Symbol.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Symbol;

_.differentiate = function (x) {
	return this === x ? Global.One : Global.Zero;
};
_.integrate = function (x) {
    if (this === x) {
		return new Expression.NumericalReal(0.5, 0) ['*'] (x ['^'] (new Expression.NumericalReal(2,0)));
    }
	return (this) ['*'] (x);
};
_.sub = function (x, y) {
	// TODO: Ensure it is real (for Expression.Symbol.Real)
	return this === x ? y : this;
};

// ============= Real Number ================ //
Expression.Symbol.Real = function Symbol_Real(str) {
    this.symbol = str;
};
_ = Expression.Symbol.Real.prototype = Object.create(Expression.Symbol.prototype);
_.constructor = Expression.Symbol.Real;
_.realimag = function() {
    return Expression.List.ComplexCartesian([this, Global.Zero]);
};
_.real = function() {
    return this;
};
_.imag = function() {
    return Global.Zero;
};
_.polar = function() {
	return Expression.List.ComplexPolar([
		Expression.List.Real([Global.abs, this]),
		Expression.List.Real([Global.arg, this])
	]);
};
_.abs = function() {
	return Expression.List.Real([Global.abs, this]);
};
_.arg = function() {
	return Expression.List.Real([Global.arg, this]);
};

_['+'] = function (x) {
	if (x == Global.Zero) {
		return this;
	}

	if(x instanceof Expression.NumericalReal) {
		return new Expression.List.Real([this, x], '+');
	}
	if(x instanceof Expression.Symbol.Real) {
		return new Expression.List.Real([this, x], '+');
	}
	if(x instanceof Expression.Symbol) {
		return new Expression.List([this, x], '+');
	}
	return x['+'](this);
};
_['-'] = function (x) {
	if(this === x) {
		return Global.Zero;
	}
	if(x instanceof Expression.Symbol.Real) {
		return new Expression.List.Real([this, x], '-');
	}
	if(x instanceof Expression.List.Real) {
		if (x.operator === '@-') {
			return new Expression.List.Real([this, x[0]], '+');
		}
		return new Expression.List.Real([this, x], '-');
	}
	if(x instanceof Expression.Symbol) {
		return new Expression.List([this, x], '-');
	}
	
	return x['@-']()['+'](this);
};

_['@+'] = function (x) {
	return Expression.List.Real([this], '@+');
};

_['@-'] = function (x) {
	return Expression.List.Real([this], '@-');
};

_['*'] = function (x) {

	if(x instanceof Expression.Rational) {
		if(x.a === x.b) {
			return this;
		}
	}
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			return Global.Zero;
		}
	}
	if(x instanceof Expression.Symbol.Real) {
		return new Expression.List.Real([this, x], '*');
	}
	if(x instanceof Expression.List.Real) {
		return x['*'](this);
	}
	if(x instanceof Expression.Symbol) {
		return new Expression.List([this, x], '*');
	}
	if(x instanceof Expression.NumericalReal) {
		return new Expression.List.Real([x, this], '*');
	}
	if(x instanceof Expression.NumericalComplex) {
		return new Expression.List.Real([this, x], '*');
	}
	if(x instanceof Expression.List.ComplexCartesian) {
		return x['*'](this);
	}
	return x['*'](this);
};
_.default = _['*'];
_['/'] = function (x) {

	if(x instanceof Expression.Rational) {
		if(x.a === x.b) {
			return this;
		}
	}
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			throw('Division by zero');
		}
	}
	
	return Expression.List.Real([this, x], '/');
};
_['^'] = function (x) {
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			return Global.One;
		}
	}
	
	if(x instanceof Expression.Rational) {
		if(x.a === x.b) {
			return this;
		}
	}
	if (x instanceof Expression.Integer) {
		return Expression.List.Real([this, x], '^');
	} else if(x instanceof Expression.Rational) {
		var f = x.reduce();
		if(f.a % 2 === 0) {
			return Expression.List.Real([this, x], '^');
		}
	}
	return Expression.List([this, x], '^');
};
_['%'] = function (x) {
	return Expression.List.Real([this, x], '%');
};
_.apply = function(operator, e) {
	throw("Real.apply");
	if (operator === ',') {
		//Maybe this should be a new object type??? Vector?
		console.log('APPLY: ', this.constructor, this, e);
		return Expression.Vector([this, e]);
	} else if (operator === '=') {
		return Expression.Equation([this, e], operator);
	}
	if (e === undefined) {
		//Unary:
		switch (operator) {
			case '!':
				//TODO: Can't simplify, so why bother! (return a list, since gamma maps all reals to reals?)
				return Global.Gamma.apply(undefined, this.apply('+', Global.One));
			case '@-':
				return Expression.List.Real([this], operator);
			default:
		}
		throw('Real Symbol('+this.symbol+') could not handle operator '+ operator);
	} else {
		// Simplification:
		switch (e.constructor){
			case Expression.Symbol.Real:
			case Expression.List.Real:
				/*if(this.positive && e.positive) {
					return Expression.List.Real([this, e], operator);
				}*/
				switch(operator) {
					case '^':
						//TODO: Bad idea? This will stay in this form until realimag() is called by user, and user only.
						//return Expression.List([this, e], operator);
						return Expression.List.ComplexPolar([
							Expression.List.Real([Expression.List.Real([Global.abs, this]), e],'^'),
							Expression.List.Real([e, Expression.List.Real([Global.arg, this])],'*')
						]);
					case undefined:
						return Expression.List.Real([this, e], '*');
					default:
						return Expression.List.Real([this, e], operator);
				}
			case Expression.NumericalReal:
				switch(operator){
					case '+':
					case '-':
						if(e.value === 0){
							return this;
						}
						return Expression.List.Real([this, e], operator);
						break;
					case undefined:
					case '*':
						if(e.value === 1){
							return this;
						} else if(e.value === 0){
							return Global.Zero;
						}
						return Expression.List.Real([this, e], '*');
						break;
					case '%':
						return Expression.List.Real([this, e], '%');
					case '^':
						if(e.value === 1){
							return this;
						} else if(e.value === 0){
							return Global.One;
						}
						if(false && opengl_TODO_hack() && e.value === ~~e.value){
							return Expression.List.Real([this, e], operator);
						}
						return Expression.List.ComplexPolar([
							Expression.List.Real([Expression.List.Real([Global.abs, this]), e],'^'),
							Expression.List.Real([e, Expression.List.Real([Global.arg, this])],'*')
						]);
						
						break;
					case '/':
						if(e.value === 1){
							return this;
						} else if(e.value === 0){
							return Global.Infinity;
						}
						return Expression.List.Real([this, e], operator);
						break;
				}
				break;
			case Expression.Complex:
				return this.realimag().apply(operator, e); // GO to above (will apply reals)
				break;
			case Expression.List.ComplexCartesian:
				//Maybe there is a way to swap the order? (e.g. a .real = true property for other things to check)
				//or instance of Expression.Real ?
				switch(operator) {
					case '+':
					case '-':
						return Expression.List.ComplexCartesian([
							this.apply(operator, e[0]),
							e[1]
						]);
					case undefined:
						operator = '*';
					case '*':
						return Expression.List.ComplexCartesian([
							this.apply(operator, e[0]),
							this.apply(operator, e[1])
						]);
					case '/':
						var cc_dd = e[0].apply('*',e[0]).apply('+',e[1].apply('*',e[1]));
						return Expression.List.ComplexCartesian([
							(this.apply('*',e[0])).apply('/', cc_dd),
							this.apply('*',e[1]).apply('/', cc_dd).apply('@-')
						]);
				}
			case Expression.List.ComplexPolar:
				//Maybe there is a way to swap the order?
				return this.polar().apply(operator, e);
		}
		throw('LIST FROM REAL SYMBOL! '+ operator, e.constructor);
		return Expression.List([this, e], operator);
	}
};

Expression.Function = function (p) {
	this.default = p.default;
	this['text/latex'] = (p['text/latex']);
	this['x-shader/x-fragment'] = (p['x-shader/x-fragment']);
	this['text/javascript'] = (p['text/javascript']);
	this.derivative = p.derivative;
	this.realimag = p.realimag;
};
_ = Expression.Function.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Function;
_.default = function (argument) {
	return ;
};
_.differentiate = function () {
	if (this.derivative) {
		return this.derivative;
	}
	throw('Function has no derivative defined.');
}

_.s = function (lang) {
	if (this[lang]) {
		return new Code(this[lang]);
	}
	throw('Could not compile function into ' + lang);
};

_['+'] = function (x) {
	var a = new Expression.Symbol();
	return new Expression.Function.Symbolic(this.default(a)['+'](x), [a]);
};

_['@-'] = function (x) {
	var a = new Expression.Symbol();
	return new Expression.Function.Symbolic(this.default(a)['@-'](), [a]);
};


Expression.Function.Symbolic = function SymbolicFunction(expr, vars) {
	this.expr = expr;
	this.symbols = vars;
	
};
_ = Expression.Function.Symbolic.prototype = Object.create(Expression.Function.prototype);
_.constructor = Expression.Function.Symbolic;

_.default = function (x) {
	if (x.constructor !== Expression.Vector) {
		x = Expression.Vector([x]);
	}
	var expr = this.expr;
	var i, l = this.symbols.length;
	if (l !== x.length) {
		throw ('Invalid domain. Element of F^' + l + ' expected.');
	}
	for(i = 0; i < l; i++) {
		expr = expr.sub(this.symbols[i], x[i])
	}
	return expr;
};Expression.NumericalComplex = function(real, imag) {
	this._real = real;
	this._imag = imag;
};

_ = Expression.NumericalComplex.prototype = Object.create(Expression.Constant.prototype);

_.constructor = Expression.NumericalComplex;
_.real = function() {
	return new Expression.NumericalReal(this._real);
};
_.imag = function() {
	return new Expression.NumericalReal(this._imag);
};
_.realimag = function() {
	return Expression.List.ComplexCartesian([
		new Expression.NumericalReal(this._real),
		new Expression.NumericalReal(this._imag)
	]);
};
_.conjugate = function() {
	return new Expression.NumericalComplex(this._real, -this._imag);
};
_['+'] = function (x) {
	if(this._real === 0 && this._imag === 0) {
		return x;
	}
	if(x instanceof Expression.NumericalComplex){
		return new Expression.NumericalComplex(this._real + x._real, this._imag + x._imag);
	} else if (x instanceof Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real + x.value, this._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['+'](this);
	} else {
		throw ('Unknown Type for NumericalComplex +');
	}
};
_['-'] = function (x) {
	if(this._real === 0 && this._imag === 0) {
		return x['@-']();
	}
	if(x instanceof Expression.NumericalComplex){
		return new Expression.NumericalComplex(this._real - x._real, this._imag - x._imag);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real - x.value, this._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x['@-']())['+'](this);
	} else {
		throw ('Unknown Type for NumericalComplex -');
	}
};
_['*'] = function (x) {
	if(this._imag === 0) {
		if(this._real === 0) {
			return Global.Zero;
		}
		if(this._real === 1) {
			return x;
		}
	}
	
	if(x.constructor === this.constructor){
		return new Expression.NumericalComplex(this._real * x._real - this._imag * x._imag, this._real * x._imag + this._imag * x._real);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real * x.value, this._imag * x.value);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['*'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['*'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['*'](this);
	} else {
		throw ('Unknown Type for NumericalComplex *');
	}
};

_['/'] = function (x) {
	if(this._imag === 0 && this._real === 0) {
		// TODO: Provided x != 0
		return Global.Zero;
	}
	
	if(x.constructor === this.constructor){
		var cc_dd = x._real * x._real + x._imag * x._imag;
		return new Expression.NumericalComplex((this._real * x._real + this._imag * x._imag)/cc_dd, (this._imag * x._real - this._real * x._imag) / cc_dd);
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalComplex(this._real / x.value, this._imag / x.value);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		return this.realimag()['/'](x);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return this.polar()['/'](x);
	} else if(x.constructor === Expression.List.Real) {
		return Expression.List([this, x], '/');
	} else if(x.constructor === Expression.Symbol.Real) {
		return Expression.List([this, x], '/');
	} else if(x.constructor === Expression.List) {
		return Expression.List([this, x], '/');
	} else {
		throw ('Unknown Type for NumericalComplex /');
	}
};

_['!'] = function (){
	return Global.Gamma.default(this);
};
(function(){
	return;
	var one_on_rt2 = 1/Math.sqrt(2);
	Expression.NumericalComplex.prototype.apply = function(operator, x) {
		switch (operator){
			case '^':
				if(this._real === 0 && this._imag === 0) {
					return Global.Zero; // Contradicts x^0 = 1
				}
				break;
			case '+':
				if(this._real === 0 && this._imag === 0) {
					return x;
				}
				break;
			case '-':
				if(this.value === 0) {
					return x.apply('@-');
				}
				break;
			case undefined:
			case '*':
				if(this._real === 1 && this._imag === 0){
					return x;
				}
				//Note: There is not meant to be a break here.
			case '/':
				if(this._real === 0 && this._imag === 0){
					return Global.Zero; //Contradics x/0 = Infinity
				}
		}
		if (operator === ',') {
			return Expression.Vector([this, x]);
		} else if (x === undefined) {
			switch (operator) {
				
				case '@+':
					return this;
				case '@-':
					return new Expression.NumericalComplex(-this._real, -this._imag);
				case '\u221A':
					throw('OLD SQRT. New one is a function, not operator.')
					return new Expression.NumericalComplex(p, q);
				case '++':
				case '--':
					throw(new TypeError('Postfix ' +operator + ' operator applied to value that is not a reference.'));
				case '+=':
				case '-=':
				case '*=':
				case '/=':
					throw(new ReferenceError('Left side of assignment is not a reference.'));
				case '!':
					return Global.Gamma.apply(undefined, new Expression.NumericalComplex(this._real + 1, this._imag));
			}
		} else if (x.constructor === Expression.NumericalReal) {
			switch (operator) {
				case '*':
				case undefined:
					return new Expression.NumericalComplex(this._real * x.value, this._imag * x.value);
				case '+':
					return new Expression.NumericalComplex(this._real + x.value, this._imag);
				case '-':
					return new Expression.NumericalComplex(this._real - x.value, this._imag);
				case '/':
					return new Expression.NumericalComplex(this._real / x.value, this._imag / x.value);
				case '^':
					var a = this._real;
				    var b = this._imag;
				    var c = x.value;

				    var hlm = 0.5 * Math.log(a*a + b*b);
				    var theta = Math.atan2(b, a);
				    var hmld_tc = theta * c;
				    var e_hmlc_td = Math.exp(hlm * c);
                    return new Expression.NumericalComplex(
                        (e_hmlc_td * Math.cos(hmld_tc)),
				        (e_hmlc_td * Math.sin(hmld_tc))
                    );
				default:
			}
		} else if (x.constructor === this.constructor) {
			switch (operator) {
				case '*':
				case undefined:
					// (a+bi)(c+di) = (ac-bd) + (ad+bc)i 
					return new Expression.NumericalComplex(this._real * x._real - this._imag * x._imag, this._real * x._imag + this._imag * x._real);
				case '+':
					return new Expression.NumericalComplex(this._real + x._real, this._imag + x._imag);
				case '-':
					return new Expression.NumericalComplex(this._real - x._real, this._imag - x._imag);
				case '/':
					//	(a+bi)/(c+di) 
					//= [(a+bi)(c-di)]/[(c+di)(c-di)]
					//= [(a+bi)(c-di)]/[cc + dd]
					//=	[ac -dai +bci + bd]/[cc+dd]
					//= [ac + bd + (bc - da)]/[cc+dd]
					var cc_dd = x._real * x._real + x._imag * x._imag;
					return new Expression.NumericalComplex((this._real * x._real + this._imag * x._imag)/cc_dd, (this._imag * x._real - this._real*x._imag)/cc_dd);
				case '^':
				    var a = this._real;
				    var b = this._imag;
				    var c = x._real;
				    var d = x._imag;

				    var hlm = 0.5 * Math.log(a*a + b*b);
				    var theta = Math.atan2(b, a);
				    var hmld_tc = hlm * d + theta * c;
				    var e_hmlc_td = Math.exp(hlm * c - theta * d);
                    return new Expression.NumericalComplex(
                        (e_hmlc_td * Math.cos(hmld_tc)),
				        (e_hmlc_td * Math.sin(hmld_tc))
                    );
				default:
			}
		} else if(x.constructor === Expression.List.ComplexCartesian) {
			return this.realimag().apply(operator, x);
		} else if(x.constructor === Expression.List.ComplexPolar) {
			return this.polar().apply(operator, x);
		} else if(x.constructor === Expression.List.Real) {
			return this.realimag().apply(operator, x);
		} else if(x.constructor === Expression.Symbol.Real) {
			return this.realimag().apply(operator, x);
		}
		console.error('cmplx . ' + operator + ' => E.List?');
		/*
		if(this._real === 0.0 && this._imag === 0.0){
			return this;
		}
		*/
		
		
		return this.realimag().apply(operator, x);
		return Expression.List([this, x], operator);
	}
	
}());Expression.Conditional = function Conditional(cond, a, b) {
	if(a instanceof Expression.Symbol.Real || a instanceof Expression.List.Real) {
		return new Expression.Conditional.Real(cond, a, b);
	}
	this.cond = cond;
	this.a = a;
	this.b = b || Global.undefined;
};
_ = Expression.Conditional.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Conditional;

_.s = function (lang) {
	throw('Not real... too confusing');
};
function expandThrough(c, func) {
	return new Expression.Conditional(c.cond, func(c.a), func(c.b));
}
_.real = function (x) {
	return expandThrough(this, function (y) {
		return y.real();
	});
};
_.imag = function (x) {
	return expandThrough(this, function (y) {
		return y.imag();
	});
};
_.realimag = function (x) {
	return expandThrough(this, function (y) {
		return y.realimag();
	});
};
_.differentiate = function (x) {
	return expandThrough(this, function (y) {
		return y.differentiate(x);
	});
};
Expression.Conditional.Real = function ConditionalReal(cond, a, b) {
	this.cond = cond;
	this.a = a;
	this.b = b || Global.undefined;
};
_ = Expression.Conditional.Real.prototype = Object.create(Expression.Conditional.prototype);
_.constructor = Expression.Conditional.Real;
_.real = function () {
	return this;
};
_.imag = function () {
	return Global.Zero;
};
_.realimag = function () {
	return new Expression.List.ComplexCartesian([this, Global.Zero]);
};
_.s = function (lang) {
	if (lang === 'text/latex') {
		
	}
	if (lang === 'text/javascript' || lang == 'x-shader/x-fragment') {
		var ca = this.a.s(lang);
		var cb = this.b.s(lang);
		console.log('code', ca, cb);
		var ccond = this.cond.s(lang);
		var ca_s = ca.s;
		var c = ca.merge(cb);
		// Use parentheses anyway...
		return c.merge(ccond, '(' + ccond.s +') ? ' + ca_s + ' : ' + cb.s);
	}
};Expression.prototype.conjugate = function() {
	throw('Conjugate');
};

Expression.List.prototype.conjugate = function() {
	var i, l = this.length;
	var n = new Array(l);
	for (i = 0; i < l; i++) {
		n[i] = this[i].conjugate();
	}
	return Expression.List(n, this.operator);
};
Expression.NumericalReal = function NumericalReal(e) {
	this.value = e;
};

_ = Expression.NumericalReal.prototype = Object.create(Expression.NumericalComplex.prototype);

_.constructor = Expression.NumericalReal;
Object.defineProperty(_, "_real", {
	get: function () {
		return this.value;
	}
});
_._imag = 0;

_.real = function() {
	return this;
};
_.imag = function() {
	return Global.Zero;
};
_.realimag = function() {
	return Expression.List.ComplexCartesian([
		this,
		Global.Zero
	]);
};
_.conjugate = function() {
	return this;
};

_['+'] = function (x) {
	if(this.value === 0) {
		return x;
	}
	if(x instanceof Expression.NumericalReal){
		return new Expression.NumericalReal(this.value + x.value);
	}
	return x['+'](this);
};

_['@-'] = function (x) {
	return new Expression.NumericalReal(-this.value);
};

_['-'] = function (x) {
	if(this.value === 0) {
		return x;
	}
	if(x instanceof Expression.NumericalReal) {
		return new Expression.NumericalReal(this.value - x.value);
	}
	return x['@-']()['+'](this);
};


_['%'] = function (x) {
	var nonreal = 'The modular arithmetic operator \'%\' is not defined for non-real numbers.';
	if(this.value === 0) {
		return Global.Zero;
	}
	if(x instanceof Expression.NumericalReal){
		return new Expression.NumericalReal(this.value % x.value);
	} else if(x.constructor === Expression.List.Real) {
		return Expression.List.Real([this, x], '%');
	} else if(x.constructor === Expression.Symbol.Real) {
		return Expression.List.Real([this, x], '%');
	} else if(x.constructor === Expression.List) {
		throw('Not sure about this...');
		// Not sure about this
		return Expression.List.Real([this, x], '%');
	} else if (x.constructor === Expression.NumericalComplex) {
		throw(new TypeError(nonreal));
	} else if (x.constructor === Expression.List.ComplexCartesian) {
		throw(new TypeError(nonreal));
	} else if (x.constructor === Expression.List.ComplexPolar) {	
		throw(new TypeError(nonreal));
	} else {
		throw ('Unknown Type for NumericalReal %');
	}
};
_['*'] = function (x) {
	if(x instanceof Expression.NumericalReal){
		return new Expression.NumericalReal(this.value * x.value);
	}
	return x['*'](this);
};
_['/'] = function (x) {
	if(this.value === 0) {
		return Global.Zero;
	}
	if(x instanceof Expression.NumericalReal){
		if(x.value === 0) {
			throw('Division by zero not allowed!');
		}
		return new Expression.NumericalReal(this.value / x.value);
	} else if (x.constructor === Expression.NumericalComplex) {
		var cc_dd = x._real * x._real + x._imag * x._imag;
		return new Expression.Complex((this.value * x._real)/cc_dd, (-this.value * x._imag) / cc_dd);
	} else if(x instanceof Expression.List.ComplexCartesian) {
		// a/(x+yi) = a/(x+yi) (x-yi)/(x-yi) = a(x-yi) / (x^2 + y^2)
		var x_conj = Expression.List.ComplexCartesian([
			x[0],
			x[1]['@-']()
		]);
		var two = Expression.NumericalReal(2);
		return x_conj['*'](this)['/'](
			(x[0]['^'])(two)
			['+'] (
				(x[1]['^'])(two)
			)
		);
	} else if(x instanceof Expression.List.ComplexPolar) {
		
	} else if(x instanceof Expression.List.Real) {
		// TODO: given x != 0
		return Expression.List.Real([this, x], '/');
	} else if(x instanceof Expression.Symbol.Real) {
		// TODO: given x != 0
		return Expression.List.Real([this, x], '/');
	} else if(x instanceof Expression.List) {	
		return Expression.List([this, x], '/');
	} else {
		console.log('Unknown type: ', this, x);
		throw ('Unknown Type for NumericalReal /');
	}
};
_['^'] = function (x) {
	if (this.value === 0) {
		return Global.Zero;
	}
	if (this.value === 1) {
		return Global.One;
	}
	if(x === Global.Zero) {
		return Global.One;
	}
	if(x === Global.One) {
		return this;
	}
	if (x instanceof Expression.Integer) {
		return new Expression.NumericalReal(Math.pow(this.value, x.a));
	} else if(x instanceof Expression.NumericalReal){
		if(this.value > 0) {
			return new Expression.NumericalReal(Math.pow(this.value, x.value));
		}
		// TODO: This will produce ugly decimals. Maybe we should express it in polar form?!
		//      <- I think no, because why else start with a numerical. Implement a rational/integer type
		var r = Math.pow(-this.value, x.value);
		var theta = Math.PI * x.value;
		return new Expression.List.ComplexPolar([
			new Expression.NumericalReal(r),
			new Expression.NumericalReal(theta)
		]);
	} else if (x.constructor === Expression.NumericalComplex) {
		var a = this.value;
		var c = x._real;
		var d = x._imag;
		console.error('Bad implementation ( num ^ complex)');
		var hlm = 0.5 * Math.log(a*a);
		var hmld_tc = hlm * d;
		var e_hmlc_td = Math.exp(hlm * c);
		return new Expression.NumericalComplex(
			(e_hmlc_td * Math.cos(hmld_tc)),
			(e_hmlc_td * Math.sin(hmld_tc))
		);
	} else if (x.constructor === Expression.List.ComplexCartesian) {
		return Expression.List([this, x], '^');
	} else if (x.constructor === Expression.List.ComplexPolar) {
		return Expression.List([this, x], '^');
	} else if (x.constructor === Expression.List.Real) {
		if(this.value > 0) {
			return Expression.List.Real([this, x], '^');
		}
		return Expression.List([this, x], '^');
	} else if (x.constructor === Expression.Symbol.Real) {
		if(this.value > 0) {
			return Expression.List.Real([this, x], '^');
		}
		return Expression.List([this, x], '^');
	} else if (x.constructor === Expression.List) {
		return Expression.List([this, x], '^');
	} else {
		throw console.error ('Unknown Type for NumericalReal ^', x, x instanceof Expression.NumericalReal);
	}
};
_['>'] = function (x) {
	if (x instanceof Expression.NumericalReal) {
		return this.value > x.value ? Expression.True : Expression.False;
	}
};
_.apply = function(operator, x) {
	switch (operator){
		case ',':
			return Expression.Vector([this, x]);
		case '^':
			if(this.value === 0) {
				return Global.Zero; // Contradicts x^0 = 1
			}
			break;
		case '+':
			if(this.value === 0) {
				return x;
			}
			break;
		case '-':
			if(this.value === 0) {
				return x.apply('@-');
			}
			break;
		case undefined:
		case '*':
			if(this.value === 1){
				return x;
			}
			//Note: There is not meant to be a break here.
		case '/':
			if(this.value === 0){
				return Global.Zero; //Contradics x/0 = Infinity
			}
	}
	if(x === undefined){
		//Unary
		switch (operator) {
			case '@+':
				return this;
			case '@-':
				return new Expression.NumericalReal(-this.value);
			case '++':
			case '--':
				throw(new TypeError('Postfix ' +operator + ' operator applied to value that is not a reference.'));
			case '+=':
			case '-=':
			case '*=':
			case '/=':
				throw(new ReferenceError('Left side of assignment is not a reference.'));
			case '!':
				return Global.Gamma.apply(undefined, new Expression.NumericalReal(this.value + 1));
		}
	} else if(x.constructor === this.constructor){
		switch (operator) {
			case '*':
			case undefined:
				return new Expression.NumericalReal(this.value * x.value);
			case '+':
				return new Expression.NumericalReal(this.value + x.value);
			case '-':
				return new Expression.NumericalReal(this.value - x.value);
			case '/':
				return new Expression.NumericalReal(this.value / x.value);
			case '^':
				if(this.value > 0) {
					return new Expression.NumericalReal(Math.pow(this.value, x.value));
				} else {
					// TODO: This will produce ugly decimals. Maybe we should express it in polar form?!
					var r = Math.pow(-this.value, x.value)
					var theta = Math.PI * x.value;
					return new Expression.Complex(r*Math.cos(theta), r*Math.sin(theta));
				}
			default:
			
		}
	} else if (x.constructor === Expression.Complex) {
		switch (operator) {
			case '*':
			case undefined:
				return new Expression.Complex(this.value * x._real, this.value * x._imag);
			case '+':
				return new Expression.Complex(this.value + x._real, x._imag);
			case '-':
				return new Expression.Complex(this.value - x._real, -x._imag);
			case '/':
				var cc_dd = x._real * x._real + x._imag * x._imag;
				return new Expression.Complex((this.value * x._real)/cc_dd, (-this.value*x._imag)/cc_dd);
			case '^':
			    var a = this.value;
			    var c = x._real;
			    var d = x._imag;
				console.error('Bad implementation ( num ^ complex)');
			    var hlm = 0.5 * Math.log(a*a);
			    var hmld_tc = hlm * d;
			    var e_hmlc_td = Math.exp(hlm * c);
                return new Expression.Complex(
                    (e_hmlc_td * Math.cos(hmld_tc)),
			        (e_hmlc_td * Math.sin(hmld_tc))
                );
			default:
		}
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		switch (operator) {
			case '+':
			case '-':
				return Expression.List.ComplexCartesian([
					x[0].apply(operator, this),
					x[1]
				]);
			case undefined:
				operator = '*';
			case '*':
			case '/':
				return Expression.List.ComplexCartesian([
					x[0].apply(operator, this),
					x[1].apply(operator, this)
				]);
			case '^':
				console.warn('ineffecient: NR ^ CL');
				return this.realimag().apply(operator, x);
			
		}
	} else if(x.constructor === Expression.List.ComplexPolar) {
		switch (operator) {
			case '+':
			case '-':
			case '^':
				//(a+bi)+Ae^(ik)
				return Expression.List([this, x], operator);
				// or ? return this.apply(operator, x.realimag()); //Jump up to above +-
			case undefined:
				operator = '*';
			case '*':
				return Expression.List.ComplexPolar([
					x[0].apply(operator, this),
					x[1]
				]);
			case '/':
				return Expression.List.ComplexPolar([
					x[0].apply(operator, this),
					x[1]
				]);
		}
	} else if (x.constructor === Expression.List.Real) {
		switch(operator) {
			case undefined:
				operator = '*';
			case '*':
			case '+':
			case '-':
			case '/':
				return Expression.List.Real([this, x], operator);
			case '^':
				if(this.value === 0){
					throw('N(0) ^ x');
				}
				if(this.value > 0) {
					return Expression.List.Real([this, x], operator);
				} else {
					return Expression.List.ComplexPolar([
						(new Expression.Numerical(-this.value)).apply('^', x),
						Global.pi.apply('*', x)
					]);
				}
		}
				
	} else if (x.constructor === Expression.Symbol.Real) {
		switch(operator) {
			case undefined:
				operator = '*';
			case '*':
			case '+':
			case '-':
			case '/':
				return Expression.List.Real([this, x], operator);
			case '^':
				if(this.value === 0){
					throw('N(0) ^ x');
				}
				if(this.value > 0) {
					return Expression.List.Real([this, x], operator);
				} else {
					return Expression.List.ComplexPolar([
						Expression.List.Real([(new Expression.NumericalReal(-this.value)), x], '^'),
						Global.pi.apply('*', x)
					]);
				}
		}
	}
	throw('?? - real');
	return Expression.List([this, x], operator);
};
Expression.Rational = function Rational(a, b) {
	this.a = a;
	this.b = b;
};
_ = Expression.Rational.prototype = Object.create(Expression.NumericalReal.prototype); // --> constant
_.constructor = Expression.Rational;
_.__defineGetter__("value", function () {
	return this.a / this.b;
});
_['+'] = function (x) {
	if(this.a === 0) {
		return x;
	}
	if(x instanceof Expression.Rational){
		/*
			a   c     ad   cb    ad + bc
		    - + -  =  -- + -- =  -------
			b   d     bd   bd      b d
		*/
		return new Expression.Rational(this.a * x.b + this.b * x.a, this.b * x.b);
	} else if (x.constructor === Expression.NumericalComplex) {
		return new Expression.NumericalComplex(this.value + x._real, x._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		// commute
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['+'](this);
	} else {
		console.warn('Swapped operator order for + with Rational');
		return (x)['+'](this);
		throw ('Unknown Type for Rational +');
	}
	
	
};
_['-'] = function (x) {
	if(this.a === 0) {
		return x['@-']();
	}
	if(x instanceof Expression.Rational){
		/*
			a   c     ad   cb    ad + bc
		    - + -  =  -- + -- =  -------
			b   d     bd   bd      b d
		*/
		return new Expression.Rational(this.a * x.b - this.b * x.a, this.b * x.b);
	} else if (x.constructor === Expression.NumericalComplex) {
		return new Expression.NumericalComplex(this.value - x._real, x._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		// commute
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x['@-']())['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x['@-']())['+'](this);
	} else {
		console.warn('Swapped operator order for - with Rational');
		return (x)['+'](this);
		throw ('Unknown Type for Rational +');
	}
};

_['*'] = function (x) {
	if (this.a === 0) {
		return Global.Zero;
	}
	if (x instanceof this.constructor){
		return new Expression.Rational(this.a * x.a, this.b * x.b);
	}
	return this.__proto__.__proto__['*'].call(this, x);
};


_['/'] = function (x) {
	if (this.a === 0) {
		return Global.Zero;
	}
	if (x instanceof this.constructor){
		if (x.a === 0) {
			throw('Division By Zero is not defined for Rational numbers!');
		}
		return new Expression.Rational(this.a * x.b, this.b * x.a).reduce();
	}
	return Expression.NumericalReal.prototype['/'].call(this, x);
};
_['^'] = function (x) {
	if(x === Global.Zero) {
		return Global.One;
	}
	if(x === Global.One) {
		return this;
	}
	if(this.a === 0) {
		return Global.Zero;
	}
	if(this.a === this.b) {
		return Global.One;
	}
	if(x instanceof Expression.Integer) {
		return new Expression.Rational(
			Math.pow(this.a, x.a),
			Math.pow(this.b, x.a)
		);
	} else if (x instanceof Expression.Rational) {
		
		var f = x.reduce();
		if(f.a % 2 == 0) {
			return new Expression.NumericalReal(Math.pow(Math.pow(this.a, f.a), 1 / f.b));
		}

		return Expression.NumericalReal.prototype['^'].call(
			this,
			x
		);
		
	}

	return Expression.List([this, x], '^');
	
};
_.reduce = function () {
	// mutable.
	function gcd(a, b) {
		if(b === 0) {
			return a;
		}
		return gcd(b, a % b);
	}
	var g = gcd(this.b, this.a);
	this.a /= g;
	this.b /= g;
	if(this.b === 1) {
		return new Expression.Integer(this.a);
	}
	if(this.b < 0) {
		this.a = -this.a;
		this.b = -this.b;
	}
	
	return this;
};
Expression.Integer = function Integer(x) {
	this.a = x;
};
_ = Expression.Integer.prototype = Object.create(Expression.Rational.prototype);
_.b = 1;
_.constructor = Expression.Integer;

_['+'] = function (x) {
	if (x instanceof Expression.Integer) {
		return new Expression.Integer(this.a + x.a);
	}
	return x['+'](this);
};
_['-'] = function (x) {
	if (x instanceof Expression.Integer) {
		return new Expression.Integer(this.a - x.a);
	}
	return this.__proto__.__proto__['-'].call(this, x);
};
_['/'] = function (x) {
	if(x instanceof Expression.Integer) {
		if(this.a % x.a === 0) {
			return new Expression.Integer(this.a / x.a);
		}
		return new Expression.Rational(this.a, x.a);
	}
	return this.__proto__.__proto__['/'].call(this, x);
};

_['@-'] = function () {
	return new Expression.Integer(-this.a);
};
_['*'] = function (x) {
	if (x instanceof Expression.Integer) {
		return new Expression.Integer(this.a * x.a);
	}
	return x['*'](this);
};
_['^'] = function (x) {
	if (x instanceof Expression.Integer) {
		return new Expression.Integer(Math.pow(this.a, x.a));
	} else if (x.constructor === Expression.Rational) {
		var f = x.reduce();
		if(f.a % 2 == 0) {
			return new Expression.NumericalReal(Math.pow(Math.pow(this.a, f.a), 1 / f.b));
		} else {
			return Expression.NumericalReal.prototype['^'].call(
				this,
				x
			);
		}
	} else if (x.constructor === Expression.List.Real || x.constructor === Expression.Symbol.Real) {
		if(this.a > 0) {
			return Expression.List.Real([
				this,
				x
			], '^');
		}
	}
	return Expression.NumericalReal.prototype['^'].call(
		this,
		x
	);
	
};
_['%'] = function (x) {
	if(x instanceof Expression.Integer) {
		return new Expression.Integer(this.a % x.a);
	} else if (x.constructor === Expression.Rational) {
		return new Expression.Rational()
	} else if (x.constructor === Expression.NumericalReal) {
		return new Expression.NumericalReal(this % x.value);
	} else {
		return Expression.List.Real([this, x], '%');
	}
};Expression.List.prototype.differentiate = function(x) {
	switch (this.operator) {
		case undefined:
			//TODO: Ensure left expr is not a function, so we know it is scalar multiplication.
			//throw('.differentiate() method invoked for Expression without operator?');
			
			// D(f(g(x))) = D(f) * D(g)
			// d f(g(x))/dx = df/dx = df/dg * dg/dx
			if(this[0] instanceof Expression.Function) {
				var da = this[1].differentiate(x);
				if(da === Global.Zero) {
					return da;
				}
				return this[0].differentiate().default(this[1])['*'](da);
			}
		case '*':
			return this[0]
				.differentiate(x)['*'](
					this[1]
				)['+'](
					this[1]
					.differentiate(x)['*'](
						this[0]
					)
				);
		case '@+':
		case '@-':
			return this[0].differentiate(x)[this.operator]();
		case '+':
		case '-':
			return this[0]
				.differentiate(x)[this.operator](
					this[1]
					.differentiate(x)
				);
		case '^':
			var d_a = this[0].differentiate(x);
			var d_b = this[1].differentiate(x);
			if(d_a === Global.Zero) {
				if(d_b === Global.Zero) {
					return Global.Zero;
				}
				return d_b['*'](Global.log.default(this[0]))['*'](this);
			}

			var f_a = this[0]['^'](this[1]['-'](Global.One));
			return f_a['*'](
				d_a['*'](this[1])
				['+'](
					this[0]['*'](Global.log.default(this[0]))['*'](d_b)
				)
			);
			return this[1]['*'](
						this[0].differentiate(x)
					)['+'](
						this[0]['*'](
							Global.log.default(this[0])['*'](
								this[1].differentiate(x)
							)
						)
					)['*'](
					this[0]['^'](
						this[1]['-'](Global.One)
					)
				);
		case '/':
			var da = this[0].differentiate(x);
			var db = this[1].differentiate(x);
			if(db === Global.Zero) {
				return da['/'](this[1]);
			}
			return this[1]['*'](da)['-'](this[0]['*'](db))['/'](
				this[1]['^'](new Expression.Integer(2))
			);
		default:
			throw('Cannot differentiate ' + this.operator + ' operator.');
	}
};

Expression.prototype.differentiateN = function(x, n) {
	if (n === 0) {
		return this;
	} else if(n <= -1) {
		return this.integrateN(x, n);
	} else if(n > 1) {
		return this.differentiate(x).differentiateN(x, n - 1);
	} else if (n === 1) {
		return this.differentiate(x);
	}
};
Expression.Root = function NthRoot(x, n) {
	this.a = x;
	this.n = n;
};
_ = Expression.Root.prototype = Object.create(Expression.NumericalReal);
_.constructor = Expression.Root;
_['*'] = function (x) {
	if (x.constructor === this.constructor) {
		
	} else {
		return x['*'](this);
	}
};
_.__defineGetter__("value", function () {
	return Math.pow(this.a, 1 / this.n);
});
Expression.Equation = function(e, operator){
	e.__proto__ = Expression.Equation.prototype;
	e.operator = operator;
	return e;
};
//Get toTypedString methods? Maybe we shouldn't.
_ = Expression.Equation.prototype = Object.create(Expression.List.prototype);
_.apply = function(op, e) {
	throw('Operators cannot be applied to equations');
};
Expression.List.ComplexPolar = function (x){
	x.__proto__ = Expression.List.ComplexPolar.prototype;
	return x;
}
_ = Expression.List.ComplexPolar.prototype = Object.create(Expression.prototype);
_.constructor = Expression.List.ComplexPolar;
_.polar = function(){
	return this;
};
_.realimag = function() {
	//TODO: Return Expression.List.ComplexCartesian
	return Expression.List.ComplexCartesian([
		this[0].apply('*', Global.cos.apply(undefined, this[1])),
		this[0].apply('*', Global.sin.apply(undefined, this[1]))
	]);
};
_.real = function() {
	return this[0].apply('*', Global.cos.apply(undefined, this[1]));
};
_.imag = function() {
	return this[0].apply('*', Global.sin.apply(undefined, this[1]));
};
_.conjugate = function() {
	return Expression.List.ComplexPolar([
		this[0],
		this[1].apply('@-')
	]);
};
_.differentiate = function(x){
	// d/dx a(x) * e^(ib(x))
	
	//TODO ensure below  f' + if g' part is realimag (f', fg')
	return Global.e
	.apply(
		'^',
		Global.i
		.apply('*',
			this[1]
		)
	)
	.apply('*',
		this[0].differentiate(x)
		.apply('+',
			Global.i
			.apply('*',
				this[0]
			)
			.apply('*',
				this[1].differentiate(x)
			)
		)
	);
};
_.apply = function(o, x) {
	if (x.constructor === this.constructor) {
		switch (o) {
			case undefined:
			case '*':
				//Fast
				return Expression.List.ComplexPolar([
					this[0].apply('*', x[0]),
					this[1].apply('+', x[1])
				]);
			case '/':
				//Also fast
				return Expression.List.ComplexPolar([
					this[0].apply('/', x[0]),
					this[1].apply('-', x[1])
				]);
			case '+':
			case '-':
				//Very slow, maybe we should switch to cartesian now?
			
			case '^':
				//(Ae^(ik)) ^ (Be^(ij))
				//How slow is this?
				//Very fast for real numbers though
			case '!':
			default:
			
		}
	} else if (x.constructor === Expression.NumericalReal) {
		switch (o) {
			case undefined:
			case '*':
				//Fast
				return Expression.List.ComplexPolar([
					this[0].apply('*', x),
					this[1]
				]);
			case '/':
				//Also fast
				return Expression.List.ComplexPolar([
					this[0].apply('/', x),
					this[1]
				]);
			case '+':
			case '-':
				//Very slow, maybe we should switch to cartesian now?
			
			case '^':
				//Fast:
				return Expression.List.ComplexPolar([
					this[0],
					this[1].apply('*', x)
				]);
			case '!':
			default:
			
		}
	} else if (x.constructor === Expression.Complex) {
		switch (o) {
			case undefined:
			case '*':
				//Fast
				return Expression.List.ComplexPolar([
					this[0].apply('*', new Expression.NumericalReal(x._real)),
					this[1].apply('+', new Expression.NumericalReal(x._imag))
				]);
			case '/':
				//Also fast
				return Expression.List.ComplexPolar([
					this[0].apply('/', new Expression.NumericalReal(x._real)),
					this[1].apply('-', new Expression.NumericalReal(x._imag))
				]);
			case '+':
			case '-':
				//Very slow, maybe we should switch to cartesian now?
			
			case '^':
				//(Ae^(ik)) ^ (Be^(ij))
				//How slow is this?
				//Very fast for real numbers though
			case '!':
			default:
			
		}
	}
	
};
_.abs = function (){
	return this[0];
};
_.arg = function (){
	return this[1];
};Expression.prototype.real = function() {
	console.warn('TODO: don\'t calculate both parts (Expression.prototype.real)');
	return this.realimag()[0];
};
Expression.prototype.imag = function() {
	console.warn('TODO: don\'t calculate both parts (Expression.prototype.imag)');
	return this.realimag()[1];
};


// ========= List ========= //
Expression.List.prototype.realimag = function() {
	console.error('Only the user can call this function');
	switch (this.operator) {
		case undefined:
			if (this[0] instanceof Expression.Function) {
				return this[0].realimag().default(this[1]);
			}
			//throw('.realimag() method invoked for Expression without operator?');
			
		case '*':
			var a = this[0].realimag();
			var b = this[1].realimag();
			return Expression.List.ComplexCartesian([
				a[0]['*'](b[0])['-'](a[1]['*'](b[1])),
				a[0]['*'](b[1])['+'](a[1]['*'](b[0]))
			]);
		case '@+':
		case '@-':
			var a = this[0].realimag();
			return Expression.List.ComplexCartesian([
				a[0][this.operator](),
				a[1][this.operator]()
			]);
		case '+':
		case '-':
			var a = this[0].realimag();
			var b = this[1].realimag();
			return Expression.List.ComplexCartesian([
				a[0][this.operator](b[0]),
				a[1][this.operator](b[1])
			]);
		case '/':
			var a = this[0].realimag();
			var b = this[1].realimag();
			var cc_dd = b[0]['*'](b[0])['+'](b[1]['*'](b[1]));
			return Expression.List.ComplexCartesian([
				(a[0]['*'](b[0])['+'](a[1]['*'](b[1])))['/'](cc_dd),
				(a[1]['*'](b[0])['-'](a[0]['*'](b[1])))['/'](cc_dd)
			]);
		case '^':
			//TODO: simplify in case of real numbers only, or some zeros
			var a = this[0].realimag();
			var b = this[1].realimag();

			var half = new Expression.Rational(1, 2);
			var two = new Expression.Integer(2);
			
			var hlmtheta = Global.log.realimag().default(a);
			var hlm = hlmtheta[0];
			var theta = hlmtheta[1];
			var hmld_tc = hlm['*'](b[1])['+'](theta['*'](b[0]));
			
			
			var e_hmlc_td = Global.e['^'](
				hlm['*'](
					b[0]
				)['-'](
					theta['*'](
						b[1]
					)
				)
			);

			return Expression.List.ComplexCartesian([
				(e_hmlc_td['*'](Global.cos.default(hmld_tc))),
				(e_hmlc_td['*'](Global.sin.default(hmld_tc)))
			]);
	}
};/*
	This type is an attempt to avoid having to call .realimag() down the tree all the time.
	
	Maybe this is a bad idea, because it will end up having:
	
	f(x) = >
	[
		Re_f(x),
		Im_f(x)
		
	]
	which requires two evaluations of f(x).

*/
Expression.List.ComplexCartesian = function ComplexCartesian(x){
	x.__proto__ = Expression.List.ComplexCartesian.prototype;
	return x;
};
_ = Expression.List.ComplexCartesian.prototype = Object.create(Expression.prototype);
_.constructor = Expression.List.ComplexCartesian;
_.realimag = function(){
	return this;
};
_.real = function(){
	return this[0];
};
_.imag = function(){
	return this[1];
};
_.conjugate = function () {
	return Expression.List.ComplexCartesian([
		this[0],
		this[1].apply('@-')
	]);
};

_['@-'] = function (x) {
	return new Expression.List.ComplexCartesian([
		this[0]['@-'](),
		this[1]['@-']()
	]);
};
_['*'] = function (x) {
	if (x instanceof Expression.List.ComplexCartesian) {
		// (a+bi) * (c+di) = ac + adi + bci - bd
		return new Expression.List.ComplexCartesian([
			this[0]['*'](x[0])['-'](this[1]['*'](x[1])),
			this[0]['*'](x[1])['+'](this[1]['*'](x[0]))
		]);
	}
	if (x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real || x instanceof Expression.NumericalReal) {
		return new Expression.List.ComplexCartesian([
			this[0]['*'](x),
			this[1]['*'](x)
		]);
	}
};
_['^'] = function (x) {
	if(x instanceof Expression.Integer) {

		if(x instanceof Expression.Rational) {
			if(x.a === x.b) {
				return this;
			}
		}

		if(x instanceof Expression.Rational) {
			if(x.a === 0) {
				return Global.One;
			}
		}
		
		// Binomial expansion
		// (a+b)^N
		var n  = x.a;
		var k;
		var x = this[0];
		var y = this[1];
		var negone = new Expression.Integer(-1);
		var imag_part = Global.Zero;
		
		var real_part = x['^'](
			new Expression.Integer(n)
		);
		
		var ci = 1;
		
		for (k = 1;; k++) {
			if(k === n) {
				var expr = (
					y['^'](
						new Expression.Integer(k)
					)
				);
				
				if (ci === 0) {
					real_part = real_part['+'](expr);
				} else if (ci === 1) {
					imag_part = imag_part['+'](expr);
				} else if (ci === 2) {
					real_part = real_part['-'](expr);
				} else if (ci === 3) {
					imag_part = imag_part['-'](expr);
					ci = -1;
				}
			
				
				break;
			}
			var expr = x['^'](
				new Expression.Integer(n - k)
			)['*'](
				y['^'](
					new Expression.Integer(k)
				)
			);
			if (ci === 0) {
				real_part = real_part['+'](expr);
			} else if (ci === 1) {
				imag_part = imag_part['+'](expr);
			} else if (ci === 2) {
				real_part = real_part['-'](expr);
			} else if (ci === 3) {
				imag_part = imag_part['-'](expr);
				ci = -1;
			}
			
			ci++;
		}
		return new Expression.List.ComplexCartesian([
			real_part,
			imag_part
		]);
	}
	return new Expression.List([this, x], '^');
};
_['+'] = function (x) {
	if (x instanceof Expression.List.ComplexCartesian) {
		return new Expression.List.ComplexCartesian([
			this[0]
		]);
	}
	if (x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real || x instanceof Expression.NumericalReal) {
		return new Expression.List.ComplexCartesian([
			this[0]['+'](x),
			this[1]
		]);
	}
	
};

_.differentiate = function (x) {
	return Expression.List.ComplexCartesian([
		this[0].differentiate(x),
		this[1].differentiate(x)
	]);
};


_.apply = function(o, x){
	//TODO: ensure this has an imaginary part. If it doesn't it is a huge waste of computation
	if (x.constructor === this.constructor) {
		switch(o) {
			case '+':
			case '-':
				return Expression.List.ComplexCartesian([
					this[0].apply(o, x[0]),
					this[1].apply(o, x[1])
				]);
			case undefined:
				//Function evaluation? NO. This is not a function. I think.
			case '*':
				return Expression.List.ComplexCartesian([
					this[0].apply('*', x[0]).apply('-', this[1].apply('*', x[1])),
					this[0].apply('*', x[1]).apply('+', this[1].apply('*', x[0]))
				]);
			case '/':
				var cc_dd = x[0].apply('*', x[0]).apply('+', x[1].apply('*', x[1]));
				return Expression.List.ComplexCartesian([
					(this[0].apply('*',x[0]).apply('+',this[1].apply('*',x[1]))).apply('/', cc_dd),
					(this[1].apply('*',x[0]).apply('-',this[0].apply('*',x[1]))).apply('/', cc_dd)
				]);
			case '^':
				//The most confusing of them all:
				var half = new Expression.NumericalReal(0.5, 0);
				var hlm = half.apply('*',
					Global.log.apply(undefined,
						//The magnitude: if this was for a polar one it could be fast.
						this[0].apply('*',
							this[0]
						).apply('+',
							this[1].apply('*',
								this[1]
							)
						)
					)
				);
				var theta = Global.atan2.apply(undefined, Expression.Vector([this[1], this[0]]));
				var hmld_tc = hlm.apply('*', x[1]).apply('+', theta.apply('*', x[0]));
				/*
				var e_hmlc_td = Global.exp.apply(undefined,
					hlm.apply('*',
						b[0]
					).apply('-',
						theta.apply('*',
							b[1]
						)
					)
				);
				*/

				var e_hmlc_td = Global.e.apply('^',
					hlm.apply('*',
						x[0]
					).apply('-',
						theta.apply('*',
							x[1]
						)
					)
				);

				return Expression.List.ComplexCartesian([
					(e_hmlc_td.apply('*',Global.cos.apply(undefined, hmld_tc))),
					(e_hmlc_td.apply('*',Global.sin.apply(undefined, hmld_tc)))
				]);
			case '!':
			default:
		}
	} else if (x.constructor === Expression.List.ComplexPolar){
		switch (o) {
			case '*':
			case '/':
				//(x+yi)/A*e^(ik)
				var cc_dd = x[0].apply('*', x[0]);
				var b = x.realimag();
				//Clean this up? Sub?
				return Expression.List.ComplexCartesian([
					(this[0].apply('*',b[0]).apply('+',a[1].apply('*',b[1]))).apply('/', cc_dd),
					(this[1].apply('*',b[0]).apply('-',a[0].apply('*',b[1]))).apply('/', cc_dd)
				]);
			case '^':
				//http://www.wolframalpha.com/input/?i=Re%28%28x%2Byi%29%5E%28A*e%5E%28ik%29%29%29
				//(x+yi)^(A*e^(ik))
			case '+':
			case '-':
				return this.apply(o, x.realimag());
		}
	} else if (x.constructor === Expression.Complex) {
		return this.apply(o, x.realimag());
	} else if (x.constructor === Expression.Symbol.Real) {
		console.error('Duplicated an x! This makes it difficult to solve complex equations, I think');
		return this.apply(o, x.realimag());
	} else if (x.constructor === Expression.List.Real) {
		console.error('Duplicated an x! This makes it difficult to solve complex equations, I think');
		return this.apply(o, x.realimag());
	}
	throw('CMPLX.LIST * ' + o);
};Expression.List.Real = function List_Real(x, operator) {
	x.__proto__ = Expression.List.Real.prototype;
	if(operator !== undefined) {
		x.operator = operator;
	}
	return x;
};
_ = Expression.List.Real.prototype = Object.create(Expression.List.prototype);
_.constructor = Expression.List.Real;
_.realimag = function (){
	return Expression.List.ComplexCartesian([
		this,
		Global.Zero
	]);
};
_.real = function (){
	return this;
};
_.imag = function (){
	return Global.Zero;
};
_.polar = function () {
	return Expression.List.ComplexPolar([
		Expression.List.Real([Global.abs, this]),
		Expression.List.Real([Global.arg, this])
	]);
};
_.abs = function (){
	return Expression.List.Real([Global.abs, this]);
};
_.arg = function (){
	return Expression.List.Real([Global.arg, this]);
};
_['+'] = function (x) {
	if(this === x) {
		return x['*'](new Expression.Integer(2));
	}
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			return this;
		}
	}
	if(x instanceof Expression.NumericalReal) {
		if(this.operator === '+' && this[1] instanceof Expression.NumericalReal) {
			return Expression.List.Real([this[0], this[1]['+'](x)], this.operator);
		}
		if(this.operator === '-' && this[1] instanceof Expression.NumericalReal) {
			return Expression.List.Real([this[0], x['-'](this[1])], '+');
		}
		
		return Expression.List.Real([this, x], '+');
	}
	
	if(x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real) {
		return Expression.List.Real([this, x], '+');
	}
	return x['+'](this);
	
};
_['-'] = function (x) {
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			return this;
		}
	}
	
	if (x === this) {
		return Global.Zero;
	}
	if (x instanceof Expression.List.Real) {
		if (x.operator === '@-') {
			return Expression.List.Real([this, x[0]], '+');
		}
		return Expression.List.Real([this, x], '-');
	}
	if (x instanceof Expression.Symbol.Real || x instanceof Expression.NumericalReal) {
		return Expression.List.Real([this, x], '-');
	}
	return this.realimag()['-'](x);
};
_['*'] = function (x) {
	
	if(x instanceof Expression.Rational) {
		if(x.a === x.b) {
			return this;
		}
	}
	if(x instanceof Expression.Rational) {
		if(x.a === 0) {
			return Global.Zero;
		}
	}
	if(x instanceof Expression.NumericalReal) {
		if(this.operator === '*' || this.operator === '/' && this[0] instanceof Expression.NumericalReal) {
			return Expression.List.Real([this[0]['*'](x), this[1]], this.operator);
		}
		return Expression.List.Real([x, this], '*');
	}
	if(x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real) {
		if (this[0] instanceof Expression.Function) {
			
		}
		return Expression.List.Real([this, x], '*');
	}
	return x['*'](this);
	
};
_['/'] = function (x) {

	if(x instanceof Expression.Rational) {
		if(x.a === x.b) {
			return this;
		}
	}

	if(x === this) {
		return Global.One;
	}

	if(x instanceof Expression.NumericalReal) {
		if(this.operator === '*' || this.operator === '/') {
			return Expression.List.Real([this[0]['/'](x), this[1]], this.operator);
		}
		return Expression.List.Real([this, x], '/');
	}

	if(x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real) {
		return Expression.List.Real([this, x], '/');
	}
	return this.realimag()['/'](x);
};
_['%'] = function (x) {
	return Expression.List.Real([this, x], '%');
};
_['@-'] = function () {
	if(this.operator === '@-') {
		return this[0];
	}
	return Expression.List.Real([this], '@-');
};
_['^'] = function (x) {
	if(x instanceof Expression.NumericalReal) {
		if(this.operator === '*' || this.operator === '/' && this[0] instanceof Expression.NumericalReal) {
			return Expression.List.Real([this[0]['^'](x), this[1]['^'](x)], this.operator);
		}
	}
	return Expression.Symbol.Real.prototype['^'].call(this, x);
	
};
Expression.prototype.polar = function() {
	var ri = this.realimag();
	var two = new Expression.Integer(2);
	return Expression.List.ComplexPolar([
		Global.sqrt.default(ri[0]['^'](two)['+'](ri[1]['^'](two))),
		Global.atan2.default(Expression.Vector([ri[1], ri[0]]))
	]);
};
Expression.prototype.abs = function() {
	console.warn('SLOW?');
	var ri = this.realimag();
	var two = new Expression.Integer(2);
	return Global.sqrt.default(ri[0]['^'](two)['+'](ri[1]['^'](two)));
};
Expression.prototype.arg = function() {
	console.warn('Slow?');
	var ri = this.realimag();
	return Global.atan2.default(Expression.Vector([ri[1], ri[0]]));
};Expression.prototype.factors = function (vars, yes, no) {
	no(this, false);
};
Expression.prototype.terms = function (vars, yes, no) {
	no(this, false);
};
Expression.prototype.factorize = function (vars) {
	throw('Inefficent');
	var prod = Global.One;
	var prod_c = Global.One;
	this.factors(vars,
		function (x) {
			prod = prod['*'](x);
		},
		function (x) {
			// TODO: See solver (don't try to solve this part!)
			prod_c = prod_c['*'](x);
		}
	);
	return {
		dep: prod,
		not_dep: prod_c
	};
};
Expression.Symbol.Real.prototype.factors = function (vars, yes, no) {
	if (vars.indexOf(this) !== -1) {
		yes(this, false);
	} else {
		no(this, false);
	}
};
Expression.Symbol.Real.prototype.terms = function (vars, yes, no) {
	if (vars.indexOf(this) !== -1) {
		yes(this, false);
	} else {
		no(this, false);
	}
};

Expression.List.Real.prototype.terms = function (vars, yes, no) {
	switch (this.operator) {
		case '+':
			this[0].terms(vars, yes, no);
			this[1].terms(vars, yes, no);
			return;
		case '-':
			this[0].terms(vars, yes, no);
			this[1].terms(vars,
				function (y) {
					yes(y['@-']());
				},
				function (n) {
					no(n['@-']());
				}
			);
			return;
		case '*':
			var Ay = [];
			var An = Global.Zero;
			var By = [];
			var Bn = Global.Zero;
		
			this[0].terms(vars,
				function (y) {
					Ay.push(y);
				},
				function (n) {
					An = An['*'](n);
				}
			);
			this[1].terms(vars,
				function (y) {
					By.push(y);
				},
				function (n) {
					Bn = Bn['*'](n);
				}
			);
			/* 
			(AN + a1 + a2 + ... + an) * (BN + b1 + b2 + ... + bn)
			= a1b1 + a1b2 + ...
			*/
			no(An['*'](Bn));
			var i = 0;
			for (i = 0; i < Ay.length; i++) {
				var j;
				for (j = 0; j < By.length; j++) {
					yes(Ay[i]['*'](By[j]));
				}
			}
			return;
		case '/':
			var self = this;
			if(this[1] instanceof Expression.Constant) {
				this[0].terms(vars,
					function (y) {
						yes(y['/'](self[1]));
					},
					function (n) {
						no(n['/'](self[1]));
					}
				);
				return;
				
			}
			throw('Expansion in denominator required');
	}
};
Expression.List.Real.prototype.factors = function (vars, yes, no, collect_recip) {
	var id = ~~(1000*Math.random());
	console.log("("+ id+") Attempt to find factors of: ", this);
	switch (this.operator) {
		case '-':
			// TODO: add a factor of -1 to b
		case '+':
			// TODO: Ensure that once this is performed, that the object
			//       is mutated so that this need not be repeated.
			var a = [];
			var a_c = Global.One;
			var b = [];
			var b_c = Global.One;
			// Should it get terms(), or factors() (e.g. x+x+x+x+x will give multiple common factors (one at each addition level))
			this[0].factors(vars,
				function (x){
					console.log(id+"< a: ", x);
					a.push(x);
				},
				function (x){
					// TODO: Should these be combined? Would this combine things like (1+x) + 3 = (4+x) ?
					console.log(id+"< a_c: ", x);
					a_c = a_c['*'](x);
				}
			);
			this[1].factors(vars,
				function (x){
					console.log(id+"< b: ", x);
					b.push(x);
				},
				function (x){
					console.log(id+"< b_c: ", x);
					b_c = b_c['*'](x);
				}
			);
			// Common factors: 
			var common = [];
			var a_i, a_l = a.length;
			var b_i, b_l = b.length;
			var a_x = Global.One;
			var b_x = Global.One;
			for (a_i = 0; a_i < a_l; a_i++) {
				var was_co = false;
				for (b_i = 0; b_i < b_l; b_i++) {
					if(b[b_i] === undefined) {
						continue;
					}
					// Match?
					if (a[a_i] === b[b_i]) {
						common.push(a[a_i]);
						// a[a_i] = b[b_i] = Global.One; // Ignore flag
						b[b_i] = undefined;
						was_co = true;
						break;
					} else {
						// TODO: following is WRONG!
						//b_x = b_x['*'](b[b_i]);
					}
				}
				if (!was_co) {
					a_x = a_x['*'](a[a_i]);
				}
			}
			// Leftover b
			for (b_i = 0; b_i < b_l; b_i++) {
				if(b[b_i] === undefined) {
					continue;
				}
				b_x = b_x['*'](b[b_i]);
			}
			if (common.length) {
				console.log("common:", common, "of: ", a,b);
				common.forEach(yes);
				// The no will be a sum
				// TODO: a_c, and b_c
				// result: common * (a_c * a + b_c * b)
				// TODO: a_c never needs to be factorised again w.r.t. vars (it is constant)
				console.log("(a,b) = ", a_x, b_x);
				console.log("(a_c,b_c) = ", a_c, b_c);
				yes(a_x['*'](a_c)['+'](b_x['*'](b_c)));
			} else {
				// Pointless! (unless we remember not to do it again)
				no(this);
			}
			return;
		case '*':
			this[0].factors(vars, yes, no);
			this[1].factors(vars, yes, no);
			return;
		case '/':
			this[0].factors(vars, yes, no);
			if(collect_recip === false) {
				return;
			}
			this[1].factors(vars,
				function (x, r){
					yes(x, !r)
				},
				function (x, r){
					no(x, !r);
				}
			);
			return;
	}
};
window.test = function (str){
	M(str || "x+x+x+x",c ).factors([c.x], function (x){console.log("Y", x);}, function (x){console.log("N", x);})
};
(function () {
	Expression.prototype.factors = function (vars) {
	return new Multiset();
};
Expression.Symbol.Real.prototype.factors = function (vars) {
	var r = new Multiset([this], [1]);
	r.vars = []; // TODO: Should have two outputs (callbacks?) (that don't require a O(n) search)
	return r;
};
Expression.List.Real.prototype.factors = function (vars) {
	// TODO: IMPORTANT: Is it better to calculate with (auto-counted) multisets,
	//       or to count after (which would require counting on a user facing .factors)?
	/*
		adding: (n-1)*n/2
		+ union: 
		vs.
		
		count: (n-1)*n/2
	
	*/
	// TODO: Combine factors which have no vars.
	switch (this.operator) {
		case '+':
		case '-':
			// Find common factors:
			var a = this[0].factors(vars);
			var b = this[0].factors(vars);
			if(this.operator === '-') {
				b.add(Global.One['@-']());
			}
			return Multiset([this], [1]);
		case '*':
			var a = (this[0].factors(vars));
			var b = (this[1].factors(vars));
			return a.union(b);
		case '/':
			var a = (this[0].factors(vars));
			var b = (this[1].factors(vars)).map(Global.One['/']);
			return a.union(b);
		case '@-':
			// TODO: Should be deeper
			return Multiset(this[0].factors(vars).add(Global.One['@-']()));
	}
};
});Expression.prototype.roots = function (vars) {
	return Set([]);
};
Expression.Symbol.prototype.roots = function (vars) {
	if(vars.indexOf(this) !== -1) {
		return Set([new Statement(this, Global.Zero, '=')]);
	}
	return Set([]);
};
Expression.prototype.dep = function (vars) {
	return false;
};
Expression.Symbol.Real.prototype.dep = function (vars) {
	return vars.indexOf(this) !== -1;
}
Expression.List.prototype.dep = function (vars) {
	// var t; if(t = vars.influcens.definiteValue(this)) {
		// return t;
	//}
	if (this[0].dep(vars)) {
		//vars.influcenes.true(this);
		return true;
	}
	if (this[1].dep(vars)) {
		// vars.influcenes.true(this);
		return true;
	}
	//vars.influcenes.false(this);
	return false;
};
Expression.Function.Symbolic.prototype.inverse = function() {
	// x -> x^2
	// f(x) = x^2
	// f(x) - x^2 = 0
	
};
Expression.List.Real.prototype.roots = function (vars) {
	if(this.operator === '*') {

		// Null
		// (x)(1/x) = 0
		// x = 0, or x = Infinity
		// x = 0: (0) * (1/0) = 0 * Infinity ≠ 0.
		var a = this[0].roots(vars);
		var b = this[1].roots(vars);
		return a.union(b);
	} else if (this.operator === '+') {
		/*
		a(x) + b(x) = 0
		
		if a>0 and b>0
		=> only solutions are the intersect or a(x) = 0, and b(x) = 0
		*/
		var factorised = Global.One;
		this.factors(vars,
			function (x, r) {
				// TODO: Find roots in here? (However, this (in its current form) would re invoke the current function, )
				factorised = factorised['*'](x);
			},
			function () {
				
			},
			false
		);
		if(factorised.operator === '*') {
			return factorised.roots(vars);
		} else {
			// TODO: dep could be calculated via the factor transverse.
			if (!this[1].dep(vars)) {
				/*
				// equivalent to a move onto right side of equation
				// f(x) + b = 0
				// f(x) = - b
				// E.g. x^3 + x + 1 = 0 -> 		... ?
				// E.g. x^3 + 1 = 0 -> x^3 = -1 (only because N(x) <= 1)
				// E.g. x^x + 1 = 0 -> x^x = -1 ... ?
				// E.g. x*x - 1 = 0 -> x*x = 1
					x*x = 1
					x^2 = 1
						-> x = 1
				// E.g x^2 + x - 1 = 0
				x(x + 1) = 1
				
				*/
				
			} else if (!this[0].dep(vars)) {
				// b + f(x) = 0
				
				// repeat above (but swap)
			} else {
				throw ('Cannot solve');
			}
		}
		var a_zero = this[0].roots(vars);
		var b_zero = this[0].roots(vars);
		
		
		/*
		
		*/
	} else if (this.operator === '/') {
		/*
		a/b = 0
		a = b * 0
		a = 0
		*/
		var a = this[0].roots(vars);
		// Test that b ≠ 0
		return a;
	}
};

function Infinitesimal(x) {
	this.x = x;
}
_ = Infinitesimal.prototype = Object.create(Expression.prototype);
_.constructor = Infinitesimal;
_['+'] = function (x) {
	if(x instanceof Infinitesimal) {
		throw('Infinitesimal addition');
	}
	return x;
};
_['/'] = function (x) {
	if(x instanceof Infinitesimal) {
		if(x.x instanceof Expression.Symbol) {
			return this.x.differentiate(x.x);
		}
		throw('Confusing infitesimal division');
	}
	this.x = this.x['/'](x);
	return this;
};
_['*'] = function (x) {
	// d^2 = 0
	if(x instanceof Infinitesimal) {
		return Global.Zero;
	}
	this.x = this.x['*'](x);
};
_.s = function(lang) {
	if(lang !== 'text/latex') {
		throw ('Infinitesimal numbers cannot be exported to programming languages');
	}
	var c = this.x.s(lang);
	var p = language.precedence('default')
	if(p > c.p) {
		c.s = '\\left(' + c.s + '\\right)';
	}
	return c.update('d' + c.s, p);
};

function Derivative(x) {
	// technically should be a function / operator
	this.x = x;
}
_ = Derivative.prototype = Object.create(Expression.Function.prototype);
_.constructor = Derivative;
_.default = function (x) {
	return x.differentiate(this.x);
};
Expression.List.prototype.lim = function (x, y) {
	switch (this.operator) {
		case '+':
		case '-':
			return this[0].lim(x, y)[this.operator](this[1].lim(x, y));
		case '@-':
		case '@+':
			return this[0].lim(x, y)[this.operator]();
		case '/':
			var top = this[0].sub(x, y);
			var bottom = this[1].sub(x, y);
			if (top === Global.Zero && bottom === Global.Zero) {
				top = this[0].differentiate(x);
				bottom = this[1].differentiate(x);
				return top['/'](bottom).lim(x, y);
			}
			return top['/'](bottom);
		case '*':
			var a = this[0].sub(x, y);
			var b = this[1].sub(x, y);
			if (a === Global.Zero && b == Global.Infinity) {
				var top = this[0].differentiate(x);
				var bottom = Global.One['/'](this[1]).differentiate(x);
				return top['/'](bottom).lim(x, y);
			} else if(b === Global.Zero && a == Global.Infinity) {
				var top = this[0].differentiate(x);
				var bottom = Global.One['/'](this[1]).differentiate(x);
				return top['/'](bottom).lim(x, y);
			}
			return a['*'](b);
		case '^':
			if(this[0] === Global.Zero) {
				return Global.Zero;
			}
			if(this[1] === Global.Zero) {
				if(this[0] !== Global.Zero) {
					return Global.One;
				}
			}
			return this.sub(x, y);
		case '!':
			return this.sub(x, y);
	}
};Expression.Vector = function Vector(e) {
	e.__proto__ = Expression.Vector.prototype;
	return e;
};

_ = Expression.Vector.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Vector;
_[',.'] = function (x) {
	
	
	return Expression.Vector(Array.prototype.concat.call(this, [x]));
	
};

_.differentiate = function (x) {
	return Expression.Vector(Array.prototype.map.call(this, function (c) {
		return c.differentiate(x);
	}));
};
_.cross = function (x) {
	if (this.length !== 3 || x.length !== 3) {
		throw('Cross product only defined for 3D vectors.');
	}
	/*
	i   j    k
	x   y    z
	a   b    c
	
	= (yc - zb, za - xc, xb - ya)
	*/
	
	return new Expression.Vector([
		this[1].default(x[2])['-'](this[2].default(x[1])),
		this[2].default(x[0])['-'](this[0].default(x[2])),
		this[0].default(x[1])['-'](this[1].default(x[0]))
	]);
};
_[crossProduct] = _.cross;
_.default = function (x) {
	var l = this.length;
	if (x instanceof Expression.Vector) {
		// Dot product
		if(l !== x.length) {
			throw('Vector Dimension mismatch.');
		}
		var i;
		var sum = Global.Zero;
		for (i = 0; i < l; i++) {
			sum = sum['+'](
				(this[i]).default(x[i])
			);
		}
		return sum;
	} else if (x instanceof Expression.Matrix) {
		
	} else {
		return Expression.Vector(Array.prototype.map.call(this, function (c) {
			return c.default(x);
		}));
	}
};
_['*'] = _.default;
_['+'] = function (x, op) {
	var l = this.length;
	if(l != x.length) {
		throw('Vector Dimension mismatch.');
	}
	var i;
	var n = new Array(l);
	for (i = 0; i < l; i++) {
		n[i] = this[i][op || '+'](x[i]);
	}
	return Expression.Vector(n);
};
_['-'] = function (x) {
	return _.call(this, x, '-');
};
_['/'] = function (x) {
	if (x instanceof Expression.Vector) {
		throw('Vector division not defined');
	}
	return Expression.Vector(Array.prototype.map.call(this, function (c) {
		return c['/'](x);
	}));
	
};
_['^'] = function (x) {
	if(x instanceof Expression.Integer) {
		if(x.a === 0) {
			throw('Raised to zero power');
		}
		if(x.a === 1) {
			return this;
		}
		if (x.a === 2) {
			var S = Global.Zero;
			var i, l = this.length;
			for (i = 0; i < l; i++) {
				S = S['+'](this[i]['^'](x));
			}
			return S;
		} else {
			return this['^'](new Expression.Integer(x.a - 1))['*'](this);
		}
	} else if(x instanceof Expression.Rational){
		return this['^'](x.a)['^'](Global.One['/'](x.b));
	} else if (x.constructor === Expression.NumericalComplex) {
		return new Expression.Complex(this.value + x._real, x._imag);
	} else if(x.constructor === Expression.List.ComplexCartesian) {
		// commute
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.ComplexPolar) {	
		return (x)['+'](this);
	} else if(x.constructor === Expression.List.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.Symbol.Real) {
		return (x)['+'](this);
	} else if(x.constructor === Expression.List) {
		return (x)['+'](this);
	} else {
		throw ('Unknown Type for Vector ^');
	}
	return this.default(this['^'](x['-'](Global.One)));
};
_.apply = function(operator, e) {
	var l = this.length;
	switch (operator) {
		case ',':
			//Array.prototype.push.apply(this, [e]);
			//Faster:
			//MODIFIES!!!!!!!!!
			this[l] = e;
			return this;
		case undefined:
		case '*':
			if(l != e.length) {
				throw('Vector Dimension mismatch.');
			}
			var i;
			var sum = M.Global.Zero;
			for (i = 0; i < l; i++) {
				sum = sum.apply('+', this[i].apply('*', e[i]));
			}
			return sum;
		case '+':
		case '-':
			if(l != e.length) {
				throw('Vector Dimension mismatch.');
			}
			var i;
			var n = new Array(l);
			for (i = 0; i < l; i++) {
				n[i] = this[i].apply(operator, e[i]);
			}
			return Expression.Vector(n);
		case '/':
		case '^':
		default:
			throw('Vector operation not allowed.');
	}
};

_.realimag = function(){
	var l = this.length;
	var _x = new Array(l);
	var _y = new Array(l);
	var i;
	for(i = 0; i < l; i++) {
		var ri = this[i].realimag();
		_x[i] = ri[0];
		_y[i] = ri[1];
	}
	return Expression.List.ComplexCartesian([
		Expression.Vector(_x),
		Expression.Vector(_y)
	]);
};
Expression.Matrix = function (e, r, c) {
	e.__proto__ = Expression.Matrix.prototype;
	e.rows = r;
	e.cols = c;
	return e;
};

_ = Expression.Matrix.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Matrix;
_.default = _['*'] = function (x) {
	if(x.constructor === Expression.Matrix) {
		// Broken
		// O(n^3)
		if (x.rows !== this.cols) {
			throw ('Matrix dimensions do not match.');
		}
		var result = [];
		// result[x.rows * x.cols - 1 ] = undefined;
		var i, j, k, r = 0;
		for (i = 0; i < this.rows; i++) {
			for (j = 0; j < x.cols; j++) {
				var sum = Global.Zero;
				for(k = 0; k < x.rows; k++) {
					sum = sum['+'](x[k * x.cols + j]);
				}
				result[r++] = sum;
			}
		}
		return Expression.Matrix(result);
	} else {
		throw ('Unknown type');
	}
};
_.reduce = function (app) {
	var x, y;
	for(y = 0; y < this.rows; y++) {
		for(x = 0; x < y; x++) {
			// Make this[x,y] = 0
			var ma = this[x * this.cols + x];
			// 0 = this - (this/ma) * ma
			if(ma === Global.Zero) {
				throw ('Row swap!');
			}
			var tma = this[y * this.cols + x]['/'](ma);
			var i;
			for (i = x + 1; i < this.cols; i++) {
				this[y * this.cols + i] = this[y * this.cols + i]['-'](tma['*'](this[x * this.cols + i]));
			}
		}
	}
	return this;
};
Expression.Sum = function Summation(x, a, b, f_unbound) {
	this.x = x;
	this.f = f_unbound;
	this.a = a;
	this.b = b;
};
// TODO: It is always real?
_ = Expression.Sum.prototype = Object.create(Expression.Symbol.Real.prototype);
_.constructor = Expression.Sum;

Expression.Sum.Real = function Summation_Real(x,a,b,f_unbound) {
	this.x = x;
	this.f = f_unbound;
	this.a = a;
	this.b = b;
	
	if(!(this.x instanceof Expression.Symbol.Real)) {
		throw('Can only sum over reals in javascript');
	}
};
_ = Expression.Sum.Real.prototype = Object.create(Expression.Sum.prototype);
_.constructor = Expression.Sum.Real;
_.real = function () {
	return this;
};
_.realimag = function () {
	return new Expression.List.ComplexCartesian([this, Global.Zero]);
};

_.s = function (lang) {
	if (lang === 'text/latex') {
		var cf = this.f.s(lang);
		var ca = this.a.s(lang);
		var cb = this.b.s(lang);
		var cx = this.x.s(lang);
		var cf_s = cf.s;
		var c = cf;
		c = cf.merge(ca);
		c = cf.merge(cb);
		return c.merge(cx, '\\sum_{' + cx.s + '=' + ca.s + '}^{' + cb.s + '}' + cf_s, language.precedence('*'));
	}
	if (lang === 'text/javascript') {

		var ca = this.a.s(lang);
		var cb = this.b.s(lang);
		if(!(this.x instanceof Expression.Symbol.Real)) {
			throw('Can only sum over reals in javascript');
		}



		var cx = this.x.s(lang);
		
		var c = cx.merge(ca).merge(cb);
		//c = c.merge(cx);
		
		// Need a summation variable, allocate one:
		var sv = c.var();
		// Total sum value:
		var ts = c.var();

		// Upper limit, (since javascript will recalculate it every time)
		var ul = c.var();
		
		var ll = c.var();
		

		var f_subbed = this.f.sub(this.x, new Expression.Symbol.Real(sv));
		var cf = f_subbed.s(lang);
		
		
		var sumcode = 'var ' + ts + ' = 0, ' + sv + ', ' + ll + ' = ' + ca.s +  ', ' + ul + ' = ' + cb.s + ';\nif(' + ul + ' === Infinity) {\n\t' + ul + ' = 1000;\n}\nif (!(' + ul + ' >= ' + ll + ')) {\n\tthrow("Halting problem solved.")\n}\nfor(' + sv + ' = ' + ll + '; ' + sv + ' < ' + ul +  '; ' + sv + '++) {\n\t' + ts + ' +=' + cf.s + ';\n}\n';
		return c.merge(cf, ts, Infinity, sumcode);
	}
	if (lang === 'x-shader/x-fragment') {

		// A little bit different for GLSL, because there is no conditional branching.
		
		var ca = this.a.s(lang);
		var cb = this.b.s(lang);
		if(!(this.x instanceof Expression.Symbol.Real)) {
			throw('Can only sum over reals in GLSL');
		}

		var cx = this.x.s(lang);
		
		var c = cx.merge(ca).merge(cb);
		//c = c.merge(cx);
		
		// Need a summation variable, allocate one:
		var sv = c.var();
		//var svf = c.var();
		// Total sum value:
		var ts = c.var();

		var f_subbed = this.f.sub(this.x, new Expression.Symbol.Real(sv));
		var cf = f_subbed.s(lang);
		var ca_s = 'int(' + ca.s + ')';
		var cb_s = 'int(' + cb.s + ')';
		// TODO: Float?
		//var sumcode = 'float ' + ts + ' = 0.0;float '+ svf + ' = ' + ca.s + ';\nfor(int ' + sv + ' = ' + ca_s + '; ' + sv + ' < ' + cb_s +  '; ' + sv + '++) {\n\t' + svf + ' += 1.0;' + '\n\t' + ts + ' = ' + ts + ' + ' + cf.s + ';\n}\n';
		var sumcode = 'float ' + ts + ' = 0.0;\nfor(float ' + sv + ' = ' + ca.s + '; ' + sv + ' < ' + cb.s +  '; ' + sv + '+=1.0) {\n\t' + ts + ' += ' + ' + ' + cf.s + ';\n}\n';
		return c.merge(cf, ts, Infinity, sumcode);
	}
	
};
_['^'] = function (x) {
	if(this.b_locked) {
		throw('Sum was upper bounded twice!');
	}
	this.b = x;
	this.b_locked = true;
	return this;
};
_.default = function (x) {
	if(!this.b_locked) {
		throw('Sum was not upper bounded!');
	}
	if(this.f_locked) {
		throw('Sum already defined');
	}
	this.f = x;
	this.f_locked = true;
	return this;
};Expression.List.prototype.expand = function(vars) {
	var right = 1;
	var left = -1;
	var L = Global.Zero;
	var R = Global.Zero;
	throw("Should be async, don't use this");
	
	if (this[1] instanceof Expression.List) {
		if (this.operator === '+' || this.operator === '-') {
			return this[0].expand(vars)[this.operator](this[1].expand(vars));
		}
		if (this.operator === '*' ) {
			var a = this[0].expand(vars);
			var b = this[1].expand(vars);
			a.terms(vars,
				function (y) {
					L = L['+'](y);
				},
				function (n) {
					R = R['+'](y);
				}
			);
			a.terms(vars,
				function (y) {
					L = L['+'](y);
				},
				function (n) {
					R = R['+'](y);
				}
			);
			
			
		}
	} else {
		return this;
	}
	//Use distributive law
};
Expression.prototype.simplify = function() {
	return this;
};Expression.prototype.integrate = function(x) {
	throw('Could not integrate expression.');
};
Expression.prototype.integrateN = function(x, n) {
	if (n === 0) {
		return this;
	} else if(n <= -1) {
		return this.differentiateN(x, n);
	} else if(n > 1) {
		return this.integrate(x).integrateN(x, n - 1);
	} else if (n === 1) {
		return this.integrate(x);
	}
};
// For GLSL type checking when compiling
var glsl={
	'void':1,
	'vec3':2,
	'bool':6,
	'int':3,
	'fp':4,
	'vec2':5,
	'vec4':7,
	'mat2':10,
	'mat3':11,
	'mat4':12,
	'func':20
};

// Javascript types
var javascript = {
	'Boolean': 1,
	'Number': 2,
	'String': 3,
	'undefined': 4,
	'Object': 5,
	'Function': glsl.func,
	'Array': 7,
	'ref': 8
};


var exportLanguages={
	'text/javascript': function (o, x){
		function _(x){
			return '('+x+')';
		}
		// TODO: Fails on f(x)^2
		var p = o === undefined ? language.precedence('default') : language.precedence(o);
		function S_(x){
			if(x.p<=p){
				return _(x.s);
			}
			return x.s;
		}
		switch(o){
			case '=':
				return {s:S_(x[0])+o+S_(x[1]), t: javascript.assignment, p: p};
			case '&&':
			case '<':
			case '>':
			case '>=':
			case '<=':
			case '!==':
			case '!=':
			case '==':
			case '===':
			
				return {s:S_(x[0])+o+S_(x[1]), t: javascript.Boolean, p: p};
			
			case '+':
			case '-':
			case '/':
			case '*':
			case '?':
			case ':':
			case ',':
			case '>>':
			case '<<':
			case '&':
			case '%':
				return {s:S_(x[0])+o+S_(x[1]), t: javascript.Number, p: p};
			case '_':
				if(x[0].t === javascript.ref && (x[1].t === javascript.ref || x[1].t == javascript.Number)){
					return {s:S_(x[0])+o+S_(x[1]), t: javascript.ref, p: p};
				}else{
					throw('Operator \'_\' does not exist in javaScript for those types.');
				}
			case '~':
				return {s:o+S_(x[0]),t:javascript.Number, p: p};
			case '@-':
			case '@+':
				return {s:o.substring(1)+S_(x[0]),t:javascript.Number, p: p};
			case '^':
				return {s:'Math.pow('+x[0].s+','+x[1].s+')',t:javascript.Number, p: p};
			case undefined:
				if(x[0].t===javascript.Function){
					return {s:x[0].s+'('+x[1].s+')',t:javascript.Number, p: p};
				}else{
					//this is ugly:
					p=language.precedence('*');
					return {s:S_(x[0])+'*'+S_(x[1]),t:javascript.Number, p: p};
				}
			case '#':
				//p=precedence('return ');
				return {s:'function(x){return '+x[0].s+'}', t:javascript.Function, p: p};
			case '√':
				return {s:'Math.sqrt('+x[0].s+')',t:javascript.Number, p: p};
			case '!':
				return {s:'factorial('+x[1].s+')',t:javascript.Number, p: p};
			default:
				throw('Could not translate operator: \''+o+'\' into javscript!');
		}
	},
	'x-shader/x-fragment': function(o, x){
		//http://www.opengl.org/registry/doc/GLSLangSpec.Full.1.20.8.pdf
		function _(x) {
			return '(' + x + ')';
		}
		// TODO: Fails on f(x)^2
		var p = o === undefined ? language.precedence('default') : language.precedence(o);
		function S_(x) {
			if(x.p <= p){
				return _(x.s);
			}
			return x.s;
		}
		switch(o){
			case '&&':
			case '||':
				if(x[0].t === x[1].t && x[1].t === glsl.bool){
					return {s:S_(x[0])+o+S_(x[1]), t: glsl.bool, p: p};
				}
				throw('Operands must also be boolean values');
			case '==':
			case '<':
			case '>':
			case '<=':
			case '>=':
			case '!=':
				if(x[0].t !== x[1].t){
					throw('The equality operators and assignment operator are only allowed if the two operands are same size and type.');
				}
				return {s:S_(x[0])+o+S_(x[1]), t: glsl.bool, p: p};
			
			case ':':
				if(x[0].t !== x[1].t){
					throw('Switching groups must be the same type');
				}
				
				return {s:S_(x[0])+o+S_(x[1]), t: x[1].t, p: p};
			case '?':
				if(x[0].t !== glsl.bool){
					throw('Must be boolean type');
				}
				return {s:S_(x[0])+o+S_(x[1]), t: x[1].t, p: p};
				
			case '+':
			case '-':
			case ',':
				if(x[0].t !== x[1].t){
					throw('Types don\'t match: '+x[0].t+', '+x[1].t);
				}
				return {s:S_(x[0])+o+S_(x[1]), t: glsl.fp, p: p};
			case '*':
			case '/':
				return {s:S_(x[0])+o+S_(x[1]), t: glsl.fp, p: p};
			case '_':
				/*if(a.t === types.variable && (b.t === types.variable || b.t == types.number)){
					return {s:S_(a)+o+S_(b), t: glsl.float, p: p};
				}else{
					throw('Operator '_' does not exist in javaScript for those types.');
				}*/
				throw('Write this later.');
			case '~':
				return {s:o+S_(x[0]),t:javascript.Number, p: p};
			case '@-':
			case '@+':
				return {s:o.substring(1)+S_(x[0]),t:glsl.fp, p: p};
			case '^':
				//TODO: remove this hack
				if (x[0].s === '2.718281828459045e+0') {
					return {s: 'exp('+x[1].s+')', t: glsl.fp, p: p};
				}
				return {s:'pow('+x[0].s+','+x[1].s+')',t:glsl.fp, p: p};
			case undefined:
				if(x[0].t===glsl.func){
					return {s:x[0].s+'('+x[1].s+')',t:glsl.fp, p: p};
				}else{
					//this is ugly:
					p=language.precedence('*');
					return {s:S_(x[0])+'*'+S_(x[1]),t:glsl.fp, p: p};
				}
			case '#':
				throw('Anonymous functions not yet supported.');
			case '√':
				return {s:'sqrt('+x[0].s+')',t:glsl.fp, p: p};
			case '!':
				//requirements....
				return {s:'factorial('+x[0].s+')',t:glsl.fp, p: p};
			case '%':
				return {s: 'mod('+x[0].s+','+x[1].s+')',t:glsl.fp, p:p};
			case '&':
			case '|':
			//case '%':
			case '~':
			case '>>':
			case '<<':
				throw('Reserved');
			default:
				throw('Could not translate operator: \''+o+'\' into glsl!');
		}
	},
	'text/latex':function(o,x){
		function _(x){
			return '\\left('+x+'\\right)';
		}
		// TODO: Fails on f(x)^2
		var p = o === undefined ? language.precedence('default') : language.precedence(o);
		function S_(x, e){
			if(e){
				if(x.p < p){
					return _(x.s);
				}
				return x.s;
			}
			if(x.p === p) {
				return language.assoc(o) === true ? x.s : _(x.s);
			} else if(x.p <= p){
				return _(x.s);
			}
			return x.s;
		}
		switch(o){
			case '/':
				return {s:'\\frac{'+x[0].s+'}{'+x[1].s+'}',t:javascript.Number, p: p};
			case '^':
			case '_':
				return {s:S_(x[0])+o+'{'+x[1].s+'}',t:javascript.ref, p: p};
			case undefined:
			//TODO: CLEANUP, check types
				if (x[0].s === '\\sqrt') {
					return {s: '\\sqrt{'+x[1].s + '}',t:javascript.Number, p: p};
				} else if (x[0].s === '\\abs') {
					return {s: '\\left|'+x[1].s + '\\right|',t:javascript.Number, p: p};
				}
				return {s: S_(x[0], 1) + ' ' + S_(x[1], 1), t: javascript.Number, p: p};
				return {s:S_(x[0])+_(x[1].s),t:javascript.Number, p: p};
			//case '√':
			//	return {s:'\\sqrt{'+x[0].s+'}',t:javascript.Number, p: p};
			case '#':
				return {s:o+_(x[0].s),t:javascript.Fumber};
			case ',':
				return {
					s: '\\left('+x.map(S_).join(o)+'\\right)',
					t: javascript.Array,
					p: p
				};
		}
		if(o[0]=='@'){
			return {s:o[1]+S_(x[0]),t:javascript.Number, p: p};
		}
		if(language.postfix(o)){
			return {s:S_(x[0])+o, t:javascript.Number, p: p};
		}
		var self=this;
		var os={
				//'*':'\\cdot ',
				'*':' ',
				'∨':'\\vee ',
				'&&':'\\wedge ',
				'±':'\\pm ',
				'∘':'\\circ '
		};
		return {
			s: x.map(S_).join(os[o] || o),
			t: javascript.Number,
			p: p
		};
	}
};
var defLang = language;
function Code (s, pre){
	this.pre = [] || pre;
	this.s = '' || s;
	this.vars = 0;
	this.p = Infinity;
}
_ = Code.prototype;

// For faster evaluation multiple statments. For example (x+3)^2 will first calculate x+3, and so on.
_.var = function () {
	return 't' + (this.vars++).toString(36);
}
_.merge = function (o, str, p, pre) {
	this.s = str;
	if (pre) {
		this.pre.push(pre);
	}
	var i;
	this.pre.push.apply(this.pre, o.pre);
	this.vars += o.vars;
	this.p = p;
	return this;
};
_.update = function (str, p, pre) {
	this. p = p;
	if(pre) {
		this.pre.push(pre);
	}
	this.s = str;
	return this;
}
// Javascript compliation
_.compile = function (x) {
	return Function(x, this.pre.join('\n') + 'return ' + this.s);
};
_.glslFunction = function (type, name, parameters) {
	return type + ' ' + name + '(' + parameters + '){\n' + this.pre.join('\n') + 'return ' + this.s + ';\n}\n';
};


Expression.List.prototype.s = function (lang) {
	// TODO: remove this (debug code)
	if(lang === 'text/latex') {
		return Expression.List.Real.prototype.s.call(this, lang);
	}
	throw('Use real(), imag(), or abs(), or arg() first.');
};
Expression.List.Real.prototype.s = function(lang) {

	function paren(x) {
		if(lang === 'text/latex') {
			return '\\left(' + x + '\\right)'; 
		}
		return '('+ x + ')';
	}
	if (this.operator === undefined) {
		if (this[0] instanceof Expression.Function) {
			if(this[0] === Global.abs) {

				var c1 = this[1].s(lang);

				if(lang === 'text/latex') {
					return c1.update('\\left|' + c1.s + '\\right|', Infinity);
				}
				var c0 = this[0].s(lang);
				return c1.update(c0.s + '(' + c1.s + ')', Infinity);
			}
			var c0 = this[0].s(lang);
			if (this[1] instanceof Expression.Vector) {
				var c1s = Array.prototype.map.call(this[1], function (c) {
					return c.s(lang);
				});
				var i;
				var t_s = c1s.map(function (e){
					return e.s;
				});
				if(this[0] === Global.atan) {
					t_s = t_s.reverse();
				}
				var c0_s = c0.s;
				for (i = 0; i < c1s.length; i++) {
					c0.merge(c1s[i]);
				}
				return c0.update(c0_s + paren(t_s), language.precedence('default'));
			}
			var c1 = this[1].s(lang);
			return c0.merge(c1, c0.s + paren(c1.s), language.precedence('default'));
		} else {
			this.operator = '*';
		}
	}
	var p = language.precedence(this.operator);
	function _(x) {
		if(p > x.p){
			return paren(x.s);
		}
		return x.s;
	}

	if(this.operator === '^') {

		if(lang === 'x-shader/x-fragment') {
			if(this[0] === Global.e) {
				var c1 = this[1].s(lang);
				return c1.update('exp(' + c1.s + ')');
			}
			if(this[1] instanceof Expression.Integer && this[1].a < 5 && this[1].a > -1) {
				var c0 = this[0].s(lang);
				var j = language.precedence('*');
				
				var pre = undefined;
				var cs;
				if(this[0] instanceof Expression.Symbol) {
					cs = c0.s;
				} else {
					
					cs = c0.var();
					
					pre = 'float ' + cs + ' = ' + c0.s + ';';
				
				}
				var s = cs;
				var i;
				for(i = 1; i < this[1].a; i++) {
					s+= '*' + cs;
				}
				return c0.update('(' + s + ')', Infinity, pre);
			}
			if(this[1] instanceof Expression.Integer && this[1].a == -1) {
				var c0 = this[0].s(lang);
				// todo: precedence not necessary
				return c0.update('(1.0/(' + c0.s + '))');
			}
			if(this[1] instanceof Expression.Rational) {
				// a^2, 3, 4, 5, 6 
				// unsure it is gcd
				this[1] = this[1].reduce();
				var even = this[1].a % 2 ? false : true;
				if(even) {
					var c1 = this[1].s(lang);
					var c0 = this[0].s(lang);
					
					return c0.merge(c1, 'pow(' + c0.s + ',' + c1.s  + ')');
				} else {

					// x^(a) = (x) * x^(a-1)
					var c1 = this[1]['-'](Global.One).s(lang);
					var c0 = this[0].s(lang);
					
					return c0.merge(c1, '((' + c0.s + ') * pow(' + c0.s + ',' + c1.s + '))');
				}
			}
			if (this[0] instanceof Expression.NumericalReal) {

				// Neg or pos.
				var c1 = this[1]['-'](Global.One).s(lang);
				var c0 = this[0].s(lang);
				
				return c0.merge(c1, '((' + c0.s + ') * pow(' + c0.s + ','+c1.s+'))');
				
			}
			var c1 = this[1]['-'](Global.One).s(lang);
			var c0 = this[0].s(lang);
				
			// Needs a new function, dependent on power.
			return c0.merge(c1, '((' + c0.s + ') * pow(' + c0.s + ','+c1.s+'))');
			
		} else if(lang === 'text/javascript') {
			if(this[0] === Global.e) {
				var c1 = this[1].s(lang);
				return c1.update('Math.exp(' + c1.s + ')');
			}
			if(this[1] instanceof Expression.Rational) {
				// a^2, 3, 4, 5, 6 
				var even = this[1].a % 2 ? false : true;
				if(even) {
					var c1 = this[1].s(lang);
					var c0 = this[0].s(lang);
					
					return c0.merge(c1, 'Math.pow(' + c0.s + ',' + c1.s  + ')');
				} else {

					var c1 = this[1].s(lang);
					var c0 = this[0].s(lang);
					
					return c0.merge(c1, 'Math.pow(' + c0.s + ',' + c1.s + ')');
				}
			} else {

				var c1 = this[1].s(lang);
				var c0 = this[0].s(lang);
				
				// Needs a new function, dependent on power.
				return c0.merge(c1, 'Math.pow(' + c0.s + ',' + c1.s + ')');
			}
			
		} else if (lang === 'text/latex'){
			var c0 = this[0].s(lang);
			var c1 = this[1].s(lang);
			return c0.merge(c1, _(c0) + '^' + '{' + c1.s + '}')
		}
	}

	var c0 = this[0].s(lang);

	if(this.operator[0] === '@') {
		return c0.update(this.operator[1] + _(c0), p);
	}

	var c1 = this[1].s(lang);
	
	if(lang === 'text/latex') {
		if(this.operator === '/') {
			return c0.merge(c1, '\\frac{' + c0.s + '}{' + c1.s + '}')
		}
		if(this.operator === '*') {
			return c0.merge(c1, _(c0) + _(c1), p);
		}
	} else if (lang === 'x-shader/x-fragment') {
		if(this.operator === '%') {
			return c0.merge(c1, 'mod(' + _(c0) + ',' + _(c1) + ')', p);
		}
	}

	return c0.merge(c1, _(c0) + this.operator + _(c1), p);
};
Expression.Statement.prototype.s = Expression.List.Real.prototype.s;
Expression.Symbol.prototype.s = function () {
	return new Code(this.symbol || 'x_{free}');
};
Expression.NumericalReal.prototype.s = function (lang){
	if(lang === 'x-shader/x-fragment') {
		var num = this.value.toExponential();
		if(num.indexOf('.') === -1){
			num = num.replace('e','.e');
		}
		return new Code(num);
	}
	return new Code(this.value.toString());
};
Expression.List.ComplexPolar.prototype.s = function(lang) {
	if(lang !== 'text/latex') {
		throw('Exporting not supported for complex values.');
	}

	var pP = language.precedence('+');
	var pM = language.precedence('*');
	function _(x, o) {
		if(o > x.p){
			return '\\left(' + x.s + '\\right)';
		}
		return x.s;
	}

	var c0 = this[0].s(lang);
	var c1 = this[1].s(lang);
	return c0.merge(c1, _(c0, pM) + '' + 'e^{i' + _(c1, pM));
	
};
Expression.List.ComplexCartesian.prototype.s = function(lang) {
	if(lang !== 'text/latex') {
		throw('Exporting not supported for complex values.');
	}
	var pP = language.precedence('+');
	
	function _(x, o) {
		if(o > x.p){
			return '\\left(' + x.s + '\\right)';
		}
		return x.s;
	}

	var c0 = this[0].s(lang);
	var c1 = this[1].s(lang);
	return c0.merge(c1, _(c0) + '+' +_(c1, pP)+'i', language.precedence('+'));
};
Expression.NumericalComplex.prototype.s = function(lang) {
	deprecated('NumericalComplex.toTypedString????');
	if (lang === 'text/latex') {
		
		var n = this.realimag();

		if (this._real === 0) {
			if (this._imag === 1) {
				return new Code('i');
			} else if (this._imag === -1) {
				return new Code('-i');
			}
			return new Code(n[1].s(language).s + 'i');
		} else if(this._imag === 0) {
			return new Code(n[0].s(language).s);
		}
		if(this._imag === 1) {
			return new Code(n[0].s(language).s + ' + i');
			
		} else if(this._imag === -1) {
			return new Code(n[0].s(language).s + ' - i');
		} else if(this._imag < 0) {
			return new Code(n[0].s(language).s + ' + ' + n[1].s(language).s + 'i');
		}
		return new Code(n[0] + ' + ' + n[1].s(language).s + 'i');
	}
	throw('Please use x.realimag()[0 /* or 1 */].toTypedString() to generate code.');
};
Expression.Integer.prototype.s = function (lang) {
	if(lang === 'x-shader/x-fragment') {
		return new Code(this.a.toString() + '.0');
	}
	return new Code(this.a.toString());
};

Expression.Vector.prototype.s = function(lang) {
	var l = this.length;
	var open = '[';
	var close = ']';
	if(lang === 'x-shader/x-fragment') {
		open = 'vec' + this.length + '(';
		close = ')';
	}
	var c = this[0].s(lang);
	var i;
	var t_s = [];
	for (i = 0; i < l; i++) {
		var c_i = this[i].s(lang);
		t_s.push(c_i.s);
		c = c.merge(c_i);
	}
	return c.update(open + t_s.join(',') + close, Infinity);
};


Expression.True.s = function (lang) {
	return new Code('true');
};

Expression.False.s = function (lang) {
	return new Code('false');
};

Expression.prototype.compile = function(x){
	return this.s('text/javascript').compile(x);
};
Expression.prototype.glslFunction = function(type, name, args){
	return this.s('x-shader/x-fragment').glslFunction(type, name, args)
};
//Use complex numbers by default
Expression.Numerical = Expression.Complex;
//Expression.Numerical = Expression.NumericalReal;
var CartSine = new Expression.Function({
	default: function (x) {
		if(x instanceof Expression.NumericalReal
			|| x instanceof Expression.List.Real
			|| x instanceof Expression.Symbol.Real) {
			return new M.Expression.List.ComplexCartesian([Global.sin.default(x), Global.Zero]);
		} else {
			throw(new Error('Complex Sine Cartesian form not implemented yet.'));
		}
	}
});

Global['sin'] = new Expression.Function({
	default: function(x) {
		if(x instanceof Expression.NumericalReal) {
			return new Expression.NumericalReal(Math.sin(x.value));
		}
		if(x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real) {
			return Expression.List.Real([Global.sin, x]);
		}
		return Expression.List([Global.sin, x]);
		
		/*
				// sin(a+bi) = sin(a)cosh(b) + i cos(a)sinh(b)
				var exp_b = Math.exp(x._imag);
				var cosh_b = (exp_b + 1 / exp_b) / 2;
				var sinh_b = (exp_b - 1 / exp_b) / 2;
				return new Expression.ComplexNumerical(Math.sin(x._real) * cosh_b, Math.cos(x._real) * sinh_b);
		*/
	},
	realimag: function () {
		return CartSine;
	},
	'text/latex': '\\sin',
	'text/javascript': 'Math.sin',
	'x-shader/x-fragment': 'sin',
	title: 'Sine Function',
	description: 'See http://en.wikipedia.org/wiki/Trigonometric_functions#Sine.2C_cosine.2C_and_tangent',
	examples: ['\\sin (\\pi)'],
	related: ['cos', 'tan']
});
Global['cos'] = new Expression.Function({
	default: function(x) {
		if(x instanceof Expression.NumericalReal) {
			return new Expression.NumericalReal(Math.cos(x.value));
		}
		if(x instanceof Expression.List.Real || x instanceof Expression.Symbol.Real) {
			return Expression.List.Real([Global.cos, x]);
		}
		return Expression.List([Global.cos, x]);
		
	},
	derivative: Global.sin['@-'](),
	'text/latex': '\\cos',
	'text/javascript': 'Math.cos',
	'x-shader/x-fragment': 'cos',
	title: 'Cosine Function',
	description: 'Cosine Function desc',
	examples: ['\\cos (\\pi)'],
	related: ['sin', 'tan']
});

Global.sin.derivative = Global.cos;

Global['tan'] = new Expression.Function({
	symbolic: function (x) {
		//
	}
});
Global['log'] = new Expression.Function({
	default: function (x, assumptions) {

		if(x instanceof Expression.Integer && x.a === 1) {
			return Global.Zero;
		} else if(x instanceof Expression.Integer && x.a === 0) {
			return Global.Infinity['@-']();
		} else if(x instanceof Expression.NumericalReal) {
			var v = x.value;
			if(v > 0){
				return new Expression.NumericalReal(Math.log(v));
			}
		}

		if(assumptions && assumptions.positive) {
			return Expression.List.Real([Global.log, x]);
		}
		
		return Expression.List([Global.log, x]);
	},
	realimag: function (x) {
		return CartLog;
	},
	'text/latex': '\\log',
	'text/javascript': 'Math.log',
	'x-shader/x-fragment': 'log',
	title: 'Natural Logarithm',
	description: 'Base e. See http://en.wikipedia.org/wiki/Natural_logarithm',
	examples: ['\\log (ye^(2x))'],
	related: ['exp', 'Log']
});
var Half = new Expression.Rational(1, 2);
var CartLog = new Expression.Function({
	default: function (x) {
		return new Expression.List.ComplexCartesian([
			Global.log.default(x.abs()),
			x.arg()
		])['*'](Half);
	}
});
CartLog.__proto__ = Global.log;
Global['atan2'] = new Expression.Function({
	default: function(x) {
		if(! (x instanceof Expression.Vector)) {
			throw ('atan only takes vector arguments');
		}
		if(x[0] instanceof Expression.NumericalReal) {
			if(x[1] instanceof Expression.NumericalReal) {
				return new Expression.NumericalReal(Math.atan2(x[0].value, x[1].value));
			}
		}
		
		return new Expression.List.Real([Global.atan2, x]);
		
		return Expression.List([Global.atan2, x]);
	},
	apply_realimag: function(op, x) {
		//TODO: DANGER! Assuming real numbers, but it should have some fast way to do this.
		return [Expression.List([Global.atan2, x]), M.Global.Zero];
	},
	'text/latex': '\\tan^{-1}',
	'text/javascript': 'Math.atan2',
	'x-shader/x-fragment': 'atan',
	toTypedString: function(language) {
		return {
			s: this[language],
			t:javascript.Function
		}
	},
	title: 'Two argument arctangent function',
	description: 'Arctan(y, x). Will equal arctan(y / x) except when x and y are both negative. See http://en.wikipedia.org/wiki/Atan2'
});

Global['atan'] = Global.atan2;

Global['Gamma'] = {
	default: function(x){
		function gammln(xx) {
		    var j;
		    var x, tmp, y, ser;
		    var cof = [
				57.1562356658629235,
				-59.5979603554754912,
				14.1360979747417471,
				-0.491913816097620199,
				0.339946499848118887e-4,
				0.465236289270485756e-4,
				-0.983744753048795646e-4,
				0.158088703224912494e-3,
				-0.210264441724104883e-3,
				0.217439618115212643e-3,
				-0.164318106536763890e-3,
				0.844182239838527433e-4,
				-0.261908384015814087e-4,
				0.368991826595316234e-5
			];
		    if (xx <= 0){
		        throw('bad arg in gammln');
		    }
		    y = x = xx;
		    tmp = x + 5.24218750000000000;
		    tmp = (x + 0.5) * Math.log(tmp) - tmp;
		    ser = 0.999999999999997092;
		    for (j = 0; j < 14; j++){
		        ser += cof[j] / ++y;
		    }
		    return tmp + Math.log(2.5066282746310005 * ser / x);
		}
		if (x instanceof Expression.Integer) {
			var v = x.a;
			if(v < 0) {
				return Global.ComplexInfinity;
			}
			if(v < 15) {
				var p = 1;
				var i = 0;
				for(i = 1; i < v; i++) {
					p *= i;
				}
				return new Expression.Integer(p);
			}
			return Expression.List.Real([Global.Gamma, x]);
		} else if (x instanceof Expression.NumericalReal) {
			var v = x.value;
			if (v === 0) {
		        return Global.Infinity;
		    } else if(v < 0) {
				return new Expression.NumericalReal(-Math.PI / (v * Math.sin(Math.PI * v) * Math.exp(gammln(-v))));
		    }
			return new Expression.NumericalReal(Math.exp(gammln(v)));
		} else if(x instanceof Expression.NumericalComplex) {
			
		}
		return Expression.List([Global.Gamma, x]);
	},
	'text/latex': '\\Gamma',
	'text/javascript': 'M.Global.Gamma.f',
	toTypedString: function(language) {
		return {
			s: this[language],
			t:javascript.Function
		}
	},
	title: 'Gamma Function',
	description: 'See http://en.wikipedia.org/wiki/Gamma_function',
	examples: ['\\Gamma (x)', 'x!'],
	related: ['Log', 'LogGamma']
};
Global['Re'] = {
	default: function(x) {
		return x.real();
	},
	apply_realimag: function(op, x) {
		return [x.real(), Global.Zero];
	},
	'text/latex': '\\Re'
};
Global['Im'] = {
	default: function(x) {
		return x.imag();
	},
	distributed_under_differentiation: true,
	apply_realimag: function(op, x) {
		return [x.imag(), Global.Zero];
	},
	'text/latex': '\\Im'
}
Expression.List.Real.prototype.positive = function () {
	if(this.operator === '+') {
		return this[0].positive && this[1].positive && this[0].positive() && this[1].positive();
	}
	if(this.operator === '*') {
		if(this[0] === this[1]) {
			return true;
		}
		return this[0].positive && this[1].positive && this[0].positive() && this[1].positive();
	}
	if(this.operator === '^') {
		if(this[1] instanceof Expression.Rational) {
			var f = this[1].reduce();
			if(f.a % 2 === 0) {
				return true;
			}
		}
	}
	return false;
};
Expression.NumericalReal.prototype.positive = function () {
	return this.value > 0;
};
Global['sqrt'] = new Expression.Function({
	default: function (x) {
		if (x instanceof Expression.NumericalReal) {
			var v = x.value;
			if(v < 0) {
				return new Expression.List.ComplexCartesian([
					Global.Zero, new Expression.NumericalReal(Math.sqrt(v))
				]);
			}
			return new Expression.NumericalReal(Math.sqrt(v));
		} else if (x instanceof Expression.List.Real) {
			if(x.positive()) {
				return Expression.List.Real([Global.sqrt, x]);
			} else {
				return Expression.List([Global.sqrt, x]);
			}
		} else if (x instanceof Expression.List.ComplexPolar) {
			return new Expression.List.ComplexPolar([
				x[0],
				x[1]['/'](new Expression.Integer(2))
			]);
		} else if (x instanceof Expression.List.ComplexCartesian) {
			return new Expression.List([Global.sqrt, x]);
		}
		return Expression.List([Global.sqrt, x]);
		throw('SQRT: ???');
		switch (x.constructor) {
			case Expression.Complex:
				//http://www.mathpropress.com/stan/bibliography/complexSquareRoot.pdf
				var sgn_b;
				if (x._imag === 0.0) {
					return new Expression.Complex(Math.sqrt(x._real), 0);
				} else if(x._imag>0) {
					sgn_b = 1.0;
				} else {
					sgn_b = -1.0;
				}
				var s_a2_b2 = Math.sqrt(x._real * x._real + x._imag * x._imag);
				var p = one_on_rt2 * Math.sqrt(s_a2_b2 + x._real);
				var q = sgn_b * one_on_rt2 * Math.sqrt(s_a2_b2 - x._real);
			case Expression.NumericalReal:
				return new Expression.RealNumerical(Math.sqrt(x));
			case Expression.List.Real:
			case Expression.List:
				if (x.operator === '^') {
					return Global.abs.apply(undefined, x[0].apply('^', x[1].apply('/', new Expression.NumericalReal(2,0))));
				}
			default:
				return Expression.List([Global.sqrt, x]);
		}
	},
	apply_realimag: function(op, x) {
		//TODO: DANGER! Assuming real numbers, but it should have some fast way to do this.
		
		//Uses exp, atan2 and log functions. A really bad idea. (square rooting, then squaring, then atan, also [exp(log)])
		return x['^'](new Expression.Rational(1, 2)).realimag();
		//var ri = x.realimag();
		//return [Expression.List([Global.sqrt, x]), M.Global.Zero];
	},
	'text/latex': '\\sqrt',
	'text/javascript': 'Math.sqrt',
	'x-shader/x-fragment': 'sqrt',
	toTypedString: function(language) {
		return {
			s: this[language],
			t:javascript.Function
		}
	},
	title: 'Sqrt Function',
	description: 'See http://en.wikipedia.org/wiki/Square_Root',
	examples: ['\\sqrt (x^4)'],
	related: ['pow', 'abs', 'mod']
});
Global['abs'] = new Expression.Function({
	default: function (x) {
		//Using abs is better (I think) because it finds the method through the prototype chain,
		//which is going to be faster than doing an if list / switch case list.
		return x.abs();
	},
	'text/latex': '\\abs',
	'text/javascript': 'Math.abs',
	'x-shader/x-fragment': 'abs',
	titie: 'Absolute Value Function',
	description: 'Abs',
	examples: ['\\abs (-3)', '\\abs (i+3)'],
	related: ['arg', 'tan']
});

// It is self-referential
Global.abs.derivative = (function () {
		var s = new Expression.Symbol.Real();
		var y = s['/'](s.abs());
		return new Expression.Function.Symbolic(y, [s]);
}());
Global['arg'] = {
	default: function (x) {
		console.warn('ARG IS FOR USER INPUT ONLY. USE .arg()');
		//Using abs is better (I think) because it finds the method through the prototype chain,
		//which is going to be faster than doing an if list / switch case list. TODO: Check the truthfullnes of this!
		return x.arg();
	},
	'text/latex': '\\arg', //temp
	'text/javascript': 'Math.arg_real',
	toTypedString: function(language) {
		return {
			s: this[language],
			t:javascript.Function
		}
	},
	titie: 'Arg Function',
	description: 'Arg',
	examples: ['\\arg (-3)', '\\arg (3)', '\\arg(3+2i)'],
	related: ['abs']
}



Global['e'] = new Expression.NumericalReal(Math.E, 0);
Global['e'].title = 'e';
Global['e'].description = 'The transcendental number that is the base of the natural logarithm, approximately equal to 2.71828.';
Global.e.s = function (lang) {
	if(lang === 'text/javascript') {
		return new Code('Math.E');
	}
	if(lang == 'text/latex') {
		return new Code('e');
	}
	return new Code('2.718281828459045');
};


Global['pi'] = new Expression.NumericalReal(Math.PI, 0);
Global['pi'].title = 'Pi';
Global['pi'].description = '';
Global.pi.s = function (lang) {
	if(lang === 'text/javascript') {
		return new Code('Math.PI');
	}
	if(lang === 'text/latex') {
		return new Code('\\pi');
	}
	return new Code('3.141592653589793');
};
// The real circle constant:
Global.tau = Global['pi']['*'](new Expression.Integer(2));

Global['Infinity'] = new Expression.NumericalReal(Infinity, 0);
Global['Infinity'].title = 'Infinity';
Global['Infinity'].description = '';
Global['infty'] = Global.Infinity;


Global['Zero'] = new Expression.Integer(0);
Global['Zero'].title = 'Zero';
Global['Zero'].description = 'Additive Identity';
Global['Zero']['*'] = function (x) {
	return Global.Zero;
};
Global['Zero']['+'] = function (x) {
	return x;
};
Global['Zero']['@-'] = function (x) {
	return this;
};

Global['Zero']['-'] = function (x) {
	return x['@-']();
};

Global['One'] = new Expression.Integer(1);
Global['One'].title = 'One';
Global['One'].description = 'Multiplicative Identity';
Global['One']['*'] = function (x) {
	return x;
};

Global.log.derivative = new Expression.Function.Symbolic(Global.One['/'](new Expression.Symbol.Real()));

Global['i'] = new Expression.List.ComplexCartesian([Global['Zero'], Global['One']]);
Global['i'].title = 'Imaginary Unit';
Global['i'].description = 'A number which satisfies the property <m>i^2 = -1</m>.';
Global['i'].realimag = function(){
	return Expression.List.ComplexCartesian([
		Global.Zero,
		Global.One
	]);
};
Global['i']['*[TODO]'] = function (x) {
	
};

Global['d'] = new Expression.Function({
	default: function(x) {
		return new Infinitesimal(x);
	}
});

Global.d['/'] = function (x) {
	if(x instanceof Infinitesimal) {
		if(x.x instanceof Expression.Symbol) {
	
			// Derivative operator
			
			return new Derivative(x.x);
		}
		if(x.x instanceof Expression.Vector) {
			return Expression.Vector(Array.prototype.map.call(x.x, function (x) {
				return new Derivative(x);
			}));
		}
		throw('Confusing infitesimal division');
	}

	throw('Dividing d by some large number.');
	
};
Global['undefined'] = {
	s: function (lang){
		if (lang === 'text/javascript') {
			return new Code('undefined');
		} else if (lang === 'x-shader/x-fragment') {
			return new Code('(1.0/0.0)');
		}
	},
	differentiate: function (){
		return this;
	},
	'*': function (){
		return this;
	},
	'+': function (){
		return this;
	},
	'-': function () {
		return this;
	},
	'/': function () {
		return this;
	},
	'^': function () {
		return this;
	},
	'@-': function () {
		return this;
	}
};
Global['sum'] = new Expression.Function({
	default: function (x) {
		throw('Sum not properly constructed yet.');
		return 3;
	}
});
Global['sum']['_'] = function (eq) {
	// start: 
	var t = eq[0];
	var v = eq[1];
	return new Expression.Sum.Real(t, v);
}// Note that it is M.Global, and NOT just Global (so the user can set M.Global)
function M(a, b) {
	var e = Expression(a, b || M.Global);
	return e;
}

M.toString = function() {
	return 'function M(expression, context) {\n    /*!\n     *  Math JavaScript Library v3.9.1\n     *  https://github.com/aantthony/javascript-cas\n     *  \n     *  Copyright 2010 Anthony Foster. All rights reserved.\n     */\n    [awesome code]\n}';
};

//Allow creation of new Context externally
M['Context'] = Context;

M['Expression'] = Expression;
//Allow modification of global context
M['Global'] = Global;

var extensions = {};
M['register'] = function (name, installer){
	if(Expression.prototype[name]) {
		throw('Method .'+name+' is already in use!');
	}
	extensions[name] = installer;
};
M.load = function(name, config) {
	extensions[name](M, Expression, config);
	delete extensions[name];
};

if (typeof module !== 'undefined') {
	// Node
	module['exports'] = M;
} else {
	// In browser
	window['M'] = M;
}

console.log('Load time:', new Date() - startTime, 'ms');}());