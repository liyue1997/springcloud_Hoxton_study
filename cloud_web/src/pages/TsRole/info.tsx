import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-权限角色模块
// 业务点：1. 不需要展开按钮
//        2. 权限编码 新建时可以填写，不能重复；不能修改
class TsRoleInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsRole';
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
              {this.getColInput( "权限编码", "roleCode",this.getInputOnlyAdd(), true)}
              {this.getCol( "权限名称", "roleName",true)}
              {this.getCol( "权限描述", "roleDesc")}
              {this.getCol( "权限排序", "orderNo",true)}
              {this.getCol( "父权限编码", "parentCode",false)}
            </Row>);
  }
  render(){
      return super.render();
  }
};

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsRoleInfoPage));