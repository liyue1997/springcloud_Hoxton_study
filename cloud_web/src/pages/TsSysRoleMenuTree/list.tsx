import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row, Button} from 'antd';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
import TsRoleComp from '@/mycomponents/premission/TsRoleComp';
import TsSubsysComp from '@/mycomponents/premission/TsSubsysComp';
import { rendermenutree } from '@/mycomponents/reportSystemComp';
// import { isEmpty } from '@/utils/ttool';

class TsSysRoleMenuTreePage extends CommonPage {

    getRouteUrl(){return '/TsSysRoleMenuTree';}
    getObjectName(){return 'TsSysRoleMenuTree';}
    getObjectDesc(){return '菜单';}
    getRowkey(){return 'tree_id'; }
    componentDidMount() {
        super.componentDidMount();
        const { dispatch} = this.props;
        dispatch({type: `mtsrole/queryAll`});
        dispatch({type: `mtsSubsys/queryAll`});
    }
    handleSearchValues =(values:{})=>{
         let temp={};
        // if (!isEmpty(values["start_create_date"]))
        //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        // if (!isEmpty(values["end_create_date"]))
        //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }
    rendermenutree=(text: any, record: any)=>{return rendermenutree(this,record.menu)};
    getColumns=():any[]=>{
        return  [
            { title: "菜单树编码",   dataIndex: "tree_id"},
            { title: "系统编码",   dataIndex: "subsys_id"},
            { title: "角色编码",   dataIndex: "role_code"},
            { title: "菜单",   dataIndex: "menu",width:800,render: this.rendermenutree},
        ];
    }
    
    getRows=():ReactNode=>{
      const mtsrole = this.props.mtsrole.data;
      const mtsSubsys = this.props.mtsSubsys.data;
        return (<Row>
            {this.getCol( "菜单树编码", "tree_id",false)}
            {this.getColInput( "系统编码", "subsys_id",<TsSubsysComp tsSubsys={mtsSubsys} />,false)}
            {this.getColInput( "角色编码", "role_code",<TsRoleComp tsrole={mtsrole} />,false)}
            {this.getCol( "菜单", "menu",true)}
        </Row>);
     
    }
    
  handleMenuTree = (e:React.MouseEvent) => {
    console.log("生成菜单树");
    const { dispatch} = this.props;
    dispatch({type: `mtsmenutree/createtree`});
    this.setState({
      moduleCode:this.props.location.query.moduleCode,
      queryparams:{...this.props.location.query}
    });
    this.queryPageData();
  };
  getbuttons=()=>{
    const moprs = this.getMOprs();
      return (
    <Button className={"createtreebtn"} icon="branches" style={{ marginLeft: 8,display:moprs.indexOf("CREATETREE")>=0?"inline":"none" }} type="primary" onClick={this.handleMenuTree}>生成菜单树</Button>
      );
  }
    render(){
        return super.render();
    }
}

export default connect(({moprs,mtsmenutree,mtsrole,mtsSubsys}:CommonConnectState) => ({moprs,mtsmenutree,mtsrole,mtsSubsys}))(Form.create()(TsSysRoleMenuTreePage));