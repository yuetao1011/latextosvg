/**
 * @Copyright Copyright © 2019
 * @Createdon 2019-12-22
 * @Author Panda_YueTao
 * @Version 1.15
 * @Title 妈叔出品-LaTeX公式编辑器脚本
 */

$(function () {
  MyFormula.fn.render(); //渲染empty

  MyFormula.fn.init_toolbar(); //渲染工具栏

  // MyFormula.fn.init_setting(); //初始化设置框

  MyFormula.fn.scrollForMAC(); //初始化输出框对苹果电脑的优化

  MyFormula.fn.makeDir(); //制作帮助文档的目录

  MyCommon.fn.init(); //公共组件初始化

  //#region 事件绑定

  /* 帮助按钮 */
  $("#" + MyFormula.fd.helpbtn).click(function () {
    let readme=document.querySelector(".readme");
    let setting=document.querySelector(".setting");
    readme.style.display="block";
    setting.style.display="none";
    MyCommon.fn.screenModalShow();
  });
  /* 设置按钮 */
  $("#" + MyFormula.fd.settingbtn).click(function () {
    
    let readme=document.querySelector(".readme");
    let setting=document.querySelector(".setting");
    readme.style.display="none";
    setting.style.display="block";
    MyCommon.fn.screenModalShow();
  });
  /** 输入框input事件重新渲染 */
  $("#" + MyFormula.fd.input).on("input", function () {
    MyFormula.fn.render();
  });
  /** 输入框获得焦点重新渲染 */
  $("#" + MyFormula.fd.input).focus(function () {
    MyFormula.fn.render();
  });
  /** 设置加载模块事件 */
  $(".form-check-input").click(function () {
    // MyFormula.fn.saveMathjaxSetting();
  });
  /** 快捷颜色按钮 */
  $("#" + MyFormula.fd.setcolorbtn).click(function () {
    if (!MyFormula.fd.controlbarRenderFlag[0]) {
      let wrap = document.getElementById(MyFormula.fd.setcolorwrap);
      MyFormula.fn.init_controlbar(wrap, "color");
      MyFormula.fd.controlbarRenderFlag[0] = true;
    }
  });
  /** 快捷字体按钮 */
  $("#" + MyFormula.fd.setfontbtn).click(function () {
    if (!MyFormula.fd.controlbarRenderFlag[1]) {
      let wrap = document.getElementById(MyFormula.fd.setfontwrap);
      MyFormula.fn.init_controlbar(wrap, "fontfamily");
      MyFormula.fd.controlbarRenderFlag[1] = true;
    }
  });
  /** 快捷字号按钮 */
  $("#" + MyFormula.fd.setfontsizebtn).click(function () {
    if (!MyFormula.fd.controlbarRenderFlag[2]) {
      let wrap = document.getElementById(MyFormula.fd.setfontsizewrap);
      MyFormula.fn.init_controlbar(wrap, "fontsize");
      MyFormula.fd.controlbarRenderFlag[2] = true;
    }
  });
  /** 环境按钮1 */
  $("#" + MyFormula.fd.clearbtn).click(function (event) {
    MyFormula.fn.insertEnvironment("equation", null);
    event.stopPropagation();
    event.preventDefault();
  });
  /** 环境按钮2 */
  $("#" + MyFormula.fd.eqnarraybtn).click(function (event) {
    MyFormula.fn.insertEnvironment("eqnarray", "");
    event.stopPropagation();
    event.preventDefault();
  });
  /** 环境按钮3 */
  $("#" + MyFormula.fd.alignbtn).click(function (event) {
    MyFormula.fn.insertEnvironment("align", "");
    event.stopPropagation();
    event.preventDefault();
  });
  /** 环境按钮4 */
  $("#" + MyFormula.fd.arraybtn).click(function (event) {
    MyFormula.fn.insertEnvironment("array", "{c}");
    event.stopPropagation();
    event.preventDefault();
  });
  /** 下载SVG按钮 */
  $("#" + MyFormula.fd.svgbtn).click(function () {
    MyFormula.fn.action(
      function () {
        MyFormula.fn.downloadSVG();
      },
      "已下载至默认文件夹",
      "下载失败"
    );
  });
  /** 下载PNG按钮 */
  $("#" + MyFormula.fd.pngbtn).click(function () {
    MyFormula.fn.action(
      function () {
        MyFormula.fn.downloadPNG();
      },
      "已下载至默认文件夹",
      "下载失败"
    );
  });
  /** 复制ML源码按钮 */
  $("#" + MyFormula.fd.copyMLbtn).click(function () {
    MyFormula.fn.action(
      function () {
        MyFormula.fn.copyMLToClip();
      },
      "已复制到剪切板",
      "复制失败"
    );
  });
  /** 复制svg源码按钮  */
  $("#" + MyFormula.fd.copySVGbtn).click(function () {
    MyFormula.fn.action(
      function () {
        MyFormula.fn.copySVGToClip();
      },
      "已复制到剪切板",
      "复制失败"
    );
  });
  /** 微信公众号链接点击 */
  $("#" + MyFormula.fd.wechatlink).click(function () {
    MyCommon.fn.visibleToggle(MyFormula.fd.wechatimg);
  });
  /** 微信公众号链接失去焦点 */
  $("#" + MyFormula.fd.wechatlink).blur(function () {
    if (MyFormula.fd.wechatFlag) {
      $("#" + MyFormula.fd.wechatlink).focus();
    } else {
      MyCommon.fn.visibleHide(MyFormula.fd.wechatimg);
    }
  });
  /** 微信公众号二维码鼠标移入 */
  $("#" + MyFormula.fd.wechatimg).mouseenter(function () {
    MyFormula.fd.wechatFlag = true;
  });
  /** 微信公众号二维码鼠标移出 */
  $("#" + MyFormula.fd.wechatimg).mouseleave(function () {
    MyFormula.fd.wechatFlag = false;
  });
  //#endregion
});
/** MathJax核心库配置对象(默认) */
window.MathJax = {
  options: {
    renderActions: {
      addMenu: [0, "", ""],
    },
  },
  loader: {
    load: ["[tex]/color", "[tex]/require"],
  },
  tex: {
    packages: {
      "[+]": ["color"],
    },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
};
/** MyFormula对象 */
var MyFormula = {
  fd: {
    //#region 页面元素id
    helpbtn: "btn_help", //帮助button
    settingbtn:"btn_setting",//设置button
    toolbar: "wrap_toolbar", //自定义工具栏
    input: "txta_input", //用于接收latex表达式的textarea
    setcolorwrap: "wrap_color", //用于容纳快捷输入颜色命令的容器
    setcolorbtn: "btn_color", //用于快捷输入颜色命令的button
    setfontwrap: "wrap_fontfamily", //用于容纳快捷输入字体命令的容器
    setfontbtn: "btn_fontfamily", //用于快捷输入字体命令的button
    setfontsizewrap: "wrap_fontsize", //用于容纳快捷输入字号命令的容器
    setfontsizebtn: "btn_fontsize", //用于快捷输入字号命令的button
    clearbtn: "btn_equation", //环境button1
    eqnarraybtn: "btn_eqnarray", //环境button2
    alignbtn: "btn_align", //环境button3
    arraybtn: "btn_array", //环境button4
    output: "wrap_output", //用于输出mathjax的div
    svgbtn: "btn_svg", //用于下载svg文件的button
    pngbtn: "btn_png", //用于下载png的button
    copyMLbtn: "btn_mathml", //用于将MathML代码复制到剪切板的button
    copySVGbtn: "btn_svg_copy", //用于将svg源码复制到剪切板的button
    modal: "modal_matrix", //用于选择矩阵参数的模态框
    modalrow: "modal_row", //用户输入矩阵行数接收容器
    modalcol: "modal_col", //用户输入矩阵列数接收容器
    modalenter: "btn_modal_enter", //用户提交矩阵参数并输入
    wechatlink: "a_wechat", //微信公众号呼出链接
    wechatimg: "eqcode_wechat", //微信公众号二维码图像容器
    //#endregion
    //#region 变量
    svgSource: "", //供下载的svg元素（已调整过宽高）
    empty: MyCommon.fd.OSSPath + "/formula-images/empty.png", //占空位的图像路径
    namePrefix: "MommyTalk", //下载文件前缀
    removedOptions: {}, //默认环境暂存数组
    menuShowFlag: [], //存储菜单收起延迟定时器的容器组
    menuShowFlag_plus: [], //存储菜单显示延迟定时器的容器组
    wechatFlag: false, //存储公众号图标是否被悬浮的标志
    imgRenderFlag: [], //存储二级菜单是否渲染完毕的标志组
    controlbarRenderFlag: [], //存储控制按钮菜单是否渲染完毕的标志组
    key_loadmod: "loadmod", //存储客户端配置如何加载模块的键值名
    key_inputtemp: "input_temp", //存储客户端由于重新加载而需要暂存的输入框字符
    tmr_loadscript: "", //重新加载后即时渲染轮询计时器
    //#endregion
  },
  fn: {
    /** 制作目录
     * 拿到的源html做处理：1.查找替换对齐，l,c,r 2.目录加id toc-doc 3.删掉一切包裹容器，剩下<h1>... 4.h1改成h2 5.最后的文献链接加class br
     */
    makeDir: function () {
      let toc = document.getElementById("toc-doc");
      toc.innerHTML = "";
      let padding = [1, 3, 5, 7, 9];
      $(".readme")
        .find("h3,h4,h5")
        .each(function (index) {
          let nm = document.createElement("a");
          nm.name = "d" + index;
          $(nm).insertBefore($(this));
          let headerText = $(this).text();
          let tagName = $(this)[0].tagName.toLowerCase();
          let tagIndex = parseInt(tagName.charAt(1)) - 1;
          let style = " style='padding-left:" + padding[tagIndex] + "rem;color:#3c72ca;display:block;'>";
          $("#toc-doc").append($("<a href='#d" + index + "'" + style + headerText + "</a>"));
        });
    },
    /** 初始化配置框 */
    init_setting: function () {
      // 把临时存储在客户端的输入框内容放进输入框，并销毁此键
      // let key = MyFormula.fd.key_inputtemp;
      // if (localStorage.hasOwnProperty(key)) {
      //   if (localStorage.getItem(key) != "") {
      //     document.getElementById(MyFormula.fd.input).value = localStorage.getItem(key);
      //     localStorage.removeItem(key);
      //   }
      // }
      // //初始化配置菜单选项
      // let menu = document.getElementById("menu-setting");
      // let checks = menu.getElementsByTagName("input");
      // let len = checks.length;
      // if (!window.localStorage) {
      //   for (let i = 0; i < len; i++) {
      //     checks[i].disabled = true;
      //   }
      //   let btn = document.getElementById("btn_reload");
      //   btn.innerHTML = "您的浏览器不支持动态加载模块";
      //   btn.disabled = true;
      // } else {
      //   let arr = this.loadMathjaxSetting();
      //   let arrlen = arr.length;
      //   for (let m = 0; m < len; m++) {
      //     for (let n = 0; n < arrlen; n++) {
      //       if (checks[m].value == arr[n]) {
      //         checks[m].checked = true;
      //       }
      //     }
      //   }
      //   //初始化MathJax核心库
      //   MyFormula.fn.init_mathjaxCore(arr);
      // }
    },
    /** 写入mathjax加载配置 */
    saveMathjaxSetting: function () {
      // let menu = document.getElementById("menu-setting");
      // let checks = menu.getElementsByTagName("input");
      // let len = checks.length;
      // let arr = [];
      // for (let i = 0; i < len; i++) {
      //   if (checks[i].checked == true) {
      //     arr.push(checks[i].value);
      //   }
      // }
      // let key = MyFormula.fd.key_loadmod;
      // localStorage.removeItem(key);
      // localStorage.setItem(key, arr);
    },
    /** 读取mathjax配置 */
    loadMathjaxSetting: function () {
      // let key = MyFormula.fd.key_loadmod;
      // // 判断是否存在 键
      // if (localStorage.hasOwnProperty(key)) {
      //   //判断是否存在键，但是不存在值
      //   if (localStorage.getItem(key) != "") {
      //     return localStorage.getItem(key).split(",");
      //   } else {
      //     return [];
      //   }
      // } else {
      //   return [];
      // }
    },
    /** 初始化MathJax核心库
     * @param {*} params -参数数组
     */
    init_mathjaxCore: function (params) {
      if (params) {
        let len = params.length;
        for (let i = 0; i < len; i++) {
          if (params[i] == "ams") {
            window.MathJax.tex.tags = "ams";
          } else {
            window.MathJax.loader.load.push("[tex]/" + params[i]);
            window.MathJax.tex.packages["[+]"].push(params[i]);
          }
        }
      }
      console.log(window.MathJax);
      let script = document.createElement("script");
      script.async = "async";
      script.charset = "utf-8";
      script.src = MyCommon.fd.OSSPath + "/formula-script/MathJax-master/es5/tex-svg.js";
      let bd = document.getElementsByTagName("body")[0];
      bd.appendChild(script);
      var count = 0;
      MyFormula.fd.tmr_loadscript = setInterval(function () {
        try {
          MyFormula.fn.render();
        } catch (err) {
          console.log("正在重新加载核心库…");
        } finally {
          count += 1;
          if (count > 50) {
            window.clearInterval(MyFormula.fd.tmr_loadscript);
          }
        }
      }, 100);
    },
    /** 渲染工具栏 */
    init_toolbar: function () {
      MyFormula.fn.init_toolbar1(MyFormula.fd.toolbar);
    },
    /** 渲染工具栏一级菜单
     * @param {*} toolbar -一级菜单容器id
     */
    init_toolbar1: function (toolbar) {
      //读取参数
      let tool = document.getElementById(toolbar);
      tool.innerHTML = "";
      let path = MyFormula.map.toolbar1.path;
      let cls = MyFormula.map.toolbar1.cont;
      let len = cls.length;
      let itemcount = MyFormula.map.toolbar1.itemperrow;
      //构造栅格容器
      let ctnr = document.createElement("div");
      ctnr.className = "container-fluid";
      ctnr.style.padding = "0";
      //构造行
      let row = document.createElement("div");
      row.className = "row";
      row.style.textAlign = "center";
      tool.appendChild(ctnr);
      ctnr.appendChild(row);
      let rowcount = Math.ceil(len / itemcount);
      for (let i = 0; i < rowcount; i++) {
        // 创建一级菜单容器
        let group = document.createElement("div");
        group.className = "col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6";
        group.style.padding = "0";
        row.appendChild(group);
        for (let m = i * itemcount; m < (i + 1) * itemcount; m++) {
          // 列表中不足一组的部分不予渲染
          if (typeof cls[m] == "undefined") {
            return;
          }
          //创建一级菜单容器
          let dropdown = document.createElement("div");
          dropdown.style.display = "inline-block";
          dropdown.className = "dropdown";
          dropdown.style.maxWidth = 100 / itemcount - 3 + "%";
          dropdown.style.margin = "0.4rem";
          // 创建虚拟一级菜单按钮
          let btn = document.createElement("button");
          btn.className = "btn btn-light";
          btn.type = "button";
          btn.style.padding = "0.5rem";
          // 创建虚拟一级菜单按钮图像
          let img = document.createElement("img");
          img.src = path + cls[m].name;
          // 创建虚拟一级菜单按钮文字段落
          let p = document.createElement("p");
          p.innerHTML = cls[m].descript;
          p.style.fontSize = "0.7rem";
          p.style.margin = "0 auto 0.2rem auto";
          let arrow = document.createElement("div");
          arrow.style.margin = "-0.3rem auto -0.4rem auto";
          arrow.style.fontSize = "1rem";
          arrow.innerHTML = "<i class='fa fa-caret-down'></i>";
          group.appendChild(dropdown);
          dropdown.appendChild(btn);
          btn.appendChild(img);
          btn.appendChild(p);
          p.appendChild(arrow);
          // 创建虚拟下拉菜单
          let menu = document.createElement("div");
          menu.className = "dropdown-menu";
          menu.style.backgroundColor = "rgba(255,255,255,0.95)";
          menu.style.boxShadow = "4px 4px 4px 1px rgba(0,0,0,0.2)";
          menu.style.marginTop = "-1px";
          menu.style.padding = "1rem";
          //菜单宽度为组容器宽度减去padding
          menu.style.width = group.clientWidth - 30 + "px";
          //菜单左偏移为组容器宽度/每组元素个数*偏移元素个数
          menu.style.left = "-" + ((group.clientWidth - 30) / itemcount) * (m - i * itemcount) + "px";
          //菜单参数绑定到重绘事件
          $(window).resize(function () {
            menu.style.width = group.clientWidth - 30 + "px";
            menu.style.left = "-" + ((group.clientWidth - 30) / itemcount) * (m - i * itemcount) + "px";
          });
          //绑定悬浮事件(按键事件)
          dropdown.onmouseenter = function () {
            if (!MyFormula.fd.imgRenderFlag[m]) {
              MyFormula.fn.init_toolbar2(cls[m].simple, menu); //渲染二级菜单
              MyFormula.fd.imgRenderFlag[m] = true;
            }
            btn.focus();
            //=========特事特办：解决控制栏菜单不点击就不收回的问题，在这里先用代码强行收回
            let arr_temp = ["wrap_color", "wrap_fontfamily", "wrap_fontsize"];
            let arr_temp_len = arr_temp.length;
            for (let i = 0; i < arr_temp_len; i++) {
              if ($("#" + arr_temp[i]).hasClass("show")) {
                $("#" + arr_temp[i]).removeClass("show");
              }
            }
            //=======================================================================
            MyFormula.fd.menuShowFlag_plus[m] = setTimeout(function () {
              $(menu).slideDown(0);
            }, 200);
            clearTimeout(MyFormula.fd.menuShowFlag[m]);
          };
          dropdown.onmouseleave = function () {
            MyFormula.fd.menuShowFlag[m] = setTimeout(function () {
              $(menu).slideUp(0);
            }, 200);
            clearTimeout(MyFormula.fd.menuShowFlag_plus[m]);
          };
          dropdown.appendChild(menu);
        }
      }
    },
    /** 渲染工具栏二级菜单
     * @param {*} father -父元素（对应一级菜单）的简称
     * @param {*} menu -二级菜单元素（已设置过宽度）
     */
    init_toolbar2: function (father, menu) {
      //参数
      let path = MyFormula.map.toolbar2.path;
      let cls_father = MyFormula.map.toolbar2.cont[father];
      let cls = MyFormula.map.toolbar2.cont[father].cont;
      let len = cls.length;
      //创建二级菜单图标
      for (let i = 0; i < len; i++) {
        if (cls[i].simple == "divider") {
          //分割线
          let divider1 = document.createElement("div");
          let divider2 = document.createElement("div");
          divider1.className = "dropdown-divider";
          divider2.className = "dropdown-divider";
          divider2.style.marginBottom = "0.6rem";
          let p = document.createElement("p");
          p.innerHTML = cls[i].name;
          p.style.margin = "0.5rem auto 0 1rem";
          menu.appendChild(divider1);
          menu.appendChild(p);
          menu.appendChild(divider2);
        } else {
          //正常图标
          // 创建图像容器
          let imgwrap = document.createElement("div");
          imgwrap.className = "btn btn-light";
          imgwrap.style.margin = "0.2rem";
          // 设置图像容器内填充
          if (cls[i].padding == "") {
            imgwrap.style.padding = cls_father.defaultpadding;
          } else {
            imgwrap.style.padding = cls[i].padding;
          }
          //创建图像
          let img = document.createElement("img");
          img.src = path + father + "/" + cls[i].name;
          // 设置图像尺寸
          if (cls[i].size == "") {
            img.style.width = cls_father.defaultsize + "rem";
          } else {
            img.style.width = cls[i].size + "rem";
          }
          img.oncontextmenu = () => {
            return false;
          };
          img.ondragstart = () => {
            return false;
          };
          // 如果是PC端
          if (MyCommon.fn.isPC()) {
            // 设置tooltip气泡内容(如果是PC端)
            let str = "<div style='text-align:left;'>";
            str += "<strong>";
            let temp = cls[i].latex;
            temp = temp.replace(/\r\n/g, "<br/>");
            temp = temp.replace(/ /g, "&nbsp;");
            str += temp;
            str += "</strong>";
            str += "<hr style='width: 100%; height: 1px; border: none; background-color: #987cb9;margin:4px auto 4px auto;'></hr>";
            if (cls[i].zh != "-" || cls[i].en != "-") {
              str += "<span style='font-size:smaller'>备注：</span>";
              str += "<div style='margin-left:0.6rem'>";
              if (cls[i].zh != "-") {
                str += cls[i].zh;
                str += "<br/>";
              }
              if (cls[i].en != "-") {
                str += cls[i].en;
              }
              str += "</div>";
            }
            str += "</div>";
            let show1 = document.createElement("div");
            show1.innerHTML = str;
            //offset第一个数代表top，第二个数代表left
            tippy(img, { content: str, placement: "right", allowHTML: true, offset: [10, 6], theme: "mythem", delay: [600, 0] });
          }
          // 绑定输入事件
          img.onclick = function () {
            let tex = cls[i].latex;
            let back = cls[i].cursor;
            let isMatrix = false;
            if (father == "matrix") {
              isMatrix = true;
            }
            let type = typeof cls[i].type != "undefined" ? cls[i].type : "all";
            MyFormula.fn.input(tex, back, isMatrix, type);
          };
          menu.appendChild(imgwrap);
          imgwrap.appendChild(img);
        }
      }
    },
    /** 渲染控制按钮菜单
     * @param {*} type -控制类型
     */
    init_controlbar: function (controlbar, type) {
      let path = MyFormula.map[type].path;
      let cls = MyFormula.map[type].cont;
      let len = cls.length;
      for (let i = 0; i < len; i++) {
        // 创建图像容器
        let imgwrap = document.createElement("div");
        imgwrap.className = "btn btn-light";
        imgwrap.style.margin = "0.2rem";
        imgwrap.style.padding = "0.2rem";
        // 创建图像
        let img = document.createElement("img");
        img.src = path + cls[i].name;
        // 设置图像尺寸
        img.width = "100%";
        // 绑定事件
        img.oncontextmenu = () => {
          return false;
        };
        img.ondragstart = () => {
          return false;
        };
        imgwrap.onclick = function () {
          let tex = cls[i].latex;
          let back = cls[i].cursor;
          let isMatrix = false;
          MyFormula.fn.input(tex, back, isMatrix);
        };
        imgwrap.appendChild(img);
        controlbar.appendChild(imgwrap);
      }
    },
    /** 工具栏插入内容
     * @param {*} tex -插入内容
     * @param {*} back -退格数
     * @param {*} isMatrix -是否是矩阵
     */
    input: function (tex, back, isMatrix, type) {
      if (!isMatrix) {
        let ins = MyCommon.fn.removeSelection(); //无论是否圈选都把圈选值存入内存
        let txta = document.getElementById(MyFormula.fd.input);
        MyCommon.fn.insertAtCursor(txta, tex);
        let getpos = MyCommon.fn.getCursortPosition(txta);
        let setpos = getpos - back;
        MyCommon.fn.setCaretPosition(txta, setpos);
        //TODO:判断浏览器，苹果浏览器没有圈选功能
        if (back != 0) {
          MyCommon.fn.insertAtCursor(txta, ins);
        }
        this.render();
      } else {
        this.showModal(type, tex);
      }
    },
    /** 插入默认环境
     * @param {*} el -环境名
     * @param {*} defaultopn -环境默认参数
     */
    insertEnvironment: function (el, defaultopn) {
      let text = this.getInput();
      let match = text.match(/^\s*\\begin\{([a-zA-Z0-9]*)\}(\{[a-zA-Z0-9]*\}|)\n?([\s\S]*?)\n?\\end\{([a-zA-Z0-9]*)\}\s*$/);
      if (match) {
        text = match[3];
        MyFormula.fd.removedOptions[match[1]] = match[2];
        if (match[1] == "eqnarray" || match[1] == "align") {
          text = text.replace(/\s*&\s*=\s*&\s*/g, " = ");
          text = text.replace(/\s*&\s*=\s*/g, " = ");
          text = text.replace(/\s*=\s*&\s*/g, " = ");
        }
      }
      if (el == "eqnarray") {
        text = text.replace(/\s*=\s*/g, " & = & ");
      } else if (el == "align") {
        text = text.replace(/\s*=\s*/g, " & = ");
      }
      if (defaultopn != null) text = "\\begin{" + el + "}" + (MyFormula.fd.removedOptions[el] || defaultopn) + "\n" + text + "\n\\end{" + el + "}";
      this.setInput(text);
      this.render();
    },
    /** 输出框对苹果电脑滚动条的优化 */
    scrollForMAC: function () {
      let el = document.getElementById(MyFormula.fd.output);
      if (MyCommon.fn.isMac()) {
        el.classList.add("scroll-formac");
      }
    },
    /** 渲染mathjax预览 */
    render: function () {
      let output = document.getElementById(MyFormula.fd.output);
      output.innerHTML = "";
      if (this.isInputNull()) {
        let empty = document.createElement("img");
        empty.src = MyFormula.fd.empty;
        empty.oncontextmenu = () => {
          return false;
        };
        empty.ondragstart = () => {
          return false;
        };
        output.appendChild(empty);
      } else {
        this.toMathjax();
        this.getVirtualEl();
      }
    },
    /** 输出操作动作
     * @param {*} fun -动作函数
     * @param {*} ms_succ -执行成功显示消息
     * @param {*} ms_er -执行失败显示消息
     */
    action: function (fun, ms_succ, ms_er) {
      if (this.isInputNull()) {
        msgbox.Etoast({
          type: "warning",
          message: "没有发现LaTeX表达式",
        });
      } else {
        try {
          fun();
          msgbox.Etoast({
            type: "success",
            message: ms_succ,
          });
        } catch (err) {
          msgbox.Etoast({
            type: "warning",
            message: ms_er,
          });
        }
      }
    },
    /** 下载svg */
    downloadSVG: function () {
      let xmlHeader = "<" + '?xml version="1.0" encoding="UTF-8" standalone="no" ?' + ">\n";
      let hiddenLink = document.createElement("a");
      if (hiddenLink.href) URL.revokeObjectURL(hiddenLink.href);
      let svgSourceCodeToDownload = xmlHeader + MyFormula.fd.svgSource.outerHTML;
      let blob = new Blob([svgSourceCodeToDownload], {
        type: "image/svg+xml",
      });
      hiddenLink.href = URL.createObjectURL(blob);
      hiddenLink.download = MyFormula.fd.namePrefix + MyCommon.fn.getTimeStamp();
      +MyCommon.fn.getRandomNum(1, 100).toString() + ".svg";
      hiddenLink.click();
    },
    /** 下载png */
    downloadPNG: function () {
      let svgXml = MyFormula.fd.svgSource.outerHTML;
      let image = new Image();
      image.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgXml)));
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = 3840;
        canvas.height = 2160;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, 3840, 2160);
        let hiddenLink = document.createElement("a");
        hiddenLink.href = canvas.toDataURL("image/png");
        hiddenLink.download = MyFormula.fd.namePrefix + MyCommon.fn.getTimeStamp();
        +MyCommon.fn.getRandomNum(1, 100).toString() + ".png";
        hiddenLink.click();
      };
    },
    /** ML代码复制到剪切板 */
    copyMLToClip: function () {
      let ml = document.getElementsByTagName("math")[0].outerHTML;
      MyCommon.fn.copyToClip(ml);
    },
    /** svg源码复制到剪切板 */
    copySVGToClip: function () {
      let svg = MyFormula.fd.svgSource.outerHTML;
      MyCommon.fn.copyToClip(svg);
    },
    /** 文本转Mathjax并填充页面元素 */
    toMathjax: function () {
      let input = this.getInput();
      let output = document.getElementById(MyFormula.fd.output);
      output.innerHTML = "";
      MathJax.texReset();
      let options = MathJax.getMetricsFor(output);
      options.display = true;
      MathJax.tex2svgPromise(input, options)
        .then(function (node) {
          output.innerHTML = "";
          output.appendChild(node);
        })
        .catch(function (err) {
          output.appendChild(document.createElement("pre")).appendChild(document.createTextNode(err.message));
        });
    },
    /** 文本转svg并填充虚拟元素 */
    getVirtualEl: function () {
      let input = this.getInput();
      let options = {};
      let node = MathJax.tex2svg(input, options);
      let elsvg = node.firstElementChild;
      elsvg.setAttribute("width", "1920px");
      elsvg.setAttribute("height", "1080px");
      elsvg.removeAttribute("style");
      elsvg.removeAttribute("focusable");
      elsvg.removeAttribute("role");
      MyFormula.fd.svgSource = elsvg;
    },
    /** 获取过滤过的输入表达式 */
    getInput: function () {
      let input = document.getElementById(MyFormula.fd.input).value.trim();
      return input;
    },
    /** 设置输入表达式框的值
     * @param {*} val -赋予输入框的值
     */
    setInput: function (val) {
      document.getElementById(MyFormula.fd.input).value = val;
    },
    /** 输入框是否为空 */
    isInputNull: function () {
      let val = this.getInput();
      return val == "" ? true : false;
    },
    /** 弹出询问行列模态框
     * @param {*} type -row:只有行;all:行列都有
     * @param {*} latex -latex表达式
     */
    showModal: function (type, latex) {
      let el_row = document.getElementById(MyFormula.fd.modalrow);
      let el_col = document.getElementById(MyFormula.fd.modalcol);
      let btn = document.getElementById(MyFormula.fd.modalenter);
      el_row.style.display = "block";
      el_col.style.display = "block";
      btn.onclick = function () {};
      switch (type) {
        case "row":
          el_col.style.display = "none";
          btn.onclick = function () {
            let str = MyFormula.fn.makeMatrix(el_row.value, 2, latex);
            MyFormula.fn.setInput(MyFormula.fn.getInput() + str);
            el_row.value = "";
            el_col.value = "";
            MyFormula.fn.render();
            $("#" + MyFormula.fd.modal).modal("hide");
          };
          $("#" + MyFormula.fd.modal).modal("show");
          break;
        case "all":
          btn.onclick = function () {
            let str = MyFormula.fn.makeMatrix(el_row.value, el_col.value, latex);
            MyFormula.fn.setInput(MyFormula.fn.getInput() + str);
            el_row.value = "";
            el_col.value = "";
            MyFormula.fn.render();
            $("#" + MyFormula.fd.modal).modal("hide");
          };
          $("#" + MyFormula.fd.modal).modal("show");
          break;
        default:
          break;
      }
    },
    /** 生成矩阵模板字符串
     * @param {*} row -行数
     * @param {*} col -列数（默认为2）
     * @param {*} latex -以“...”为分隔符的latex表达式
     * @returns {*} -生成的字符串
     */
    makeMatrix: function (row, col, latex) {
      let la = latex.split("…");
      let str1 = "";
      let str2 = "";
      for (let i = 0; i < col - 1; i++) {
        str1 += "  " + la[1];
      }
      for (let i = 0; i < row; i++) {
        if (i == row - 1) {
          str2 += str1 + "\n";
        } else {
          str2 += str1 + " \\\\" + "\n";
        }
      }
      return la[0] + "\n" + str2 + la[2];
    },
  },
  map: {
    toolbar1: {
      itemperrow: 5, //每组容纳的元素数
      path: MyCommon.fd.OSSPath + "/formula-images/toolbar1/",
      cont: [
        { simple: "symbol", name: "symbol.png", descript: "常用符号" },
        { simple: "greek", name: "greek.png", descript: "希腊字母" },
        { simple: "frac", name: "frac.png", descript: "分数微分" },
        { simple: "sqrt", name: "sqrt.png", descript: "根式角标" },
        { simple: "limit", name: "limit.png", descript: "极限对数" },
        { simple: "trig", name: "trig.png", descript: "三角函数" },
        { simple: "integral", name: "integral.png", descript: "积分运算" },
        { simple: "sum", name: "sum.png", descript: "大型运算" },
        { simple: "bracket", name: "bracket.png", descript: "括号取整" },
        { simple: "matrix", name: "matrix.png", descript: "数组矩阵" },
      ],
    },
    toolbar2: {
      path: MyCommon.fd.OSSPath + "/formula-images/toolbar2/",
      //size是number型；padding是string型
      cont: {
        symbol: {
          defaultsize: 1.6,
          defaultpadding: "0.1rem",
          cont: [
            { simple: "divider", name: "二元运算符 Binary operations", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "plus", name: "symbol_1_binary_plus.svg", latex: "+  ", cursor: 0, $bak: "", padding: "", size: "", zh: "加", en: "plus" },
            { simple: "minus", name: "symbol_2_binary_minus.svg", latex: "- ", cursor: 0, $bak: "", padding: "", size: "", zh: "减", en: "minus" },
            { simple: "times", name: "symbol_3_binary_times.svg", latex: "\\times ", cursor: 0, $bak: "", padding: "", size: "", zh: "乘", en: "is multiplied by" },
            { simple: "div", name: "symbol_4_binary_div.svg", latex: "\\div ", cursor: 0, $bak: "", padding: "", size: "", zh: "除", en: "is divided by" },
            { simple: "pm", name: "symbol_5_binary_pm.svg", latex: "\\pm ", cursor: 0, $bak: "", padding: "", size: "", zh: "加减", en: "plus or minus" },
            { simple: "mp", name: "symbol_6_binary_mp.svg", latex: "\\mp ", cursor: 0, $bak: "", padding: "", size: "", zh: "减加", en: "minus or plus" },
            { simple: "triangleleft", name: "symbol_7_binary_triangleleft.svg", latex: "\\triangleleft ", cursor: 0, $bak: "", padding: "", size: "", zh: "正规子群", en: "normal subgroup" },
            { simple: "triangleright", name: "symbol_8_binary_triangleright.svg", latex: "\\triangleright ", cursor: 0, $bak: "", padding: "", size: "", zh: "属于正规子群", en: "belong to regular subgroup" },
            { simple: "cdot", name: "symbol_9_binary_cdot.svg", latex: "\\cdot ", cursor: 0, $bak: "", padding: "", size: "", zh: "点", en: "dot" },
            { simple: "setminus", name: "symbol_10_binary_setminus.svg", latex: "\\setminus ", cursor: 0, $bak: "", padding: "", size: "", zh: "减号集", en: "setminus" },
            { simple: "star", name: "symbol_11_binary_star.svg", latex: "\\star ", cursor: 0, $bak: "", padding: "", size: "", zh: "星", en: "star" },
            { simple: "ast", name: "symbol_12_binary_ast.svg", latex: "\\ast ", cursor: 0, $bak: "", padding: "", size: "", zh: "星号", en: "star" },
            { simple: "cup", name: "symbol_13_binary_cup.svg", latex: "\\cup ", cursor: 0, $bak: "", padding: "", size: "", zh: "并集", en: "union" },
            { simple: "cap", name: "symbol_14_binary_cap.svg", latex: "\\cap ", cursor: 0, $bak: "", padding: "", size: "", zh: "交集", en: "intersection" },
            { simple: "sqcup", name: "symbol_15_binary_sqcup.svg", latex: "\\sqcup ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sqcap", name: "symbol_16_binary_sqcap.svg", latex: "\\sqcap ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "vee", name: "symbol_17_binary_vee.svg", latex: "\\vee ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "wedge", name: "symbol_18_binary_wedge.svg", latex: "\\wedge ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "circ", name: "symbol_19_binary_circ.svg", latex: "\\circ ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bullet", name: "symbol_20_binary_bullet.svg", latex: "\\bullet ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "oplus", name: "symbol_21_binary_oplus.svg", latex: "\\oplus ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ominus", name: "symbol_22_binary_ominus.svg", latex: "\\ominus ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "odot", name: "symbol_23_binary_odot.svg", latex: "\\odot ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "oslash", name: "symbol_24_binary_oslash.svg", latex: "\\oslash ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "otimes", name: "symbol_25_binary_otimes.svg", latex: "\\otimes ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bigcirc", name: "symbol_26_binary_bigcirc.svg", latex: "\\bigcirc ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "diamonda", name: "symbol_27_binary_diamonda.svg", latex: "\\diamond ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "uplus", name: "symbol_28_binary_uplus.svg", latex: "\\uplus ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bigtriangleup", name: "symbol_29_binary_bigtriangleup.svg", latex: "\\bigtriangleup ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bigtriangledown", name: "symbol_30_binary_bigtriangledown.svg", latex: "\\bigtriangledown ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "lhd", name: "symbol_31_binary_lhd.svg", latex: "\\lhd ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "rhd", name: "symbol_32_binary_rhd.svg", latex: "\\rhd ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "unlhd", name: "symbol_33_binary_unlhd.svg", latex: "\\unlhd ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "unrhd", name: "symbol_34_binary_unrhd.svg", latex: "\\unrhd ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "amalg", name: "symbol_35_binary_amalg.svg", latex: "\\amalg ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "wr", name: "symbol_36_binary_wr.svg", latex: "\\wr ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "dagger", name: "symbol_37_binary_dagger.svg", latex: "\\dagger ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ddagger", name: "symbol_38_binary_ddagger.svg", latex: "\\ddagger ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },

            { simple: "divider", name: "二元关系符 Binary relations", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "less", name: "symbol_39_relation_less.svg", latex: "< ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "more", name: "symbol_40_relation_more.svg", latex: "> ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "equal", name: "symbol_41_relation_equal.svg", latex: "= ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "le", name: "symbol_42_relation_le.svg", latex: "\\le ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ge", name: "symbol_43_relation_ge.svg", latex: "\\ge ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "equiv", name: "symbol_44_relation_equiv.svg", latex: "\\equiv ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ll", name: "symbol_45_relation_ll.svg", latex: "\\ll ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "gg", name: "symbol_46_relation_gg.svg", latex: "\\gg ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "doteq", name: "symbol_47_relation_doteq.svg", latex: "\\doteq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "prec", name: "symbol_48_relation_prec.svg", latex: "\\prec ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "succ", name: "symbol_49_relation_succ.svg", latex: "\\succ ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sim", name: "symbol_50_relation_sim.svg", latex: "\\sim ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "preceq", name: "symbol_51_relation_preceq.svg", latex: "\\preceq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "succeq", name: "symbol_52_relation_succeq.svg", latex: "\\succeq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "simeq", name: "symbol_53_relation_simeq.svg", latex: "\\simeq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "approx", name: "symbol_54_relation_approx.svg", latex: "\\approx ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "subset", name: "symbol_55_relation_subset.svg", latex: "\\subset ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "supset", name: "symbol_56_relation_supset.svg", latex: "\\supset ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "subseteq", name: "symbol_57_relation_subseteq.svg", latex: "\\subseteq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "supseteq", name: "symbol_58_relation_supseteq.svg", latex: "\\supseteq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sqsubset", name: "symbol_59_relation_sqsubset.svg", latex: "\\sqsubset ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sqsupset", name: "symbol_60_relation_sqsupset.svg", latex: "\\sqsupset ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sqsubseteq", name: "symbol_61_relation_sqsubseteq.svg", latex: "\\sqsubseteq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sqsupseteq", name: "symbol_62_relation_sqsupseteq.svg", latex: "\\sqsupseteq ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "cong", name: "symbol_63_relation_cong.svg", latex: "\\cong ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Join", name: "symbol_64_relation_Join.svg", latex: "\\Join ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bowtie", name: "symbol_65_relation_bowtie.svg", latex: "\\bowtie ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "propto", name: "symbol_66_relation_propto.svg", latex: "\\propto ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "in", name: "symbol_67_relation_in.svg", latex: "\\in ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ni", name: "symbol_68_relation_ni.svg", latex: "\\ni ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "vdash", name: "symbol_69_relation_vdash.svg", latex: "\\vdash ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "dashv", name: "symbol_70_relation_dashv.svg", latex: "\\dashv ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "models", name: "symbol_71_relation_models.svg", latex: "\\models ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "mid", name: "symbol_72_relation_mid.svg", latex: "\\mid ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "parallel", name: "symbol_73_relation_parallel.svg", latex: "\\parallel ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "perp", name: "symbol_74_relation_perp.svg", latex: "\\perp ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "smile", name: "symbol_75_relation_smile.svg", latex: "\\smile ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "frown", name: "symbol_76_relation_frown.svg", latex: "\\frown ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "asymp", name: "symbol_77_relation_asymp.svg", latex: "\\asymp ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "slash", name: "symbol_78_relation_slash.svg", latex: ": ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "notin", name: "symbol_79_relation_notin.svg", latex: "\\notin ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ne", name: "symbol_80_relation_ne.svg", latex: "\\ne ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },

            { simple: "divider", name: "箭头符号 Arrows", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "gets", name: "symbol_81_arrow_gets.svg", latex: "\\gets ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "to", name: "symbol_82_arrow_to.svg", latex: "\\to ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "longleftarrowa", name: "symbol_83_arrow_longleftarrowa.svg", latex: "\\longleftarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "longrightarrowa", name: "symbol_84_arrow_longrightarrowa.svg", latex: "\\longrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "uparrowa", name: "symbol_85_arrow_uparrowa.svg", latex: "\\uparrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "downarrowa", name: "symbol_86_arrow_downarrowa.svg", latex: "\\downarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "updownarrowa", name: "symbol_87_arrow_updownarrowa.svg", latex: "\\updownarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "leftrightarrowa", name: "symbol_88_arrow_leftrightarrowa.svg", latex: "\\leftrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Uparrowb", name: "symbol_89_arrow_Uparrowb.svg", latex: "\\Uparrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Downarrowb", name: "symbol_90_arrow_Downarrowb.svg", latex: "\\Downarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Updownarrowb", name: "symbol_91_arrow_Updownarrowb.svg", latex: "\\Updownarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "longleftrightarrowa", name: "symbol_92_arrow_longleftrightarrowa.svg", latex: "\\longleftrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Leftarrow", name: "symbol_93_arrow_Leftarrow.svg", latex: "\\Leftarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Longleftarrowb", name: "symbol_94_arrow_Longleftarrowb.svg", latex: "\\Longleftarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Rightarrow", name: "symbol_95_arrow_Rightarrow.svg", latex: "\\Rightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Longrightarrowb", name: "symbol_96_arrow_Longrightarrowb.svg", latex: "\\Longrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Leftrightarrowb", name: "symbol_97_arrow_Leftrightarrowb.svg", latex: "\\Leftrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Longleftrightarrowb", name: "symbol_98_arrow_Longleftrightarrowb.svg", latex: "\\Longleftrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "mapsto", name: "symbol_99_arrow_mapsto.svg", latex: "\\mapsto ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "longmapsto", name: "symbol_100_arrow_longmapsto.svg", latex: "\\longmapsto ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "nearrow", name: "symbol_101_arrow_nearrow.svg", latex: "\\nearrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "searrow", name: "symbol_102_arrow_searrow.svg", latex: "\\searrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "swarrow", name: "symbol_103_arrow_swarrow.svg", latex: "\\swarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "nwarrow", name: "symbol_104_arrow_nwarrow.svg", latex: "\\nwarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "hookleftarrow", name: "symbol_105_arrow_hookleftarrow.svg", latex: "\\hookleftarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "hookrightarrow", name: "symbol_106_arrow_hookrightarrow.svg", latex: "\\hookrightarrow ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "rightleftharpoons", name: "symbol_107_arrow_rightleftharpoons.svg", latex: "\\rightleftharpoons ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "iff", name: "symbol_108_arrow_iff.svg", latex: "\\iff ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "leftharpoonup", name: "symbol_109_arrow_leftharpoonup.svg", latex: "\\leftharpoonup ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "rightharpoonup", name: "symbol_110_arrow_rightharpoonup.svg", latex: "\\rightharpoonup ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "leftharpoondown", name: "symbol_111_arrow_leftharpoondown.svg", latex: "\\leftharpoondown ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "rightharpoondown", name: "symbol_112_arrow_rightharpoondown.svg", latex: "\\rightharpoondown ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },

            { simple: "divider", name: "其他符号 Others", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "because", name: "symbol_113_other_because.svg", latex: "\\because ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "therefore", name: "symbol_114_other_therefore.svg", latex: "\\therefore ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "dots", name: "symbol_115_other_dots.svg", latex: "\\dots ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "cdots", name: "symbol_116_other_cdots.svg", latex: "\\cdots ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "vdots", name: "symbol_117_other_vdots.svg", latex: "\\vdots ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "ddots", name: "symbol_118_other_ddots.svg", latex: "\\ddots ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "forall", name: "symbol_119_other_forall.svg", latex: "\\forall ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "exists", name: "symbol_120_other_exists.svg", latex: "\\exists ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "nexists", name: "symbol_121_other_nexists.svg", latex: "\\nexists ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Finv", name: "symbol_122_other_Finv.svg", latex: "\\Finv ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "neg", name: "symbol_123_other_neg.svg", latex: "\\neg ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "prime", name: "symbol_124_other_prime.svg", latex: "\\prime ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "emptyset", name: "symbol_125_other_emptyset.svg", latex: "\\emptyset ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "infty", name: "symbol_126_other_infty.svg", latex: "\\infty ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "nabla", name: "symbol_127_other_nabla.svg", latex: "\\nabla ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "triangle", name: "symbol_128_other_triangle.svg", latex: "\\triangle ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Box", name: "symbol_129_other_Box.svg", latex: "\\Box ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Diamondb", name: "symbol_130_other_Diamondb.svg", latex: "\\Diamond ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bot", name: "symbol_131_other_bot.svg", latex: "\\bot ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "top", name: "symbol_132_other_top.svg", latex: "\\top ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "angle", name: "symbol_133_other_angle.svg", latex: "\\angle ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "measuredangle", name: "symbol_134_other_measuredangle.svg", latex: "\\measuredangle ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sphericalangle", name: "symbol_135_other_sphericalangle.svg", latex: "\\sphericalangle ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "surd", name: "symbol_136_other_surd.svg", latex: "\\surd ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "diamondsuit", name: "symbol_137_other_diamondsuit.svg", latex: "\\diamondsuit ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "heartsuit", name: "symbol_138_other_heartsuit.svg", latex: "\\heartsuit ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "clubsuit", name: "symbol_139_other_clubsuit.svg", latex: "\\clubsuit ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "spadesuit", name: "symbol_140_other_spadesuit.svg", latex: "\\spadesuit ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "flat", name: "symbol_141_other_flat.svg", latex: "\\flat ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "natural", name: "symbol_142_other_natural.svg", latex: "\\natural ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "sharp", name: "symbol_143_other_sharp.svg", latex: "\\sharp ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
          ],
        },
        greek: {
          defaultsize: 1.7,
          defaultpadding: "0.2rem",
          cont: [
            { simple: "divider", name: "小写 Lowercase", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "alpha", name: "greek_1_lower_alpha.svg", latex: "\\alpha ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈælfə/", en: "alpha" },
            { simple: "beta", name: "greek_2_lower_beta.svg", latex: "\\beta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈbiːtə/, US: /ˈbeɪtə/", en: "beta" },
            { simple: "gamma", name: "greek_3_lower_gammaa.svg", latex: "\\gamma ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈɡæmə/", en: "gamma" },
            { simple: "delta", name: "greek_4_lower_deltaa.svg", latex: "\\delta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈdɛltə/", en: "delta" },
            { simple: "epsilon", name: "greek_5_lower_epsilon.svg", latex: "\\epsilon ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈɛpsɪlɒn/", en: "epsilon" },
            { simple: "varepsilon", name: "greek_6_lower_varepsilon.svg", latex: "\\varepsilon ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈɛpsɪlɒn/", en: "epsilon" },
            { simple: "zeta", name: "greek_7_lower_zeta.svg", latex: "\\zeta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈzeɪtə/", en: "zeta" },
            { simple: "eta", name: "greek_8_lower_eta.svg", latex: "\\eta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈeɪtə/", en: "eta" },
            { simple: "theta", name: "greek_9_lower_thetaa.svg", latex: "\\theta ", cursor: 0, $bak: "", padding: "", size: "", zh: " /ˈθiːtə/", en: "theta" },
            { simple: "vartheta", name: "greek_10_lower_vartheta.svg", latex: "\\vartheta ", cursor: 0, $bak: "", padding: "", size: "", zh: " /ˈθiːtə/", en: "theta" },
            { simple: "iota", name: "greek_11_lower_iota.svg", latex: "\\iota ", cursor: 0, $bak: "", padding: "", size: "", zh: " /aɪˈoʊtə/", en: "iota" },
            { simple: "kappa", name: "greek_12_lower_kappa.svg", latex: "\\kappa ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈkæpə/", en: "kappa" },
            { simple: "lambda", name: "greek_13_lower_lambdaa.svg", latex: "\\lambda ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈlæmdə/", en: "lambda" },
            { simple: "mu", name: "greek_14_lower_mu.svg", latex: "\\mu ", cursor: 0, $bak: "", padding: "", size: "", zh: "/mjuː/", en: "mu" },
            { simple: "nu", name: "greek_15_lower_nu.svg", latex: "\\nu ", cursor: 0, $bak: "", padding: "", size: "", zh: "/njuː/", en: "nu" },
            { simple: "xi", name: "greek_16_lower_xia.svg", latex: "\\xi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/zaɪ, ksaɪ/", en: "xi" },
            { simple: "o", name: "greek_17_lower_o.svg", latex: " o ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈɒmɪkrɒn/", en: "omicron" },
            { simple: "pi", name: "greek_18_lower_pia.svg", latex: "\\pi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/paɪ/", en: "pi" },
            { simple: "varpi", name: "greek_19_lower_varpi.svg", latex: "\\varpi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/paɪ/", en: "pi" },
            { simple: "rho", name: "greek_20_lower_rho.svg", latex: "\\rho ", cursor: 0, $bak: "", padding: "", size: "", zh: "/roʊ/", en: "rho" },
            { simple: "varrho", name: "greek_21_lower_varrho.svg", latex: "\\varrho ", cursor: 0, $bak: "", padding: "", size: "", zh: "/roʊ/", en: "rho" },
            { simple: "sigma", name: "greek_22_lower_sigmaa.svg", latex: "\\sigma ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈsɪɡmə/", en: "sigma" },
            { simple: "varsigma", name: "greek_23_lower_varsigma.svg", latex: "\\varsigma ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈsɪɡmə/", en: "sigma" },
            { simple: "tau", name: "greek_24_lower_tau.svg", latex: "\\tau ", cursor: 0, $bak: "", padding: "", size: "", zh: "/taʊ, tɔː/", en: "tau" },
            { simple: "upsilon", name: "greek_25_lower_upsilona.svg", latex: "\\upsilon ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈʌpsɪlɒn/", en: "upsilon" },
            { simple: "phi", name: "greek_26_lower_phia.svg", latex: "\\phi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/faɪ/", en: "phi" },
            { simple: "varphi", name: "greek_27_lower_varphi.svg", latex: "\\varphi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/faɪ/", en: "phi" },
            { simple: "chi", name: "greek_28_lower_chi.svg", latex: "\\chi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/kaɪ/", en: "chi" },
            { simple: "psi", name: "greek_29_lower_psia.svg", latex: "\\psi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/psaɪ/", en: "psi" },
            { simple: "omega", name: "greek_30_lower_omegaa.svg", latex: "\\omega ", cursor: 0, $bak: "", padding: "", size: "", zh: "/oʊˈmeɪɡə/", en: "omega" },

            { simple: "divider", name: "大写 Uppercase", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "Gamma", name: "greek_31_upper_Gammab.svg", latex: "\\Gamma ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈɡæmə/", en: "Gamma" },
            { simple: "Delta", name: "greek_32_upper_Deltab.svg", latex: "\\Delta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈdɛltə/", en: "Delta" },
            { simple: "Theta", name: "greek_33_upper_Thetab.svg", latex: "\\Theta ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈθiːtə/", en: "Theta" },
            { simple: "Lambda", name: "greek_34_upper_Lambdab.svg", latex: "\\Lambda ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈlæmdə/", en: "Lambda" },
            { simple: "Xi", name: "greek_35_upper_Xib.svg", latex: "\\Xi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/zaɪ, ksaɪ/", en: "Xi" },
            { simple: "Pi", name: "greek_36_upper_Pib.svg", latex: "\\Pi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/paɪ/", en: "Pi" },
            { simple: "Sigma", name: "greek_37_upper_Sigmab.svg", latex: "\\Sigma ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈsɪɡmə/", en: "Sigma" },
            { simple: "Upsilon", name: "greek_38_upper_Upsilonb.svg", latex: "\\Upsilon ", cursor: 0, $bak: "", padding: "", size: "", zh: "/ˈʌpsɪlɒn/", en: "Upsilon" },
            { simple: "Phi", name: "greek_39_upper_Phib.svg", latex: "\\Phi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/faɪ/", en: "Phi" },
            { simple: "Psi", name: "greek_40_upper_Psib.svg", latex: "\\Psi ", cursor: 0, $bak: "", padding: "", size: "", zh: "/psaɪ/", en: "Psi" },
            { simple: "Omega", name: "greek_41_upper_Omegab.svg", latex: "\\Omega ", cursor: 0, $bak: "", padding: "", size: "", zh: "/oʊˈmeɪɡə/", en: "Omega" },

            { simple: "divider", name: "其他 Others", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "hbar", name: "greek_42_other_hbar.svg", latex: "\\hbar ", cursor: 0, $bak: "", padding: "", size: "", zh: "h bar", en: "h bar" },
            { simple: "imath", name: "greek_43_other_imath.svg", latex: "\\imath ", cursor: 0, $bak: "", padding: "", size: "", zh: "数学i", en: "imath" },
            { simple: "jmath", name: "greek_44_other_jmath.svg", latex: "\\jmath ", cursor: 0, $bak: "", padding: "", size: "", zh: "数学j", en: "jmath" },
            { simple: "ell", name: "greek_45_other_ell.svg", latex: "\\ell ", cursor: 0, $bak: "", padding: "", size: "", zh: "数学l", en: "lmath" },
            { simple: "Re", name: "greek_46_other_Re.svg", latex: "\\Re ", cursor: 0, $bak: "", padding: "", size: "", zh: "实数", en: "Real Numbers" },
            { simple: "Im", name: "greek_47_other_Im.svg", latex: "\\Im ", cursor: 0, $bak: "", padding: "", size: "", zh: "虚数", en: "Pure Imaginary Numbers" },
            { simple: "aleph", name: "greek_48_other_aleph.svg", latex: "\\aleph ", cursor: 0, $bak: "", padding: "", size: "", zh: "阿列夫", en: "aleph" },
            { simple: "beth", name: "greek_49_other_beth.svg", latex: "\\beth ", cursor: 0, $bak: "", padding: "", size: "", zh: "希伯来符号", en: "beth" },
            { simple: "gimel", name: "greek_50_other_gimel.svg", latex: "\\gimel ", cursor: 0, $bak: "", padding: "", size: "", zh: "希伯来符号", en: "gimel" },
            { simple: "daleth", name: "greek_51_other_daleth.svg", latex: "\\daleth ", cursor: 0, $bak: "", padding: "", size: "", zh: "希伯来符号", en: "daleth" },
            { simple: "wp", name: "greek_52_other_wp.svg", latex: "\\wp ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "mho", name: "greek_53_other_mho.svg", latex: "\\mho ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "backepsilon", name: "greek_54_other_backepsilon.svg", latex: "\\backepsilon   ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "backepsilon" },
            { simple: "partial", name: "greek_55_other_partial.svg", latex: "\\partial ", cursor: 0, $bak: "", padding: "", size: "", zh: "偏导符号", en: "-" },
            { simple: "eth", name: "greek_56_other_eth.svg", latex: "\\eth ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "Bbbk", name: "greek_57_other_Bbbk.svg", latex: "\\Bbbk ", cursor: 0, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "complement", name: "greek_58_other_complement.svg", latex: "\\complement ", cursor: 0, $bak: "", padding: "", size: "1.4", zh: "补集", en: "complement" },
            { simple: "circledS", name: "greek_59_other_circleds.svg", latex: "\\circledS ", cursor: 0, $bak: "", padding: "0.1rem 0 0.2rem 0", size: "2.4", zh: "圈S", en: "circled S" },
            { simple: "S", name: "greek_60_other_S.svg", latex: "\\S ", cursor: 0, $bak: "", padding: "0.1rem 0 0.2rem 0", size: "2.5", zh: "章节符号", en: "sections" },
            { simple: "mathbb", name: "greek_61_other_mathbbABC.svg", latex: "\\mathbb{} ", cursor: 2, $bak: "", padding: "", size: "3", zh: "黑板报粗体", en: "Blackboard bold/scripts" },
            { simple: "mathfrak", name: "greek_62_other_mathfrakABC.svg", latex: "\\mathfrak{} ", cursor: 2, $bak: "", padding: "", size: "3", zh: "Fraktur体", en: "Fraktur typeface" },
            { simple: "mathcal", name: "greek_63_other_mathcalABC.svg", latex: "\\mathcal{} ", cursor: 2, $bak: "", padding: "", size: "3", zh: "手写体", en: "Calligraphy/script" },
            { simple: "mathrm", name: "greek_64_other_mathrmABC.svg", latex: "\\mathrm {}   ", cursor: 2, $bak: "", padding: "", size: "3", zh: "罗马体", en: "Roman typeface" },
            { simple: "mathrmdef", name: "greek_65_other_mathrmdef.svg", latex: "\\mathrm{def} ", cursor: 0, $bak: "", padding: "0.1rem 0.5rem 0.4rem 0.5rem", size: "2", zh: "罗马体def", en: "def" },
          ],
        },
        frac: {
          defaultsize: 3,
          defaultpadding: "1rem 0.2rem 1rem 0.2rem",
          cont: [
            { simple: "divider", name: "分数 Fractions", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "frac", name: "frac_1_frac_frac.svg", latex: "\\frac{}{} ", cursor: 4, $bak: "", padding: "0.3rem 0.2rem 0.3rem 0.2rem", size: "", zh: "分数", en: "fraction" },
            { simple: "tfrac", name: "frac_2_frac_tfrac.svg", latex: "\\tfrac{}{} ", cursor: 4, $bak: "", padding: "1rem 0rem 1rem 0", size: "", zh: "小分数", en: "tiny fraction" },
            { simple: "dif", name: "frac_3_frac_dif.svg", latex: "\\mathrm{d}t ", cursor: 0, $bak: "", padding: "1.1rem 0.4rem 1.1rem 0.4rem", size: "2", zh: "微分", en: "differential" },
            { simple: "dia", name: "frac_4_frac_difa.svg", latex: "\\frac{\\mathrm{d} y}{\\mathrm{d} x} ", cursor: 0, $bak: "", padding: "0.4rem 0 0.4rem 0", size: "", zh: "微分", en: "differential" },
            { simple: "partial", name: "frac_5_frac_partial.svg", latex: "\\partial t ", cursor: 0, $bak: "", padding: "1.1rem 0.4rem 1.1rem 0.4rem", size: "2", zh: "偏微分", en: "partial derivative" },
            { simple: "partiala", name: "frac_6_frac_partiala.svg", latex: "\\frac{\\partial y}{\\partial x} ", cursor: 0, $bak: "", padding: "0.4rem 0 0.4rem 0", size: "", zh: "偏微分", en: "partial derivative" },
            { simple: "nabla", name: "frac_7_frac_nabla.svg", latex: "\\nabla\\psi ", cursor: 0, $bak: "", padding: "1.1rem 0.4rem 1.1rem 0.4rem", size: "2", zh: "Nabla算子", en: "Del operator" },
            { simple: "partialb", name: "frac_8_frac_partialb.svg", latex: " \\frac{\\partial^2}{\\partial x_1\\partial x_2}y ", cursor: 0, $bak: "", padding: "1.1rem 0.2rem 1.1rem 0.2rem", size: "6", zh: "偏微分", en: "partial derivative" },
            { simple: "cfrac", name: "frac_9_frac_cfrac.svg", latex: "\\cfrac{1}{a + \\cfrac{7}{b + \\cfrac{2}{9}}} =c ", cursor: 0, $bak: "", padding: "0", size: "10", zh: "连分数", en: "continued fraction" },
            { simple: "cfraca", name: "frac_10_frac_cfraca.svg", latex: "\\begin{equation}\r\n  x = a_0 + \\cfrac{1}{a_1 \r\n          + \\cfrac{1}{a_2 \r\n          + \\cfrac{1}{a_3 + \\cfrac{1}{a_4} } } }\r\n\\end{equation}", cursor: 0, $bak: "", padding: "0", size: "14", zh: "连分数", en: "continued fraction" },

            { simple: "divider", name: "导数 Derivative", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "dot", name: "frac_11_der_dot.svg", latex: "\\dot{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "一阶导数", en: "the first derivative" },
            { simple: "ddot", name: "frac_12_der_ddot.svg", latex: "\\ddot{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "二阶导数", en: "the second derivative" },
            { simple: "prime", name: "frac_13_der_prime.svg", latex: "{}' ", cursor: 3, $bak: "", padding: "", size: "", zh: "一阶导数", en: "the first derivative" },
            { simple: "primea", name: "frac_14_der_primea.svg", latex: "{}'' ", cursor: 4, $bak: "", padding: "", size: "", zh: "二阶导数", en: "the second derivative" },
            { simple: "primen", name: "frac_15_der_primen.svg", latex: "{}^{(n)} ", cursor: 8, $bak: "", padding: "0.8rem 0 0.9rem 0", size: "3.6", zh: "n阶导数", en: "the nth derivative" },

            { simple: "divider", name: "模算术 Modular arithmetic", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "bmod", name: "frac_16_mod_bmod.svg", latex: "a \\bmod b ", cursor: 0, $bak: "", padding: "0", size: "4", zh: "模除", en: "modulo" },
            { simple: "pmod", name: "frac_17_mod_pmod.svg", latex: "a \\equiv b \\pmod{m} ", cursor: 0, $bak: "", padding: "0", size: "7.2", zh: "同余", en: "congruence modulo" },
            { simple: "gcd", name: "frac_18_mod_gcd.svg", latex: "\\gcd(m, n) ", cursor: 0, $bak: "", padding: "0", size: "4", zh: "最大公约数", en: "greatest common divisor" },
            { simple: "lcm", name: "frac_19_mod_lcm.svg", latex: "\\operatorname{lcm}(m, n) ", cursor: 0, $bak: "", padding: "0", size: "4", zh: "最小公倍数", en: "least common multiple" },
          ],
        },
        sqrt: {
          defaultsize: 3,
          defaultpadding: "1rem 0.2rem 1rem 0.2rem",
          cont: [
            { simple: "divider", name: "根式 Radicals", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "sqrt", name: "sqrt_1_sqrt_sqrt.svg", latex: "\\sqrt{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "开平方", en: "square root" },
            { simple: "sqrtn", name: "sqrt_2_sqrt_sqrtn.svg", latex: "\\sqrt[]{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "开方", en: "nth root" },

            { simple: "divider", name: "上下标 Sub&Super", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "topright", name: "sqrt_3_superscript_topright.svg", latex: "^{} ", cursor: 2, $bak: "", padding: "0.8rem 0.2rem 1.2rem 0.2rem", size: "3", zh: "上标", en: "superscript" },
            { simple: "bottomright", name: "sqrt_4_superscript_bottomright.svg", latex: "_{} ", cursor: 2, $bak: "", padding: "1.3rem 0.4rem 0.8rem 0.4rem", size: "2.5", zh: "下标", en: "Subscript " },
            { simple: "right", name: "sqrt_5_superscript_right.svg", latex: "_{}^{} ", cursor: 5, $bak: "", padding: "0.4rem", size: "2.8", zh: "混合上下标", en: "Combining sub & super" },
            { simple: "left", name: "sqrt_6_superscript_left.svg", latex: "_{}^{} ", cursor: 5, $bak: "", padding: "0.4rem", size: "2.8", zh: "左侧混合上下标", en: "Preceding sub & super" },
            { simple: "sideset", name: "sqrt_7_superscript_sideset.svg", latex: "\\sideset{_1^2}{_3^4}X_a^b ", cursor: 0, $bak: "", padding: "0", size: "3.7", zh: "混合", en: "Preceding and additional sub & super" },

            { simple: "divider", name: "重音符及其他 Accents and Others", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "hat", name: "sqrt_8_other_hat.svg", latex: "\\hat{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "check", name: "sqrt_9_other_check.svg", latex: "\\check{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "grave", name: "sqrt_10_other_grave.svg", latex: "\\grave{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "acute", name: "sqrt_11_other_acute.svg", latex: "\\acute{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "tilde", name: "sqrt_12_other_tilde.svg", latex: "\\tilde{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "breve", name: "sqrt_13_other_breve.svg", latex: "\\breve{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "bar", name: "sqrt_14_other_bar.svg", latex: "\\bar{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "vec", name: "sqrt_15_other_vec.svg", latex: "\\vec{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "not", name: "sqrt_16_other_not.svg", latex: "\\not{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "degree", name: "sqrt_17_other_degree.svg", latex: "^{\\circ} ", cursor: 9, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "widetilde", name: "sqrt_18_other_widetilde.svg", latex: "\\widetilde{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "widehat", name: "sqrt_19_other_widehat.svg", latex: "\\widehat{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "overleftarrow", name: "sqrt_20_other_overleftarrow.svg", latex: "\\overleftarrow{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "overrightarrow", name: "sqrt_21_other_overrightarrow.svg", latex: "\\overrightarrow{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "a", name: "sqrt_22_other_overline_a.svg", latex: "\\overline{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "underline", name: "sqrt_23_other_underline.svg", latex: "\\underline{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "overbrace", name: "sqrt_24_other_overbrace.svg", latex: "\\overbrace{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "underbrace", name: "sqrt_25_other_underbrace.svg", latex: "\\underbrace{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "overset", name: "sqrt_26_other_overset.svg", latex: "\\overset{}{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "underset", name: "sqrt_27_other_underset.svg", latex: "\\underset{}{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "stackrelfrown", name: "sqrt_28_other_stackrelfrown.svg", latex: "\\stackrel\\frown{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "b", name: "sqrt_29_other_overline_b.svg", latex: "\\overline{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "overleftrightarrow", name: "sqrt_30_other_overleftrightarrow.svg", latex: "\\overleftrightarrow{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "oversetleftarrow", name: "sqrt_31_other_oversetleftarrow.svg", latex: "\\overset{}{\\leftarrow} ", cursor: 14, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "oversetrightarrow", name: "sqrt_32_other_oversetrightarrow.svg", latex: "\\overset{}{\\rightarrow} ", cursor: 15, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "xleftarrow", name: "sqrt_33_other_xleftarrow.svg", latex: "\\xleftarrow[]{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
            { simple: "xrightarrow", name: "sqrt_34_other_xrightarrow.svg", latex: "\\xrightarrow[]{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "-", en: "-" },
          ],
        },
        limit: {
          defaultsize: 3,
          defaultpadding: "1rem 0.2rem 1rem 0.2rem",
          cont: [
            { simple: "divider", name: "极限 Limits", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "lim", name: "limit_1_lim_lim.svg", latex: "\\lim  ", cursor: 0, $bak: "", padding: "0.8rem 0.2rem 0.8rem 0.2rem", size: "", zh: "极限", en: "Limit" },
            { simple: "limto0", name: "limit_2_lim_limto0.svg", latex: "\\lim_{x \\to 0} ", cursor: 0, $bak: "", padding: "1.2rem 0 0.3rem 0", size: "3.4", zh: "极限", en: "Limit" },
            { simple: "limtoinfty", name: "limit_3_lim_limtoinfty.svg", latex: "\\lim_{x \\to \\infty} ", cursor: 0, $bak: "", padding: "1.2rem 0 0.3rem 0", size: "3.4", zh: "极限", en: "Limit" },
            { simple: "limtf", name: "limit_4_lim_limtf.svg", latex: "\\textstyle \\lim_{x \\to 0} ", cursor: 0, $bak: "", padding: "0.7rem 0.2rem 0.6rem 0.2rem", size: "3.8", zh: "极限", en: "Limit (force）" },
            { simple: "max", name: "limit_5_lim_max.svg", latex: "\\max_{} ", cursor: 2, $bak: "", padding: "1.1rem 0 0.4rem 0", size: "3.6", zh: "极大", en: "Maximum" },
            { simple: "min", name: "limit_6_lim_min.svg", latex: "\\min_{} ", cursor: 2, $bak: "", padding: "1.1rem 0 0.4rem 0", size: "3.6", zh: "极小", en: "Minimum" },

            { simple: "divider", name: "对数指数 Logarithms and exponentials", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "log", name: "limit_7_log_log.svg", latex: "\\log_{}{} ", cursor: 2, $bak: "", padding: "0.7rem 0.2rem 0.7rem 0.2rem", size: "", zh: "对数", en: "Logarithms" },
            { simple: "lg", name: "limit_8_log_lg.svg", latex: "\\lg_{}{} ", cursor: 2, $bak: "", padding: "0.8rem 0.2rem 0.8rem 0.2rem", size: "2.4", zh: "常用对数", en: "Logarithms" },
            { simple: "ln", name: "limit_9_log_ln.svg", latex: "\\ln_{}{} ", cursor: 2, $bak: "", padding: "0.8rem 0.2rem 0.8rem 0.2rem", size: "2.4", zh: "自然对数", en: "Logarithms" },
            { simple: "exp", name: "limit_10_log_exp.svg", latex: "\\exp ", cursor: 0, $bak: "", padding: "0.9rem 0.2rem 0.4rem 0.2rem", size: "3.2", zh: "指数", en: "Exponentials" },

            { simple: "divider", name: "界限 Bounds", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "mina", name: "limit_11_bound_min.svg", latex: "\\min x ", cursor: 0, $bak: "", padding: "0.2rem", size: "", zh: "最小", en: "Minimum" },
            { simple: "maxa", name: "limit_12_bound_max.svg", latex: "\\max y ", cursor: 0, $bak: "", padding: "0.4rem 0.2rem 0 0.2rem", size: "", zh: "最大", en: "Maximum" },
            { simple: "sup", name: "limit_13_bound_sup.svg", latex: "\\sup t ", cursor: 0, $bak: "", padding: "0.2rem", size: "2.6", zh: "最小上界（上确界）", en: "Supremum" },
            { simple: "inf", name: "limit_14_bound_inf.svg", latex: "\\inf s ", cursor: 0, $bak: "", padding: "0 0.2rem 0.4rem 0.2rem", size: "2.4", zh: "最大下界（下确界）", en: "Infimum" },
            { simple: "lima", name: "limit_15_bound_lim.svg", latex: "\\lim u ", cursor: 0, $bak: "", padding: "0 0.2rem 0.4rem 0.2rem", size: "2.6", zh: "极限", en: "Limit" },
            { simple: "limsup", name: "limit_16_bound_limsup.svg", latex: "\\limsup w ", cursor: 0, $bak: "", padding: "0.2rem", size: "4.6", zh: "上极限", en: "limit superior" },
            { simple: "liminf", name: "limit_17_bound_liminf.svg", latex: "\\liminf v ", cursor: 0, $bak: "", padding: "0.1rem 0.2rem 0.3rem 0.2rem", size: "4", zh: "下极限", en: "limit inferior" },
            { simple: "dim", name: "limit_18_bound_dim.svg", latex: "\\dim p ", cursor: 0, $bak: "", padding: "0.2rem", size: "2.9", zh: "维数", en: "Dimension" },
            { simple: "ker", name: "limit_19_bound_ker.svg", latex: "\\ker\\phi ", cursor: 0, $bak: "", padding: "0.2rem", size: "2.8", zh: "零空间（核）", en: "Null space" },
          ],
        },
        trig: {
          defaultsize: 4,
          defaultpadding: "0.2rem",
          cont: [
            { simple: "divider", name: "三角函数 Trigonometric functions", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "sin", name: "trig_1_sin.svg", latex: "\\sin ", cursor: 0, $bak: "", padding: "", size: "", zh: "正弦", en: "sine" },
            { simple: "cos", name: "trig_2_cos.svg", latex: "\\cos ", cursor: 0, $bak: "", padding: "0.3rem 0.2rem 0.1rem 0.2rem", size: "", zh: "余弦", en: "cosine" },
            { simple: "tan", name: "trig_3_tan.svg", latex: "\\tan ", cursor: 0, $bak: "", padding: "", size: "", zh: "正切", en: "tangent" },
            { simple: "cot", name: "trig_4_cot.svg", latex: "\\cot ", cursor: 0, $bak: "", padding: "", size: "", zh: "余切", en: "cotangent" },
            { simple: "sec", name: "trig_5_sec.svg", latex: "\\sec ", cursor: 0, $bak: "", padding: "0.3rem 0.2rem 0.1rem 0.2rem", size: "", zh: "正割", en: "secant" },
            { simple: "csc", name: "trig_6_csc.svg", latex: "\\csc ", cursor: 0, $bak: "", padding: "0.3rem 0.2rem 0.1rem 0.2rem", size: "", zh: "余割", en: "cosecant" },

            { simple: "divider", name: "反三角函数 Inverse trigonometric functions", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "insin", name: "trig_7_insin.svg", latex: "\\sin^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反正弦", en: "arcsine" },
            { simple: "incos", name: "trig_8_incos.svg", latex: "\\cos^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反余弦", en: "arccosine" },
            { simple: "intan", name: "trig_9_intan.svg", latex: "\\tan^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反正切", en: "arctangent" },
            { simple: "incot", name: "trig_10_incot.svg", latex: "\\cot^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反余切", en: "arccotangent" },
            { simple: "insec", name: "trig_11_insec.svg", latex: "\\sec^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反正割", en: "arcsecant" },
            { simple: "incsc", name: "trig_12_incsc.svg", latex: "\\csc^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反余割", en: "arccosecant" },
            { simple: "arcsin", name: "trig_13_arcsin.svg", latex: "\\arcsin ", cursor: 0, $bak: "", padding: "", size: "", zh: "反正弦", en: "arcsine" },
            { simple: "arccos", name: "trig_14_arccos.svg", latex: "\\arccos ", cursor: 0, $bak: "", padding: "0.4rem 0.2rem 0 0.2rem", size: "", zh: "反余弦", en: "arccosine" },
            { simple: "arctan", name: "trig_15_arctan.svg", latex: "\\arctan ", cursor: 0, $bak: "", padding: "0.3rem 0.2rem 0.1rem 0.2rem", size: "", zh: "反正切", en: "arctangent" },
            { simple: "arccot", name: "trig_16_arccot.svg", latex: "\\mathrm{arccot} \\, ", cursor: 0, $bak: "", padding: "0.3rem 0.2rem 0.1rem 0.2rem", size: "", zh: "反余切", en: "arccotangent" },
            { simple: "arcsec", name: "trig_17_arcsec.svg", latex: "\\mathrm{arcsec} \\, ", cursor: 0, $bak: "", padding: "0.4rem 0.2rem 0 0.2rem", size: "", zh: "反正割", en: "arcsecant" },
            { simple: "arccsc", name: "trig_18_arccsc.svg", latex: "\\mathrm{arccos} \\, ", cursor: 0, $bak: "", padding: "0.4rem 0.2rem 0 0.2rem", size: "", zh: "反余割", en: "arccosecant" },

            { simple: "divider", name: "双曲函数 Hyperblic functions", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "sinh", name: "trig_19_sinh.svg", latex: "\\sinh ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲正弦", en: "the hyperbolic sine" },
            { simple: "cosh", name: "trig_20_cosh.svg", latex: "\\cosh ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲余弦", en: "the hyperbolic cosine" },
            { simple: "tanh", name: "trig_21_tanh.svg", latex: "\\tanh ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲正切", en: "the hyperbolic tangent" },
            { simple: "coth", name: "trig_22_coth.svg", latex: "\\coth ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲余切", en: "the hyperbolic cotangent" },
            { simple: "sech", name: "trig_23_sech.svg", latex: "\\mathrm{sech} \\, ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲正割", en: "the hyperbolic secant" },
            { simple: "csch", name: "trig_24_csch.svg", latex: "\\mathrm{csch} \\, ", cursor: 0, $bak: "", padding: "", size: "", zh: "双曲余割", en: "the hyperbolic cosecant" },

            { simple: "divider", name: "反双曲函数 Inverse hyperbolic functions", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "insinh", name: "trig_25_insinh.svg", latex: "\\sinh^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲正弦", en: "arc-hyperbolic sine" },
            { simple: "incosh", name: "trig_26_incosh.svg", latex: "\\cosh^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲余弦", en: "arc-hyperbolic cosine" },
            { simple: "intanh", name: "trig_27_intanh.svg", latex: "\\tanh^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲正切", en: "arc-hyperbolic tangent" },
            { simple: "incoth", name: "trig_28_incoth.svg", latex: "\\coth^{-1} ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲余切", en: "arc-hyperbolic cotangent" },
            { simple: "insech", name: "trig_29_insech.svg", latex: "\\mathrm{sech^{-1}} \\, ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲正割", en: "arc-hyperbolic secant" },
            { simple: "incsch", name: "trig_30_incsch.svg", latex: "\\mathrm{csch^{-1}} \\, ", cursor: 0, $bak: "", padding: "", size: "", zh: "反双曲余割", en: "arc-hyperbolic cosecant" },
          ],
        },
        integral: {
          defaultsize: 5,
          defaultpadding: "0.2rem",
          cont: [
            { simple: "divider", name: "积分 Integral", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "int", name: "integral_1_int.svg", latex: "\\int ", cursor: 0, $bak: "", padding: "1rem", size: "3.4", zh: "积分", en: "Integral" },
            { simple: "inta", name: "integral_2_inta.svg", latex: "\\int_{}^{} ", cursor: 5, $bak: "", padding: "0.9rem", size: "3.6", zh: "积分", en: "Integral" },
            { simple: "intb", name: "integral_3_intb.svg", latex: "\\int\\limits_{}^{} ", cursor: 5, $bak: "", padding: "", size: "", zh: "积分", en: "Integral" },

            { simple: "divider", name: "双重积分 Double integral", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "iint", name: "integral_4_iint.svg", latex: "\\iint ", cursor: 0, $bak: "", padding: "1rem", size: "3.4", zh: "双重积分", en: "Double integral" },
            { simple: "iinta", name: "integral_5_iinta.svg", latex: "\\iint_{}^{} ", cursor: 5, $bak: "", padding: "0.9rem", size: "3.6", zh: "双重积分", en: "Double integral" },
            { simple: "iintb", name: "integral_6_iintb.svg", latex: "\\iint\\limits_{}^{} ", cursor: 5, $bak: "", padding: "", size: "", zh: "双重积分", en: "Double integral" },

            { simple: "divider", name: "三重积分 Triple integral", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "iiint", name: "integral_7_iiint.svg", latex: "\\iiint ", cursor: 0, $bak: "", padding: "1rem", size: "3.4", zh: "三重积分", en: "Triple integral" },
            { simple: "iiinta", name: "integral_8_iiinta.svg", latex: "\\iiint_{}^{} ", cursor: 5, $bak: "", padding: "0.9rem", size: "3.6", zh: "三重积分", en: "Triple integral" },
            { simple: "iiintb", name: "integral_9_iiintb.svg", latex: "\\iiint\\limits_{}^{} ", cursor: 5, $bak: "", padding: "", size: "", zh: "三重积分", en: "Triple integral" },

            { simple: "divider", name: "曲线积分 Closed line or path integral", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "oint", name: "integral_10_oint.svg", latex: "\\oint ", cursor: 0, $bak: "", padding: "", size: "", zh: "曲线积分", en: "Closed line or path integral " },
            { simple: "ointa", name: "integral_11_ointa.svg", latex: "\\oint_{}^{} ", cursor: 5, $bak: "", padding: "", size: "", zh: "曲线积分", en: "Closed line or path integral " },
          ],
        },
        sum: {
          defaultsize: 4,
          defaultpadding: "0.2rem",
          cont: [
            { simple: "divider", name: "求和 Summation", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "sum", name: "sum_1_sum_sum.svg", latex: "\\sum ", cursor: 0, $bak: "", padding: "0.7rem 0.2rem 0.2rem 0.2rem", size: "3.4", zh: "求和", en: "Summation" },
            { simple: "suma", name: "sum_2_sum_suma.svg", latex: "\\sum_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "求和", en: "Summation" },
            { simple: "sumb", name: "sum_3_sum_sumb.svg", latex: " {\\textstyle \\sum_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.4rem 0.8rem 0.4rem", size: "2.9", zh: "求和", en: "Summation" },

            { simple: "divider", name: "乘积余积 Product and coproduct", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "prod", name: "sum_4_prod_prod.svg", latex: "\\prod ", cursor: 0, $bak: "", padding: "1.2rem 0.9rem 1.2rem 0.9rem", size: "2", zh: "连乘积", en: "Product" },
            { simple: "proda", name: "sum_5_prod_proda.svg", latex: "\\prod_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "连乘积", en: "Product" },
            { simple: "prodb", name: "sum_6_prod_prodb.svg", latex: " {\\textstyle \\prod_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.5rem 1rem 0.5rem", size: "2.7", zh: "连乘积", en: "Product" },
            { simple: "coprod", name: "sum_7_prod_coprod.svg", latex: "\\coprod ", cursor: 0, $bak: "", padding: "1.2rem 0.9rem 1.2rem 0.9rem", size: "2", zh: "余积", en: "Coproduct" },
            { simple: "coproda", name: "sum_8_prod_coproda.svg", latex: "\\coprod_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "余积", en: "Coproduct" },
            { simple: "coprodb", name: "sum_9_prod_coprodb.svg", latex: " {\\textstyle \\coprod_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.5rem 1rem 0.5rem", size: "2.7", zh: "余积", en: "Coproduct" },

            { simple: "divider", name: "并集交集 Union and intersection", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "cup", name: "sum_10_cup_cup.svg", latex: "\\bigcup ", cursor: 0, $bak: "", padding: "1.2rem 0.9rem 1.2rem 0.9rem", size: "2", zh: "并集", en: "Union" },
            { simple: "cupa", name: "sum_11_cup_cupa.svg", latex: "\\bigcup_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "并集", en: "Union" },
            { simple: "cupb", name: "sum_12_cup_cupb.svg", latex: " {\\textstyle \\bigcup_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.5rem 1rem 0.5rem", size: "2.7", zh: "并集", en: "Union" },
            { simple: "cap", name: "sum_13_cup_cap.svg", latex: "\\bigcap ", cursor: 0, $bak: "", padding: "1.2rem 0.9rem 1.2rem 0.9rem", size: "2", zh: "交集", en: "Intersection" },
            { simple: "capa", name: "sum_14_cup_capa.svg", latex: "\\bigcap_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "交集", en: "Intersection" },
            { simple: "capb", name: "sum_15_cup_capb.svg", latex: " {\\textstyle \\bigcap_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.5rem 1rem 0.5rem", size: "2.7", zh: "交集", en: "Intersection" },

            { simple: "divider", name: "析取合取 Disjunction and conjunction", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "vee", name: "sum_16_vee_vee.svg", latex: "\\bigvee ", cursor: 0, $bak: "", padding: "0.7rem 0.2rem 0.2rem 0.2rem", size: "3.4", zh: "析取", en: "Disjunction" },
            { simple: "veea", name: "sum_17_vee_veea.svg", latex: "\\bigvee_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "析取", en: "Disjunction" },
            { simple: "veeb", name: "sum_18_vee_veeb.svg", latex: " {\\textstyle \\bigvee_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.4rem 0.8rem 0.4rem", size: "2.9", zh: "析取", en: "Disjunction" },
            { simple: "wedage", name: "sum_19_vee_wedage.svg", latex: "\\bigwedge ", cursor: 0, $bak: "", padding: "0.7rem 0.2rem 0.2rem 0.2rem", size: "3.4", zh: "合取", en: "Conjunction" },
            { simple: "wedagea", name: "sum_20_vee_wedagea.svg", latex: "\\bigwedge_{}^{} ", cursor: 5, $bak: "", padding: "0.2rem 0 0.2rem 0", size: "", zh: "合取", en: "Conjunction" },
            { simple: "wedageb", name: "sum_21_vee_wedageb.svg", latex: " {\\textstyle \\bigwedge_{}^{}} ", cursor: 6, $bak: "", padding: "0.7rem 0.4rem 0.8rem 0.4rem", size: "2.9", zh: "合取", en: "Conjunction" },
          ],
        },
        bracket: {
          defaultsize: 5,
          defaultpadding: "1rem 0.2rem 1rem 0.2rem",
          cont: [
            { simple: "divider", name: "括号 Brackets", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "bracket1", name: "bracket_1_bracket_1.svg", latex: "\\left (  \\right ) ", cursor: 10, $bak: "", padding: "", size: "", zh: "圆括号", en: "Parentheses" },
            { simple: "bracket3", name: "bracket_3_bracket_3.svg", latex: "\\left [  \\right ] ", cursor: 10, $bak: "", padding: "", size: "", zh: "方括号", en: "Brackets" },
            { simple: "bracket4", name: "bracket_4_bracket_4.svg", latex: "\\left \\langle  \\right \\rangle ", cursor: 16, $bak: "", padding: "", size: "", zh: "角括号", en: "Angle brackets" },
            { simple: "bracket5", name: "bracket_5_bracket_5.svg", latex: "\\left \\{  \\right \\} ", cursor: 11, $bak: "", padding: "", size: "", zh: "花括号", en: "Braces" },
            { simple: "bracket7", name: "bracket_7_bracket_7.svg", latex: "\\left |  \\right | ", cursor: 10, $bak: "", padding: "", size: "", zh: "单竖线，绝对值", en: "Bars" },
            { simple: "bracket2", name: "bracket_2_bracket_2.svg", latex: "\\left \\|  \\right \\| ", cursor: 11, $bak: "", padding: "", size: "", zh: "双竖线，范", en: "Double bars " },
            { simple: "bracket6", name: "bracket_6_bracket_6.svg", latex: "\\left \\lfloor  \\right \\rfloor ", cursor: 16, $bak: "", padding: "", size: "", zh: "取整函数", en: "Floor functions" },
            { simple: "bracket8", name: "bracket_8_bracket_8.svg", latex: "\\left \\lceil  \\right \\rceil ", cursor: 15, $bak: "", padding: "", size: "", zh: "取顶函数", en: "Ceiling functions" },

            { simple: "divider", name: "常用 Commons", latex: "", cursor: 0, $bak: "", padding: "", size: "", zh: "", en: "" }, //二级标题
            { simple: "binom", name: "bracket_9_common_binom.svg", latex: "\\binom{}{} ", cursor: 4, $bak: "", padding: "", size: "", zh: "二项式系数", en: "Binomial coefficients" },
            { simple: "common1", name: "bracket_10_common_interval.svg", latex: "\\left [ 0,1 \\right ) ", cursor: 0, $bak: "", padding: "", size: "", zh: "开闭区间", en: "Interval" },
            { simple: "common2", name: "bracket_11_common_bra.svg", latex: "\\left \\langle \\psi \\right | ", cursor: 0, $bak: "", padding: "", size: "", zh: "左矢", en: "bra" },
            { simple: "common3", name: "bracket_12_common_ket.svg", latex: "\\left | \\psi  \\right \\rangle ", cursor: 0, $bak: "", padding: "", size: "", zh: "右矢", en: "ket" },
            { simple: "common4", name: "bracket_13_common_product.svg", latex: "\\left \\langle \\psi  | \\psi  \\right \\rangle ", cursor: 0, $bak: "", padding: "", size: "", zh: "态矢量内积", en: "inner product" },
          ],
        },
        //只有matrix有type字段；[all]表示行列数都需要输入[row]表示只需要输入行数
        matrix: {
          defaultsize: 5.2,
          defaultpadding: "1.5rem 0.5rem 1.5rem 0.5rem",
          cont: [
            { simple: "matrix", name: "matrix_1_matrix.svg", latex: "\\begin{matrix}…&…\\end{matrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "矩阵", en: "", type: "all" },
            { simple: "bmatrix", name: "matrix_2_bmatrix.svg", latex: "\\begin{bmatrix}…&…\\end{bmatrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "方括号矩阵", en: "", type: "all" },
            { simple: "pmatrix", name: "matrix_3_pmatrix.svg", latex: "\\begin{pmatrix}…&…\\end{pmatrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "圆括号矩阵", en: "", type: "all" },
            { simple: "vmatrix", name: "matrix_4_vmatrix.svg", latex: "\\begin{vmatrix}…&…\\end{vmatrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "单竖线矩阵", en: "", type: "all" },
            { simple: "bigVmatrix", name: "matrix_5_bigVmatrix.svg", latex: "\\begin{Vmatrix}…&…\\end{Vmatrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "双竖线矩阵", en: "", type: "all" },
            { simple: "bigBmatrix", name: "matrix_6_bigBmatrix.svg", latex: "\\begin{Bmatrix}…&…\\end{Bmatrix}", cursor: 0, $bak: "", padding: "", size: "", zh: "花括号矩阵", en: "", type: "all" },
            { simple: "leftmatrix", name: "matrix_7_leftmatrix.svg", latex: "\\left\\{\\begin{matrix}…&…\\end{matrix}\\right.", cursor: 0, $bak: "", padding: "", size: "", zh: "左单括号矩阵", en: "", type: "all" },
            { simple: "rightmatrix", name: "matrix_8_rightmatrix.svg", latex: "\\left.\\begin{matrix}…&…\\end{matrix}\\right\\}", cursor: 0, $bak: "", padding: "", size: "", zh: "右单括号矩阵", en: "", type: "all" },
            { simple: "case", name: "matrix_9_case.svg", latex: "\\begin{cases}…& \\text{ if } x=…\\end{cases}", cursor: 0, $bak: "", padding: "", size: "", zh: "条件等式", en: "", type: "row" },
            { simple: "align", name: "matrix_10_align.svg", latex: "\\begin{align*}…&…\\end{align*}", cursor: 0, $bak: "", padding: "", size: "", zh: "多行对齐等式", en: "", type: "row" },
          ],
        },
      },
    },
    color: {
      path: MyCommon.fd.OSSPath + "/formula-images/color/",
      cont: [
        { simple: "Blue", name: "color1.png", latex: "{\\color{Blue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "蓝色", en: "Blue" },
        { simple: "Brown", name: "color2.png", latex: "{\\color{Brown} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "棕色", en: "Brown" },
        { simple: "Gray", name: "color3.png", latex: "{\\color{Gray} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "灰色", en: "Gray" },
        { simple: "Green", name: "color4.png", latex: "{\\color{Green} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "绿色", en: "Green" },
        { simple: "Orange", name: "color5.png", latex: "{\\color{Orange} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "橙色", en: "Orange" },
        { simple: "Peach", name: "color6.png", latex: "{\\color{Peach} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "桃色", en: "Peach" },
        { simple: "Purple", name: "color7.png", latex: "{\\color{Purple} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "紫色", en: "Purple" },
        { simple: "Red", name: "color8.png", latex: "{\\color{Red} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "红色", en: "Red" },
        { simple: "Tan", name: "color9.png", latex: "{\\color{Tan} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "黄褐色", en: "Tan" },
        { simple: "Violet", name: "color10.png", latex: "{\\color{Violet} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "紫罗兰色", en: "Violet" },
        { simple: "Yellow", name: "color11.png", latex: "{\\color{Yellow} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "黄色", en: "Yellow" },
        { simple: "userdefime", name: "color12.png", latex: "{\\color[RGB]{0,0,0} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "自定义", en: "userdefime" },
        // { simple: "Apricot", name: "Apricot.png", latex: "{\\color{Apricot} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Apricot" },
        // { simple: "Aquamarine", name: "Aquamarine.png", latex: "{\\color{Aquamarine} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Aquamarine" },
        // { simple: "Bittersweet", name: "Bittersweet.png", latex: "{\\color{Bittersweet} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Bittersweet" },
        // { simple: "Black", name: "Black.png", latex: "{\\color{Black} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Black" },
        // { simple: "Blue", name: "Blue.png", latex: "{\\color{Blue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Blue" },
        // { simple: "BlueGreen", name: "BlueGreen.png", latex: "{\\color{BlueGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "BlueGreen" },
        // { simple: "BlueViolet", name: "BlueViolet.png", latex: "{\\color{BlueViolet} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "BlueViolet" },
        // { simple: "BrickRed", name: "BrickRed.png", latex: "{\\color{BrickRed} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "BrickRed" },
        // { simple: "Brown", name: "Brown.png", latex: "{\\color{Brown} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Brown" },
        // { simple: "BurntOrange", name: "BurntOrange.png", latex: "{\\color{BurntOrange} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "BurntOrange" },
        // { simple: "CadetBlue", name: "CadetBlue.png", latex: "{\\color{CadetBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "CadetBlue" },
        // { simple: "CarnationPink", name: "CarnationPink.png", latex: "{\\color{CarnationPink} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "CarnationPink" },
        // { simple: "Cerulean", name: "Cerulean.png", latex: "{\\color{Cerulean} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Cerulean" },
        // { simple: "CornflowerBlue", name: "CornflowerBlue.png", latex: "{\\color{CornflowerBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "CornflowerBlue" },
        // { simple: "Cyan", name: "Cyan.png", latex: "{\\color{Cyan} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Cyan" },
        // { simple: "Dandelion", name: "Dandelion.png", latex: "{\\color{Dandelion} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Dandelion" },
        // { simple: "DarkOrchid", name: "DarkOrchid.png", latex: "{\\color{DarkOrchid} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "DarkOrchid" },
        // { simple: "Emerald", name: "Emerald.png", latex: "{\\color{Emerald} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Emerald" },
        // { simple: "ForestGreen", name: "ForestGreen.png", latex: "{\\color{ForestGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "ForestGreen" },
        // { simple: "Fuchsia", name: "Fuchsia.png", latex: "{\\color{Fuchsia} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Fuchsia" },
        // { simple: "Goldenrod", name: "Goldenrod.png", latex: "{\\color{Goldenrod} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Goldenrod" },
        // { simple: "Gray", name: "Gray.png", latex: "{\\color{Gray} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Gray" },
        // { simple: "Green", name: "Green.png", latex: "{\\color{Green} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Green" },
        // { simple: "GreenYellow", name: "GreenYellow.png", latex: "{\\color{GreenYellow} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "GreenYellow" },
        // { simple: "JungleGreen", name: "JungleGreen.png", latex: "{\\color{JungleGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "JungleGreen" },
        // { simple: "Lavender", name: "Lavender.png", latex: "{\\color{Lavender} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Lavender" },
        // { simple: "LimeGreen", name: "LimeGreen.png", latex: "{\\color{LimeGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "LimeGreen" },
        // { simple: "Magenta", name: "Magenta.png", latex: "{\\color{Magenta} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Magenta" },
        // { simple: "Mahogany", name: "Mahogany.png", latex: "{\\color{Mahogany} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Mahogany" },
        // { simple: "Maroon", name: "Maroon.png", latex: "{\\color{Maroon} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Maroon" },
        // { simple: "Melon", name: "Melon.png", latex: "{\\color{Melon} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Melon" },
        // { simple: "MidnightBlue", name: "MidnightBlue.png", latex: "{\\color{MidnightBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "MidnightBlue" },
        // { simple: "Mulberry", name: "Mulberry.png", latex: "{\\color{Mulberry} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Mulberry" },
        // { simple: "NavyBlue", name: "NavyBlue.png", latex: "{\\color{NavyBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "NavyBlue" },
        // { simple: "OliveGreen", name: "OliveGreen.png", latex: "{\\color{OliveGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "OliveGreen" },
        // { simple: "Orange", name: "Orange.png", latex: "{\\color{Orange} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Orange" },
        // { simple: "OrangeRed", name: "OrangeRed.png", latex: "{\\color{OrangeRed} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "OrangeRed" },
        // { simple: "Orchid", name: "Orchid.png", latex: "{\\color{Orchid} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Orchid" },
        // { simple: "Peach", name: "Peach.png", latex: "{\\color{Peach} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Peach" },
        // { simple: "Periwinkle", name: "Periwinkle.png", latex: "{\\color{Periwinkle} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Periwinkle" },
        // { simple: "PineGreen", name: "PineGreen.png", latex: "{\\color{PineGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "PineGreen" },
        // { simple: "Plum", name: "Plum.png", latex: "{\\color{Plum} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Plum" },
        // { simple: "ProcessBlue", name: "ProcessBlue.png", latex: "{\\color{ProcessBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "ProcessBlue" },
        // { simple: "Purple", name: "Purple.png", latex: "{\\color{Purple} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Purple" },
        // { simple: "RawSienna", name: "RawSienna.png", latex: "{\\color{RawSienna} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RawSienna" },
        // { simple: "Red", name: "Red.png", latex: "{\\color{Red} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Red" },
        // { simple: "RedOrange", name: "RedOrange.png", latex: "{\\color{RedOrange} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RedOrange" },
        // { simple: "RedViolet", name: "RedViolet.png", latex: "{\\color{RedViolet} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RedViolet" },
        // { simple: "Rhodamine", name: "Rhodamine.png", latex: "{\\color{Rhodamine} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Rhodamine" },
        // { simple: "RoyalBlue", name: "RoyalBlue.png", latex: "{\\color{RoyalBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RoyalBlue" },
        // { simple: "RoyalPurple", name: "RoyalPurple.png", latex: "{\\color{RoyalPurple} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RoyalPurple" },
        // { simple: "RubineRed", name: "RubineRed.png", latex: "{\\color{RubineRed} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "RubineRed" },
        // { simple: "Salmon", name: "Salmon.png", latex: "{\\color{Salmon} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Salmon" },
        // { simple: "SeaGreen", name: "SeaGreen.png", latex: "{\\color{SeaGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "SeaGreen" },
        // { simple: "Sepia", name: "Sepia.png", latex: "{\\color{Sepia} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Sepia" },
        // { simple: "SkyBlue", name: "SkyBlue.png", latex: "{\\color{SkyBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "SkyBlue" },
        // { simple: "SpringGreen", name: "SpringGreen.png", latex: "{\\color{SpringGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "SpringGreen" },
        // { simple: "Tan", name: "Tan.png", latex: "{\\color{Tan} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Tan" },
        // { simple: "TealBlue", name: "TealBlue.png", latex: "{\\color{TealBlue} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "TealBlue" },
        // { simple: "Thistle", name: "Thistle.png", latex: "{\\color{Thistle} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Thistle" },
        // { simple: "Turquoise", name: "Turquoise.png", latex: "{\\color{Turquoise} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Turquoise" },
        // { simple: "Violet", name: "Violet.png", latex: "{\\color{Violet} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Violet" },
        // { simple: "VioletRed", name: "VioletRed.png", latex: "{\\color{VioletRed} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "VioletRed" },
        // { simple: "White", name: "White.png", latex: "{\\color{White} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "White" },
        // { simple: "WildStrawberry", name: "WildStrawberry.png", latex: "{\\color{WildStrawberry} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "WildStrawberry" },
        // { simple: "Yellow", name: "Yellow.png", latex: "{\\color{Yellow} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "Yellow" },
        // { simple: "YellowGreen", name: "YellowGreen.png", latex: "{\\color{YellowGreen} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "YellowGreen" },
        // { simple: "YellowOrange", name: "YellowOrange.png", latex: "{\\color{YellowOrange} } ", cursor: 2, $bak: "", padding: "", size: "", zh: "", en: "YellowOrange" }
      ],
    },
    fontfamily: {
      path: MyCommon.fd.OSSPath + "/formula-images/fontfamily/",
      cont: [
        { simple: "font1", name: "font1.png", latex: "\\mathrm{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "常规", en: "Roman typeface" },
        { simple: "font2", name: "font2.png", latex: "\\mathbf{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "加粗", en: "Boldface" },
        { simple: "font3", name: "font3.png", latex: "\\mathit{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "斜体", en: "Italics (default for Latin alphabet)" },
        { simple: "font4", name: "font4.png", latex: "\\underline{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "下划线", en: "Underline" },
        { simple: "font5", name: "font5.png", latex: "\\mathsf{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "无衬线字体", en: "Sans serif" },
        { simple: "font6", name: "font6.png", latex: "\\mathbb{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "黑板报体", en: "Blackboard bold/scripts" },
        { simple: "font7", name: "font7.png", latex: "\\mathcal{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "手写体", en: "Calligraphy/script" },
        { simple: "font8", name: "font8.png", latex: "\\mathfrak{} ", cursor: 2, $bak: "", padding: "", size: "", zh: "弗拉克图尔字体", en: "Fraktur typeface" },
      ],
    },
    fontsize: {
      path: MyCommon.fd.OSSPath + "/formula-images/fontsize/",
      cont: [
        { simple: "size1", name: "size1.png", latex: "{\\tiny } ", cursor: 2, $bak: "", padding: "", size: "", zh: "巨小", en: "tiny" },
        { simple: "size2", name: "size2.png", latex: "{\\scriptsize } ", cursor: 2, $bak: "", padding: "", size: "", zh: "超小", en: "scriptsize" },
        { simple: "size3", name: "size3.png", latex: "{\\small } ", cursor: 2, $bak: "", padding: "", size: "", zh: "小", en: "small" },
        { simple: "size4", name: "size4.png", latex: "{\\normalsize } ", cursor: 2, $bak: "", padding: "", size: "", zh: "正常", en: "normal" },
        { simple: "size5", name: "size5.png", latex: "{\\large } ", cursor: 2, $bak: "", padding: "", size: "", zh: "大", en: "large" },
        { simple: "size6", name: "size6.png", latex: "{\\Large } ", cursor: 2, $bak: "", padding: "", size: "", zh: "超大", en: "Large" },
        { simple: "size7", name: "size7.png", latex: "{\\LARGE } ", cursor: 2, $bak: "", padding: "", size: "", zh: "特大", en: "LARGE" },
        { simple: "size8", name: "size8.png", latex: "{\\huge } ", cursor: 2, $bak: "", padding: "", size: "", zh: "巨大", en: "huge" },
        { simple: "size9", name: "size9.png", latex: "{\\Huge } ", cursor: 2, $bak: "", padding: "", size: "", zh: "巨无霸", en: "Huge" },
      ],
    },
  },
};
