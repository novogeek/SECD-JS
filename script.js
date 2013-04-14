window.onload = function () {
    secd.init();
    console.log(secd.credits.author);
    //secd.compile();
}



/*
Iterate through a nested object literal and spread it into an array.
var compileAST = function () {
    var astArr = [];
    var spread = function (astObj) {
        for (var prop in astObj) {
            if (typeof (astObj[prop]) === "object") {
                astArr.push(prop);
                spread(astObj[prop]);
            }
            else {
                astArr.push(prop);
                astArr.push(astObj[prop]);
                console.log(typeof (prop), ' :: ', typeof (astObj[prop]));
            }
        }
    };
    console.log('input val: ', txtInput.value);
    var ast = JSON.parse(txtInput.value); //{ add1: { add1: 1} }; //take this input from textbox
    console.log('input ast: ', ast);
    spread(ast);
    console.log('astArr: ', astArr);
    return astArr;
}
*/

//Enter input in Scheme like syntax
//(succ 0) || Output: ["succ", 0]
//(succ (succ 0)) || Output: ["succ", "succ" , 0]
//(fun x (succ (succ 0))) || Output: ["fun", "x", "succ", "succ", 0]

//Remove "(" and ")" characters from the input and convert the rest into an array 
/*var ParseCode = function (code) {
var arrAst = code.replace(/[\(\)]/gi, '').split(" ");
console.log('parseCode: ', arrAst);
return arrAst;
}*/

//var a={app:{func:['x','(succ x)'],in: 0}}
//add: [1,2] ; succ:1

/*var ParseCode = function (code) {
var strAst = "var ast={" + txtInput.value + "}";
eval(strAst);
console.log("parseCode: ast::", ast);
return ast;
}*/

/*var RunSECD = function (code) {
    var s = new Array;
    var e = new Array;
    var c = code;
    var d = new Array;
    var tmp;
    while (c.length) {
        console.log('s: ', s, ' e: ', e, ' c: ', c, ' d: ', d);
        tmp = c.pop();
        ptemp = parseInt(tmp);
        if (!isNaN(ptemp)) {
            LDC(s, ptemp);
        }
        else if (tmp === "succ") {
            SUCC(s);
        }
    }
    return s.pop();
}


        //succ:1 | succ:{succ:{succ:1}} | add: [1,2] | mult:[1,2,3] | succ:{succ:{mult:[2,2]}}
        //app:{func:['x',{succ:'x'}],val: 0}
        //app:{func:['x',{succ:{succ:'x'}}],val: 0}
        // ?? app:['func:[x,(succ x)]', 0]
		//app:{func:{arg:'x',body:{succ:{succ:'x'}}},val: 0}

        //Iterate through a nested object literal and spread it into an array.
        var CompileAST = function () {
            var astArr = [];
            var convertObjToArray = function (astObj) {
                for (var prop in astObj) {
                    if (typeof (astObj[prop]) === "object") { //Note: In JS, typeof Array() is "object".
                        if (!astObj.length) { //if the object is not an array, push property as well.
                            astArr.push(prop);
                        }
                        convertObjToArray(astObj[prop]);
                    }
                    else {
                        if (!astObj.length) {
                            astArr.push(prop);
                        }
                        astArr.push(astObj[prop]);
                        console.log(typeof (prop), ' :: ', typeof (astObj[prop]));
                    }
                }
            };
            console.log('input val: ', txtInput.value);
            var strAst = "var ast={" + txtInput.value + "}";
            eval(strAst);
            console.log('input ast: ', ast);
            convertObjToArray(ast);
            console.log('astArr: ', astArr);
            return astArr;
        }

/*        
            //buildAST;

                    //If astObj is a proper JS object, push its property into astArr (e.g., {succ:1}, here 'succ'.)
					if (!astObj.length) { //if the object is not an array, push property as well.
						astArr.push(prop);
}
//If the property of astObj is an object or an array, do recursion & look into that object (e.g., {succ: {add: [1,2]}}. 
//Here, it is succ.add)
if (typeof (astObj[prop]) === "object") { //Note: In JS, typeof Array() is "object".
    if (prop === "func") {
        var funcObj = astObj[prop];
        funcArr.push(funcObj.arg);
        funcArr.push(buildAST(funcObj.body));
        console.log('funcArr: ', funcArr);
        astArr.push(funcArr);
    }
    else if(prop==="app")
    {buildAST(astObj[prop]);}
}
    //If the property of astObj is a simple type (num, str), push it into astArr. (e.g., {succ: 1}, here 1)
else {
    astArr.push(astObj[prop]);
    console.log('prop: ',prop, ' :: ',typeof (prop), ' :: ', typeof (astObj[prop]));
}
*/