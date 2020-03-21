import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {selectIsUsed} from '@/mycomponents/commonComp';
import {CommonConnectState} from '@/models/commonDefines';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-权限操作
// 业务点：1. 不需要展开按钮
//        2. 操作编码 新建时可以填写，不能重复；不能修改
class TsOprInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsOpr';
  }
  getDefaultValues(){
    return {};
  }
  componentDidMount() {
    super.componentDidMount();
  }
  getRows=():ReactNode=>{
    return (<Row>
              {this.getColInput( "操作编码:","oprCode",this.getInputOnlyAdd(),true)}
              {this.getCol( "操作名称:","oprName",true)}
              {this.getCol( "操作描述:","oprDesc")}
              {this.getColInput( "是否可用:","isUsed",selectIsUsed(),true)}
              {this.getCol( "支持模块:","supModule")}
            </Row>);
  }
  render(){
      return super.render();
  }

};

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsOprInfoPage));