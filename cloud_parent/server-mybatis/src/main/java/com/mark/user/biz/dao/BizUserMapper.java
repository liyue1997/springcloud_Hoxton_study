package com.mark.user.biz.dao;

import com.mark.user.biz.bean.BizUser;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * @description 用户信息
 * @author 大狼狗
 * @date 2020-03-20 17:08:20
 */
@Mapper
@Repository
public interface BizUserMapper {

    /**
     * 新增
     * @author 大狼狗
     * @date 2020/03/20
     **/
     long insert(BizUser bizUser);

    /**
     * 刪除
     * @author 大狼狗
     * @date 2020/03/20
     **/
    long delete(long id);

    /**
     * 更新
     * @author 大狼狗
     * @date 2020/03/20
     **/
    long update(BizUser bizUser);

    /**
     * 查询 根据主键 id 查询
     * @author 大狼狗
     * @date 2020/03/20
     **/
    BizUser load(long id);

    /**
     * 查询 分页查询
     * @author 大狼狗
     * @date 2020/03/20
     **/
    List<BizUser> pageList(int offset,int pageSize);

    /**
     * 查询 分页查询 count
     * @author 大狼狗
     * @date 2020/03/20
     **/
    int pageListCount(int offset,int pageSize);

}

