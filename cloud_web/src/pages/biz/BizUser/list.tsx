import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {selectYesNo} from '@/mycomponents/commonComp';
import {CommonConnectState} from '@/models/commonDefines';
import {BizCommonPage} from '@/bizcomponents/bizcommonList';
import {renderYesNo} from '@/mycomponents/reportSystemComp';

class BizUserPage extends BizCommonPage {
    getRouteUrl(){return '/BizUser';}
    getServerName(){return 'mybatis';}
    getObjectName(){return 'biz-users';}
    getObjectDesc(){return '业务人员';}
    getRowkey(){return 'userId'; }
    componentDidMount() {
        super.componentDidMount();
    }
    handleSearchValues =(values:{})=>{
         let temp={};
        return temp;
    }
    renderYesno=(text: any, record: any)=>{return renderYesNo(this,record.is_used)};
    getColumns=():any[]=>{
        return  [
            { title: "用户编码",   dataIndex: "userId"},
            { title: "用户名称",   dataIndex: "userName",sorter:true},
            { title: "用户邮箱",   dataIndex: "userEmail"},
            { title: "用户类型",   dataIndex: "userType"},
            { title: "是否禁止",   dataIndex: "userDisabled",render: this.renderYesno,
                filters: [{text: '是',value: '1', }, { text: '否', value: '0',}]},
            { title: "最后登录日期",   dataIndex: "userLastLoginDate"},
        ];
    }
    getRows=():ReactNode=>{
        return (<Row>
            {this.getCol( "用户编码", "userId",false)}
            {this.getCol( "用户名称", "userName",false)}
            {this.getCol( "用户邮箱", "userEmail",false)}
            {this.getCol( "用户类型", "userType",true)}
            {this.getColInput( "是否禁止", "userDisabled",selectYesNo(),true)}
            {this.getCol( "最后登录日期", "userLastLoginDate",true)}
        </Row>);
    }
    render(){
        return super.render();
    }
}
export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(BizUserPage));