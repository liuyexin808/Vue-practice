// 封装localStorage函数
 var storage = (function(){
 	var listKey = "listKey";
 	return {
 		fetch:function(){
 			return JSON.parse(window.localStorage.getItem(listKey)) ||[];
 		},
 		save:function(item){
 			window.localStorage.setItem(listKey,JSON.stringify(item));
 		}
 	}
 })();

// 过滤出三个不同状态的列表
var filters = {
	all:function(list){
		return list;
	},
	active:function(list){
		return list.filter(function(item){
			return !item.isCompleted
		})
	},
	completed:function(list){
		return list.filter(function(item){
			return item.isCompleted
		})

	}
}
var vm = new  Vue({
	el:".todoapp",
	data:{
		newTask:"",
		taskList: storage.fetch(),
		location:"all"
	},
	computed:{
		// 剩余的active选项长度
		remainActive:function(){
			return filters.active(this.taskList).length 	
		},
		// 剩余的completed选项长度
		remainCompleted:function(){
			return filters.completed(this.taskList).length
		},
		// 根据location获得当前的列表
		filterList:function(){
			return filters[this.location](this.taskList);
		},
	},
	methods:{
		// 添加任务
		addTask(){
			if(this.newTask === "") return
			this.taskList.push({
				content:this.newTask,
				isCompleted:false
			});
			this.newTask="";
		},
		// 删除任务
		removeTask(index){
			this.taskList.splice(index,1)
		},
		// 全部勾选或取消
		selectAll(){
			if(!this.remainActive) {
				this.taskList.forEach(function(item){
					item.isCompleted = false;
				})
			} else {
				this.taskList.forEach(function(item){
					item.isCompleted = true;
				})
			}
		},
		// 全部删除
		deleteComplete(){
			this.taskList = filters.active(this.taskList); 
		},
		//改变location
		changeLocation(index){
			this.location = index;
		}
	},

	watch:{
		//监听taskList,发生改变就存入localStorage
		taskList:{
			handler:function(val){
				storage.save(val);
			},
			deep:true
		}
	},
	filters:{
		complete:function(value){
			if(!value) {
				return "已经全部完成";
			} else {
				return "等待完成" + value + "件"
			}
		}
	}
		
})