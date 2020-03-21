import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
// import { isEmpty } from '@/utils/ttool';

class TsRolePage extends CommonPage {

    getRouteUrl(){return '/TsRole';}
    getObjectName(){return 'TsRole';}
    getObjectDesc(){return '权限角色';}
    getRowkey(){return 'role_code'; }
    componentDidMount() {
        super.componentDidMount();
        // const { dispatch} = this.props;
    }
    handleSearchValues =(values:{})=>{
         let temp={};
        // if (!isEmpty(values["start_create_date"]))
        //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        // if (!isEmpty(values["end_create_date"]))
        //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }
    
    getColumns=():any[]=>{
        return  [
            { title: "权限编码",   dataIndex: "role_code"},
            { title: "权限名称",   dataIndex: "role_name"},
            { title: "权限描述",   dataIndex: "role_desc"},
            { title: "权限排序",   dataIndex: "order_no", sorter:true},
            { title: "父权限编码", dataIndex: "parent_code"},
        ];
    }
    
    getRows=():ReactNode=>{
        return (<Row>
            {this.getCol( "权限编码:","role_code")}
            {this.getCol( "权限名称:","role_name")}
            {this.getCol( "权限描述:","role_desc")}
            {this.getCol( "权限排序:","order_no",true)}
            {this.getCol( "父权限编码:","parent_code",true)}

        </Row>);
    }
    render(){
        return super.render();
    }
}

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsRolePage));