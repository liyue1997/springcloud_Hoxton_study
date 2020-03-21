package com.mark.user.biz.service.impl;

import com.mark.user.biz.bean.BizUser;
import com.mark.user.biz.dao.BizUserMapper;
import com.mark.user.biz.service.BizUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description 用户信息
 * @author 大狼狗
 * @date 2020-03-20 17:08:20
 */
@Service
public class BizUserServiceImpl implements BizUserService {

    @Resource
    private BizUserMapper bizUserMapper;


    @Override
    public BizUser insert(BizUser bizUser) throws Exception {

        // valid
        if (bizUser == null) {
            throw new Exception("新增对象为空");
        }

        long ret =bizUserMapper.insert(bizUser);
        return bizUser;
    }


    @Override
    public BizUser delete(long id) {
        long ret = bizUserMapper.delete(id);
        return null;
    }


    @Override
    public BizUser update(BizUser bizUser) {
        long ret = bizUserMapper.update(bizUser);
        return bizUser;
    }


    @Override
    public BizUser load(long id) {
        return bizUserMapper.load(id);
    }


    @Override
    public List<BizUser> pageList(int offset, int pagesize) {

        List<BizUser> pageList = bizUserMapper.pageList(offset, pagesize);
        int totalCount = bizUserMapper.pageListCount(offset, pagesize);

        // result
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("pageList", pageList);
        result.put("totalCount", totalCount);

        return pageList;
    }

}

