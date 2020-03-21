import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Tree, Icon, Row, Layout, message, Modal } from 'antd';
import { CommonConnectState } from '@/models/commonDefines';
import { IPageData } from '@/mycomponents/commonList';
//右键菜单模块
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './index.less';
import { CommonInfoPage, IObjectData } from '@/mycomponents/commonInfo';
import { selectIsUsed } from '@/mycomponents/commonComp';
import TsSubsysComp from '@/mycomponents/premission/TsSubsysComp';
// import { isEmpty } from '@/utils/ttool';
const { TreeNode } = Tree;
const { Sider, Content } = Layout;
const attributes = {
    className: 'test',
}
interface Subsyslist {
    subsys_name: string;
    subsys_id: string;
}
class TsMenuModulePage extends CommonInfoPage {
    getObjectName() {
        return 'TsMenuModule';
    }
    getDefaultValues() {
        return {};
    }
    componentDidMount() {
        // super.componentDidMount();
        const { dispatch } = this.props;
        dispatch({ type: `mtsSubsys/queryAll` });
        this.setState({
            moduleCode: this.props.location.query.moduleCode,
            edit: "none",
            objid: "",
        });
        this.getdata();
    }
    getdata=()=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'mcommonobject/queryData',
            params: { len: 1000, page: 1, url: this.getObjectName() + "/query" + this.getObjectName() + "List" },
            callback: (data: IPageData) => {
                console.log("mcommonobject/queryData", data);
                if (!data.data || !data.data.list) {
                    message.error("未获取到数据");
                    return;
                }
                this.setState({
                    dataSource: data.data.list,
                    curObj:{},
                    edit:"none",
                });
                this.props.form.resetFields();
            },
        });
    }
    getRows = (): ReactNode => {
        const mtsSubsys = this.props.mtsSubsys.data;
        const rows= (<Row>
            {this.getColInput("菜单编号:", "menuCode", this.getInputOnlyAdd(), true)}
            {this.getCol("菜单名称:", "menuName", true)}
            {this.getColInput("是否子节点:", "isLeaf", selectIsUsed(), true)}
            {this.getCol("菜单层级:", "menuLevel")}
            {this.getCol("菜单图片:", "menuIcon")}
            {this.getCol("菜单顺序:", "menuOrder", true)}
            {this.getCol("模块编码:", "moduleId")}
            {this.getCol("父菜单编码:", "parentMenuCode")}
            {this.getColInput("子系统编码:", "subsysId", <TsSubsysComp tsSubsys={mtsSubsys} />, true)}
            {this.getCol("菜单参数:", "menuArgs")}
        </Row>);
        return rows;
    }
    //创建Tree节点
    getMenuTreeNode(subsys_id: string, parent_menu_code: string, menus: any): ReactNode {
        if (!menus)
            return null;
        return (
            menus.map((menuitem: any) => {
                if ((menuitem.subsys_id == subsys_id) && menuitem.parent_menu_code == parent_menu_code)
                    return (<TreeNode title={menuitem.menu_code + menuitem.menu_name} key={menuitem.menu_code}>
                        {this.getMenuTreeNode(subsys_id, menuitem.menu_code, menus)}
                    </TreeNode>);
            })
        );
    }
    selectNode(node: any) {
        console.log("selectNode", node);
        let level = node.props.pos.split('-').length - 1;
        this.props.form.resetFields();
        switch (level) {
            case 1:
                // console.log("根目录");
                this.setState({ selectedNode: node, curObj: {}, objid: "", edit: "none" });
                break;
            case 2:
                // console.log("子系统");
                this.setState({ selectedNode: node, curObj: {}, objid: "", edit: "none" });
                break;
            default:
                const menus = this.state.dataSource;
                console.log("菜单", menus);
                const { dispatch } = this.props;
                dispatch({
                    type: 'mcommonobject/getobj',
                    params: { objUrl: this.state.objUrl, id: node.props.eventKey },
                    callback: (data: IObjectData) => {
                        // console.log("mcommonobject/getobj", data);
                        if (data.code == "200") {
                            this.setState({ selectedNode: node, curObj: data.data || {}, objid: node.props.eventKey, edit: "update" });
                        } else {
                            message.error(data.msg || "获取数据失败!");
                        }
                    },
                });
                break;
        }
    }
    returnBack=()=> {
        this.getdata();
        this.setState({
                moduleCode: this.props.location.query.moduleCode,
                edit: "none",
                objid: ""
        });
    }


    onRightClick = (e: any) => {
        this.selectNode(e.node);
    }
    onSelect = (keys: any, event: any) => {
        this.selectNode(event.node);
    }
    getMenus = (level: number): ReactNode => {
        switch (level) {
            case 0:
                return (<ContextMenu id="some_unique_identifier" ><MenuItem></MenuItem></ContextMenu>);
                break;
            case 1:
                return (<ContextMenu id="some_unique_identifier" ><MenuItem></MenuItem></ContextMenu>);
            case 2:
                return (
                    <ContextMenu id="some_unique_identifier" >
                        <MenuItem data={{ action: 'addson' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="plus" />新建子菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'deleteallchild' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="delete" />删除所有子菜单
                        </MenuItem>
                    </ContextMenu>);
                break;
            default:
                return (
                    <ContextMenu id="some_unique_identifier" >
                        <MenuItem data={{ action: 'addson' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="plus" />新建子菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'addbrother' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="plus" />新建同级菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'delete' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="delete" />删除菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'deleteallchild' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="delete" />删除所有子菜单
                        </MenuItem>
                    </ContextMenu>);
                break;

        }
    } 
    getChildrenNode=(node:any)=>{
        var childnode=node.props.children;
        if(childnode){
            var childnodelist=[node.props.eventKey];
            childnode.map((childitem: any) => {
                if(childitem!=undefined){
                    childnodelist.push(childitem.key);
                    this.getChildrenNode(childitem);
                }
            });
            return childnodelist;
        }
    }
    delSelectChildMenu = (parentmenukey: string,nodelevel:number) => {
        const menus = this.state.dataSource||[];
        let deletelist=[];
        // const subsysid =menus.find((item)=>{return item.menu_code==parentmenukey}).subsys_id;
        if (nodelevel>2)
            menus.map((item)=>{
                if (item.parent_menu_code==parentmenukey ) deletelist.push(item.menu_code);
            });
        else
            menus.map((item)=>{
                if (item.subsys_id==parentmenukey ) deletelist.push(item.menu_code);
            });
            
        // deletelist.push(menus.find((item)=>{return item.parent_menu_code==parentmenukey}).menu_code) ;
        this.handleDelete(deletelist);
    }
    //删除
    delSelectMenu = (parentmenukey: string) => {
        var deletelist=[];
        deletelist.push(parentmenukey);
        this.handleDelete(deletelist);
            
        // this.getdata();
    }
    handleDelete = (ids:any[]) => {
        var me = this;
        Modal.confirm({
            title: '确定删除吗?',
            okType: 'danger',
            okText: '是',
            cancelText: '否',
            onOk() {
                // for(let i=0;i<id.length;i++){
                     me.props.dispatch({
                        type: 'mcommonobject/deleteobjs',
                        ids:ids,
                        params: { objUrl: me.state.objUrl,  },
                        callback: (data: JSON) => {
                            if (data["code"] === "202") {
                                message.success("删除成功");
                                me.getdata(); 
                            }else {
                                message.error(data["msg"] || '未知错误');
                            }
                        },
                    });
                // }
            },
            onCancel() {
            },
        });
    };
    //新建
    newmenu = (values: any) => {
        var me = this;
        const { dispatch } = this.props;
        //newobj
        dispatch({
            type: 'mcommonobject/newobj',
            params: { objUrl: this.state.objUrl },
            callback: (data: IObjectData) => {
                if (data.code == "200") {
                    this.setState({
                        curObj: { ...data.data, ...values },
                        edit: "add",
                    });
                    // me.getdata();
                } else {
                    message.error(data.msg || '未知系统异常');
                }
            },
        });
    }
    //右键菜单
    rightmenuClick = (event: any, data: any) => {
        const curObj = this.state.curObj || {};
        const node = this.state.selectedNode;
        const menuaction = data.action;
        const selectedkey = node == null ? '' : node['props']['eventKey'];
        const nodelevel = node == null ? 0 : node['props']['pos'].split('-').length - 1;
        // console.log("rightmenuClick", menuaction + "," + selectedkey + "," + nodelevel);
        // console.log("rightmenuClicknode",node);
        switch (menuaction) {
            case "addson":
                if (nodelevel == 2) {
                    this.newmenu({ subsysId: selectedkey, parentMenuCode: "", isLeaf: 0, });
                } else if (nodelevel > 2) {
                    this.newmenu({ subsysId: curObj["subsysId"], parentMenuCode: selectedkey, isLeaf: 1, });
                };
                break;
            case "addbrother":
                if (nodelevel > 2) {
                    this.newmenu({ subsysId: curObj["subsysId"], parentMenuCode: curObj["parentMenuCode"], isLeaf: curObj["isLeaf"] });
                };
                break;
            case "delete":
                this.delSelectMenu(selectedkey);
                break;
            case "deleteallchild":
                this.delSelectChildMenu(selectedkey,nodelevel);
                break;
        }
    }
    render() {
        const mtsSubsys = this.props.mtsSubsys.data;
        const menus = this.state.dataSource;
        const node = this.state.selectedNode;
        const selectedkeys = [node == null ? '' : node['props']['eventKey']];
        const nodelevel = (node == null ? 0 : node.props.pos.split('-').length - 1);
        console.log("render",this.props);
        return (
            <div className="mainTreediv">
                <div className="sideTree">
                    <ContextMenuTrigger id="some_unique_identifier">
                        <Tree showLine showIcon onSelect={this.onSelect} onRightClick={this.onRightClick}
                            selectedKeys={selectedkeys} >
                            <TreeNode title="菜单" key="menu" icon={<Icon type="folder-open" />}>
                                {mtsSubsys.map((sysitem: Subsyslist) => {
                                    return (
                                        <TreeNode title={sysitem.subsys_id + sysitem.subsys_name} key={sysitem.subsys_id}>
                                            {this.getMenuTreeNode(sysitem.subsys_id, "", menus)}
                                        </TreeNode>
                                    )
                                })}
                            </TreeNode>
                        </Tree>
                    </ContextMenuTrigger>
                    <ContextMenu id="some_unique_identifier" >
                        {
                            this.getMenus(nodelevel)
                        }
                    </ContextMenu>
                </div>
                <div className="contentinfo" style={{display: (( nodelevel > 2) || ( nodelevel == 2&& this.state.edit=="add")) ? "block" : "none" }} >
                    {super.render()}
                </div></div>);
    }
}
export default connect(({ moprs, mtsSubsys }: CommonConnectState) => ({ moprs, mtsSubsys }))(Form.create()(TsMenuModulePage));