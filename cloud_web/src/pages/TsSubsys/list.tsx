import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
// import { isEmpty } from '@/utils/ttool';

class TsSubsysPage extends CommonPage {

    getRouteUrl(){return '/TsSubsys';}
    getObjectName(){return 'TsSubsys';}
    getObjectDesc(){return '子系统';}
    getRowkey(){return 'subsys_id'; }
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
            { title: '系统id',   dataIndex: 'subsys_id'},
            { title: '系统名称', dataIndex: 'subsys_name'},
            { title: '系统描述', dataIndex: 'subsys_desc'}, 
        ];
    }
    
    getRows=():ReactNode=>{
        return (<Row>
            {this.getCol("系统id:",'subsys_id')}
            {this.getCol("系统名称:",'subsys_name')}
            {this.getCol("系统描述:",'subsys_desc')}
        </Row>);
     
    }
    render(){
        return super.render();
    }
}

export default connect(({moprs}:CommonConnectState) => ({moprs}))(Form.create()(TsSubsysPage));