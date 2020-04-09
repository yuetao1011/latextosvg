/**
 * @Copyright Copyright © 2019
 * @Createdon 2019-12-22
 * @Author Panda_YueTao
 * @Version 1.15
 * @Title 妈叔出品-LaTeX公式编辑器脚本
 */

$(function () {
  // MyFormula.fn.render(); //渲染empty
  //
  // MyFormula.fn.init_setting(); //初始化设置框 //TODO:
  // MyFormula.fn.scrollForMAC(); //初始化输出框对苹果电脑的优化
  // MyFormula.fn.makeDir(); //制作帮助文档的目录
  // MyCommon.fn.init(); //公共组件初始化
  //#region 事件绑定
  //
  // /* 帮助按钮 */
  // $("#" + MyFormula.fd.helpbtn).click(function () {
  //   let readme = document.querySelector(".readme");
  //   let setting = document.querySelector(".setting");
  //   readme.style.display = "block";
  //   setting.style.display = "none";
  //   MyCommon.fn.screenModalShow();
  // });
  // /* 设置按钮 */
  // $("#" + MyFormula.fd.settingbtn).click(function () {
  //   let readme = document.querySelector(".readme");
  //   let setting = document.querySelector(".setting");
  //   readme.style.display = "none";
  //   setting.style.display = "block";
  //   MyCommon.fn.screenModalShow();
  // });
  // /** 输入框input事件重新渲染 */
  // $("#" + MyFormula.fd.input).on("input", function () {
  //   MyFormula.fn.render();
  // });
  // /** 输入框获得焦点重新渲染 */
  // $("#" + MyFormula.fd.input).focus(function () {
  //   MyFormula.fn.render();
  // });
  // /** 设置加载模块事件 */
  // $(".form-check-input").click(function () {
  //   // MyFormula.fn.saveMathjaxSetting();//TODO:
  // });
  // /** 快捷颜色按钮 */
  // $("#" + MyFormula.fd.setcolorbtn).click(function () {
  //   if (!MyFormula.fd.controlbarRenderFlag[0]) {
  //     let wrap = document.getElementById(MyFormula.fd.setcolorwrap);
  //     MyFormula.fn.init_controlbar(wrap, "color");
  //     MyFormula.fd.controlbarRenderFlag[0] = true;
  //   }
  // });
  // /** 快捷字体按钮 */
  // $("#" + MyFormula.fd.setfontbtn).click(function () {
  //   if (!MyFormula.fd.controlbarRenderFlag[1]) {
  //     let wrap = document.getElementById(MyFormula.fd.setfontwrap);
  //     MyFormula.fn.init_controlbar(wrap, "fontfamily");
  //     MyFormula.fd.controlbarRenderFlag[1] = true;
  //   }
  // });
  // /** 快捷字号按钮 */
  // $("#" + MyFormula.fd.setfontsizebtn).click(function () {
  //   if (!MyFormula.fd.controlbarRenderFlag[2]) {
  //     let wrap = document.getElementById(MyFormula.fd.setfontsizewrap);
  //     MyFormula.fn.init_controlbar(wrap, "fontsize");
  //     MyFormula.fd.controlbarRenderFlag[2] = true;
  //   }
  // });
  // /** 环境按钮1 */
  // $("#" + MyFormula.fd.clearbtn).click(function (event) {
  //   MyFormula.fn.insertEnvironment("equation", null);
  //   event.stopPropagation();
  //   event.preventDefault();
  // });
  // /** 环境按钮2 */
  // $("#" + MyFormula.fd.eqnarraybtn).click(function (event) {
  //   MyFormula.fn.insertEnvironment("eqnarray", "");
  //   event.stopPropagation();
  //   event.preventDefault();
  // });
  // /** 环境按钮3 */
  // $("#" + MyFormula.fd.alignbtn).click(function (event) {
  //   MyFormula.fn.insertEnvironment("align", "");
  //   event.stopPropagation();
  //   event.preventDefault();
  // });
  // /** 环境按钮4 */
  // $("#" + MyFormula.fd.arraybtn).click(function (event) {
  //   MyFormula.fn.insertEnvironment("array", "{c}");
  //   event.stopPropagation();
  //   event.preventDefault();
  // });
  // /** 下载SVG按钮 */
  // $("#" + MyFormula.fd.svgbtn).click(function () {
  //   MyFormula.fn.action(
  //     function () {
  //       MyFormula.fn.downloadSVG();
  //     },
  //     "已下载至默认文件夹",
  //     "下载失败"
  //   );
  // });
  // /** 下载PNG按钮 */
  // $("#" + MyFormula.fd.pngbtn).click(function () {
  //   MyFormula.fn.action(
  //     function () {
  //       MyFormula.fn.downloadPNG();
  //     },
  //     "已下载至默认文件夹",
  //     "下载失败"
  //   );
  // });
  // /** 复制ML源码按钮 */
  // $("#" + MyFormula.fd.copyMLbtn).click(function () {
  //   MyFormula.fn.action(
  //     function () {
  //       MyFormula.fn.copyMLToClip();
  //     },
  //     "已复制到剪切板",
  //     "复制失败"
  //   );
  // });
  // /** 复制svg源码按钮  */
  // $("#" + MyFormula.fd.copySVGbtn).click(function () {
  //   MyFormula.fn.action(
  //     function () {
  //       MyFormula.fn.copySVGToClip();
  //     },
  //     "已复制到剪切板",
  //     "复制失败"
  //   );
  // });
  // /** 微信公众号链接点击 */
  // $("#" + MyFormula.fd.wechatlink).click(function () {
  //   MyCommon.fn.visibleToggle(MyFormula.fd.wechatimg);
  // });
  // /** 微信公众号链接失去焦点 */
  // $("#" + MyFormula.fd.wechatlink).blur(function () {
  //   if (MyFormula.fd.wechatFlag) {
  //     $("#" + MyFormula.fd.wechatlink).focus();
  //   } else {
  //     MyCommon.fn.visibleHide(MyFormula.fd.wechatimg);
  //   }
  // });
  // /** 微信公众号二维码鼠标移入 */
  // $("#" + MyFormula.fd.wechatimg).mouseenter(function () {
  //   MyFormula.fd.wechatFlag = true;
  // });
  // /** 微信公众号二维码鼠标移出 */
  // $("#" + MyFormula.fd.wechatimg).mouseleave(function () {
  //   MyFormula.fd.wechatFlag = false;
  // });
  //#endregion
});

$(function () {
  let obj_init_input = {};
  obj_init_input.shortcut = document.getElementById("wrap_shortcut");
  MyFormula.fn.init_input(obj_init_input);
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
    MAP_PATH_HELP: "../html/readme.html",
    MAP_PATH_INPUT: "../json/map_input.json",
    menuShowFlag: { show: [], hide: [] }, //存储菜单打开和收起延迟定时器的容器组
    menuRenderFlag: [], //存储二级菜单是否渲染完毕的标志组

    controlbarRenderFlag: [], //存储控制按钮菜单是否渲染完毕的标志组

    wechatFlag: false, //存储公众号图标是否被悬浮的标志

    key_loadmod: "loadmod", //存储客户端配置如何加载模块的键值名
    key_inputtemp: "input_temp", //存储客户端由于重新加载而需要暂存的输入框字符
    tmr_loadscript: "", //重新加载后即时渲染轮询计时器

    svgSource: "", //供下载的svg元素（已调整过宽高）
    empty: MyCommon.fd.OSSPath + "/formula-images/empty.png", //占空位的图像路径
    namePrefix: "MommyTalk", //下载文件前缀
    removedOptions: {}, //默认环境暂存数组
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

    init_input: function (obj) {
      $.ajax({
        url: MyFormula.fd.MAP_PATH_INPUT,
        success: function (data) {
          let map = data;
          MyFormula.fn.for_init_input.init_shortcut(obj.shortcut, map.shortcut);
          MyFormula.fn.for_init_input.init_immediate(map.immediate);
        },
      });
    },
    for_init_input: {
      init_shortcut: function (el, map) {
        let len = map.length;
        let ul = document.createElement("ul");
        ul.className = "nav nav-tabs";
        el.appendChild(ul);
        // 创建标签结构
        for (let i = 0; i < len; i++) {
          let li = document.createElement("li");
          li.className = "nav-item";
          let a = document.createElement("a");
          a.className = "nav-link";
          if (i == 0) {
            a.classList.add("active");
          }
          a.href = "##";
          a.id = "a_shortcut_" + i;
          a.innerHTML = map[i].descript;
          ul.appendChild(li);
          li.appendChild(a);
          // 创建二级菜单是否渲染完毕标志组数据结构
          MyFormula.fd.menuRenderFlag[i] = [];
        }
        // 渲染标签
        for (let i = 0; i < len; i++) {
          let path = MyCommon.fd.OSSPath + map[i].layer1.path;
          let wrap = document.createElement("div");
          wrap.id = "wrap_shortcut_" + i;
          el.append(wrap);
          let wrap_in = document.createElement("div");
          wrap_in.style.display = "flex";
          wrap_in.style.flexDirection = "row";
          wrap_in.style.flexWrap = "nowrap";
          wrap_in.style.justifyContent = "space-around";
          wrap_in.style.alignItems = "center";
          // 创建一级菜单
          let cls = map[i].layer1.cont;
          let len2 = cls.length;
          let devicewidth = document.body.clientWidth;
          for (let m = 0; m < len2; m++) {
            let dropdown = document.createElement("div");
            dropdown.className = "dropdown";
            dropdown.style.padding = "0";
            dropdown.style.margin = "0.5rem";
            if (m == 0) {
              dropdown.style.marginLeft = "0";
            }
            if (m == len2 - 1) {
              dropdown.style.marginRight = "0";
            }
            dropdown.style.order = m;
            dropdown.style.flexGrow = 0;
            let btn = document.createElement("button");
            btn.className = "btn btn-light";
            btn.type = "button";
            let img = document.createElement("img");
            img.src = path + cls[m].name;
            let p = document.createElement("p");
            if (devicewidth > 1100) {
              p.innerHTML = cls[m].descript;
            }
            $(window).resize(function () {
              if (document.body.clientWidth > 1100) {
                p.innerHTML = cls[m].descript;
              } else {
                p.innerHTML = "";
              }
              let arrow = document.createElement("div");
              arrow.style.margin = "-0.3rem auto -0.4rem auto";
              arrow.style.fontSize = "1rem";
              arrow.innerHTML = "<i class='fa fa-caret-down'></i>";
              p.appendChild(arrow);
            });
            p.style.fontSize = "0.7rem";
            p.style.margin = "0 auto 0.2rem auto";
            let arrow = document.createElement("div");
            arrow.style.margin = "-0.3rem auto -0.4rem auto";
            arrow.style.fontSize = "1rem";
            arrow.innerHTML = "<i class='fa fa-caret-down'></i>";
            wrap.appendChild(wrap_in);
            wrap_in.appendChild(dropdown);
            dropdown.appendChild(btn);
            btn.appendChild(img);
            btn.appendChild(p);
            p.appendChild(arrow);
            let menu = document.createElement("div");
            if (m < len2 / 2) {
              menu.className = "dropdown-menu";
            } else {
              menu.className = "dropdown-menu dropdown-menu-right";
            }
            menu.style.backgroundColor = "rgba(255,255,255,0.95)";
            menu.style.boxShadow = "4px 4px 4px 1px rgba(0,0,0,0.2)";
            menu.style.marginTop = "-1px";
            menu.style.padding = "1rem";
            //菜单宽度为组容器宽度减去padding
            menu.style.width = el.clientWidth / 2 + "px";
            //菜单参数绑定到重绘事件
            $(window).resize(function () {
              menu.style.width = el.clientWidth / 2 + "px";
            });
            //绑定悬浮事件(按键事件)
            dropdown.onmouseenter = function () {
              if (!MyFormula.fd.menuRenderFlag[i][m]) {
                // console.log(MyFormula.fd.menuRenderFlag);
                //渲染二级菜单
                //参数
                let path2 = MyCommon.fd.OSSPath + map[i].layer2.path;
                let cls2_father = map[i].layer2.cont[cls[m].tag];
                let cls2 = cls2_father.cont;
                let len3 = cls2.length;
                //创建二级菜单图标
                for (let n = 0; n < len3; n++) {                  
                  if (cls2[n].tag == "divider") {
                    //分割线
                    let divider1 = document.createElement("div");
                    let divider2 = document.createElement("div");
                    divider1.className = "dropdown-divider";
                    divider2.className = "dropdown-divider";
                    divider2.style.marginBottom = "0.6rem";
                    let p = document.createElement("p");
                    p.innerHTML = cls2[n].name;
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
                    if (cls2[n].padding == "") {
                      imgwrap.style.padding = cls2_father.defaultpadding;
                    } else {
                      imgwrap.style.padding = cls2[n].padding;
                    }
                    //创建图像
                    let img = document.createElement("img");
                    img.src = path2 + cls[m].tag + "/" + cls2[n].name;
                    // 设置图像尺寸
                    if (cls2[n].size == "") {
                      img.style.width = cls2_father.defaultsize + "rem";
                    } else {
                      img.style.width = cls2[n].size + "rem";
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
                      let temp = cls2[n].latex;
                      temp = temp.replace(/\r\n/g, "<br/>");
                      temp = temp.replace(/ /g, "&nbsp;");
                      str += temp;
                      str += "</strong>";
                      str += "<hr style='width: 100%; height: 1px; border: none; background-color: #987cb9;margin:4px auto 4px auto;'></hr>";
                      if (cls2[n].zh != "-" || cls2[n].en != "-") {
                        str += "<span style='font-size:smaller'>备注：</span>";
                        str += "<div style='margin-left:0.6rem'>";
                        if (cls2[n].zh != "-") {
                          str += cls2[n].zh;
                          str += "<br/>";
                        }
                        if (cls2[n].en != "-") {
                          str += cls2[n].en;
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
                      let tex = cls2[n].latex;
                      let back = cls2[n].cursor;
                      let isMatrix = false;
                      if (cls[m].tag == "matrix") {
                        isMatrix = true;
                      }
                      let type = typeof cls2[n].type != "undefined" ? cls2[n].type : "all";
                      MyFormula.fn.input(tex, back, isMatrix, type);
                    };
                    menu.appendChild(imgwrap);
                    imgwrap.appendChild(img);
                  }
                }
                MyFormula.fd.menuRenderFlag[i][m] = true;
              }
              // 菜单拉出
              MyFormula.fd.menuShowFlag.show[m] = setTimeout(function () {
                $(menu).slideDown(0);
                btn.focus();
              }, 200);
              clearTimeout(MyFormula.fd.menuShowFlag.hide[m]);
            };
            dropdown.onmouseleave = function () {
              // 菜单收起
              MyFormula.fd.menuShowFlag.hide[m] = setTimeout(function () {
                $(menu).slideUp(0);
                btn.blur();
              }, 200);
              clearTimeout(MyFormula.fd.menuShowFlag.show[m]);
            };

            dropdown.appendChild(menu);
          }
          // 标签初始显示状态
          if (i == 0) {
            wrap.style.display = "block";
          } else {
            wrap.style.display = "none";
          }
          // 绑定标签点击事件
          $("#a_shortcut_" + i).on("click", function () {
            for (let x = 0; x < len; x++) {
              document.getElementById("a_shortcut_" + x).className = "nav-link";
              document.getElementById("wrap_shortcut_" + x).style.display = "none";
            }
            document.getElementById("a_shortcut_" + i).className = "nav-link active";
            document.getElementById("wrap_shortcut_" + i).style.display = "block";
          });
        }
      },
      init_immediate: function (map) {},
      init_setting: function () {},
      init_action: function () {},
      init_help: function () {},
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
};
