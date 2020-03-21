import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {selectYesNo} from '@/mycomponents/commonComp';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
import {renderYesNo} from '@/mycomponents/reportSystemComp';

class TsOprPage extends CommonPage {
    getRouteUrl(){return '/TsOpr';}
    getObjectName(){return 'TsOpr';}
    getObjectDesc(){return '权限操作';}
    getRowkey(){return 'opr_code'; }
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
            { title: "操作编码",   dataIndex: "opr_code",sorter:true},
            { title: "操作名称",   dataIndex: "opr_name"},
            { title: "操作描述",   dataIndex: "opr_desc"},
            { title: "是否可用",   dataIndex: "is_used",render: this.renderYesno,
                filters: [{text: '是',value: '1', }, { text: '否', value: '0',}]},
            { title: "支持模块",   dataIndex: "sup_module"},
        ];
    }
    getRows=():ReactNode=>{
        return (<Row>
            {this.getCol( "操作编码", "opr_code",false)}
            {this.getCol( "操作名称", "opr_name",false)}
            {this.getCol( "操作描述", "opr_desc",false)}
            {this.getColInput( "是否可用", "is_used",selectYesNo(),true)}
            {this.getCol( "支持模块", "sup_module",true)}
        </Row>);
    }
    render(){
        return super.render();
    }
}
export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsOprPage));