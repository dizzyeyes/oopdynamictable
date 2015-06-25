/**
 * Created by xinyongjia on 2015/4/17.
 */
 
dynamicTable.prototype.TableLoad = function(dataJson)
{
    var data = dataJson;
	this.table.bootstrapTable('load', data);
    this.table.bootstrapTable({data: data});    
}
// 获取表格数据
dynamicTable.prototype.TableGetData = function()
{
    alert(JSON.stringify(this.table.bootstrapTable('getData')));
    return JSON.stringify(this.table.bootstrapTable('getData'));
}
//获取row的数据
dynamicTable.prototype.TableGetByRow = function(row)
{
    alert(JSON.stringify(row));
    return JSON.stringify(row);
}
//
dynamicTable.prototype.TableGetSelections = function()
{
    alert('getSelections: ' + JSON.stringify(this.table.bootstrapTable('getSelections')));
}

dynamicTable.prototype.TableHideItems = function(vis)
{
    var selects = this.table.bootstrapTable('getSelections');
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    // unSelectObject(true);
   //移除table数据
    ids = $.map(selects, function(row) { 
        if(this.title==="分组管理")
        {
            //group operation
            console.log('hiding group:',row['id']);
            //var group = curFloor.getGroupById(row['id']);
            //groupVisibleChange(scene,curFloor,group.name,vis);
        }
        else
        {
            //single operation
            console.log('hiding item:',row['id']);
            //objVisibleChange(scene,row['id'],vis);
        }
        return row['id'];
    });    
    console.log("hidden items: ",ids);
    //TODO:场景、数据同步
}
dynamicTable.prototype.TableHideItem = function(row,vis)
{        
    //unSelectObject(true);
    if(this.title==="分组管理")
    {
        //group operation
        console.log('hide group',row['id'],vis);
        // var group = curFloor.getGroupById(row['id']);
        // groupVisibleChange(scene,curFloor,group.name,vis);  
    }
    else
    {
        //single operation
        console.log('hide item',row['id'],vis);
        // objVisibleChange(scene,row['id'],vis);             
        // this.selectObjectInTable(row['id']);   
    }
}

dynamicTable.prototype.TableHighLightItems = function(highlight)
{
    var mode="no";
    if(highlight==false)
    {
        // unSelectObject(true);
        //open light
        console.log('open light');
        // if(mode=="vis") setSceneVis(true);
        // else setSceneHight(false);
        return;
    }
    var selects = this.table.bootstrapTable('getSelections');
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    // unSelectObject(true);
    //close light    
    console.log('close light');
    // if(mode=="vis") setSceneVis(false);
    // else setSceneHight(true);
   //移除table数据
    ids = $.map(selects, function(row) { 
        if(this.title==="分组管理")
        {
            //group operation
            console.log('highlighting group',row['id']);
            // var group = curFloor.getGroupById(row['id']);
            // if(mode=="vis") groupVisibleChange(scene,curFloor,group.name,true);
            // else highlightGroup(scene,curFloor,group.name,true);
        }
        else
        {
            //single operation
            console.log('highlighting item',row['id']);
            // if(mode=="vis") objVisibleChange(scene,row['id'],true);
            // else highlightObject(scene,row['id'],true)
        }
        return row['id'];
    });  
    console.log("highlighted items: ",ids);
}
dynamicTable.prototype.TableHighLightItem = function(row,highlight)
{     
    var mode="no";    
    //unSelectObject(true);
    //open light
    console.log((highlight)?'close light':'open light');
    // if(mode=="vis") setSceneVis(!highlight);
    // else setSceneHight(highlight);
    if(highlight==false)
        return;        
    if(this.title==="分组管理")
    {
        //group option
        console.log('highlighting group',row['id']);
        // var group = curFloor.getGroupById(row['id']);
        // if(mode=="vis") groupVisibleChange(scene,curFloor,group.name,true);  
        // else highlightGroup(scene,curFloor,group.name,true);
    }
    else
    {
        //single option
        console.log('highlighting item',row['id']);
        // if(mode=="vis") objVisibleChange(scene,row['id'],true);
        // else highlightObject(scene,row['id'],true);
        // // INTERSECTED=scene.getObjectByModelId(row['id']).children[0];
        // // selectObject(INTERSECTED); 
        // this.selectObjectInTable(row['id']);        
    }
}

dynamicTable.prototype.TableAppend = function()
{
    this.TableHide();
    switch(this.title)
    {
        case "例子管理":
            console.log("添加数据");
        break;
        case "分组管理":
            newGroup_docm("新建分组");
        break;
        case "区块管理":
            newBlock_docm("新建区块");
        break;
        case "测点管理":
            newMPoint_docm(document.getElementById("mpointLabelPic"),true);
        break;
    }
    //TODO:弹框
    //添加addDataJson到Grouplist数据
    //添加到$table中
    // this.table.bootstrapTable('append', addDataJson);
    // TableShow();
}
dynamicTable.prototype.TableDetail = function(row,index)
{
    // alertError("开发中。。");
    // return;
 
    var id=row['id'];
    console.log("查看信息");
    switch(this.title)
    {
        case "分组管理":    
            //alertError("开发中。。");
            var group = curFloor.getGroupById(row['id']);
            alertMsg(["",group.info]);
        return;
        break;
        case "区块管理":
        case "测点管理":
                var obj= curFloor.getObjectById(row['id']);
                alertMsg(["",obj.info]);
        break;
        
    }
}
dynamicTable.prototype.TableEdit = function(row,index)
{
    var id=row['id'];
    console.log("编辑信息");
    switch(this.title)
    {
        case "例子管理":
            console.log('editing item',id);
        break;
        case "分组管理":  
            this.TableHide();
            curGroup = curFloor.getGroupById(id);
            subTableShow(curGroup.name);
        break;
        case "区块管理":
                //TableHide();
                this.selectObjectInTable(row['id']);            
        break;
        case "测点管理":   
                isBuildFromMngList=true;        
                TableHide();
                changeMPname_docm("更改测点ID",row);
                this.selectObjectInTable(row['id']);
        break;
    }
}
dynamicTable.prototype.selectObjectInTable = function(id)
{
    var op;
    if(this.title==="区块管理") op=0;
    if(this.title==="测点管理") op=2;
    //select obj
    // INTERSECTED=scene.getObjectByModelId(id).children[0]; 
    // blockparams.title=this.title.slice(0,-2);
}
dynamicTable.prototype.TableRemoveSelected = function()
{
   //根据selects.id为GroupId，删除Grouplist中的数据
    var selects = this.table.bootstrapTable('getSelections');
   //移除table数据
    if(selects.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    ids = $.map(selects, function(row) { 
        return row['id'];
    });
    var ret = confirm("删除 "+ids+" 吗？");
    if(ret==false) return;
    
    ids = $.map(selects, function(row) {        
        if(this.title=="分组管理")
        {
            //group option
            console.log('removing group:',row['id']);
            //curFloor.removeGroupById(row['id']);
        }
        else
        {
            //remove every sigle
            console.log('removing item:',row['id']);
            //removeObjById(scene,curFloor,row['id']);
        }
        return row['id'];
    });
    
    this.table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    console.log("removed items:",ids);
    //TODO:场景、数据同步
}
dynamicTable.prototype.TableRemoveById = function(id)
{
    //根据id为GroupId，删除Grouplist中的数据
    //移除table数据
    var ret=confirm("删除 "+id+" 吗？");
    if(ret==false) return;
    ids = [id];
    this.table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    //TODO:数据、场景同步
    console.log("item removed:",ids);
    if(this.title==="分组管理")
    {
        //group option
        console.log('removing group',id);
        //curFloor.removeGroupById(id);
    }
    else
    {
        //single option
        console.log('removing item',id);
        //removeObjById(scene,curFloor,id);
    }
}
//刷新表格
dynamicTable.prototype.TableRefresh = function()
{
    console.log("刷新列表");
    this.table.bootstrapTable('refresh', {silent: true});
}

dynamicTable.prototype.TableDetory = function()
{
    this.table.bootstrapTable('destroy');
}
// 隐藏表格
dynamicTable.prototype.TableHide = function()
{   
    this.hide();
    //清理数据
    this.TableDetory();
}
// 显示表格
dynamicTable.prototype.TableShow = function()
{    
    this.construct();    
    this.table = $('#'+this.id); 
    
    var tabletype = this.title;
    this.TableDetory();
    this.fadeTool.fadeIn(this.div);
    this.fadeTool.MoveFloatLayer(this.div.id); 
    var columDataFieldStrings = this.getTableDataField(tabletype);
    var columnNameStrings = this.getTableColumnNames(tabletype);
    var columNames = iBase.Id('tr_column');
    for(var item=0;item<columNames.childElementCount;item++)
    {
        if(columnNameStrings[item]!=undefined)
            columNames.children[item].innerHTML=columnNameStrings[item];
        if(columDataFieldStrings[item]!=undefined)
            columNames.children[item].setAttribute("data-field",columDataFieldStrings[item]);
    }
    //获取数据
    var dataJson=this.getJsonDataOfTable(tabletype);
    //填充数据
    this.TableLoad(dataJson);
    this.fadeTool.MoveFloatLayer(this.div.id); 
}
dynamicTable.prototype.asynTableData = function(row,field,submitValue)
{
    switch(curTable)
    {
        case 'title-manage-sub':
            if(field=='id')
            {
                var alertmsg;
                if(params.mode_edit==true)
                {
                    if(assertDuplicateId(submitValue,'curGroup',false))
                    {
                        if(!assertDuplicateId(submitValue,'curFloor',false))
                        {                        
                            curGroup.removeById(row[field]);
                            curGroup.addItem(submitValue);
                            return true;
                        }
                        else alertmsg="ID不存在";
                    }
                    else alertmsg="ID不能重复";     
                }        
                else alertmsg="当前非编辑模式";
                var dataJson=getJsonDataOfTable("分组内容");
                TableLoad($sub_table,dataJson);
                alertError(alertmsg);
                return false;
            }
        break;
        case 'title-manage':
            if(params.mode_edit==false)
            {
                var dataJson=getJsonDataOfTable(this.title);
                TableLoad($table,dataJson);
                alertError("当前非编辑模式");
                return false;
            }
            var title = iBase.Id("title-manage").innerHTML;
            if(field=='id')//改ID
            {
                var fromWherestr=getFromWhere(title);
                if(!assertDuplicateId(submitValue,fromWherestr,false))
                {
                    var dataJson=getJsonDataOfTable(this.title);
                    TableLoad(dataJson);
                    alertError("ID不能重复");
                    return false;
                }
                else
                {
                    if(title=="分组管理")
                    {
                        var obj=curFloor.getGroupById(row[field]);
                        obj.id=submitValue;
                    }
                    else
                    {
                        if(curFloor.changeObjectId(row[field],submitValue)==false)
                        {
                            var dataJson=getJsonDataOfTable(this.title);
                            TableLoad(dataJson);
                            alertError("ID不能重复");
                            return false;
                        }
                        var objsc=scene.getObjectByModelId(row[field]);
                        objsc.modelid=submitValue;                        
                    }
                }
            }
            else if(field=='infoShort')
            {
                if(title=="分组管理")
                {
                    var obj=curFloor.getGroupById(row['id']);
                    obj['info']=submitValue;
                    obj['infoShort']=submitValue.slice(0,30);
                }
                else
                {
                    var obj=curFloor.getObjectById(row['id']);
                    obj['info']=submitValue; 
                    obj['infoShort']=submitValue.slice(0,30); 
                    var objsc=scene.getObjectByModelId(row['id']);
                    objsc['info']=submitValue;                    
                }                
                var dataJson=getJsonDataOfTable(this.title);
                TableLoad(dataJson);
            }
            else//改其他
            {
                if(title=="分组管理")
                {
                    var obj=curFloor.getGroupById(row['id']);
                    obj[field]=submitValue;
                }
                else
                {
                    var obj=curFloor.getObjectById(row['id']);
                    obj[field]=submitValue; 
                    var objsc=scene.getObjectByModelId(row['id']);
                    if(field=="name") field="model"+field;
                    objsc[field]=submitValue;                    
                }
            }            
        break;
    }
    return true;
}
dynamicTable.prototype.getFromWhere = function(title)
{
    var ret;
    switch(title)
    {
        case "测点管理":
        case "区块管理":
           ret='curFloor';
        break;
        case "分组管理":
        case "例子管理":
           ret= 'curFloor.GroupList';
        break;
    } 
    return ret;
}
dynamicTable.prototype.getTableDataField = function(tabletype)
{
    var columDataField;
    switch(tabletype)
    {
        case "分组管理":
        case "例子管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "区块管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "测点管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "type"
                };
        break;
        case "分组内容":
            columDataField={
                    1: "id"
                };
        break;
    }
    return columDataField;
}
dynamicTable.prototype.getTableColumnNames = function(tabletype)
{
    var columnNames;
    switch(tabletype)
    {
        case "分组管理":
        case "例子管理":
            columnNames={
                    1: "ID",
                    2: "组名",
                    3: "分组信息"
                };
        break;
        case "区块管理":
            columnNames={
                    1: "ID",
                    2: "区块名称",
                    3: "区块信息"
                };
        break;
        case "测点管理":
            columnNames={
                    1: "ID",
                    2: "测点名称",
                    3: "标签"
                };
        break;        
        case "分组内容":
            columnNames={
                    1: "ID"
                };
        break;
    }
    return columnNames;
}
dynamicTable.prototype.fromListToJson = function(list)
{
    var jsonString="[";
    var jsonbody="";
    for(var item=0;item<list.length;item++)
    {        
        jsonbody+="{ 'id':'"+list[item];
        jsonbody+="'},";
    }
    jsonString+=jsonbody.slice(0,-1);
    jsonString+="]";
    return eval("("+jsonString+")");
}
dynamicTable.prototype.getDefaultJson = function()
{
    var dataJson=new Array();
    dataJson.push({
            id:"1",
            name:"哈哈",
            info:"信息为空"
    });
    dataJson.push({
            id:"2",
            name:"哈哈2",
            info:"信息为空2"
    });
    dataJson.push({
            id:"3",
            name:"哈哈2",
            info:"信息为空2"
    });
    dataJson.push({
            id:"4",
            name:"哈哈2",
            info:"信息为空2"
    });
    return dataJson;
}
dynamicTable.prototype.getJsonDataOfTable = function(tabletype)
{
    var jsonString;
    var dataJsontmp,dataJson;
    switch(tabletype)
    {
        case "例子管理":
            dataJson = this.getDefaultJson();
        break;
        case "分组管理":
            // jsonString=curFloor.GroupList.serializeJSON();
            jsonString= JSON.stringify(curFloor.GroupList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "区块管理":
            // jsonString=curFloor.BlockList.serializeJSON();
            jsonString=JSON.stringify(curFloor.BlockList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "测点管理":
            // jsonString=curFloor.MPointList.serializeJSON();
            jsonString= JSON.stringify(curFloor.MPointList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "分组内容":
            dataJson=fromListToJson(curGroup.List);
        break;
    }    
    return dataJson;
}