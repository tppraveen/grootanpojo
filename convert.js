  var res ="";
$(document).ready(function () {
    Init(); 
    res ="";
});
var clearInput = function (options) {
    var thisCheck = options.obj_input; 
    var msgBox = options.msgBox;
    checkValue = thisCheck.val();
    var trime = options.trime !== undefined ? options.trime : 1030;
    thisCheck.bind("blur keyup", function () {
        if ($(this).val() == "") {
            if (msgBox.hasClass(options.Tip)) {
                msgBox.stop(true, true).fadeOut(trime);
            }
        } else {
            msgBox.stop(true, true).fadeIn(trime);
        }
    });
    msgBox.click(function () {
        thisCheck.focus();
        msgBox.stop(true, true).fadeOut(trime);
        thisCheck.val("");
    });

    function init() {
        $(".publicSearch input[type='text']:first").focus().select();
        if (checkValue !== '') {
            msgBox.stop(true, true).fadeIn(trime);
        } else {
            msgBox.stop(true, true).fadeOut(trime);
        }
    }
    init();
};

String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    result = result.replace(reg, arguments[i]);
                }
                else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
}



var tools = {
    clear: function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                array[i].value = '';
                $(array[i]).siblings("b").show();
            }
        }
    },
    htmlcheck: function () {
        $("li.errorline a").click(function () {
            var line = $(this).attr("line");
            var htmltext = $('#htmltext');
            htmltext.focus();
            var linepos = htmltext.val().indexOf(line);
            SelectRange(htmltext[0], linepos, linepos);
        });
    },
    pagecode: function () {
        $("div.TabheadWrap a").click(function () {
            $(this).addClass("Tabon").siblings().removeClass("Tabon");
            $("#codecolor").val($(this).attr("val"));
            $("form").submit();
        });
    },
    webdebugger: {
        Webtest: function () {
            var win = window.open();
            win.document.open();
            win.document.write($('#content').val());
            win.document.close();
        },
        saveCode: function () {
            if (!document.all) {
                alert('此功能在IE有效');
                return;
            }
            var win = window.open('', '', 'top=10000,left=10000');
            win.document.write(document.all.content.innerText)
            win.document.execCommand('SaveAs', '', '文件名称.htm')
            win.close();
        },
        init: function () {
            var _this = this;
            $("#test").click(function () {
                _this.Webtest();
            });
            $("#select").click(function () {
                $("#content").select();
            });
            $("#clear").click(function () {
                $("#content").val("");
            });
            $("#save").click(function () {
                _this.saveCode();
            });
        }
    },
    htmlfilter: {
        fhtml: true,
        fjs: false,
        fcss: false,
        fself: false,
        Filter: function () {
            var s = jQuery("#content").val();
            if (!this.fhtml && !this.fjs && !this.fcss && !this.fself)
                this.fhtml = true;
            if (this.fjs)
                s = s.replace(/<\s*script[^>]*>(.|[\r\n])*?<\s*\/script[^>]*>/gi, '');
            if (this.fcss)
                s = s.replace(/<\s*style[^>]*>(.|[\r\n])*?<\s*\/style[^>]*>/gi, '');
            if (this.fhtml) {
                s = s.replace(/<\/?[^>]+>/g, '');
                s = s.replace(/\&[a-z]+;/gi, '');
                s = s.replace(/\s+/g, '\n');
            }
            if (this.fself)
                s = s.replace(new RegExp(jQuery("#preplace").val(), 'g'), $("#nextplace").val());
            jQuery("#result").val(s).removeClass("col-gray");
        },
        checked: function (obj) {
            var thisv = jQuery(obj).val();
            var set = jQuery(obj).prop("checked");
            if (thisv == 3) {
                if (set) {
                    this.fhtml = false;
                    this.fjs = false;
                    this.fcss = false;
                    this.fself = true;
                    jQuery(obj).siblings("[name=type]").prop("checked", false);
                    jQuery("#place").removeClass("autohide");
                }
                else {
                    this.fhtml = true;
                    this.fself = false;
                    jQuery("#place").addClass("autohide");
                    jQuery("input[name=type]").eq(1).prop("checked", true);
                }
            }
            else {
                jQuery("#place").addClass("autohide");
                jQuery("input[name=type]").eq(0).prop("checked", false);
                switch (thisv) {
                    case "0": if (set) { this.fhtml = true; this.fself = false; } else { this.fhtml = false; } break;
                    case "1": if (set) { this.fjs = true; this.fself = false; } else { this.fjs = false; } break;
                    case "2": if (set) { this.fcss = true; this.fself = false; } else { this.fcss = false; } break;
                }
                var _this = this;
                _this.Filter();
            }
        },
        init: function (path) {
            var _this = this;
            jQuery("input[name=type]").bind("click", function () {
                _this.checked(this);
            });
            jQuery("#filter").click(function () {
                _this.Filter();
                jQuery("#result").siblings(".CentHid").hide();
            });
            jQuery("#clear").click(function () {
                jQuery("#content").val("");
                jQuery("#result").val("");
            });
        }
    },
    checkbox: function (t) {
        $(".js-FilterItem li").click(function (e) {
            if (!$(this).hasClass("selected")) {
                $(this).addClass("selected");
                fn(this);
            } else {
                $(this).removeClass("selected");
                fn(this);
            }
        });
        function fn(obj) {
            if (t == "reg") {
                var index = $(obj).index();
                if (index == 5) {
                    $("#chkboxhide input").eq(6).prop("checkbox", false).removeAttr("checked");
                    $("#_chkboxhide li").eq(6).removeClass("selected");
                } else if (index == 6) {
                    $("#chkboxhide input").eq(5).prop("checkbox", false).removeAttr("checked");
                    $("#_chkboxhide li").eq(5).removeClass("selected");
                }
                $("#chkboxhide input").eq(index).click();
            }
            else
                if ($(obj).find("input").val()) $(obj).find("input").val(""); else $(obj).find("input").val($(obj).attr("val"));
        }
    },
    jsonTool: {
        jsontocsharp: {
            init: function (path) {
                var _this = this;
                $(".ToolChoesecj").each(function () {
                    _select({
                        select: $(this).find(".SearChoese"),
                        options: $(this).find("ul.SearChoese-show"),
                        option: $(this).find("ul.SearChoese-show li a"),
                        t: "slide",
                        parents: $(".ToolChoesecj"),
                        callback: function () {
                            if ($("#showtype").val() == 1)
                                $(".javawh").addClass("autohide");
                            else
                                $(".javawh").removeClass("autohide");
                        }
                    });
                });

                $("#2csharp").click(function () {
                    if (!$("#jsonval").val().trim()) {
                        alert("Enter JSON code");
                        return false;
                    }
                    try {
                        var v = eval("(" + document.getElementById("jsonval").value + ")");
                       // var res = "";
                        if ($("#showtype").val() == 1)
                            res = _this.JSON2CSharp.convert(v);
                        else
                            res = _this.JSON2POJO.convert(v);
                        $("#result").val(res).siblings("b").hide();
                    } catch (e) {
                        alert("Generate entity error，check JSON code.");
                    }
                });
                $("#testjson").click(function () {
                    var testjson = '{\r\n    "name":"Tool",\r\n    "url":"http://www.freecodeformat.com",\r\n    "Credit card":{\r\n        "name":"Get new identity",\r\n        "url":"US"\r\n    },\r\n    "arrayBrowser":[{\r\n        "name":"Good name generator",\r\n        "url":"http://www.goodnamegenerator.com"\r\n    },\r\n    {\r\n       "name":"Yahoo",\r\n       "url":"http://www.yahoo.com"\r\n   },\r\n   {\r\n       "name":"Thinkcalculator",\r\n       "url":"http://www.thinkcalculator.com"\r\n   }]\r\n}';
                    $("#jsonval").val(testjson).siblings("b").hide();
                });
                $("#clear").click(function () {
                    tools.clear([getid('result'), getid('jsonval')]);
                });
            },
            JSON2POJO: {
                _allClass: [],
                _genClassCode: function (obj, name) {
                    var packageval = $("#packageval").val(), isfill = $("#isfill").prop("checked");
                    var clas = "";
                    var str = "";
                    var privateAttr = "", publicAttr = "", fill = "", filllist = "";
                    if (isfill) {
                        fill += "    public static {0} fill(JSONObject jsonobj){\r\n".format(name || "Root");
                        fill += "        {0} entity = new {0}();\r\n".format(name || "Root");

                        filllist += "    public static List<{0}> fillList(JSONArray jsonarray) {\r\n";
                        filllist += "        if (jsonarray == null || jsonarray.size() == 0)\r\n";
                        filllist += "            return null;\r\n";
                        filllist += "        List<{0}> olist = new ArrayList<{0}>();\r\n";
                        filllist += "        for (int i = 0; i < jsonarray.size(); i++) {\r\n";
                        filllist += "            olist.add(fill(jsonarray.getJSONObject(i)));\r\n";
                        filllist += "        }\r\n";
                        filllist += "        return olist;\r\n";
                        filllist += "    }\r\n";
                        filllist = filllist.format(name || "Root");
                    }
                    for (var n in obj) {
                        var v = obj[n];
                        n = n.trim();
                        var tp = this._genTypeByProp(n, v);
                        var _type = tp.type;
                        if (tp.islist) {
                            if (isfill)
                                str = "import java.util.List;\r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                            else
                                str = "import java.util.List;\r\n\r\npublic class {0}\r\n{\r\n".format(name || "Converted", packageval, "\r\nimport java.util.List;");
                        }
                        privateAttr += "    private {0} {1};\r\n".format(_type, n);
                        var firstChar = n.substring(0, 1).toUpperCase() + n.substring(1);
                        publicAttr += "    public void set{2}({0} {1}){\r\n        this.{1} = {1};\r\n    }\r\n".format(_type, n, firstChar);
                        publicAttr += "    public {0} get{2}(){\r\n        return {1};\r\n    }\r\n".format(_type, n, firstChar);

                        if (isfill) {
                            fill += "        if (jsonobj.containsKey(\"{0}\")) {\r\n".format(n);
                            var _typefirstChartoUpper = _type.substring(0, 1).toUpperCase() + _type.substring(1);
                            fill += "            entity.set{1}(jsonobj.get{2}(\"{0}\"));        \r\n        }\r\n".format(n, n.substring(0, 1).toUpperCase() + n.substring(1), _typefirstChartoUpper.indexOf("List") >= 0 ? "JSONArray" : _typefirstChartoUpper);
                        }
                    }
                    
                    if (!str) {
                        if (isfill)
                            clas += "import java.util.List;  \r\nimport net.sf.json.JSONObject;\r\nimport net.sf.json.JSONArray;\r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                        else
                            clas += "import java.util.List; \r\npublic class {0}\r\n{\r\n".format(name || "Root", packageval);
                    }
                    else
                        clas += str;
                    if (isfill) {
                        fill += "        return entity;\r\n    }\r\n";
                    }
                    clas += privateAttr;
                    clas += publicAttr;
                    clas += fill;
                    clas += filllist;
                    clas += "}\r\n";
                    this._allClass.push(clas);
                    return this._allClass.join("\r\n");
                },
                _genTypeByProp: function (name, val) {
                    try {
                        if (typeof val == "string") {
                            //xxxx(-|/|年)xx(-|/|月)xx(-|/|日) xx:xx:xx
                            var regdt = /^(\d{4})(-|\/|年)(\d{2})(-|\/|月)(\d{2})(日)?(\s((\d{1,2}):)?((\d{1,2}):)?(\d{1,2})?)?$/
                            if (regdt.test(val.trim()))
                                val = new Date(val);
                        }
                    } catch (e) {

                    }
                    switch (Object.prototype.toString.apply(val)) {
                        case "[object Number]":
                            {
                                return { type: val.toString().indexOf(".") > -1 ? "double" : "int" };
                            }
                        case "[object Date]":
                            {
                                return { type: "DateTime" };
                            }
                        case "[object Object]":
                            {
                                name = name.substring(0, 1).toUpperCase() + name.substring(1);
                                this._genClassCode(val, name);
                                return { type: name };
                            }
                        case "[object Array]":
                            {
                                return { type: "List<{0}>".format(this._genTypeByProp(name, val[0]).type), islist: true };
                            }
                        case "[object Boolean]":
                            {
                                return { type: "boolean" };
                            }
                        default:
                            {
                                return { type: "String" };
                            }
                    }
                },
                convert: function (jsonObj) {
                    this._allClass = [];
                    return this._genClassCode(jsonObj);
                }
            }
        },
    }
}
var jsontool = tools.jsonTool;