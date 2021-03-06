
var weiquan = {
    page: 1,
    lastId: 0,
    loadCount: 1,
    url: '',
    type: 'all',
    noMoreNextPage: false,
    isLoadingWeibo: false,
    isLoadMoreVisible: function () {
        var visibleHeight = $(window.top).height();
        var loadMoreOffset = $('#load_more').offset();

        return visibleHeight + $(window).scrollTop() >= loadMoreOffset.top;
    },
    loadNextPage: function () {
        if (this.loadCount == 3) {
            $('#index_weibo_page').show();
        }

        if (this.page == 1 && this.loadCount < 3) {
            this.loadCount++;
            this.loadWeiquanList();
        }

        if (this.page > 1) {
            this.loadWeiquanList();
        }
    },
    reloadWeiquanList: function () {
        this.loadCount = 1;
        this.loadWeiquanList(1, function () {
            this.clearWeiboList();
            this.page = 1;
        });
    },
    loadWeiquanList: function () {
        //默认载入第1页
        if (this.page == undefined) {
            this.page = 1;
        }
        //通过服务器载入微博列表
        this.isLoadingWeibo = true;
        $('#load_more_text').html('<img style="margin-top:80px" src="' + ThinkPHP.ROOT + '/Application/Weiquan/Static/images/loading-new.gif"/>');
        $.get(this.url, {page: this.page, lastId: this.lastId, type: this.type, loadCount: this.loadCount}, function (a) {
        	if (a.status == 0) {
        		alert(111);
                weiquan.noMoreNextPage = true;
                $('#load_more_text').text('没有了');
            }
            $('#weibo_list').append(a);
            $('#load_more_text').text('');
            weiquan.isLoadingWeibo = false;
            weiquan_bind();
            bind_atwho();

        });
    },
    clearWeiquanList: function () {
        this.page = 0;
        $('#weibo_list').html('');
    }

}


var bind_weiquan_popup = function () {
    $('.popup-gallery').each(function () {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: '正在载入 #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">图片 #%curr%</a> 无法被载入.',
                titleSrc: function (item) {
                    return '';
                },
                verticalFit: false
            }
        });
    });
}


$(function () {
    $('#weibo_content').keypress(function (e) {
        if (e.ctrlKey && e.which == 13 || e.which == 10) {
            $(this).parents('.weibo_post_box').find("[data-role='send_weiquan']").click();
        }
    });
    send_weiquan();
})

var send_weiquan = function () {
    $('[data-role="send_weiquan"]').unbind('click');
    $('[data-role="send_weiquan"]').click(function () {
        var $this = $(this);
        var $hook_show = $this.parents('.weibo_post_box').find('#hook_show');
        var extra = $hook_show.find('.extra').serialize();
        var feedType = $hook_show.find('[name="feed_type"]').val();
        //获取参数
        var url = $(this).attr('data-url');
        var content = $(this).parents('.weibo_post_box').find('#weibo_content').val();
        var button = $(this);
        var originalButtonText = button.val();
        var attach_ids = '';
        var $attach_ids = $(this).parents('.weibo_post_box').find('[name="attach_ids"]');
        if (typeof ($attach_ids) != 'undefined' && $attach_ids.val() != '') {
            attach_ids = $attach_ids.val();
        }
        //发送到服务器
        if (typeof feedType == 'undefined') {
            feedType = 'feed';
        }
        $.post(url, {content: content, type: feedType, attach_ids: attach_ids, extra: extra}, function (a) {
            handleAjax(a);
            if (a.status) {
                button.attr('class', 'btn btn-primary');
                button.val(originalButtonText);
                if (MODULE_NAME == 'Weiquan' && ACTION_NAME == 'index') {
                    $('#weibo_list').prepend(a.html);
                    weiquan_bind();
                    bind_atwho();
                }
                clear_weiquan();
                var html = "还可以输入" + initNum + "个字";
                $('.show_num_quick').html(html);
                $('.show_num').html(html);
                $('.XT_face').remove();
                insert_image.close();
                $('.mfp-close').click();
                $('#hook_show').html('');
            }
        });
    });
}
var WEIQUAN_CONTENT_CLASS = '.weibo_post_box';


insert_topic = {
    find: function (obj) {
        return $(this.obj).parents(WEIQUAN_CONTENT_CLASS).find(obj);
    },
    obj: 0,
    InsertTopic: function (obj) {
        this.obj = obj;
        var textbox = this.find("#weibo_content");
        var text = '请在这里输入自定义话题';
        textbox.val(textbox.val() + "#" + text + "#");
        var len = textbox.val().length;
        textbox.selectRange(len - text.length - 1, len - 1);
    }
}



$(function () {
    $.fn.selectRange = function (start, end) {
        return this.each(function () {
            if (this.setSelectionRange) {
                this.focus();
                this.setSelectionRange(start, end);
            } else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
    };

})

insert_image = {
    find: function (obj) {
        return $(this.obj).parents(WEIQUAN_CONTENT_CLASS).find(obj);
    },
    obj: 0,
    insertImage: function (obj) {
        if (insert_image.obj != 0)
            insert_image.close();
        insert_image.obj = obj;
        this.find('#insert_image').attr('onclick', 'insert_image.showBox()');
        var box_url = this.find('#box_url').val();
        $.post(U('weiquan/type/imagebox'), {}, function (res) {
            var html = '<div class="XT_image XT_insert"><div class="triangle sanjiao" style="margin-left: 30px;"></div><div class="triangle_up sanjiao"  style="margin-left: 30px;"></div>' +
                    '<div class="XT_face_main XT_insert_image" style="margin-left: 0px;"><div class="XT_face_title"><span class="XT_face_bt" style="float: left"><span>共&nbsp;<span id="upload_num_' + res.unid + '">0</span>&nbsp;张，还能上传&nbsp;<span id="total_num_' + res.unid + '">' + res.total + '</span>&nbsp;张（按住ctrl可选择多张）</span></span>' +
                    '<a onclick="insert_image.close()" class="XT_face_close">X</a></div><div id="face" style="padding: 10px;">' + res.html + '</div></div></div>';
            insert_image.find('#hook_show').html(html);
        }, 'json');
    },
    close: function () {
        this.find('.XT_image').remove();
        this.find('.attach_ids').remove();
        this.find('#insert_image').attr('onclick', 'insert_image.insertImage(this)');
        this.obj = 0;
    },
    showBox: function () {
        $('.XT_image').css('z-index', '1005');
    }


}





var weiquan_comment = function () {
    $('[data-role="weibo_comment_btn"]').unbind('click');
    $('[data-role="weibo_comment_btn"]').click(function (e) {
        var weibo_id = $(this).attr('data-weibo-id');
        var weiboCommentList = $('#weibo_' + weibo_id + ' .weibo-comment-list');
        if (weiboCommentList.is(':visible')) {
            hide_weiquan_comment_list(weiboCommentList);
        } else {
            show_weiquan_comment_list(weiboCommentList);
        }
        //取消默认动作
        e.preventDefault();
        return false;
    })
}

var show_weiquan_comment_list = function (weiboCommentList) {

    if (weiboCommentList.text().trim() == '') {
        var weibo_id = weiboCommentList.attr('data-weibo-id');
        $.post(U('Weiquan/Index/loadComment'), {weiquan_id: weibo_id}, function (res) {
            var html = '<div class="col-xs-12"><div class="light-jumbotron weibo-comment-block" style="padding: 1em 2em;"><div class="weibo-comment-container"></div></div></div>';
            weiboCommentList.html(html);
            weiboCommentList.find('.weibo-comment-container').html(res.html);
            weiquan_bind();
            bind_atwho();
        }, 'json');
    }

    weiboCommentList.show();
    show_comment_textarea(weiboCommentList.find('.single_line'))
}

var hide_weiquan_comment_list = function (weiboCommentList) {
    weiboCommentList.hide();
}

var show_all_comment = function (weiboId) {
    $.post(U('Weiquan/Index/commentlist'), {weiquan_id: weiboId, show_more: 1}, function (res) {
        $('#show_comment_' + weiboId).append(res);
        $('#show_all_comment_' + weiboId).hide()
    }, 'json');
}

var show_comment_textarea = function (obj) {
    obj.closest('.col-xs-12').hide();
    obj.closest('.col-xs-12').next().show();
    obj.closest('.col-xs-12').next().find('textarea').focus();
}


var weiquan_reply = function () {
    $('[data-role="weibo_reply"]').unbind('click');
    $('[data-role="weibo_reply"]').click(function () {
        debugger;

        var weibo_comment = $(this).closest('.weibo_comment');
        var weibo_id = weibo_comment.attr('data-weibo-id');
        var comment_id = weibo_comment.attr('data-comment-id');
        var nickname = $(this).attr('data-user-nickname');
        var weibo = $('#weibo_' + weibo_id);
        var textarea = $('.weibo-comment-content', weibo);
        var content = textarea.val();
        var weiboToCommentId = $('[name="reply_id"]', weibo);

        show_comment_textarea($('.single_line', weibo));

        weiboToCommentId.val(comment_id);
        textarea.focus();
        textarea.val('回复 @' + nickname + ' ：');
    })
}


var do_comment = function () {
    $('[data-role="do_comment"]').unbind('click');
    $('[data-role="do_comment"]').click(function () {

        var weiboId = $(this).attr('data-weibo-id');


        var weibo = $('#weibo_' + weiboId);
        var content = $('.weibo-comment-content', weibo).val();
        var url = U('Weiquan/Index/doComment');
        var commitButton = $(this);
        var weiboCommentList = $('.weibo-comment-list', weibo);
        var originalButtonText = commitButton.text();
        commitButton.text('正在发表...').addClass('disabled');
        var weiboToCommentId = $('[name="reply_id"]', weibo);
        var comment_id = weiboToCommentId.val();
        $.post(url, {weiquan_id: weiboId, content: content, comment_id: comment_id}, function (a) {
            handleAjax(a);
            if (a.status) {

                if (weibo_comment_order == 1) {
                    var comment_list = $('#show_comment_' + weiboId)
                    comment_list.attr('data-comment-count', parseInt(comment_list.attr('data-comment-count')) + 1)
                    var count = comment_list.attr('data-comment-count');
                    weiquan_page(weiboId, Math.ceil(count / 10));
                } else {
                    $('#show_comment_' + weiboId).prepend(a.html);
                }
                commitButton.text(originalButtonText);
                commitButton.removeClass('disabled');
                $('.weibo-comment-content', weibo).val('');
                $('.XT_face').remove();
                weiquan_bind();
            } else {
                commitButton.text(originalButtonText);
                commitButton.removeClass('disabled');
            }
        });

    })
}

var weiquan_page = function (weibo_id, page) {
    $.post(U('Weiquan/Index/commentlist'), {weiquan_id: weibo_id, page: page}, function (res) {
        $('#show_comment_' + weibo_id).html(res);
        weiquan_bind();
        if (page == 1) {
            $('#show_all_comment_' + weibo_id).show()
        } else {
            $('#show_all_comment_' + weibo_id).hide()
        }
    }, 'json');
}

var weiquan_like_page = function (weiquan_id, page) {
    $.post(U('Weiquan/Index/likelist'), {weiquan_id: weiquan_id, page: page}, function (res) {
        $('#show_like_' + weiquan_id).html(res);
        weiquan_bind();        
    }, 'json');
}




/**
 * 评论微博
 * @param obj
 * @param comment_id 评论ID
 */
var comment_del = function (obj, comment_id) {

    $('[data-role="comment_del"]').unbind('click');
    $('[data-role="comment_del"]').click(function () {

        if (confirm("你确信要删除这条评论？")) {
            var weiquan_comment = $(this).closest('.weibo_comment');
            var comment_id = weiquan_comment.attr('data-comment-id');
            var url = U('Weiquan/Index/doDelComment');
            $.post(url, {comment_id: comment_id}, function (msg) {
                if (msg.status) {
                    weiquan_bind();
                    weiquan_comment.prev().fadeOut();
                    weiquan_comment.fadeOut();
                    toast.success(msg.info, '温馨提示');
                } else {
                    toast.error(msg.info, '温馨提示');
                }
            }, 'json');
        }
    });
};



var del_weiquan = function () {
    $('[data-role="del_weibo"]').unbind('click');
    $('[data-role="del_weibo"]').click(function () {

        if (confirm("你确信要删除这条动态？")) {
            var $this = $(this);
            var weibo_id = $this.attr('data-weibo-id');
            $.post(U('Weiquan/Index/doDelWeiquan'), {weiquan_id: weibo_id}, function (msg) {
                if (msg.status) {
                    weiquan_bind();
                    $this.closest('#weibo_' + weibo_id).fadeOut();
                    toast.success('删除微博成功。', '温馨提示');
                }
            }, 'json');
        }
    });
}

var weiquan_set_top = function () {
    $('[data-role="weibo_set_top"]').unbind('click');
    $('[data-role="weibo_set_top"]').click(function () {
        var weiboId = $(this).attr('data-weibo-id');
        $.post(U('weiquan/index/setTop'), {weiquan_id: weiboId}, function (msg) {
            if (msg.status) {
                toast.success(msg.info);
                setTimeout('location.reload()', 500);
            } else {
                toast.error(msg.info);
            }
        });
    })
}




var bind_repost = function () {
    $('[data-role="send_repost"]').magnificPopup({
        type: 'ajax',
        overflowY: 'scroll',
        modal: true,
        callbacks: {
            ajaxContentAdded: function () {
                // Ajax content is loaded and appended to DOM
                $('#repost_content').focus();
                console.log(this.content);
            }, open: function () {
                $('.mfp-bg').css('opacity', 0.1)
            }
        }
    });
}

$(function () {
    weiquan_bind();
    chose_topic();
    $.post(U('Core/Public/atWhoJson@'), {}, function (res) {
        atwho_config = {
            at: "@",
            data: res,
            tpl: "<li data-value='[at:${id}]'><img class='avatar-img' style='width:2em;margin-right: 0.6em' src='${avatar32}'/>${nickname}</li>",
            show_the_at: true,
            search_key: 'search_key',
            start_with_space: false
        };
        bind_atwho();
        $('#weibo_content').atwho(atwho_config);
    }, 'json')





})

var bind_lazy_load = function () {
    $("img.lazy").lazyload({effect: "fadeIn", threshold: 200, failure_limit: 100});
}

//zzl显示隐藏置顶微博
var unshow_top_weiquan_ids = function (unshow_ids, id) {
    var newArr = [];
    if (unshow_ids != undefined) {
        var attachArr = unshow_ids.split(',');
        for (var i in attachArr) {
            if (attachArr[i] !== '' && attachArr[i] !== id.toString()) {
                newArr.push(attachArr[i]);
            }
        }
    }
    newArr.push(id);
    unshow_ids = newArr.join(',');
    return unshow_ids;
}

var hide_top_weiquan = function () {
    $('[data-role="hide_top_weibo"]').unbind('click');
    $('[data-role="hide_top_weibo"]').click(function () {
        var weiboId = $(this).attr('data-weibo-id');
        $(this).parents('.top_can_hide').hide();
        if (!$('[data-role="show_all_top_weibo"]').is(':visited')) {
            $('[data-role="show_all_top_weibo"]').show();
        }
        toast.success('隐藏成功！');
        //写入cookie
        var unshow_top_weibo = $.cookie('Weibo_index_top_hide_ids');
        unshow_top_weibo = unshow_top_weibo_ids(unshow_top_weibo, weiboId);
        $.cookie('Weibo_index_top_hide_ids', unshow_top_weibo, {expires: 365});
    });
}

var show_all_top_weiquan = function () {
    $('[data-role="show_all_top_weibo"]').unbind('click');
    $('[data-role="show_all_top_weibo"]').click(function () {
        $('#top_list').children('.top_can_hide').show();
        $(this).hide();
        toast.success('操作成功！');
        //清空cookie
        $.cookie('Weibo_index_top_hide_ids', null);
    });
}
//zzl显示隐藏置顶微博 end
var weiquan_bind = function () {
    ucard();
    weiquan_reply();
    weiquan_comment();
    do_comment();
    bind_support();
    comment_del();
    del_weiquan();
    weiquan_set_top();
    bind_repost();
    bind_weiquan_popup();
    do_send_repost();
    bind_lazy_load();
    bind_single_line();
    hide_top_weiquan();
    show_all_top_weiquan();
    bind_show_video();
    bind_image();
}



var bind_image = function () {


    var openPhotoSwipe = function () {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        var options = {
            history: false,
            focus: false,
            showAnimationDuration: 0,
            hideAnimationDuration: 0

        };

        var items = [];

        $(this).children('a').each(function (index) {
            var _src = $(this).attr('data');
            var _size = $(this).attr('data-size').split('x');
            items[index] = {
                src: _src,
                w: _size[0],
                h: _size[1]
            };

        });

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
//点击图集元素时触发调用openPhotoSwipe
    $('.photos').click(openPhotoSwipe);

}
var bind_atwho = function () {
    $('.weibo-comment-content').atwho(atwho_config);
}



var clear_weiquan = function () {
    $('.weibo_post_box #weibo_content').val('');
}



var do_send_repost = function () {
    $('[data-role="do_send_repost"]').unbind('click')
    $('[data-role="do_send_repost"]').click(function () {
        //获取参数
        var url = $(this).attr('data-url');
        var content = $('#repost_content').val();
        var button = $(this);
        var originalButtonText = button.val();
        var feedType = 'repost';
        var sourceId = button.attr('data-source-id');
        var weiboId = button.attr('data-weibo-id');
        var becomment = document.getElementsByName("becomment")
        //发送到服务器
        $.post(url, {content: content, type: feedType, sourceId: sourceId, weiboId: weiboId, becomment: becomment[0].checked}, function (a) {
            handleAjax(a);
            if (a.status) {
                $('.mfp-close').click();
                button.attr('class', 'btn btn-primary');
                button.val(originalButtonText);
                if (MODULE_NAME == 'Weiquan' && ACTION_NAME == 'index' && CONTROLLER_NAME == 'Index') {
                    setTimeout(function () {
                        $('#weibo_list').prepend(a.html)
                        weiquan_bind();
                        bind_atwho();
                    }, 1000)
                }

                $('.XT_face').remove();
                insert_image.close();

            }
        });
    });
}


var to_be_number_one = function (tid) {
    $.post(U('weibo/topic/beAdmin'), {tid: tid}, function (msg) {
        handleAjax(msg);
    })
}


var show_comment = function (weiboId) {
    var obj = $('#show_comment_' + weiboId + ' > div');
    obj.show();
    $('#show_comment_' + weiboId).next().hide()
}


var bind_single_line = function () {
    $('.single_line').unbind('focus');
    $('.single_line').focus(function () {
        show_comment_textarea($(this));
    })
}



var chose_topic = function () {
    $('[data-role="chose_topic"]').click(function () {
        var $textarea = $(this).parents('.weibo_post_box').find('#weibo_content');
        $textarea.val($textarea.val() + $(this).text());
    })
}


var bind_show_video = function () {
    $('[data-role="show_video"]').click(function () {

        var html = '<embed src="' + $(this).attr('data-src') + '" wmode="transparent" allowfullscreen="true" loop="false" type="application/x-shockwave-flash" style="width: 100%;height:350px;" autostart="false"></embed>';
        $(this).html(html).removeAttr('style');
    });
}


