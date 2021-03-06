<?php
/**
 * 路由配置
 */
return array(

    /**
     * 路由的key必须写全称,且必须全小写. 比如: 使用'wap/index/index', 而非'wap'.
     */
    'router' => array(

        /*系统首页*/
        'home/index/index'          =>  'home',
        'home/index/hot'            =>  'hot',
        'home/index/newest'         =>  'newest',

        /*活动*/
        'event/index/index'         => 'event/[type_id]/p_[page]',
        'event/index/myevent'       => 'myevent/[type_id]',
        'event/index/detail'        => 'event/detail_[id]',
        'event/index/member'        => 'event/member_[id]',
        'event/index/edit'          => 'event/edit_[id]',
        'event/index/add'           => 'event/add',

        /*论坛*/
        'forum/index/index'                     => 'forum',
        'forum/index/forum'                     => 'forum/[id]/p_[page]',
        'forum/index/edit'                      => 'forum/edit_[forum_id]/p_[post_id]',
        'forum/index/detail'                    => 'forum/detail_[id]',
        'forum/index/search'                    => 'forum/search',
        'forum/index/look'                      => 'forum/look',
        'forum/index/lists'                     => 'forum/lists',

        /*资讯*/
        'news/index/index'                      => 'news/[category]/p_[page]',
        'news/index/my'                         => 'mynews/p_[page]',
        'news/index/detail'                     => 'news/detail_[id]',
        'news/index/edit'                       => 'news/edit_[id]',

        /*用户中心*/
        'ucenter/index/index'                => 'ucenter/[uid]',
        'ucenter/index/following'            => 'ucenter/following_[uid]',
        'ucenter/index/applist'              => 'ucenter/applist_[type]/[uid]',
        'ucenter/index/information'          => 'ucenter/information_[uid]',
        'ucenter/index/fans'                 => 'ucenter/fans_[uid]',
        'ucenter/index/rank'                 => 'ucenter/rank_[uid]',
        'ucenter/index/rankverifywait'       => 'ucenter/rankwait_[uid]',
        'ucenter/index/rankverifyfailure'    => 'ucenter/rankfailure_[uid]',
        'ucenter/index/rankverify'           => 'ucenter/rankverify_[uid]',
        'ucenter/config/index'               => 'ucenter/conf',
        'ucenter/config/tag'                 => 'ucenter/tag',
        'ucenter/config/avatar'              => 'ucenter/avatar',
        'ucenter/config/password'            => 'ucenter/password',
        'ucenter/config/score'               => 'ucenter/score',
        'ucenter/config/role'                => 'ucenter/role',
        'ucenter/config/other'               => 'ucenter/other',
        'ucenter/message/session'            => 'ucenter/session',
        'ucenter/message/message'            => 'ucenter/msg_[tab]',
        'ucenter/collection/index'           => 'ucenter/collection_[type]',
        'ucenter/invite/invite'              => 'ucenter/invite',
        'ucenter/invite/index'               => 'ucenter/invite_create',

        /*注册登录*/
        'ucenter/member/login'                  => 'login',
        'ucenter/member/step'                   => 'register/step_[step]',
        'ucenter/member/register'               => 'register/[type]/c_[code]',

        /*分类信息*/
        'cat/index/index'                       => 'cat',
        'cat/index/li'                          => 'cat/li_[name]',
        'cat/index/info'                        => 'cat/info_[info_id]',
        'cat/index/post'                        => 'cat/post_[name]',
        'cat/center/my'                         => 'cat/my_[id]',
        'cat/center/fav'                        => 'cat/fav_[id]',
        'cat/center/rec'                        => 'cat/rec',
        'cat/center/send'                       => 'cat/send',
        'cat/center/post'                       => 'usercat/post',

        /*充值*/
        'recharge/index/recharge'               => 'recharge',
        'recharge/index/rechargelist'           => 'rechargelist/[payok]',
        'recharge/index/withdrawlist'           => 'withdrawlist/[payok]',
    ),

);