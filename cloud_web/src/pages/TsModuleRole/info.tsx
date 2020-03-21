import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row , Form, Input,Button} from 'antd';
import {CommonInfoPage} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
import TsRoleComp  from '@/mycomponents/premission/TsRoleComp';
import TsModuleComp  from '@/mycomponents/premission/TsModuleComp';
import TsOprComp from '@/mycomponents/premission/TsOprComp';
// 创建人:孙晓燕  时间:2020-1-9
// 权限系统-子系统模块
// 业务点：1. 不需要展开按钮
//        2. 子系统编号 新建时可以填写，不能重复；不能修改
var roleCodevalue: string,moduleIdvalue: string;
class TsModuleRoleInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'TsModuleRole';
  }
  getDefaultValues(){
    return {};
  }
  getcallargsoprsetValues(value: string){
    this.props.mtsmodule.data.find()
    return {};
  }
  componentDidMount() {
    super.componentDidMount();
    const { dispatch} = this.props;
    dispatch({type: `mtsrole/queryAll`});
    dispatch({type: `mtsmodule/queryAll`});
    dispatch({type: `mtsopr/queryAll`});
  }
  
  getRows=():ReactNode=>{
    const mtsrole = this.props.mtsrole.data;
    const mtsmodule = this.props.mtsmodule.data;
    const mtsopr = this.props.mtsopr.data;
    return (<Row>
              {this.getColInput( "角色模块编码:","moduleRoleId",<Input disabled/>,true)}
              {this.getColInput( "角色编码:","roleCode",this.handeledit(mtsrole),true)}
              {this.getColInput( "模块编码:","moduleId",this.handeledit(mtsmodule),true)}
              {this.getCol( "调用参数:","callargs",false)}
              {this.getColInput( "权限设置:","oprset",<TsOprComp oprs={mtsopr}></TsOprComp>)}
    </Row>);
  }
  //修改新建判断
  handeledit=(tool:any)=>{
    if(this.state.edit==="add"){
      if(tool==this.props.mtsrole.data){
        return <TsRoleComp tsrole={tool} onChange={this.handleRoleselectChange}/>;
      }else{
        return <TsModuleComp tsmodule={tool} onChange={this.handleModuleselectChange}/>;
      }
    }
    else{
      return this.getInputOnlyAdd();
    }
  }
  //权限编码
  handleRoleselectChange= (value: string) => {
    roleCodevalue=value;
    this.props.form.setFieldsValue({
      moduleRoleId: (roleCodevalue||'')+'_'+(moduleIdvalue||''),
    });
  };

  //模块编码
  handleModuleselectChange= (value: string) => {
    moduleIdvalue=value;
    const module=this.props.mtsmodule.data.find((item: { module_id: string; })=>{return item.module_id==value});
    this.props.form.setFieldsValue({
      moduleRoleId: (roleCodevalue||'')+'_'+(moduleIdvalue||''),
      callargs:module==null?'': module.callmethod,
      oprset:module==null?'':   module.oprset
    });
  };

  render(){
      return super.render();
  }

};

export default connect(({moprs,mtsrole,mtsmodule,mtsopr}:CommonConnectState) => ({moprs,mtsrole,mtsmodule,mtsopr}))(Form.create()(TsModuleRoleInfoPage));