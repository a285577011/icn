<?php
/**
 * 所属项目 OnePlus.
 * 开发者: 奕潇
 * 创建日期: 4/9/14
 * 创建时间: 12:15 PM
 * 版权所有 嘉兴想天信息科技有限公司(www.ourstu.com)
 */

namespace Weiquan\Model;

use Think\Model;

class TopWeiquanModel extends Model
{
    protected $tableName='weiquan_top';
    /**获取置顶微博列表
     * @param int $limit
     * @return mixed
     */
  /*  public function getTopWeiquan($limit = 10)
    {
        $list = $this->limit($limit)->select();
        foreach ($list as $key=>&$li) {
            if(D('Weiquan/Weiquan')->where(array('id'=>$li['weibo_id'],'status'=>1))->count()==0)
            {
                unset($list[$key]);
                continue;
            }
            $li['weibo'] = D('Weiquan/Weiquan')->find($li['weibo_id']);
            $li['weibo']['user']=query_user(array('avatar64','username','rank_link','space_link','space_url','uid'),$li['weibo']['uid']);
        }
        unset($li);
        return ($list);
    }*/
} 