import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Form} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
import TsOprComp from '@/mycomponents/premission/TsOprComp';
import { selectModelType } from '@/mycomponents/commonComp';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-权限模块
// 业务点：1. 不需要展开按钮
//        2. 模块编码 新建时可以填写，不能重复；不能修改
class TsUserSettingInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsUserSetting';
  }
  getDefaultValues(){
    return {};
  }
  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    dispatch({type: `mtsopr/queryAll`});
  }
 
  handleValues =(values:{})=>{
    return values;
  }
  
  // getRows=():ReactNode=>{
  //   const mtsopr = this.props.mtsopr.data;
  //   return (<Row>
  //             {this.getColInput( "模块编码:","moduleId",this.getInputOnlyAdd(),true)}
  //             {this.getCol( "模块名称:","moduleName")}
  //             {this.getCol( "调用方法:","callmethod")}
  //             {this.getCol( "调用参数:","moduleCallargs")}
  //             {this.getCol( "模块描述:","moduleDesc")}
  //             {this.getColInput( "权限设置:","oprset",<TsOprComp oprs={mtsopr}></TsOprComp>)}
  //             {this.getColInput( "权限设置:","oprset",<div style={{ display: "inline" }}><Button type="link" >常用权限</Button></div>)}
  //             {this.getColInput( "模块类型:","moduleType",selectModelType(),true)}
  //           </Row>);
  // }
  render(){
      return(<div></div>);
  }

};

export default connect(({moprs,mtsopr}:CommonConnectState) => ({moprs,mtsopr}))(Form.create()(TsUserSettingInfoPage));