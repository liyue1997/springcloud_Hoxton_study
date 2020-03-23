import React, { ReactNode } from 'react';
import {Dispatch } from 'redux';
import {router as Router} from 'dva';
// import { Link } from 'dva/router';
import { Modal,Form, Card, Table, Row, Button, message, Col, Input } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import {formItemLayout} from '@/mycomponents/commonComp';
import {getLength} from '@/utils/ttool';

export interface IProps {
  dispatch:Dispatch,
  location:any ,
  form:any,
  moprs?:any,
  mrszones?:any,
  mtsrole?:any,
  mtsmodule?:any,
  mtsSubsys?:any,
  mrsdls?:any
}
export  interface IState {
  autoQuery:boolean,
    objUrl:string,
    queryparams:{},
    queryMap: {},
    pages: { },
    dataSource?: any[],
    paginationProps: {},
    expand?: boolean,
    moduleCode?:string,
    selectrows?:any,
    treeData?:any[],
    rightClickNodeTreeItem?: any,
    menukey?:string,
    menulistdisplay?:string,
    edit: string,
    editstate: string,
    curObjt: {},
}
export interface IPageData{
  code:string,
  msg:string,
  data?:{
    list?:any[],
    totalitem?:number,

  },
}
export class BizCommonPage extends React.Component<IProps,IState> {  
  constructor(props: IProps){
    super(props);
  }
  getRouteUrl(){
      return '';///RsUserOper
  }
  getServerName(){
      return '';//b6premission
  }
  getObjectName(){
      return '';//RsUser
  }
  getObjectDesc(){
      return '';//业务操作人员
  }
  getRowkey(){
      return '';//user_id
  }
  state = {
    autoQuery:true,
    objUrl:this.getObjectName(),
    queryparams:{},
    queryMap: {},
    // http://laptop-l8rb63hb:8801/api/biz-users?offset=0&pagesize=500
    pages: { len: 10, page: 1, url:"/"+this.getServerName()+"/api/"+ this.getObjectName() },
    dataSource: [],
    paginationProps: {
      total: 0, pageSize: 10, current: 1, showSizeChanger: true, showQuickJumper: true,
      showTotal: (total:number, range:[number,number]) => `${range[0]}-${range[1]}共${total}条`,
    },
    expand: false,
    moduleCode:"",
    selectrows:[],
    treeData: [],
    rightClickNodeTreeItem: {
      pageX: "",
      pageY: "",
      id: "",
      categoryName: ""
    },
    menukey:"",
    menulistdisplay:"none",
    editstate:"none",
    curObjt: {},
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `moprs/fetchData`,
      payload:{modelcode:this.props.location.query.moduleCode}
    });
    console.log("BizCommonPage componentDidMount",this.props.location.query);
    this.setState({
      moduleCode:this.props.location.query.moduleCode,
      queryparams:{...this.props.location.query}
    },()=>{
      if (this.state.autoQuery)
        this.queryPageData();
    });
  }
  handleSearchValues =(values:{})=>{
    return {};
  }

  handleSearch = (e:React.FormEvent) => {
    this.state.selectrows = [];
    if (e) e.preventDefault();
    let form =this.props["form"];
    form.validateFieldsAndScroll((err:any[], values:any[]) => {
      let temp =this.handleSearchValues(values);
      this.setState({
        pages: { ...this.state.pages, page: 1 },
        queryMap: { ...values, ...temp }
      },()=>{this.queryPageData()});
    });
  };
  handleExport = (e:React.MouseEvent) => {
    if (e) e.preventDefault();
    let me=this;
    const { dispatch } = this.props;
    dispatch({
      type: `mcommonobject/exportExcel`,
      params: {
        filename: this.getObjectDesc()+'.xls',
        objUrl:me.state.objUrl,
        ...this.state.queryparams, 
        ...this.state.queryMap,
      }
    });
  };
  queryPageData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bizobject/queryData',
      params: {...this.state.queryparams, ...this.state.queryMap, ...this.state.pages },
      callback: (data:any[]) => {
        console.log("bizobject/queryData", data);
        // if (!data.data || !data.data.list)
        // {
        //   message.error("未获取到数据");
        //   return ;
        // }
        this.setState({
          dataSource: data,
          // paginationProps: { ...this.state.paginationProps, total: data.data.totalitem, pageSize: this.state.pages.len, current: this.state.pages.page }
        });
      },
    });
  }

  handleChange = (pagination:PaginationConfig, filters:Record<string, string[]>, sorter:any,extra:any) => {    
    // console.log('Various pagination', pagination);
    // console.log('Various filters', filters);
    // console.log('Various sorter', sorter);
    // console.log('Various extra', extra);
    this.setState({
      pages: { ...this.state.pages, page: pagination.current, len: pagination.pageSize },
      queryMap: { ...this.state.queryMap, columnProp:sorter.field,columnOrder:sorter.order }
    }, () => {
      this.queryPageData();
    });
  };

  handleDelete=(id:string)=>{
    var me=this;
    Modal.confirm({
      title: '确定删除吗?',
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk() {
        me.props.dispatch({
          type: 'mcommonobject/deleteobj',
          params: {objUrl:me.state.objUrl, id:id },
          callback: (data:JSON) => {
            if (data["code"]==="202"){
              message.success("删除成功");
              me.queryPageData();
            }
            else{
              message.error(data["msg"]||'未知错误');
            }
          },
        });
      },
      onCancel() {
      },
    });
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  getColumns=():any[]=>{
      return [];
  }
  //多选
  getSelection=():any=>{
      return null;
  }
  getRows=():ReactNode=>{
    return <div></div>;
}
getCol=(title:string,key:string,isExpand=false)=>{
  const { form} = this.props;
  const { getFieldDecorator } = form;
  if (isExpand){
      return <Col span={8}><Form.Item {...formItemLayout} label={title} style={{ display: this.state.expand ? 'block' : 'none' }}>
          {getFieldDecorator(key, {initialValue: this.state.queryMap[key], })
          (<Input placeholder="请输入" />)}{' '}
      </Form.Item></Col>;
  }
  else{
      return <Col span={8}><Form.Item {...formItemLayout} label={title} >
          {getFieldDecorator(key, {initialValue: this.state.queryMap[key], })
          (<Input placeholder="请输入" />)}{' '}
      </Form.Item></Col>;
  }
}
getColInput=(title:string,key:string,inputControl:ReactNode, isExpand=false)=>{
  const { form} = this.props;
  const { getFieldDecorator } = form;
  if (isExpand){
      return <Col span={8}><Form.Item {...formItemLayout} label={title} style={{ display: this.state.expand ? 'block' : 'none' }}>
          {getFieldDecorator(key, {initialValue: this.state.queryMap[key], })
          (inputControl)}{' '}
      </Form.Item></Col>;
  }
  else{
      return <Col span={8}><Form.Item {...formItemLayout} label={title} >
          {getFieldDecorator(key, {initialValue: this.state.queryMap[key], })
          (inputControl)}{' '}
      </Form.Item></Col>;
  }
}
getbuttons=():ReactNode=>{
  return null;
}
getChoosebtns=():ReactNode=>{
  return null;
}
getMOprs=()=>{
  return this.props.moprs["oper_"+this.state.moduleCode]||[];
}
  render() {
    const moprs = this.getMOprs();
    if (moprs.indexOf("QUERY")<0){
      return (<div></div>);
    }
    let columns =[
      {
        title: '操作',
        key: 'action',
        // width: 180,
        className:'actioncolumn',
        fixed: 'left',
        render: (text:string, record:any[]) => (
          <Row type="flex" justify="space-around" >
            <Router.Link
                to={{
                  pathname: `${this.getRouteUrl()}/info`,
                  search:`id=${record[this.getRowkey()]}&edit=update&moduleCode=${this.state.moduleCode}`
                }}
              >
            <Button type="primary" icon="edit" ghost size="small" style={{ display:moprs.indexOf("UPDATE")>=0?"inline":"none" }}  >编辑</Button>
            </Router.Link>       
            <Button type="danger" icon="delete" ghost size="small" style={{ display:moprs.indexOf("DELETE")>=0?"inline":"none" }} onClick={() =>this.handleDelete(record[this.getRowkey()])}>删除</Button>
          </Row>
        ),
      },
       ...this.getColumns()
    ];
    if (moprs.indexOf("DELETE")<0&&moprs.indexOf("UPDATE")<0 ){
      columns.splice(0,1);
    }
    return (
      <div>
        <Card className={"cardSearch"} >
          <Form onSubmit={this.handleSearch}>
              {
                  this.getRows()
              }
            <Row>
              <Button className={"querybtn"} icon="search" type="primary" htmlType="submit" style={{ display:moprs.indexOf("QUERY")>=0?"inline":"none" }} >查询</Button>
              <Router.Link
                to={{
                  pathname: `${this.getRouteUrl()}/info`,
                  search:`edit=add&moduleCode=${this.state.moduleCode}`
                }}
              >
              <Button className={"newbtn"} icon="plus" style={{ marginLeft: 8,display:moprs.indexOf("NEW")>=0?"inline":"none" }} type="primary">新建</Button>
              </Router.Link>
              <Button className={"exportbtn"} icon="export" style={{ marginLeft: 8,display:moprs.indexOf("EXPORT")>=0?"inline":"none" }} type="primary" onClick={this.handleExport}>导出</Button>
              <Button className={"importbtn"} icon="import" style={{ marginLeft: 8,display:moprs.indexOf("IMPORT")>=0?"inline":"none" }} type="primary" onClick={this.handleExport}>导入</Button>
              {
                this.getbuttons()
              }
               <Button className={"updownbtn"} icon={this.state.expand ? 'up' : 'down'} style={{ marginLeft: 8,display:getLength(this.getRows())>3?"inline":"none" }} type="primary" onClick={this.toggle}> {this.state.expand ? '收起' : '展开'}</Button>
            </Row>
          </Form>
        </Card>
        <Card>
          {
            this.getChoosebtns()
          }
          <Table bordered
            rowSelection={this.getSelection()}
            columns={columns}
            dataSource={this.state.dataSource}
            scroll={{ x: true }}
            rowKey={this.getRowkey()}
            pagination={this.state.paginationProps}
            onChange={this.handleChange} 
            />;
        </Card>
      </div>)
  }
};

