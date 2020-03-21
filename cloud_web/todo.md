1. 模块   first
   权限设置 改成 用tag 模式 选择
   模块类型 ZJ 组件、 link 外链


4. 子系统角色菜单树   second 
    增加一个生成 菜单树的 按钮，不需要新建、编辑、删除   ok
    获取菜单方法、获取模块操作权限的方法 实现

5. 整个界面优化 third
   权限系统 完成

6. 权限系统 配置  权限（admin）
   子系统角色菜单树 不需要新建、编辑、删除  ok

7. 给user 配置一个树形菜单（测试）

   ---优化部分
2. 角色模块配置 third   ok
   列表界面：必须 先选中 角色，然后查询
   新建：角色 就是 列表界面上选择的角色
         模块 下拉选择 ok，选择后把模块的调用参数 和 权限设置 复制过来 ok
         调用参数不必填 ok
         角色模块编码 不要用户输入  ok，等于 权限编码_模块编码 （有点小问题,undifine)   admin_ts_opr（表单联动）
    
    编辑：只允许 修改 调用参数 和 权限设置  ok
    删除要 允许多选删除  ok
    <Button type="danger" icon="delete" ghost size="small" style={{ display:moprs.indexOf("DELETE")>=0?"inline":"none" }} onClick={() =>this.handleDelete(record[this.getRowkey()])}>删除</Button>
    // const rowSelection = {
    //   onChange: (selectedRowKeys: any, selectedRows: any) => {
    //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   getCheckboxProps: (record: { name: string; }) => ({
    //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //     name: record.name,
    //   }),
    // };

    权限设置 允许多选设置 ok

3. 菜单  最后处理
    用树的方式编辑

this.props.mtsmodule.data.find((item: { module_id: string; })=>{return item.module_id==value})
问题：
1. 退出登录，重新登录后，state数据还在，需要刷新页面才行    ok
  logout 时刷新页面

2. 第一次打开页面 /api/TsUser/getobj  报错（因为没登录，token为空）  ok

3. 菜单不高亮

4. 页面偶尔有 oprset of undefined 错误，原因是 点查询的时候，moduleCode 丢失   ok
   事件方法内，必须 if (e) e.preventDefault(); 否则出现这个问题

5. handleSearch 不能super.handleSearch

6. 权限设置的颜色  ok

7. 有些权限只在特地的模块有，其他模块设置权限时不需要显示

8. 长时间操作的按钮，要显示 等待的状态

9. 菜单重新生成后，要重新登录才有菜单  ？需要复现

10. A用户打开界面，然后退出登录，B用户登录后，如果没有这个界面的菜单，会打开第一个菜单，但是moduleCode还是之前的  ok

11. 角色模块，有时打开 没有角色选择  需要复现 

12. 角色模块 编辑保存返回回来 需要重新选角色，不方便 （先不改）