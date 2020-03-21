import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form, Input} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {selectIsUsed} from '@/mycomponents/commonComp';
import {CommonConnectState} from '@/models/commonDefines';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-子系统模块
// 业务点：1. 不需要展开按钮
//        2. 子系统编号 新建时可以填写，不能重复；不能修改
class TsMenuModuleInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsMenuModule';
  }
  getDefaultValues(){
    return {};
  }
  componentDidMount() {
    super.componentDidMount();
    // const { dispatch } = this.props;
    console.log("TsMenuModuleInfoPage componentDidMount",this.props.location.query);
  }

  getRows=():ReactNode=>{
    return (<Row>
              {this.getColInput( "菜单编号:","menuCode",this.getInputOnlyAdd(),true)}
              {this.getCol( "菜单名称:","menuName",true)}
              {this.getColInput( "是否子节点:","isLeaf",selectIsUsed(),true)}
              {this.getCol( "菜单层级:","menuLevel")}
              {this.getCol( "菜单图片:","menuIcon")}
              {this.getCol( "菜单顺序:","menuOrder",true)}
              {this.getCol( "模块编码:","moduleId")}
              {this.getCol( "父菜单编码:","parentMenuCode")}
              {this.getCol( "子系统编码:","subsysId",true)}
              {this.getCol( "菜单参数:","menuArgs")}
            </Row>);
  }
  render(){
     return super.render();
  }

};

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsMenuModuleInfoPage));