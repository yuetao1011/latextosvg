/**
 * @Copyright Copyright © 2019
 * @Createdon 2019-12-22
 * @Author Panda_YueTao
 * @Version 1.15
 * @Title 妈叔出品-LaTeX公式编辑器脚本
 */

var MyCommon = {
  fd: {
    OSSPath: "https://oursite-resourse.oss-cn-qingdao.aliyuncs.com",
  },
  fn: {
    /** 默认页面初始化方案 */
    init: function () {
      //初始化消息框
      msgbox = new Eject();
      //绑定点击遮罩隐藏侧边栏事件
      $(".screenmodal-mask").click(function () {
        var left = document.querySelector(".screenmodal");
        var mask = document.querySelector(".screenmodal-mask");
        left.classList.remove("screenmodal-open");
        left.classList.add("screenmodal");
        mask.style.display = "none";
      });
    },
    /** 获得当前时间戳 */
    getTimeStamp: function () {
      return new Date().getTime().toString();
    },
    /** 获取最小值到最大值之间的随机整数
     * @param {*} min -最小值
     * @param {*} max -最大值
     */
    getRandomNum: function (min, max) {
      let range = max - min;
      let rand = Math.random();
      return min + Math.round(rand * range);
    },
    /** 复制到剪切板
     * @param {*} cont -要复制到剪切板的内容
     */
    copyToClip: function (cont) {
      let ml = document.getElementsByTagName("math")[0].outerHTML;
      let aux = document.createElement("input");
      aux.setAttribute("value", cont);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
    /** 在光标所在位置插入内容
     * @param {*} myField -dom节点
     * @param {*} myValue -插入字符串值
     */
    insertAtCursor: function (myField, myValue) {
      //IE 浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        // sel.select();
      }
      //FireFox、Chrome等
      else if (myField.selectionStart || myField.selectionStart == "0") {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(startPos, myField.value.length);
        if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
      } else {
        myField.value += myValue;
        myField.focus();
      }
    },
    /** 获取光标位置
     * @param {*} ctrl -dom节点
     */
    getCursortPosition: function (ctrl) {
      var CaretPos = 0;
      // IE Support
      if (document.selection) {
        ctrl.focus(); // 获取焦点
        var Sel = document.selection.createRange(); // 创建选定区域
        Sel.moveStart("character", -ctrl.value.length); // 移动开始点到最左边位置
        CaretPos = Sel.text.length; // 获取当前选定区的文本内容长度
      }
      // Firefox support (非ie)
      else if (ctrl.selectionStart || ctrl.selectionStart == "0") {
        CaretPos = ctrl.selectionStart; // 获取选定区的开始点
      }
      return CaretPos;
    },
    /** 设置光标位置
     * @param {*} ctrl -dom节点
     * @param {*} pos -定位位置
     */
    setCaretPosition: function (ctrl, pos) {
      if (ctrl.setSelectionRange) {
        //非ie
        ctrl.focus(); // 获取焦点
        ctrl.setSelectionRange(pos, pos); // 设置选定区的开始和结束点
      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange(); // 创建选定区
        range.collapse(true); // 设置为折叠,即光标起点和结束点重叠在一起
        range.moveEnd("character", pos); // 移动结束点
        range.moveStart("character", pos); // 移动开始点
        range.select(); // 选定当前区域
      }
    },
    /** 删除光标圈选内容并返回圈选值 */
    removeSelection: function () {
      if (window.getSelection) {
        let selecter = window.getSelection().toString();
        if (selecter != null && selecter.trim() != "") {
          document.execCommand("cut");
          return selecter;
        } else {
          return "";
        }
      } else if (document.selection) {
        let selecter = document.selection.createRange().text;
        if (selecter != null && selecter.trim() != "") {
          document.execCommand("cut");
          return selecter;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    /** 判断客户端是否是PC端（否则为移动端） */
    isPC: function () {
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); //"Macintosh"
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    /** 判断客户端是否是Mac */
    isMac: function () {
      var userAgentInfo = navigator.userAgent;
      var Agent = "Macintosh";
      var flag = false;
      if (userAgentInfo.indexOf(Agent) > 0) {
        flag = true;
        return flag;
      }
      return flag;
    },
    /** 切换元素可视状态
     * @param {*} el -元素
     */
    visibleToggle: function (el) {
      let temp = document.getElementById(el);
      if (temp.style.visibility == "visible") {
        temp.style.visibility = "hidden";
      } else {
        temp.style.visibility = "visible";
      }
    },
    /** 指定元素可视状态为可见
     * @param {*} el -指定元素id
     */
    visibleShow: function (el) {
      let temp = document.getElementById(el);
      temp.style.visibility = "visible";
    },
    /** 指定元素可视状态为隐藏
     * @param {*} el -指定元素id
     */
    visibleHide: function (el) {
      let temp = document.getElementById(el);
      temp.style.visibility = "hidden";
    },
    /** 显示侧边栏 */
    screenModalShow: function () {
      var left = document.querySelector(".screenmodal");
      var mask = document.querySelector(".screenmodal-mask");
      left.classList.add("screenmodal-open");
      mask.style.display = "block";
    },
  },
};

/** 弹出框封装 */
function Eject() {
  var _this = this;
  // 全屏遮罩背景
  var qback = $('<div class="qback"></div>');
  // alert提示窗
  _this.Ealert = function (obj) {
    if (typeof obj.type == "undefined") {
      obj.type = "info";
    }
    if (typeof obj.title == "undefined") {
      obj.title = "提示";
    }
    if (typeof obj.message == "undefined") {
      obj.message = "是否要做些什么？";
    }
    if (typeof obj.okbtntext == "undefined") {
      obj.okbtntext = "确定";
    }
    var alertIcon = "";
    switch (obj.type) {
      case "success":
        alertIcon = "<span style='color:#28a745;font-size:25px;'><i class='fa fa-check-circle'></i></span>";
        break;
      case "danger":
        alertIcon = "<span style='color:#dc3545;font-size:25px;'><i class='fa fa-times-circle'></i></span>";
        break;
      case "warning":
        alertIcon = "<span style='color:#ffc107;font-size:25px;'><i class='fa fa-exclamation-circle'></i></span>";
        break;
      case "info":
        alertIcon = "<span style='color:#17a2b8;font-size:25px;'><i class='fa fa-info-circle'></i></span>";
        break;
      default:
        alertIcon = obj.type;
        break;
    }
    var alertBox = $('<div class="alertBox"></div>');
    var alertHead = $('<div class="alertHead">' + alertIcon + obj.title + "</div>");
    var alertMes = $('<div class="alertMes">' + obj.message + "</div>");
    var alertBtn = $('<span class="alertBtn">' + obj.okbtntext + "</span>").on("click", function () {
      qback.remove();
      alertBox.remove();
    });
    alertBox.append(alertHead);
    alertBox.append(alertMes);
    alertBox.append(alertBtn);
    qback.append(alertBox);
    $("body").append(qback);
    alertBox.css({ marginTop: -alertBox.outerHeight() / 2 + "px" });
  };
  // confirm弹窗
  (_this.Econfirm = function (obj) {
    if (typeof obj.type == "undefined") {
      obj.type = "info";
    }
    if (typeof obj.title == "undefined") {
      obj.title = "提示";
    }
    if (typeof obj.message == "undefined") {
      obj.message = "是否要做些什么？";
    }
    if (typeof obj.okbtntext == "undefined") {
      obj.okbtntext = "确认";
    }
    if (typeof obj.cancelbtntext == "undefined") {
      obj.cancelbtntext = "取消";
    }
    if (typeof obj.define == "undefined") {
      obj.define = function () {
        return true;
      };
    }
    if (typeof obj.cancel == "undefined") {
      obj.cancel = function () {
        return false;
      };
    }
    var confirmBox = $('<div class="alertBox"></div>');
    var confirmIcon = "";
    switch (obj.type) {
      case "success":
        confirmIcon = "<span style='color:#28a745;font-size:25px;'><i class='fa fa-check-circle'></i></span>";
        break;
      case "danger":
        confirmIcon = "<span style='color:#dc3545;font-size:25px;'><i class='fa fa-times-circle'></i></span>";
        break;
      case "warning":
        confirmIcon = "<span style='color:#ffc107;font-size:25px;'><i class='fa fa-exclamation-circle'></i></span>";
        break;
      case "info":
        confirmIcon = "<span style='color:#17a2b8;font-size:25px;'><i class='fa fa-info-circle'></i></span>";
        break;
      case "question":
        confirmIcon = "<span style='color:#6c757d;font-size:25px;'><i class='fa fa-question-circle'></i></span>";
        break;
      default:
        confirmIcon = obj.type;
        break;
    }
    var confirmHead = $('<div class="alertHead">' + confirmIcon + obj.title + "</div>");
    var confirmMes = $('<div class="alertMes">' + obj.message + "</div>");
    var confirmBtn = $('<button type="button" class="btn btn-primary ConBtn">' + obj.okbtntext + "</button>").on("click", function () {
      qback.remove();
      confirmBox.remove();
      setTimeout(function () {
        obj.define();
      }, 100);
    });
    var confirmcancel = $('<button type="button" class="btn btn-light cancel">' + obj.cancelbtntext + "</button>").on("click", function () {
      qback.remove();
      confirmBox.remove();
      setTimeout(function () {
        obj.cancel();
      }, 100);
    });
    confirmBox.append(confirmHead);
    confirmBox.append(confirmMes);
    confirmBox.append(confirmBtn);
    confirmBox.append(confirmcancel);
    qback.append(confirmBox);
    $("body").append(qback);
    confirmBox.css({ marginTop: -confirmBox.outerHeight() / 2 + "px" });
  }),
    (_this.Etoast = function (obj) {
      if (typeof obj.type == "undefined") {
        obj.type = "info";
      }
      if (typeof obj.message == "undefined") {
        obj.message = "提示些什么";
      }
      if (typeof obj.time == "undefined") {
        obj.time = 2;
      }
      let ico = "";
      switch (obj.type) {
        case "success":
          ico = "<i class='fa fa-check-circle'></i>";
          break;
        case "danger":
          ico = "<i class='fa fa-times-circle'></i>";
          break;
        case "warning":
          ico = "<i class='fa fa-exclamation-circle'></i>";
          break;
        case "info":
          ico = "<i class='fa fa-info-circle'></i>";
          break;
        default:
          ico = obj.type;
          break;
      }
      var timer = null;
      var ToastBox = $('<div class="ToastBox ToastBox-' + obj.type + '">' + ico + obj.message + "</div>");
      qback.append(ToastBox);
      $("body").append(qback);
      ToastBox.css({ marginTop: -ToastBox.outerHeight() / 2 + "px" });
      clearInterval(timer);
      timer = setInterval(function () {
        obj.time--;
        if (obj.time <= 0) {
          clearInterval(timer);
          qback.remove();
          ToastBox.remove();
        }
      }, 1000);
    });
}

/** 阵列选择封装 */
var PandaMatrix = {
  /** 初始化阵列选择器
   * @param {*} obj -input:阵列容器元素;maxRow:最大行数;maxCol:最大列数;output_row:显示当前行数元素;output_col:显示当前列元素;callback:点击某阵列单元格回调函数
   */
  init: (obj) => {
    let input = typeof obj.input != "undefined" ? obj.input : document.createElement("div");
    let maxRow = typeof obj.maxRow != "undefined" ? obj.maxRow : 10;
    let maxCol = typeof obj.maxCol != "undefined" ? obj.maxCol : 10;
    let output_row = typeof obj.output_row != "undefined" ? obj.output_row : document.createElement("span");
    let output_col = typeof obj.output_col != "undefined" ? obj.output_col : document.createElement("span");
    let color = typeof obj.bgcolor != "undefined" ? obj.bgcolor : "orange";
    let callback =
      typeof obj.callback != "undefined"
        ? obj.callback
        : function (x, y) {
            return false;
          };
    for (let m = 0; m < maxRow; m++) {
      let row = document.createElement("div");
      input.appendChild(row);
      for (let n = 0; n < maxCol; n++) {
        let wrap = document.createElement("div");
        let point = document.createElement("div");
        point.style.width = "1rem";
        point.style.height = "1rem";
        point.style.border = "1px solid rgba(0,0,0,0.05)";
        point.style.display = "inline-block";
        point.style.margin = "0";
        point.style.padding = "0.1rem";
        point.id = ("matrix" + (m + 1) + "_" + (n + 1)).toString();
        point.onmouseover = function () {
          output_row.innerHTML = m + 1;
          output_col.innerHTML = n + 1;
          for (let x = 1; x <= m + 1; x++) {
            for (y = 1; y <= n + 1; y++) {
              let id = ("matrix" + x + "_" + y).toString();
              let el = document.getElementById(id);
              el.style.backgroundColor = color;
              el.style.border = "1px solid white";
            }
          }
        };
        point.onmouseout = function () {
          output_row.innerHTML = m + 1;
          output_col.innerHTML = n + 1;
          for (let x = 1; x <= m + 1; x++) {
            for (y = 1; y <= n + 1; y++) {
              let id = ("matrix" + x + "_" + y).toString();
              let el = document.getElementById(id);
              el.style.backgroundColor = "white";
              el.style.border = "1px solid rgba(0,0,0,0.05)";
            }
          }
        };
        point.onclick = function () {
          callback(m + 1, n + 1);
        };
        row.appendChild(point);
      }
    }
  },
};
