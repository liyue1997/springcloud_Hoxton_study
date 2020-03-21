import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { Form, Tree, Icon, Tooltip, Button, Row } from 'antd';
import { CommonConnectState } from '@/models/commonDefines';
import { CommonPage } from '@/mycomponents/commonList';
import { Link } from 'dva';
//右键菜单模块
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './index.less'
import './menu.less'
// import { isEmpty } from '@/utils/ttool';
const { TreeNode } = Tree;
interface Subsyslist {
    subsys_name: string;
    subsys_id: string;
}

class TsMenuModulePage extends CommonPage {

    getRouteUrl() { return '/TsMenuModule'; }
    getObjectName() { return 'TsMenuModule'; }
    getObjectDesc() { return '菜单'; }
    // getRowkey(){return 'menu_code'; }
    componentDidMount() {
        this.setState({
            pages:{len: 1000, page: 1,url: this.getObjectName()+"/query"+ this.getObjectName()+"List"}
        },()=>{
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
    onRightClick = (e:any) => {
        const menukey=e.node.props.eventKey;
        console.log("onRightClick",e.node.props.eventKey);
        this.setState({menukey:menukey})
    }
    getMenuTreeNode(subsys_id:string,parent_menu_code:string,menus:any){
        
        return (
            menus.map((menuitem:any)=>{
                if (menuitem.subsys_id==subsys_id && menuitem.parent_menu_code==parent_menu_code)
                  return (<TreeNode title={menuitem.menu_code+menuitem.menu_name} key={menuitem.menu_code}>
                      {this.getMenuTreeNode(subsys_id,menuitem.menu_code,menus)}
                  </TreeNode>);
            })
        );
        
    }
    render() {
        const mtsSubsys = this.props.mtsSubsys.data;
        const menus=this.state.dataSource;
        const menukey=this.state.menukey;
        const moprs = this.getMOprs();
        const attributes = {
            className: 'custom-root',
            disabledClassName: 'custom-disabled',
            dividerClassName: 'custom-divider',
            selectedClassName: 'custom-selected'
        }
        return (
            <div>
                <ContextMenuTrigger id="some_unique_identifier">
                    <Tree showLine showIcon onSelect={this.onSelect}  onRightClick={this.onRightClick}>
                        <TreeNode title="菜单" key="menu" icon={<Icon type="folder-open" />}>
                            {mtsSubsys.map((sysitem: Subsyslist) => {
                                    return (
                                    <TreeNode title={sysitem.subsys_id+sysitem.subsys_name} key={sysitem.subsys_id}>
                                        {
                                            this.getMenuTreeNode(sysitem.subsys_id,"",menus)
                                        }
                                    </TreeNode>
                                    )
                            })}
                        </TreeNode>
                    </Tree>
                </ContextMenuTrigger>
                <ContextMenu id="some_unique_identifier" >
                    <MenuItem data={{foo: 'bar'}} attributes={attributes}>
                    <Link
                        to={{
                        pathname: `${this.getRouteUrl()}/info`,
                        search:`edit=add&moduleCode=${this.state.moduleCode}`
                        }}
                    >
                        <Icon type="plus"/>新建菜单
                    </Link>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} attributes={attributes}>
                    <Link
                        to={{
                        pathname: `${this.getRouteUrl()}/info`,
                        search:`id=${menukey}&edit=update&moduleCode=${this.state.moduleCode}`
                        }}
                    >
                        <Icon type="edit"/>编辑菜单
                    </Link>
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} attributes={attributes}/>
                    <MenuItem data={{foo: 'bar'}} onClick={this.delSelectMenu}>
                        <Icon type="delete"/>删除菜单
                    </MenuItem>
                </ContextMenu>
            </div>);
    }
    //删除
    delSelectMenu=(e: any)=>{
        var selectrows = this.state.selectrows;
        for(let i=0;i<selectrows.length;i++){    
            this.handleDelete(selectrows[i]['module_role_id']);
        }
    }
    onSelect = (keys: any, event: any) => {
        console.log('Trigger Select', keys, event);
    };
}

export default connect(({ moprs, mtsSubsys }: CommonConnectState) => ({ moprs, mtsSubsys }))(Form.create()(TsMenuModulePage));