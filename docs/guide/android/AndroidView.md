# Android常用控件

## Recyclerview

### 基础使用

1. 自定义Adapter继承Recyclerview.Adapter 

   ```kotlin
   class FuncListAdapter(private val funcList:MutableList<FuncBean>) : RecyclerView.Adapter< FuncListAdapter.ViewHolder>() {
       private lateinit var clickListener: (position: Int) -> Unit
   
       override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): FuncListAdapter.ViewHolder {
           val view = LayoutInflater.from(parent.context).inflate(R.layout.item_func_list,parent,false);
           return ViewHolder(view);
       }
   
       override fun onBindViewHolder(holder: FuncListAdapter.ViewHolder, position: Int) {
           holder.textView.text = funcList[position].funcName;
       }
   
       override fun getItemCount(): Int {
           return funcList.size;
       }
   
       inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
           val textView: TextView
   
           init {
               textView = view.findViewById(R.id.tv_func_name)
               textView.setOnClickListener {
                   clickListener(adapterPosition)
               }
           }
       }
   
       public fun setOnItemClick(clickListener:(position:Int)->Unit){
           this.clickListener = clickListener
       }
   
   }
   ```

   2. 将自定义adapter设置给recyclerview

   3. 设置recyclerview的layoutManager

      ```kotlin
      mVBinding.rvFunc.layoutManager = LinearLayoutManager(this,LinearLayoutManager.VERTICAL,false)
      ```

      