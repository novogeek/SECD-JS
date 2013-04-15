(function () {
    var MySecd = function () {
        var id = 1;
        var txtInput = document.getElementById("txtInput");
        var divResults = document.getElementById("divResults");
        var astObject;
        var astArray;

        var codeDetails = {
            author: "Krishna Chaitanya T",
            prof: "Venkatesh Choppella",
            course: "Semantics of Programming Languages",
            sem: "Spring 2013",
            date: "4th April, 2013",
            college: "IIIT-Hyderabad"
        };

        var DomOperations = function () {
            txtInput.onkeypress = function (e) {
                if (e.keyCode === 13) {
					console.log("--- Begin SECD ---");
                    var code = parseCode(txtInput.value);
                    var result = RunSECD(code, new Array());
                    divResults.innerHTML = result;
					console.log("--- End SECD ---");
                }
            }

            var sideBar = document.getElementById('divSidebar');
            var arr = sideBar.getElementsByTagName('span');
            var arrlen = arr.length;
            for (i = 0; i < arrlen; i++) {
                arr[i].onclick = function () {
                    //console.log('i: ', this.innerText);
                    txtInput.value = (document.all)? this.innerText:this.textContent;
                    txtInput.focus();
                }
            }
        };

        //succ:1 
        //succ:{succ:{succ:1}}
        //add: [1,2]
        //mult:[1,2,3]
        //succ:{add:[1,2,3]}
        //succ:{succ:{mult:[2,2]}}
        //app:{func:{arg:'x',body:'x'},val: 0}
        //app:{func:{arg:'x',body:{succ:{succ:'x'}}},val: 0}
        //app:{func:{arg:'x',body:{succ:{add:['x',1]}}},val: 0}

        var buildAST = function (astObj, astArr) {
            //console.log('buildAST: astObj :: ', astObj, ' astArr :: ', astArr);
            for (var prop in astObj) {
                //console.log("prop: ", prop, "!!astObj[prop].length: ", !!astObj[prop].length);
                if (prop === "app") {
                    astArr.push(prop);
                    buildAST(astObj[prop], astArr);
                }
                if (prop === "func") {
                    //console.log('func astArr: ', astArr);
                    astArr.push(prop);
                }
                if (prop === "val") {
                    //astArr.push(astObj[prop]);
                }
                if ((prop === "succ")) {
                    if (typeof (astObj[prop]) === "object") {
                        astArr.push(prop);
                        buildAST(astObj[prop], astArr);
                    }
                    else {
                        astArr.push(prop);
                        astArr.push(astObj[prop]);
                    }
                }
                if ((prop === "add") || (prop === "mult")) {
                    astArr.push(prop);
                    buildAST(astObj[prop], astArr);
                    //console.log('add/mult: ', prop, astObj[prop]);
                }
                if (typeof (astObj) === "object" && astObj.length) { //For iterating add,mult array
                    //console.log('prop :', prop,' astObj[prop]: ', astObj[prop]);
                    astArr.push(astObj[prop]);
                    buildAST(astObj[prop], astArr);
                }
                if (typeof astObj === "string") {
                    //console.log('str: ', astArr, astObj);
                    astArr.push(astObj);
                    //console.log('str: ', astArr, astObj);
                }
            }
            return astArr;
        }

        var parseCode = function (inputCode) {
            console.log('input val: ', txtInput.value);
            var strAst = "var ast={" + txtInput.value + "}";
            eval(strAst);
            astObject = ast;
            console.log('input ast: ', astObject);
            var astArr=buildAST(ast, new Array());
            //console.log('parseCode astArr: ', astArr);
            return astArr;
        }

        var LDC = function (stack, con) {
            //console.log('run_secd: ldc');
            stack.push(con);
			return stack;
        }
        var SUCC = function (stack) {
            stack.push(stack.pop() + 1);
			return stack;
        }
        var ADD = function (stack) {
            var sum = 0, len = stack.length;
            for (i = 0; i < len; i++) {
                sum = sum + stack[i];
            }
            stack.length = 0;
            stack.push(sum);
			return stack;
        }
        var MULT = function (stack) {
            var res = 1, len = stack.length;
            for (i = 0; i < len; i++) {
                res = res * stack[i];
            }
            stack.length = 0;
            stack.push(res);
			return stack;
        }

        var FUNC = function (stack) {
            var funcAst = buildAST(astObject.app.func.body, new Array());
            //console.log('func ast: ', funcAst);
            stack=stack.concat(funcAst);
            //console.log('func stack:', stack);
            return stack;
        }

        var APP = function (stack, env) {
            //console.log('APP: stack: ', stack);
            //console.log('APP: arg:', astObject.app.func.arg, ' val: ', env[0][astObject.app.func.arg]);
            var index = stack.indexOf(astObject.app.func.arg);
            stack[index] = env[0][astObject.app.func.arg];
            //console.log('APP: stack: ', stack);
            var s = [];
            s.push(RunSECD(stack, env));
            //console.log('app: s: ', s);
            return s;
        }

        var RunSECD = function (code, env) {
            var s = new Array;
            var e = env;
            var c = code;
            var d = new Array;
            var tmp, ptemp, ltemp;
            while (c.length) {
                console.log('s: ', s, ' e: ', e, ' c: ', c, ' d: ', d);
                tmp = c.pop();
                ptemp = parseInt(tmp);
                if (!isNaN(ptemp)) {
                    s = LDC(s, ptemp);
                }
                else {
                    ltemp = tmp.toLowerCase();
                }

                if (ltemp === "succ") {
                    s=SUCC(s);
                }
                else if (ltemp === "add") {
                    s=ADD(s);
                }
                else if (ltemp === "mult") {
                    s=MULT(s);
                }
                else if (ltemp === "func") {
                    var envObj = {}
                    envObj[astObject.app.func.arg] = astObject.app.val;
                    e.push(envObj);
                    //console.log('env: e: ', e[0][astObject.app.func.arg]);
                    //e.push(astObject.app.func.arg);
                    //e.push(astObject.app.val);
                    s = FUNC(s);
                }
                else if (ltemp === "app") {
                    //console.log("app");
                    s = APP(s,e);
                }
            }
            return s.pop();
        }

        return {
            credits: codeDetails,
            init: DomOperations,
            ast: function () { return astObject }
            //compile: CompileAST
        };
    };
    window.secd = MySecd();
})();