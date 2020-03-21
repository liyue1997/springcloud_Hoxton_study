import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form, Input} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-子系统模块
// 业务点：1. 不需要展开按钮
//        2. 子系统编号 新建时可以填写，不能重复；不能修改
class TsSubsysInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsSubsys';
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
              {this.getColInput("系统id",'subsysId',this.getInputOnlyAdd(),true)}
              {this.getCol("系统名称:",'subsysName',true)}
              {this.getCol("系统描述:",'subsysDesc',true)}
            </Row>);
  }
  render(){
      return super.render();
  }

};

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsSubsysInfoPage));