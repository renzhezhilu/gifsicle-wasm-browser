/*
 * Pxmu 前端轻量消息弹出层
 * ver 1.1.0
 * © https://Pxmu.com 
 * @uptime 2021年10月31日15:12:24
 */

"use strict";
let d = 0.3;
// 重叠透出
let _overlap = {
    loading: true,
    toast: true,
};
let _pxmuToCount = 0;
let _pxmuClassName = 'pxmu-class__name__fix';
const pxmu = {
    _init: function () {
        var pxmustyle = document.createElement('style');
        var str = '.pxmu-fixed{position:fixed;width:100%;top:0;left:0;right:0;bottom:0;z-index:90001;display:flex;justify-content:center;align-items:center;-webkit-pointer-events:none;-moz-pointer-events:none;-ms-pointer-events:none;-o-pointer-events:none;pointer-events:none}.pxmu-toast{zoom: 1.4;position:fixed;left:0;right:0;bottom:50px;display:flex;justify-content:center;align-items:flex-end;z-index:90009;text-align:center;-webkit-pointer-events:none;-moz-pointer-events:none;-ms-pointer-events:none;-o-pointer-events:none;pointer-events:none}.pxmu-toast div div{box-shadow: 12px 10px 15px 9px rgb(0 0 0 / 19%); padding:10px 20px;border-radius: 1000px;}.pxmu-toast div{padding:5px 15px;border-radius:3px;font-size:10px;font-weight:800; display:flex;margin:0 auto}.pxmu-toast-center{top:50%;bottom:auto;align-items:center}.pxmu-toast-top{top:60px;bottom:auto;align-items:flex-start}.pxmu-toast-pc{top:80px;bottom:auto!important}.pxmu-toast-pc>div>div{padding:10px 60px!important;font-size:14.555px!important;font-weight:500}.pxmu-toast-pc .pxmu-success>div{background-color:#f0f9eb!important;color:#67c23a!important}.pxmu-toast-pc .pxmu-warn>div{background-color:#fdf6ec!important;color:#e6a23c!important}.pxmu-toast-pc .pxmu-error>div{background-color:#fef0f0!important;color:#f56c6c!important}.pxmu-loading-inscroll{width:100%;height:100%;position:fixed;top:0;left:0;right:0;bottom:0;z-index:90000;-webkit-pointer-events:auto;-moz-pointer-events:auto;-ms-pointer-events:auto;-o-pointer-events:auto;pointer-events:auto}.pxmu-copy-item{height:0!important;opacity:0!important}.pxmu-body-inscroll{position:absolute;top:0;right:0;left:0;bottom:0;overflow:hidden}.pxmu-loading{zoom:1.2;display:flex;backdrop-filter: blur(11px);flex-direction:column;min-height:100px;min-width:100px;border-radius:8px;font-size:10px!important;align-items:center;justify-content:center;padding:8px}.pxmu-loading-ing{padding:4px;color:#fff;position:relative;width:30px;height:30px;vertical-align:middle}.pxmu-loading-spinner{position:relative;display:inline-block;max-width:100%;max-height:100%;vertical-align:middle}.pxmu-loading-spinner-loading{-webkit-animation:pxmu-rotate .8s linear infinite;animation:pxmu-rotate .8s linear infinite}.pxmu-loading-circular-loading{-webkit-animation-duration:2s;animation-duration:2s}.pxmu-toast-text{margin-top:8px;font-size:10px!important}.pxmu-loading-icon{display:block;width:100%;height:100%}.pxmu-loading-icon circle{-webkit-animation:pxmu-circular-in 1.5s ease-in-out infinite;animation:pxmu-circular-in 1.5s ease-in-out infinite;stroke:currentColor;stroke-width:3;stroke-linecap:round}.pxmu-success-icon{width:35px}.pxmu-fail-icon{width:45px}.pxmu-fade-out{-webkit-animation:.3s pxmu-fade-out both ease-in;animation:.3s pxmu-fade-out both ease-in}.pxmu-diag-item{position:fixed;top:0;left:0;right:0;bottom:0;z-index:80000;display:flex;flex-direction:row}.pxmu-diag{display:flex;flex-direction:column;align-self:center;width:100%;background:#fff;margin:25px;border-radius:5px;padding:10px 0;z-index:80001;align-items:initial}.pxmu-diag div{padding:0 20px;align-items:baseline;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}.pxmu-diag-text{margin:18px 0;line-height:24px;max-height:145px;overflow:hidden;overflow-y:auto}.pxmu-diag-btn{display:flex;justify-content:space-around;margin:10px 0;flex-direction:row}.pxmu-diag-btn div{display:flex;flex:1;flex-direction:row;justify-content:center;padding:8px 0;height:24px;align-items:center;cursor:pointer}@-webkit-keyframes pxmu-slide-up-in{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes pxmu-slide-up-in{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@-webkit-keyframes pxmu-slide-up-out{to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}}@keyframes pxmu-slide-up-out{to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}}@-webkit-keyframes pxmu-slide-down-in{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes pxmu-slide-down-in{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes pxmu-slide-down-out{to{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}}@keyframes pxmu-slide-down-out{to{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}}@-webkit-keyframes pxmu-slide-deg-in{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes pxmu-slide-deg-in{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@-webkit-keyframes pxmu-slide-deg-out{to{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}}@keyframes pxmu-slide-deg-out{to{-webkit-transform:translate3d(0,100%,0);transform:rotate(4deg) translate3d(0,150%,0);opacity:0}}@-webkit-keyframes pxmu-circular-in{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}@keyframes pxmu-circular-in{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}@-webkit-keyframes pxmu-slide-left-in{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes pxmu-slide-left-in{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@-webkit-keyframes pxmu-slide-left-out{to{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);opacity:0}}@keyframes pxmu-slide-left-out{to{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);opacity:0}}@-webkit-keyframes pxmu-slide-right-in{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes pxmu-slide-right-in{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@-webkit-keyframes pxmu-slide-right-out{to{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}}@keyframes pxmu-slide-right-out{to{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}}@-webkit-keyframes pxmu-fade-in{from{opacity:0}to{opacity:1}}@keyframes pxmu-fade-in{from{opacity:0}to{opacity:1}}@-webkit-keyframes pxmu-fade-out{from{opacity:1}to{opacity:0}}@keyframes pxmu-fade-out{from{opacity:1}to{opacity:0}}@-webkit-keyframes pxmu-rotate-in{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes pxmu-rotate-in{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.pxmu-fade-in{-webkit-animation:.3s pxmu-fade-in both ease-out;animation:.3s pxmu-fade-in both ease-out}.pxmu-fade-out{-webkit-animation:.3s pxmu-fade-out both ease-in;animation:.3s pxmu-fade-out both ease-in}.pxmu-slideup-in{-webkit-animation:pxmu-slide-up-in .3s both ease-out;animation:pxmu-slide-up-in .3s both ease-out}.pxmu-slideup-out{-webkit-animation:pxmu-slide-up-out .3s both ease-in;animation:pxmu-slide-up-out .3s both ease-in}.pxmu-circular-in{-webkit-animation:pxmu-circular-in 1.5s ease-in-out infinite;animation:pxmu-circular-in 1.5s ease-in-out infinite}.pxmu-slidedown-in{-webkit-animation:pxmu-slide-down-in .3s both ease-out;animation:pxmu-slide-down-in .3s both ease-out}.pxmu-slidedown-out{-webkit-animation:pxmu-slide-down-out .3s both ease-in;animation:pxmu-slide-down-out .3s both ease-in}.pxmu-slidedeg-in{-webkit-animation:pxmu-slide-deg-in .3s both ease-out;animation:pxmu-slide-deg-in .3s both ease-out}.pxmu-slidedeg-out{-webkit-animation:pxmu-slide-deg-out .3s both ease-in;animation:pxmu-slide-deg-out .3s both ease-in}.pxmu-slideleft-in{-webkit-animation:pxmu-slide-left-in .3s both ease-out;animation:pxmu-slide-left-in .3s both ease-out}.pxmu-slideleft-out{-webkit-animation:pxmu-slide-left-out .3s both ease-in;animation:pxmu-slide-left-out .3s both ease-in}.pxmu-slideright-in{-webkit-animation:pxmu-slide-right-in .3s both ease-out;animation:pxmu-slide-right-in .3s both ease-out}.pxmu-slideright-out{-webkit-animation:pxmu-slide-right-out .3s both ease-in;animation:pxmu-slide-right-out .3s both ease-in}.pxmu-rotate-in{-webkit-animation:pxmu-rotate-in .8s linear infinite;animation:pxmu-rotate-in .8s linear infinite}@media screen and (min-width:1025px){.pxmu-diag{width:40%;padding:20px 20px!important;margin-left:30%!important}}@media screen and (min-width:1400px){.pxmu-diag{width:30%;padding:20px 20px!important;margin-left:35%!important}}';
        pxmustyle.type = 'text/css';
        if (pxmustyle.styleSheet) {
            pxmustyle.styleSheet.cssText = str;
        } else {
            pxmustyle.innerHTML = str;
        }
        document.getElementsByTagName('head')[0].appendChild(pxmustyle);
        window.addEventListener('click', function (e) {
            // 复制文本
            if (e.target.dataset.pxmuCopyText) {
                // pxmu.pxmulog(e.target.dataset.pxmuCopyText);
                let thiscopy = pxmu.copy(e.target.dataset.pxmuCopyText);
                if (thiscopy) {
                    pxmu.toast('复制成功');
                }
            }
        });
    },

    pxmulog: function (p, name) {
        // console.log(p, name);
    },

    totop: function () {
        var timer = null;
        var isTop = true;
        timer = setInterval(function () {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            isTop = true;
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 30);
    },

    overlap: function (json) {
        if (typeof json == "object" && json) {
            if (json.loading === false) {
                _overlap.loading = false;
            } else {
                _overlap.loading = true;
            };

            if (json.toast === false) {
                _overlap.toast = false;
            } else {
                _overlap.toast = true;
            }
        };
    },

    copy: function (data = '') {
        if (typeof data == "object") {
            if (data.el) {
                let istype = data.el.substr(0, 1);
                // 判断类型 dom id or class
                if (istype == '#') {
                    var domId = data.el.split('#');
                } else if (istype == '.') {
                    var domId = data.el.split('.');
                } else {
                    return {
                        status: 0,
                        msg: 'el入参错误',
                    };
                }
                if (!domId[0] && domId[1]) {
                    domId = domId[1];
                } else if (domId[0] && domId[1]) {
                    domId = domId[1];
                } else {
                    domId = domId[0];
                }
                // 提取内容
                var el = '';
                if (istype == '#') {
                    el = document.getElementById(domId);
                } else {
                    el = document.getElementsByClassName(domId)[0];
                }
                // 内容
                if (el) {
                    let text = el.innerText;
                    return this.addcopy(text);
                } else {
                    return {
                        status: 0,
                        msg: 'el入参的dom不存在'
                    };
                }
            }
        } else {
            return this.addcopy(data);
        };
    },

    addcopy: function (text = '') {
        var _input = document.createElement('input');
        _input.setAttribute('class', 'pxmu-copy-item');
        // 防止手机上弹出软键盘
        _input.setAttribute('readonly', 'readonly');
        _input.setAttribute('value', text);
        document.body.appendChild(_input);
        _input.setSelectionRange(0, 9999);
        _input.select();
        var res = document.execCommand('copy');
        document.body.removeChild(_input);
        var ret = {
            status: true,
            msg: ''
        };
        if (res !== true) {
            ret.status = false;
            ret.msg = '复制失败，请手动复制';
        };
        return ret;
    },

    loading: function (msg) {
        this.addLoading('loading', msg);
    },

    success: function (msg) {
        this.addLoading('success', msg);
    },

    fail: function (msg) {
        this.addLoading('fail', msg);
    },

    diaglog: function (data) {
        var json = {
            title: {
                text: '温馨提示',
                color: '#000',
                fontsize: 20,
                fontweight: 'bold',
                center: false
            },
            content: {
                text: '',
                color: '#666',
                fontsize: 15.555,
                fontweight: 'normal',
            },
            line: {
                solid: 0,
                color: '#eee',
            },
            btn: {
                left: {
                    text: '取消',
                    color: '#f50',
                    fontsize: 16,
                    fontweight: 'bold',
                    bg: '#fff', //背景色
                    solid: 1, //描边
                    solidcolor: '#f50', //描边颜色
                },
                right: {
                    text: '确定',
                    color: '#fff',
                    fontsize: 16,
                    fontweight: 'bold',
                    bg: '#f50',
                    solid: 1, //描边
                    solidcolor: '#f50', //描边颜色
                }
            },
            congif: {
                cbclose: false, //点击确认不自动关闭
                cbcloseall: false, //点击任何地方都不可关闭
                cbload: true, //异步开启时 是否显示loading转圈效果
                cbloadcolor: '#fff', //圈圈颜色
                cbloadtext: '', //转圈时文案 为空不显示
                bg: 'rgba(0,0,0,0.65)', //背景色
                inscroll: true, //模态 不可点击
                anclose: true, //点击背景可关闭
                callback: null, //回调函数
                animation: 'none', //动画
                btnstyle: false, //圆角样式
                btncount: false, //显示按钮
            }
        };
        // 自定义配置
        if (typeof data == "object") {
            // 清洗配置
            for (let key in data) {
                for (let k in data[key]) {
                    if (key == 'btn') {
                        for (let i in data[key][k]) {
                            json[key][k][i] = data[key][k][i]
                        }
                    } else {
                        json[key][k] = data[key][k];
                    }
                }
            }
        } else {
            json.content.text = data;
        };

        // 换行
        let texts = json.content.text;
        if (texts && typeof texts == 'string') {
            json.content.text = texts.replace(/\n/g, '</br>');
            texts = null;
        }

        //圆角风格
        if (json.congif.btnstyle === true) {
            json.congif.btnstyle = 50;
        } else {
            json.congif.btnstyle = 3;
        }

        // var title = json.title;
        // var content = json.content;
        // var congif = json.congif;
        // var btn = json.btn;
        var m = document.createElement('div');
        var _class = 'pxmu-diag-item';

        // 模态
        if (json.congif.inscroll) {
            _class += ' pxmu-diag-inscroll';
            document.getElementsByTagName('body')[0].className += ' pxmu-body-inscroll';
        }

        m.setAttribute('style', 'background:' + json.congif.bg);
        m.setAttribute('class', _class);
        var html = '<div class="pxmu-diag">';
        //动画
        if (json.congif.animation != 'none') {
            html = '<div class="pxmu-diag pxmu-' + json.congif.animation + '-in">';
        }
        var diystyle = '';
        // 标题
        if (json.title.text) {
            diystyle = 'padding-top:15px;font-weight: ' + json.title.fontweight + ';color: ' + json.title.color + ';font-size: ' + parseInt(json.title.fontsize) + 'px;';
            if (json.title.center === true) {
                diystyle += 'text-align:center;';
            }
            if (!json.content.text) {
                diystyle += 'margin:15px 0';
            }
            html += '<div style="' + diystyle + '">' + json.title.text + '</div>';
        }
        // 文本
        if (json.content.text) {
            diystyle = 'font-size: ' + json.content.fontsize + 'px;color: ' + json.content.color + '';
            html += '<div class="pxmu-diag-text" style="' + diystyle + '">' + json.content.text + '</div>';
        }
        // 线条
        let _style_line = '';
        if (!isNaN(json.line.solid) && json.line.solid > 0) {
            html += '<div style="margin:10px 0;height:' + json.line.solid + 'px;background:' + json.line.color + '"></div>';
            _style_line = 'padding:0;height:auto;margin:0;';
        }

        //按钮
        html += '<div style="' + _style_line + '" class="pxmu-diag-btn">';
        if (json.congif.btncount === false) {
            diystyle = _style_line + ';background: ' + json.btn.left.bg + ';color: ' + json.btn.left.color + ';border: solid ' + json.btn.left.solid + 'px ' + json.btn.left.solidcolor + ';font-size:' + json.btn.left.fontsize + 'px;';
            diystyle += 'font-weight:' + json.btn.left.fontweight + ';border-radius: ' + json.congif.btnstyle + 'px;';
            html += '<div style="' + diystyle + '" class="pxmu-diag-btn-left"> ' + json.btn.left.text + ' </div>';
            if (_style_line) {
                html += '<span style="width:1px;background:' + json.line.color + '"></span>';
            } else {
                html += '<span style="flex:0.1"></span>';
            }
        }
        // 至少保留一个按钮
        diystyle = _style_line + ';background: ' + json.btn.right.bg + ';color: ' + json.btn.right.color + ';border: solid ' + json.btn.right.solid + 'px ' + json.btn.right.solidcolor + ';font-size:' + json.btn.right.fontsize + 'px;';
        diystyle += 'font-weight:' + json.btn.right.fontweight + ';border-radius: ' + json.congif.btnstyle + 'px;';
        html += '<div style="' + diystyle + '" class="pxmu-diag-btn-right"> ' + json.btn.right.text + ' </div>';
        html += '</div></div></div>';
        m.innerHTML = html;
        document.body.appendChild(m);
        var choose = function (tag) {
            return document.querySelector(tag);
        };
        choose(".pxmu-diag-item").onclick = function (e) {
            // 异步关闭false 包含模态 允许点击背景关闭
            if (json.congif.cbcloseall === false && json.congif.cbclose === false && json.congif.anclose === true) {
                pxmu.closediaglog(0, json.congif.animation);
                return false;
            };
            if (e.target.className == 'pxmu-diag-btn-left') {

            };
            if (e.target.className == 'pxmu-diag-btn-right') {

            };
        };
        return new Promise((resolve, reject) => {
            choose(".pxmu-diag-btn").onclick = function (e) {
                var ret = {
                    type: 'click',
                    btn: 'right'
                };
                if (e.target.className == 'pxmu-diag-btn-left') {
                    ret.btn = 'left';
                    resolve(ret);
                };
                if (e.target.className == 'pxmu-diag-btn-right') {
                    resolve(ret);
                    // 异步关闭 
                    if (json.congif.cbclose === true || json.congif.cbcloseall === true) {
                        // 且需要状态反馈 转圈效果
                        if (json.congif.cbload === true) {
                            html = '<span class="pxmu-circular-in" style="width:20px;color:' + json.congif.cbloadcolor + '"><svg viewBox="25 25 50 50" class="pxmu-loading-icon"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span>';
                            // loading文案
                            if (json.congif.cbloadtext) {
                                html += '<span style="padding-left: 5px;">' + json.congif.cbloadtext + '</span>';
                            }
                            choose(".pxmu-diag-btn-right").innerHTML = html;
                        }
                        return false;
                    }
                };
                if (json.congif.cbcloseall === false) {
                    pxmu.closediaglog(0, json.congif.animation);
                }
            };
        });
    },

    closediaglog: function (type = 0, outaniname = 'none') {
        pxmu.pxmulog(outaniname)
        if (type === false) {
            return false;
        }
        let t = 300;
        if (outaniname == 'none') {
            t = 0;
        }
        var m = document.getElementsByClassName('pxmu-diag');
        if (m && m[0]) {
            m[0].setAttribute('class', 'pxmu-diag pxmu-' + outaniname + '-out');
        }
        this._close_html_diaglog(t, 'pxmu-diag-item', outaniname);
    },

    closeload: function (t = 0) {
        this._close_html_diaglog(t, 'pxmu-loading-item');
    },

    _close_html_diaglog: function (t = 0, name, outaniname) {
        t = parseInt(t);
        setTimeout(function () {
            // 模态恢复
            pxmu._body_remove_inscroll();
            var m = document.getElementsByClassName(name);
            let count = m.length;
            if (count < 0) {
                return false;
            }
            for (var i = 0; i < count; i++) {
                let _className = m[i].className;
                pxmu.pxmulog(_className);
                //有指定动画时
                let _d = 0;
                if (outaniname != 'none') {
                    _className += ' pxmu-fade-out';
                    m[i].setAttribute('class', _className);
                    _d = d;
                }
                setTimeout(function () {
                    m[0] && document.body.removeChild(m[0]);
                }, _d * 1000);
            }
        }, t);
    },

    addLoading: function (type, json) {
        if (typeof json != "object") {
            let msg = json;
            var json = {};
            json.msg = msg;
        }
        var htmls = {
            msg: json.msg || '',
            time: json.time || 2500,
            bg: json.bg || 'rgba(0, 0, 0, 0.65)', //样式背景色
            color: json.color || '#fff',
            animation: json.animation || 'fade',
            close: json.close === false ? false : true, //自动关闭
            inscroll: json.inscroll === true ? true : false, //模态 不可交互
            inscrollbg: json.inscrollbg || '', // 全局遮罩层
        };
        // 清除
        if (_overlap.loading === true) {
            var _overlapDom = document.getElementsByClassName('pxmu-loading-item')[0];
            pxmu.pxmulog(_overlapDom);
            if (_overlapDom) {
                document.body.removeChild(_overlapDom);
                pxmu._body_remove_inscroll();
            }
        }
        htmls.time = parseInt(htmls.time);
        var m = document.createElement('div');
        _pxmuToCount++;
        let this_pxmuClassName = _pxmuClassName + _pxmuToCount;
        let _class = 'pxmu-loading-item pxmu-fixed ' + this_pxmuClassName;
        // 模态
        if (htmls.inscroll) {
            _class += ' pxmu-loading-inscroll';
            document.getElementsByTagName('body')[0].className += ' pxmu-body-inscroll';
        }
        // 添加全局遮罩层
        m.setAttribute('class', _class);
        if (htmls.inscrollbg) {
            m.setAttribute('style', 'background:' + htmls.inscrollbg);
        }
        let loadType = this._pxmu_get_load_Type(type, htmls.color);
        if (!loadType) {
            return false;
        }
        var html = '<div class="pxmu-loading pxmu-' + htmls.animation + '-in" style="background:' + htmls.bg + ';color:' + htmls.color + ';">';
        html += '<div class="pxmu-loading-ing"><span style="color:' + htmls.color + ';" class="pxmu-loading-spinner pxmu-loading-spinner-' + type + ' pxmu-loading-circular-' + type + '">' + loadType + '</span></div><div class="pxmu-toast-text">' + htmls.msg + '</div></div>';
        m.innerHTML = html;
        document.body.appendChild(m);
        // 自动关闭
        if (htmls.close) {
            setTimeout(function () {
                m.setAttribute('class', _class + ' pxmu-' + htmls.animation + '-out');
                setTimeout(function () {
                    _overlapDom = document.getElementsByClassName(this_pxmuClassName)[0];
                    pxmu.pxmulog(this_pxmuClassName);
                    _overlapDom && document.body.removeChild(_overlapDom);
                    pxmu._body_remove_inscroll();
                }, d * 1000);
            }, htmls.time);
        }
    },

    _body_remove_inscroll: function () {
        let by = document.getElementsByTagName('body')[0].classList.value;
        if (by.indexOf('-inscroll') != -1) {
            document.getElementsByTagName('body')[0].classList.remove('pxmu-body-inscroll');
        }
    },

    _pxmu_get_load_Type: function (type, color) {
        switch (type) {
            case 'loading':
                return '<svg viewBox="25 25 50 50" class="pxmu-loading-icon"><circle cx="50" cy="50" r="20" fill="none"></circle></svg>';
            case 'success':
                return '<svg fill=' + color + ' t="1621923083503" class="pxmu-success-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3022"><path d="M963.2 208c-12.8-12.8-32-12.8-44.8 0L396.8 668.8c-12.8 9.6-28.8 9.6-41.6 0l-249.6-192c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l294.4 294.4c12.8 12.8 32 12.8 44.8 0L963.2 252.8c12.8-12.8 12.8-35.2 0-44.8z" p-id="3023"></path></svg>';
            case 'fail':
                return '<svg fill=' + color + ' t="1621924513860" class="pxmu-success-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6710"><path d="M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z" p-id="6711"></path></svg>';
            default:
                return null;
        }
    },

    toast: function (json = '') {
        if (typeof json != "object") {
            let msg = json;
            var json = {};
            json.msg = msg;
            json.location = '';
        } else {
            json.time = parseInt(json.time);
        }
        // 默认参数
        json.type = json.type || 'wap';
        json.status = json.status || 'success';
        if (json.type == 'pc') {
            json.animation = json.animation || 'slidedown';
        } else {
            json.animation = json.animation || 'fade';
        }
        json.location = json.location || 'bottom';
        // 次数
        _pxmuToCount++;
        let this_pxmuClassName = _pxmuClassName + _pxmuToCount;

        // 背景颜色 和字体颜色
        var htmls = {
            class: `pxmu-toast pxmu-toast-${json.type} pxmu-toast-${json.location} ${this_pxmuClassName}`,
            msg: json.msg || '操作成功',
            time: json.time || 2500,
            bg: json.bg || 'rgba(0, 0, 0, 0.86)',
            color: json.color || '#fff',
        };
        // 清除
        if (_overlap.toast === true) {
            var _overlapDom = document.getElementsByClassName('pxmu-toast')[0];
            pxmu.pxmulog(_overlapDom);
            if (_overlapDom) {
                document.body.removeChild(_overlapDom);
            }
        }
        var m = document.createElement('div');
        m.setAttribute('class', htmls.class);
        let _style = 'background-color:' + htmls.bg + ';color:' + htmls.color + ';';
        let html = `<div class="pxmu-${json.status} pxmu-${json.animation}-in"><div style="${_style}">${htmls.msg}</div></div>`;
        m.innerHTML = html;
        document.body.appendChild(m);
        setTimeout(function () {
            m.setAttribute('class', htmls.class + ' pxmu-' + json.animation + '-out');
            setTimeout(function () {
                _overlapDom = document.getElementsByClassName(this_pxmuClassName)[0];
                pxmu.pxmulog(this_pxmuClassName);
                _overlapDom && document.body.removeChild(_overlapDom);
            }, d * 1000);
        }, htmls.time);
    },
};
pxmu._init()

function pLoading() {
    // pxmu.closeload()
    pxmu.loading({
        msg: 'Loading...',
        bg: 'rgba(255, 255, 255, 0.75)', //背景色
        color: '#000', //文字颜色
        close: false
    });
}
function pClose() {
    pxmu.closeload()
}
function pOk(text='Success') {
    pxmu.toast({
        msg: text, //内容 不能为空
        time: 3500, //停留时间 默认2500毫秒
        location: 'top',//居中center 顶部top 底部bottom默认
        animation: 'slidedown', //显示的动画 默认fade 动画支持详见动画文档
        type: 'web', //默认wap样式 可选参数：pc 入参pc时
        bg:'yellowgreen',
        color:'var(--text)',
        status: 'success', //可选参数 success成功 warn警告 error错误 仅在type=pc时候生效，wap时可通过自定义bg、color改变样式
    });
}
function pErr(text="Error") {
    pxmu.toast({
        msg: text,
        time: 3500, 
        location: 'top',
        animation: 'slidedown', 
        type: 'web', 
        bg:'red',
        color:'var(--text_white)',
        status: 'success', 
    });
}
function pNor(text='Normal') {
    pxmu.toast({
        msg: text,
        time: 3500, 
        location: 'top',
        animation: 'slidedown', 
        type: 'web', 
        bg:'var(--text_white)',
        color:'var(--text)',
        status: 'success', 
    });
}
export  {
    pxmu,
    pLoading,
    pClose,
    pOk,
    pErr,
    pNor
}

