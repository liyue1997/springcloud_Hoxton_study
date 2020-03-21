import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row} from 'antd';
import {CommonConnectState} from '@/models/commonDefines';
import {CommonPage} from '@/mycomponents/commonList';
import {DateFormat,selectYesNo} from '@/mycomponents/commonComp';
import {renderdls,renderzone,renderYesNo} from '@/mycomponents/reportSystemComp';
import RsZoneComp from '@/mycomponents/RsZoneComp';
import RsDlsComp  from '@/mycomponents/RsDlsComp';
import { isEmpty } from '@/utils/ttool';

// @connect(({ mrszones, mrsdls }) => ({ mrszones, mrsdls }))
// @Form.create()  // 查询方法等于提交表单submit，这里用来创建form
class RsUserYwerPage extends CommonPage {

    getRouteUrl(){return '/RsUserYwer';}
    getObjectName(){return 'RsUser';}
    getObjectDesc(){return '业务操作人员';}
    getRowkey(){return 'user_id'; }
    componentDidMount() {
        super.componentDidMount();
        console.log("props",this.props);
        const { dispatch} = this.props;
        dispatch({type: `mrszones/queryAll`});
        dispatch({type: `mrsdls/queryAll`});
    }
    handleSearchValues =(values:{})=>{
        let temp={};
        if (!isEmpty(values["start_create_date"]))
            temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        if (!isEmpty(values["end_create_date"]))
            temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }
    renderdls=(text: any, record: any)=>{return renderdls(this,record)};
    renderzone=(text: any, record: any)=>{return renderzone(this,record)};
    renderYesno=(text: any, record: any)=>{return renderYesNo(this,record.is_active)};
    
    getColumns=():any[]=>{
        return  [
            { title: '用户id',   dataIndex: 'user_id',sorter:true},
            { title: '用户姓名', dataIndex: 'user_name',sorter: true,sortDirections: ['descend', 'ascend']},
            { title: '用户工号', dataIndex: 'user_number', width: 300}, // 长文本，设置一个宽度，ellipsis: true, 
            { title: '用户手机号', dataIndex: 'user_phone'},
            { title: '代理商', dataIndex: 'dls_id', render:this.renderdls},
            { title: '用户电话', dataIndex: 'user_tel'},
            { title: '区域', dataIndex: 'zone_code',render: this.renderzone},
            { title: '用户QQ号',  dataIndex: 'user_qq'},
            {title: '是否在职',  dataIndex: 'is_active',render: this.renderYesno},
            { title: '创建时间',  dataIndex: 'create_date',sorter: true,sortDirections: ['descend', 'ascend']},
        ];
    }
    
    getRows=():ReactNode=>{
        const mrszones = this.props.mrszones.data;
        const mrsdls = this.props.mrsdls.data;
        return (<Row>
            {this.getCol("用户id:",'user_id')}
            {this.getCol("用户姓名:",'user_name')}
            {this.getCol("用户工号:",'user_number')}
            {this.getCol("用户手机号:",'user_phone',true)}
            {this.getColInput("代理商:",'dls_id',<RsDlsComp rsdls={mrsdls} />,true)}
            {this.getColInput("区域:",'zone_code',<RsZoneComp rszones={mrszones} />,true)}
            {this.getCol("用户电话:",'user_tel',true)}
            {this.getCol("用户QQ号:",'user_qq',true)}
            {this.getColInput("是否在职:",'is_active',selectYesNo(),true)} 
        </Row>);
    }
    render(){
        return super.render();
    }
}

export default connect(({moprs, mrszones, mrsdls }:CommonConnectState) => ({moprs, mrszones, mrsdls }))(Form.create()(RsUserYwerPage));