import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
import { renderOpr,rendermoduleType} from '@/mycomponents/premissionComp';
import {selectModelType} from '@/mycomponents/commonComp';
// import { isEmpty } from '@/utils/ttool';

class TsModulePage extends CommonPage {

    getRouteUrl(){return '/TsModule';}
    getObjectName(){return 'TsModule';}
    getObjectDesc(){return '权限模块';}
    getRowkey(){return 'module_id'; }
    componentDidMount() {
        super.componentDidMount();
        const { dispatch} = this.props;
        
        dispatch({type: `mtsopr/queryAll`});
        dispatch({type: `mtsmodeltype/queryAll`});
    }
    handleSearchValues =(values:{})=>{
         let temp={};
        // if (!isEmpty(values["start_create_date"]))
        //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        // if (!isEmpty(values["end_create_date"]))
        //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }
    rendermoduletype=(text: any, record: any)=>{return rendermoduleType(this,record)};
    renderoprset=(text: any, record: any)=>{return renderOpr(this,record)};
    getColumns=():any[]=>{
        return  [
            { title: "模块编码",   dataIndex: "module_id"},
            { title: "模块名称",   dataIndex: "module_name"},
            { title: "调用方法",   dataIndex: "callmethod"},
            { title: "调用参数",   dataIndex: "module_callargs"},
            { title: "模块描述",   dataIndex: "module_desc"},
            { title: "权限设置",   dataIndex: "oprset",render: this.renderoprset},
            { title: "模块类型",   dataIndex: "module_type",render: this.rendermoduletype}, 
        ];
    }
    
    getRows=():ReactNode=>{
        return (<Row>
            {this.getCol( "模块编码", "module_id",false)}
            {this.getCol( "模块名称", "module_name",false)}
            {this.getCol( "调用方法", "callmethod",false)}
            {this.getCol( "调用参数", "module_callargs",true)}
            {this.getCol( "模块描述", "module_desc",true)}
            {this.getCol( "权限设置", "oprset",true)}
            {this.getColInput( "模块类型", "module_type",selectModelType(),true)}
        </Row>);
     
    }
    render(){
        return super.render();
    }
}

export default connect(({moprs,mtsopr}:CommonConnectState) => ({moprs,mtsopr}))(Form.create()(TsModulePage));