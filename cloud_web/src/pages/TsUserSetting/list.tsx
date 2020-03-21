import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Tree ,Icon} from 'antd';
import { CommonConnectState } from '@/models/commonDefines';
import { CommonPage } from '@/mycomponents/commonList';
// import { renderOpr } from '@/mycomponents/premissionComp';
// import { selectModelType } from '@/mycomponents/commonComp';
// import { isEmpty } from '@/utils/ttool';
const { TreeNode,DirectoryTree } = Tree;
class TsUserSettingPage extends CommonPage {
    getRouteUrl() { return '/TsUserSetting'; }
    getObjectName() { return 'TsUserSetting'; }
    getObjectDesc() { return '测试'; }
    //getRowkey(){return 'module_id'; }
    componentDidMount() {
        super.componentDidMount();
        const { dispatch} = this.props;

        dispatch({type: `mtsopr/queryAll`});
        dispatch({type: `mtsmodeltype/queryAll`});
    }
    // handleSearchValues =(values:{})=>{
    //      let temp={};
    //     // if (!isEmpty(values["start_create_date"]))
    //     //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
    //     // if (!isEmpty(values["end_create_date"]))
    //     //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
    //     return temp;
    // }

    // renderoprset=(text: any, record: any)=>{return renderOpr(this,record)};
    // getColumns=():any[]=>{
    //     return  [
    //         { title: "模块编码",   dataIndex: "module_id"},
    //         { title: "模块名称",   dataIndex: "module_name"},
    //         { title: "调用方法",   dataIndex: "callmethod"},
    //         { title: "调用参数",   dataIndex: "module_callargs"},
    //         { title: "模块描述",   dataIndex: "module_desc"},
    //         { title: "权限设置",   dataIndex: "oprset",render: this.renderoprset},
    //         { title: "模块类型",   dataIndex: "module_type"}, 
    //     ];
    // }

    // getRows=():ReactNode=>{
    //     return (<Row>
    //         {this.getCol( "模块编码", "module_id",false)}
    //         {this.getCol( "模块名称", "module_name",false)}
    //         {this.getCol( "调用方法", "callmethod",false)}
    //         {this.getCol( "调用参数", "module_callargs",true)}
    //         {this.getCol( "模块描述", "module_desc",true)}
    //         {this.getCol( "权限设置", "oprset",true)}
    //         {this.getColInput( "模块类型", "module_type",selectModelType(),true)}
    //     </Row>);

    // }
    onSelect = (keys: any, event: any) => {
        console.log('Trigger Select', keys, event);
    };
    
    render() {
        return (
            <DirectoryTree  
            showLine 
            onSelect={this.onSelect}>
                <TreeNode title="admin" key="admin">
                    <TreeNode icon={<Icon type="carry-out" />} title="admin 0-0" key="0-0-0" isLeaf />
                    <TreeNode icon={<Icon type="carry-out" />} title="admin 0-1" key="0-0-1" isLeaf />
                </TreeNode>
                <TreeNode title="user" key="user">
                    <TreeNode icon={<Icon type="carry-out" />} title="user 1-0" key="0-1-0" isLeaf />
                    <TreeNode icon={<Icon type="carry-out" />} title="user 1-1" key="0-1-1" isLeaf />
                </TreeNode>
            </DirectoryTree>);
    }
}

export default connect(({moprs,mtsopr}:CommonConnectState) => ({moprs,mtsopr}))(Form.create()(TsUserSettingPage));