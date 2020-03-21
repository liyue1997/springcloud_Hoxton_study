package com.mark.user.biz.controller;

import com.mark.user.biz.bean.BizUser;
import com.mark.user.biz.service.BizUserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @description 业务用户
 * @author mark lee
 * @date 2020-03-20 17:08:20
 */
@RestController
@RequestMapping(value = "/api")
public class BizUserController {

    @Resource
    private BizUserService bizUserService;


    @ApiOperation(value="获取业务用户列表", notes="获取业务用户列表")
    @GetMapping(value = "/biz-users")
    @ResponseStatus(HttpStatus.OK)
    public List<BizUser> getBizUsers(@RequestParam(required = false, defaultValue = "0") int offset,
                                     @RequestParam(required = false, defaultValue = "500") int pagesize) throws Exception
    {
        return bizUserService.pageList(offset,pagesize);
    }

    @ApiOperation(value="获取业务用户", notes="根据id获取业务用户")
    @GetMapping(value = "/biz-users/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BizUser getBizUser(@PathVariable("id") long id) throws Exception{
        return bizUserService.load(id);
    }

    @ApiOperation(value="新增业务用户", notes="新增业务用户")
    @PostMapping("/biz-users")
    @ResponseStatus(HttpStatus.CREATED)
    public BizUser addBizUser(@RequestBody BizUser user) throws Exception {
        return bizUserService.insert(user);
    }

    @ApiOperation(value="修改业务用户", notes="修改业务用户")
    @PutMapping("/biz-users/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public BizUser editBizUser(@PathVariable("id") long id,@RequestBody BizUser user) {
        return bizUserService.update(user);
    }

    @ApiOperation(value="删除业务用户", notes="删除业务用户")
    @DeleteMapping("/biz-users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public BizUser deleteBizUser(@PathVariable("id") long id){
        return bizUserService.delete(id);
    }


}

