import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Row,Button, message } from 'antd';
import { CommonConnectState } from '@/models/commonDefines';
import { CommonPage } from '@/mycomponents/commonList';
import { renderOpr } from '@/mycomponents/premissionComp';
import TsRoleComp  from '@/mycomponents/premission/TsRoleComp';
import TsModuleComp  from '@/mycomponents/premission/TsModuleComp';
import { isEmpty } from '@/utils/ttool';

class TsModuleRolePage extends CommonPage {
    getRouteUrl() { return '/TsModuleRole'; }
    getObjectName() { return 'TsModuleRole'; }
    getObjectDesc() { return '菜单'; }
    getRowkey() { return 'module_role_id'; }

    componentDidMount() {
        message.info("请先选择您要查看的角色编码",5);
        const { dispatch} = this.props;
        dispatch({type: `mtsrole/queryAll`});
        dispatch({type: `mtsmodule/queryAll`});
        dispatch({type: `mtsopr/queryAll`});
        this.setState({autoQuery:false},()=>{
            super.componentDidMount();
        });
    }
    handleSearchValues = (values: {}) => {
        let temp = {};
        // if (!isEmpty(values["start_create_date"]))
        //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        // if (!isEmpty(values["end_create_date"]))
        //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }

    getSelection = (): any => {
        const rowSelection = {
            onChange: (selectedRowKeys: any, selectedRows: any) => {
                this.setState({
                    selectrows: selectedRows
                })
            },
        };
        return rowSelection;
    }
    renderoprset=(text: any, record: any)=>{return renderOpr(this,record)};
    getColumns = (): any[] => {
        return [
            { title: "角色模块编码", dataIndex: "module_role_id" },
            { title: "模块编码", dataIndex: "module_id" },
            { title: "角色编码", dataIndex: "role_code" },
            { title: "调用参数", dataIndex: "callargs" },
            { title: "权限设置", dataIndex: "oprset",render: this.renderoprset },
        ];
    }

    getRows = (): ReactNode => {
        const mtsrole = this.props.mtsrole.data;
        const mtsmodule = this.props.mtsmodule.data;
        return (<Row>
            {this.getColInput("角色编码", "role_code",<TsRoleComp tsrole={mtsrole} />, false)}
            {this.getCol("角色模块编码", "module_role_id", false)}
            {this.getColInput("模块编码", "module_id",<TsModuleComp tsmodule={mtsmodule}/>, false)}
            {this.getCol("调用参数", "callargs", true)}
            {this.getCol("权限设置", "oprset", true)}
        </Row>);
    }
    handleSearch = (e:React.FormEvent) => {
        this.state.selectrows = [];
        if (e) e.preventDefault();
        let form =this.props["form"];
        form.validateFieldsAndScroll((err:any[], values:any[]) => {
            if (isEmpty(values["role_code"])){
                message.error("请先选择角色编码");
                return;
            }
            let temp =this.handleSearchValues(values);
            this.setState({
                pages: { ...this.state.pages, page: 1 },
                queryMap: { ...values, ...temp }
            },()=>{this.queryPageData()});
        });
    };
    // handleSearch = (e:React.FormEvent) => {
    //     super.handleSearch(e);
    // };
    //多选操作按钮
    getChoosebtns =():ReactNode=>{
        return(
            <Button type="primary" style={{ marginBottom: 8,}} onClick={this.delSelectRows}>批量删除</Button>//onClick={() =>this.handleDelete(record[this.getRowkey()])}
        )
    }

    //批量删除
    delSelectRows=(e: any)=>{
        var selectrows = this.state.selectrows;
        for(let i=0;i<selectrows.length;i++){    
            this.handleDelete(selectrows[i]['module_role_id']);
        }
    }
    render() {
        return super.render(); 
    }
}

export default connect(({ moprs,mtsrole,mtsmodule,mtsopr }: CommonConnectState) => ({ moprs,mtsrole,mtsmodule,mtsopr }))(Form.create()(TsModuleRolePage));