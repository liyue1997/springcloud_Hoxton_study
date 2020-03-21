package com.mark.user.biz.service;

import com.mark.user.biz.bean.BizUser;

import java.util.List;
import java.util.Map;

/**
 * @description 用户信息
 * @author 大狼狗
 * @date 2020-03-20 17:08:20
 */
public interface BizUserService {

    /**
     * 新增
     */
     BizUser insert(BizUser bizUser) throws Exception;

    /**
     * 删除
     */
     BizUser delete(long id);

    /**
     * 更新
     */
     BizUser update(BizUser bizUser);

    /**
     * 根据主键 id 查询
     */
     BizUser load(long id);

    /**
     * 分页查询
     */
     List<BizUser> pageList(int offset, int pagesize);

}

