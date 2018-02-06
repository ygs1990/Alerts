/**
 * 方法说明：弹窗组件
 *
 * 参数说明：$           引入jQuery对象,避免$变量冲突
 *			 win 		 引入window对象,缩小作用域查找范围,提交性能
 *			 document	 引入document对象,缩小作用域查找范围,提交性能
 *			 undefined   引入undefined数据类型,兼容旧版本浏览器
 * 特别说明	 ;		     匿名函数前的分号是为了防止多个文件压缩合并以后,避免其
 *						 他文件最后一行语句没加分号,而引起合并后的语法错误。
 */
;(function($, win, document, undefined) {
    function Alerts(ele, options) {
        this.ele = ele;
        this.options = {
	        // 弹窗标题
	        title: options.title || '提示',
	        // 弹窗宽度
	        width: options.width ? options.width + 'px' : '500px',
			// 弹窗高度
	        height: options.height ? options.height + 'px' : 'auto',
	        // 提示消息
	        message: options.message || 'Hello World',
	        // 提示消息
	        titleClass: options.titleClass || '',
	        // 提示消息
	        contentClass: options.contentClass || '',
	        // 确定按钮文本
	        confirmText: options.confirmText || '确认',
	        // 取消按钮文本
	        cancelText: options.cancelText || '取消',
	        // 是否显示弹窗
	        show: options.show === false ? options.show : true,
	        // 提示消息是否居中
	        center: options.center ? options.center : false,
	        // 弹窗背景色
	        bgColor: options.bgColor ? $.trim(options.bgColor) : '#fff',
	        // 是否显示取消按钮
	        hideCancelBtn: options.hideCancelBtn ? options.hideCancelBtn : false,
	        // 弹窗时是否禁止鼠标滚动事件
	        scrollEvent: options.scrollEvent ? options.scrollEvent : false,
	        // 点击确定按钮时执行的回调函数
	        confirmEvent: options.confirmEvent || function() {}
        };

        this.init();
    }

	Alerts.prototype = {
        constructor: Alerts,
        init: function() {
            this.showModal();
        },
		/**
		 * 方法说明：显示弹窗
		 *
		 * 参数说明：无参数
		 *
		 */
        showModal: function() {
	        var ele = this.ele;
	        var options = this.options;
            var content = this.renderText();

            // 判断是否显示弹窗
	        if(options.show) {
		        $(ele).empty().append(content);
		        $(ele).show();

		        // 事件监听
		        this.bindEvent();

		        // 设置message-box样式
		        $(ele).find('.message-box').css({
			        'width': options.width,
			        'height': options.height,
			        'background-color': options.bgColor
		        });


				// 为弹窗标题添加样式类
		        if(options.titleClass) {
			        $(ele).find('.message-title').addClass(options.titleClass);
                }

                // 为弹窗信息添加样式类
		        if(options.contentClass) {
			        $(ele).find('.message-content').addClass(options.contentClass);
                }

                // 为弹窗标题添加样式类
		        if(options.center) {
			        $(ele).find('.message-content').css({'text-align': 'center'});
                }

                // 判断是否显示取消按钮
                if(options.hideCancelBtn) {
	                $('#cancelBtn').hide();
                }else {
	                $('#cancelBtn').show();
                }

		        // 禁止鼠标滚动事件
		        if(options.scrollEvent) {
		            this.disabledMouseWheel();
                }
	        }else {
		        $(ele).hide().empty();
		        this.enableMouseWheel();
	        }
        },
		/**
		 * 方法说明：显示弹窗内容
		 *
		 * 参数说明：无参数
		 *
		 */
        renderText: function() {
            var options = this.options;
            var content = '<div class="modal" tabindex="0"></div>'
	            +'<div class="message-box" tabindex="0">'
	            +'	<form id="messageForm" class="message-form">'
	            +'  	<div>'
	            +'			<p class="message-title">'+ options.title +'</p>'
	            +'			<span id="closeBtn" class="message-close">'
	            +'				<img src="./image/close.png" style="width: 32px;">'
	            +'			</span>'
	            +'		</div>'
	            +'  	<div class="message-content">'+ options.message +'</div>'
	            +'  	<div class="message-button">'
	            +'      	<button id="confirmBtn" type="button" class="confirm-btn">'+ options.confirmText +'</button>'
	            +'      	<button id="cancelBtn" type="button" class="cancel-btn">'+ options.cancelText +'</button>'
	            +'  	</div>'
	            +'	</form>'
	            +'</div>';

            return content;
        },
		/**
		 * 方法说明：禁止鼠标滚动
		 *
		 * 参数说明：无参数
		 *
		 */
		disabledMouseWheel: function() {
			// 判断是否是Firefox浏览器
			if (document.addEventListener) {
				document.addEventListener('DOMMouseScroll', scrollEvent, false);
			}

			// IE/Opera/Chrome等浏览器
			window.onmousewheel = document.onmousewheel = scrollEvent;

			function scrollEvent(evt) {
				evt = evt || window.event;

				if(evt.preventDefault) {
					// Firefox
					evt.preventDefault();
					evt.stopPropagation();
				} else {
					// IE
					evt.cancelBubble = true;
					evt.returnValue = false;
				}

				return false;
			}
        },
		/**
		 * 方法说明：解除鼠标滚动
		 *
		 * 参数说明：无参数
		 *
		 */
		enableMouseWheel: function() {
			// 判断是否是Firefox浏览器
			if (document.addEventListener) {
				document.addEventListener('DOMMouseScroll', scrollEvent, true);
			}

			// IE/Opera/Chrome等浏览器
			window.onmousewheel = document.onmousewheel = scrollEvent;

			function scrollEvent() {
				return true;
			}
		},
		/**
		 * 方法说明：鼠标点击事件
		 *
		 * 参数说明：无参数
		 *
		 */
		bindEvent: function() {
		    var _this = this;
			var ele = this.ele;

			// 确认按钮事件
		    $('#confirmBtn').on('click', function() {
			    var status = _this.options.confirmEvent();

			    if (status) {
				    $(ele).Alerts({
					    title: '系统提示',
					    message: '提交成功!',
					    center: true,
					    hideCancelBtn: true,
					    confirmEvent: function() {
					    	// 启用鼠标滚动事件
						    if(_this.options.scrollEvent) {
							    _this.enableMouseWheel();
						    }

						    // 关闭弹窗
						    $(ele).empty().hide();

						    return false;
					    }
				    });
			    } else {
			    	// 启用鼠标滚动事件
			    	if(_this.options.scrollEvent) {
					    _this.enableMouseWheel();
				    }

				    // 关闭弹窗
				    $(ele).empty().hide();
			    }
            });

			// 取消按钮事件
			$('#cancelBtn').on('click', function() {
				// 关闭弹窗
                $(ele).hide().empty();

                // 启用鼠标滚动事件
				_this.enableMouseWheel();
			});

			// 关闭按钮事件
			$('#closeBtn').on('click', function() {
				// 关闭弹窗
                $(ele).hide().empty();

                // 启用鼠标滚动事件
				_this.enableMouseWheel();
			});
        }
    };

    // 判断组件名称是否被使用
    if (!$.fn.Alerts) {
        $.fn.Alerts = function(options) {
            return new Alerts($(this), options);
        }
    } else {
        throw new Error('Name conflict, please rename your method name！');
    }

})(jQuery, window, document);