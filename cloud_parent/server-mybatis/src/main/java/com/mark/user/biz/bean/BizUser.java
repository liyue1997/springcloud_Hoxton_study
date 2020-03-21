package com.mark.user.biz.bean;

import java.io.Serializable;
import lombok.Data;
import java.util.Date;
import java.util.List;

/**
 * @description 用户信息
 * @author 大狼狗
 * @date 2020-03-20 17:08:20
 */
@Data
public class BizUser implements Serializable {

    private static final long serialVersionUID = 1L;
    /**
     * 用户主键
     */
    private long userId;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 用户邮件
     */
    private String userEmail;

    /**
     * 用户类型
     */
    private String userType;

    /**
     * 是否禁用
     */
    private Integer userDisabled;

    /**
     * 最后登录时间
     */
    private Date userLastLoginDate;

    public BizUser() {
    }

}
