import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form, Input} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-子系统模块
// 业务点：1. 不需要展开按钮
//        2. 子系统编号 新建时可以填写，不能重复；不能修改
class TsSysRoleMenuTreeInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsSysRoleMenuTree';
  }
  getDefaultValues(){
    return {};
  }
  componentDidMount() {
    super.componentDidMount();
    // const { dispatch } = this.props;
  }

  getRows=():ReactNode=>{
    return (<Row>
              {this.getCol( "菜单树编码:","treeId",true)}
              {this.getCol( "系统编码:","subsysId",true)}
              {this.getCol( "角色编码:","roleCode",true)}
              {this.getCol( "菜单:","menu",true)}
            </Row>);
  }
  render(){
      return super.render();
  }

};

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsSysRoleMenuTreeInfoPage));