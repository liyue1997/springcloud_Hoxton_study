import React, { ReactNode } from 'react';
import { connect, routerRedux } from 'dva';
import { Form, Tree, Icon, Button, Row, Layout, Col, message, Input } from 'antd';
import { CommonConnectState } from '@/models/commonDefines';
import { CommonPage } from '@/mycomponents/commonList';
//右键菜单模块
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './index.less';
import { submitFormLayout, formItemLayout, IObjectData } from '@/mycomponents/commonInfo';
import { selectIsUsed } from '@/mycomponents/commonComp';
import TsSubsysComp from '@/mycomponents/premission/TsSubsysComp';
// import { isEmpty } from '@/utils/ttool';
const { TreeNode } = Tree;
const { Sider, Content } = Layout;
interface Subsyslist {
    subsys_name: string;
    subsys_id: string;
}
const attributes = {
    className: 'test',
}
var chossesys:string;
class TsMenuModulePage extends CommonPage {
    getRouteUrl() { return '/TsMenuModule'; }
    getObjectName() { return 'TsMenuModule'; }
    getObjectDesc() { return '菜单'; }
    // getRowkey(){return 'menu_code'; }
    componentDidMount() {
        this.setState({
            pages: { len: 1000, page: 1, url: this.getObjectName() + "/query" + this.getObjectName() + "List" }
        }, () => {
            super.componentDidMount();
        });
        const { dispatch } = this.props;
        dispatch({ type: `mtsSubsys/queryAll` });
    }
    handleSearchValues = (values: {}) => {
        let temp = {};
        // if (!isEmpty(values["start_create_date"]))
        //     temp = {...temp,start_create_date: values["start_create_date"].format(DateFormat),};
        // if (!isEmpty(values["end_create_date"]))
        //     temp = {...temp, end_create_date: values["end_create_date"].format(DateFormat),};
        return temp;
    }
    //Tree上右键
    onRightClick = (e: any) => {
        console.log("onRightClick",e);
        this.setState({ selectedNode: e.node });
        // console.log("onRightClick",e);
        // var action;
        // var level;//root,subsys,menu
        // switch(level)
        // {
        //     case "root":
        //         break;
        //     case "subsys":
        //         break;
        //     case "menu":
        //         break;
        // }
        // var subsys;
        // var menukey = e.node.props.eventKey;
        // console.log("syskey123",menukey);
        // // console.log("onRightClick", e);
        // const mtsSubsys = this.props.mtsSubsys.data;
        // var syskey=mtsSubsys.find((item: { subsys_id: string; })=>{return item.subsys_id==menukey});
        // console.log("syskey123",syskey);
        // if(syskey==menukey){
        //     chossesys=menukey;
        //     this.setState({menulistdisplay:"none"});
        //     menukey="";
        // }
        // this.setState({ menukey: menukey })
    }
    //创建Tree节点
    getMenuTreeNode(subsys_id: string, parent_menu_code: string, menus: any) {
        return (
            menus.map((menuitem: any) => {
                if ((menuitem.subsys_id == subsys_id) && menuitem.parent_menu_code == parent_menu_code)
                    return (<TreeNode title={menuitem.menu_code + menuitem.menu_name} key={menuitem.menu_code}>
                        {this.getMenuTreeNode(subsys_id, menuitem.menu_code, menus)}
                    </TreeNode>);
            })
        );
    }
    getDefaultValues() {
        return {};
    }
    //右键菜单
    rightmenuClick = (event:any, data:any) => {
        console.log('rightmenuClick',data.action)
        let menuaction=data.action;

        const parentmenukey=this.state.menukey;
        if(menuaction==='addson'||menuaction==='addbrother'){
            if(menuaction==='addson'){
                this.props.form.setFieldsValue({
                    isLeaf: 1,
                    parentMenuCode:parentmenukey,
                    subsysId:chossesys
                });
            }else{
                this.props.form.setFieldsValue({
                    isLeaf: 0,
                    subsysId:chossesys
                });
            }
            this.setState({
                editstate:menuaction,
                menulistdisplay:"block",
            },()=>{
                const { dispatch } = this.props;
                //newobj
                dispatch({
                    type: 'mcommonobject/newobj',
                    params: { objUrl: this.state.objUrl },
                    callback: (data: IObjectData) => {
                    console.log("mcommonobject/newobj", data);
                    if (data.code == "200") {
                        this.setState({
                        curObjt: { ...this.getDefaultValues(), ...data.data },
                        });
                    } else {
                        message.error(data.msg);
                    }
                    },
                });
            })
        }
        else if(menuaction==='delete'||menuaction==='deleteallchild'){
            this.delSelectMenu(parentmenukey);
            this.queryPageData();
        }
    }
    handleSubmit = (e: React.FormEvent) => {
        if (e) e.preventDefault();
        const { dispatch } = this.props;
        const menuaction=this.state.editstate;
        this.props.form.validateFieldsAndScroll((err: JSON, values: {}) => {
            if (!err) {
                let newvalues = this.handleValues(values);
                if (this.state.editstate === "update") {
                    dispatch({
                        type: 'mcommonobject/updateobj',
                        params: { objUrl: this.state.objUrl, ...this.state.curObjt, ...newvalues },
                        callback: (data: IObjectData) => {
                            if (data.code === "203") {
                                message.success("保存成功!");
                                this.setState({editstate:"none",curObjt:{},menulistdisplay:"none",});
                                this.queryPageData();
                            }
                            else {
                                message.error(data.msg || "未知错误!");
                            }
                        },
                    });
                }
                else if (menuaction==='addson'||menuaction==='addbrother') {
                    dispatch({
                        type: 'mcommonobject/addobj',
                        params: { objUrl: this.state.objUrl, ...this.state.curObjt, ...values },
                        callback: (data: IObjectData) => {
                            if (data.code === "201") {
                                message.success("保存成功!");
                                this.setState({editstate:"none",curObjt:{},menulistdisplay:"none",});
                                this.queryPageData();
                            }
                            else {
                                message.error(data.msg || "未知错误!");
                            }
                        },
                    });
                }
            }
        });

    };
    getCol = (title: string, key: string, required = false) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const curObjt = this.state.curObjt || {};
        if (required) {
            return <Col span={24}>
                <Form.Item {...formItemLayout} hasFeedback label={title}>
                    {getFieldDecorator(key, {
                        initialValue: curObjt[key],
                        rules: [
                            {
                                required: true,
                                message: title + '不能缺失!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
            </Col>;
        }
        else {
            return <Col span={24}>
                <Form.Item {...formItemLayout} hasFeedback label={title}>
                    {getFieldDecorator(key, {
                        initialValue: curObjt[key],
                    })(<Input />)}
                </Form.Item>
            </Col>;
        }
    }
    getColInput = (title: string, key: string, inputControl: ReactNode, required = false) => {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const curObjt = this.state.curObjt || {};
        if (required) {
            return <Col span={24}>
                <Form.Item {...formItemLayout} hasFeedback label={title}>
                    {getFieldDecorator(key, {
                        initialValue: curObjt[key],
                        rules: [
                            {
                                required: true,
                                message: title + '不能缺失!',
                            },
                        ],
                    })(inputControl)}
                </Form.Item>
            </Col>;
        }
        else {
            return <Col span={24}>
                <Form.Item {...formItemLayout} hasFeedback label={title}>
                    {getFieldDecorator(key, {
                        initialValue: curObjt[key],
                    })(inputControl)}
                </Form.Item>
            </Col>;
        }
    }
    //新建时可写
    getInputOnlyAdd(): ReactNode {
        if (this.state.editstate==='addson'||this.state.editstate==='addbrother')
            return <Input />;
        return <Input disabled />;
    }
    getRows = (): ReactNode => {
        const mtsSubsys = this.props.mtsSubsys.data;
        return (<Row>
            {this.getColInput("菜单编号:", "menuCode", this.getInputOnlyAdd(), true)}
            {this.getCol("菜单名称:", "menuName", true)}
            {this.getColInput("是否子节点:", "isLeaf", selectIsUsed(), true)}
            {this.getCol("菜单层级:", "menuLevel")}
            {this.getCol("菜单图片:", "menuIcon")}
            {this.getCol("菜单顺序:", "menuOrder", true)}
            {this.getCol("模块编码:", "moduleId")}
            {this.getCol("父菜单编码:", "parentMenuCode")}
            {this.getColInput("子系统编码:", "subsysId",<TsSubsysComp tsSubsys={mtsSubsys}/>, true)}
            {this.getCol("菜单参数:", "menuArgs")}
        </Row>);
    }
    render() {
        const mtsSubsys = this.props.mtsSubsys.data;
        const menus = this.state.dataSource;
        return (
            <Layout className="layoutbox">
                <Sider className="sideTree">
                    <ContextMenuTrigger id="some_unique_identifier">
                        <Tree showLine showIcon onSelect={this.onSelect} onRightClick={this.onRightClick}
                            selectedKeys={[this.state.selectedNode==null?'':this.state.selectedNode.eventKey]} >
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
                        <MenuItem data={{ action: 'addson' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="plus" />新建子菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'addbrother' }} attributes={attributes}  onClick={this.rightmenuClick}>
                            <Icon type="plus" />新建同级菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'delete' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="delete" />删除菜单
                        </MenuItem>
                        <MenuItem data={{ action: 'deleteallchild' }} attributes={attributes} onClick={this.rightmenuClick}>
                            <Icon type="delete" />删除所有子菜单    
                        </MenuItem>
                    </ContextMenu>
                </Sider>
                <Content className="contentinfo" style={{display:this.state.menulistdisplay}}>
                    <Form onSubmit={this.handleSubmit}>
                        {this.getRows()}
                        <Row style={{textAlign:"center"}}>
                            <Col span={24}>
                                <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                                    <Button type="primary" htmlType="submit">保存</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Content>
            </Layout>);
    }
    //删除
    delSelectMenu = (parentmenukey:string) => {
        if(parentmenukey==""){
            message.error("删除子系统下所有菜单");
        }else{
            this.handleDelete(parentmenukey);
            this.setState({
                menulistdisplay:"none"
            });
        }
    }
    handleValues = (values: {}) => {
        return values;
    }
    //选中Tree
    onSelect = (keys: any, event: any) => {
        this.setState({
            menulistdisplay:"none"
        });
        let id=event.node.props.eventKey;
        const { dispatch } = this.props;
        const mtsSubsys = this.props.mtsSubsys.data;
        if(!mtsSubsys.find((item: { subsys_id: string; })=>{return item.subsys_id==id})){
            this.setState({
                menulistdisplay:"block",
                editstate: "update"
            },()=>{
            //getobj
            if (this.state.editstate === "update" || this.state.editstate === "none") {
            dispatch({
              type: 'mcommonobject/getobj',
              params: { objUrl: this.state.objUrl, id: id },
              callback: (data: IObjectData) => {
                console.log("mcommonobject/getobj", data);
                if (data.code == "200") {
                  this.setState({
                    curObjt: data.data || {},
                  });
                } else {
                  message.error(data.msg || "获取数据失败!");
                }
              },
            });
        }
            });
        }
    };
}

export default connect(({ moprs, mtsSubsys }: CommonConnectState) => ({ moprs, mtsSubsys }))(Form.create()(TsMenuModulePage));