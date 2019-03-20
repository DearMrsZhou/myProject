<template>
  <div>
    <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <el-tabs>
      <el-tab-pane>
        <span slot="label">基本信息</span>
        <div class="myform">
          <el-row>
            <el-col :span="2" :offset="1">商品名称：</el-col>
            <el-col :span="6">
              <el-input size="medium" v-model="shopAddData.productName"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品类别：</el-col>
            <el-col :span="4">
              <el-select size="medium" v-model="shopAddData.category_id" :value="shopAddData.category_id" placeholder="请选择" @change="clearChild">
                <el-option v-for="item in pageElementData.categoryNameArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-select size="medium" v-model="shopAddData.category_child_id" :value="shopAddData.category_child_id" placeholder="请选择">
                <el-option v-for="item in pageElementData.categoryChildNameArr" v-if="item.fatherId==shopAddData.category_id" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品标签：</el-col>
            <el-col :span="10">
              <el-tag :key="tag" v-for="tag in shopAddData.englishName" closable :disable-transitions="true" @close="tagClose(tag)">{{tag}}</el-tag>
              <el-input class="input-new-tag" v-if="pageElementData.tagInputVisible" v-model="pageElementData.markAlternative" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品价格：</el-col>
            <el-col :span="4">
              <el-input size="medium" v-model="shopAddData.price"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品体积:</el-col>
            <el-col :span="4">
              <el-input size="medium" type="text" v-model="shopAddData.volume"></el-input>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="2" :offset="1">折扣：</el-col>
              <el-col :span="2">
                <el-switch v-model="pageElementData.disCountState" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" @change="discountStateChange">
                </el-switch>
              </el-col>
              <el-col :span="7" :offset="1">
                <div class="block" v-if="pageElementData.disCountState">
                  <el-slider v-model="shopAddData.discount" :format-tooltip="formatTooltip" :max="100" :min="75" :step="5"></el-slider>
                </div>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">特性词汇：</el-col>
            <el-col :span="4">
              <el-select size="medium" v-model="pageElementData.characterWordsLine" :value="pageElementData.characterWordsLine" @change="clearChildCharacterSelect">
                <el-option v-for="item in pageElementData.characterWordsLineArr" v-if="item.categoryId==shopAddData.category_id" :key="item.lineId" :value="item.lineId" :label="item.lineName"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-select size="medium" placeholder="请选择" v-model="pageElementData.characterWordSelected" :value="pageElementData.characterWordSelected" @change="addCharacterWordsToArr">
                <el-option v-for="item in pageElementData.characterWordsArr" :key="item.id" :value="item.con" :label="item.con" v-if="pageElementData.characterWordsLine==item.lineId&&item.categoryId==shopAddData.category_id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" :offset="1" v-if="shopAddData.pro_attribute.length>=1">
              <el-tag :key="tag" v-for="tag in shopAddData.pro_attribute" closable :disable-transitions="true" @close="tagClose2(tag)">{{tag}}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品图片：</el-col>
            <el-col :span="6">
              <el-upload class="upload-demo" ref="uploadProductImg" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="pageElementData.imgFileList" :auto-upload="false" :on-change="addToShopData" :limit="1" :http-request="uploadProductImg">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button size="small" type="success" @click="beginUploadProductImg">上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">扩展信息</span>
        <div class="myform">
          <el-row>
            <el-col :span="2" :offset="1">产品色号：</el-col>
            <el-col :span="3">
              <el-switch v-model="pageElementData.shopColorState" active-color="#13ce66" inactive-color="#ff4949" active-text="有" inactive-text="无" @change="shopColorStateChange">
              </el-switch>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1" v-if="pageElementData.shopColorState">色号代码：</el-col>
            <el-col :span="4"  class="colorTipsBox" v-if="pageElementData.shopColorState">
              <el-input size="medium" v-model="pageElementData.colorTemporaryData" @focus="openColorInputTips" ></el-input>
            </el-col>
            <el-col :span="2" :offset="1" v-if="pageElementData.shopColorState">色号名字：</el-col>
            <el-col :span="4"  class="colorTipsBox" v-if="pageElementData.shopColorState">
              <el-input size="medium" v-model="pageElementData.colorTemporaryName"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">商品数量：</el-col>
            <el-col :span="4"  class="colorTipsBox">
              <el-input size="medium" v-model="pageElementData.colorTemporaryNumber"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button size="medium" type="primary" @click="addToShopColorList">添加</el-button>
            </el-col>
          </el-row>
          <el-row v-if="pageElementData.shopColorState">
            <el-col :span="15" :offset="1" v-if="shopAddData.color.length>=1">
              <el-tag v-for="item in shopAddData.color" :key="item.colorId" closable :disable-transitions="false" @close="tagClose3(item)">{{item.colorCode}}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">商品图片：</el-col>
            <el-col :span="4">
              <el-select size="medium" v-model="pageElementData.selectColorId" :value="pageElementData.selectColorId" placeholder="请选择图片对应的色号">
                <el-option v-for="item in shopAddData.color" :key="item.colorId" :value="item.colorId" :label="item.colorCode"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button size="small" type="success" @click="addToShopColorImgList">上传并继续</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="1">
              <el-upload class="upload-demo" :auto-upload="false" action="" :on-preview="PreviewColorImg" :on-remove="removeColorImg" multiple :limit="4" :file-list="pageElementData.colorImgList" list-type="picture-card" accept="img/*" :on-change="addColorImg" ref="uploadColorImg" :http-request="colorImgUpload">
                <el-button size="small" type="primary">选择相片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-dialog :visible.sync="pageElementData.dialogVisible">
                <img width="100%" :src="pageElementData.dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">其他信息</span>
        <div>
          <el-row>
            <el-col :span="2" :offset="1">小标题：</el-col>
            <el-col :span="4">
              <el-input size="medium" v-model="shopAddData.product_bigTitle"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">描述：</el-col>
            <el-col :span="10">
              <el-input size="medium" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="shopAddData.product_desc"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">保质期：</el-col>
            <el-col :span="4">
              <el-input size="medium" type="text" v-model="shopAddData.overTime"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">怎么使用：</el-col>
            <el-col :span="4">
              <el-input size="medium" type="text" v-model="shopAddData.howUse"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">制造商：</el-col>
            <el-col :span="4">
              <el-input size="medium" type="text" v-model="shopAddData.builder"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">适用皮肤：</el-col>
            <el-col :span="4">
              <el-input size="medium" type="text" v-model="shopAddData.suitShin"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="1">广告大图：</el-col>
            <el-col :span="20">
              <el-upload class="upload-demo" :auto-upload="false" action="" :on-preview="PreviewColorImg" ref="uploadBigImg" :on-remove="removeBigImg" multiple :file-list="pageElementData.bigImgList" list-type="picture-card" accept="img/*" :on-change="addBigImg" :http-request="uploadProductBigImg">
                <el-button size="small" type="primary">选择相片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-button size="small" type="success" @click="submitShopDataBefore">上传</el-button>
            </el-col>
          </el-row>

        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="2" :offset="1">
        <el-button size="medium" type="primary" @click="submitShopData">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SmallHead from '../common/SamllHead'
export default {
  name: 'AddShop',
  components: {
    SmallHead
  },
  data() {
    return {
      // data:[pic_path,volume,overTime,howUse,builder,suitShin],
      labelPosition: 'right',
      productId:'',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      shopAddData: {
        productId:'',
        productName: '',
        englishName: [],
        price:'',
        discount: 100,
        pic_path: null,
        pro_attribute: [],
        volume:'',
        product_desc: '',
        product_bigTitle:'',
        overTime: '',
        howUse: '',
        builder: '',
        suitShin:'',
        category_id: '',
        category_child_id: '',
        color:[],
        shopPageBigImg: [],
        shopColorImg:[]
      },
      pageElementData:{
        categoryNameArr:[
          {
            name: 'face',
            id: 1
          },
          {
            name: 'lip',
            id: 2
          },
          {
            name: 'eye',
            id: 3
          },
          {
            name: 'eyebrow',
            id: 4
          }
        ],
        categoryChildNameArr: [
          {
            name:'test',
            id:1
          },
          {
            name:'test2',
            id:3
          },
          {
            name:'test3',
            id:2
          }
        ],
        markAlternative:'',
        tagInputVisible:false,
        disCountState:false,
        characterWordsLineArr:[
        ],
        characterWordsLine:'',
        characterWordSelected:'',
        characterWordsArr:[
        ],
        imgFileList:[],
        shopColorState:false,
        colorTemporaryData:'',
        colorTemporaryName:'',
        colorTemporaryNumber:'',
        colorTipsState:true,
        colorIdMax:0,
        colorImgList:[],
        selectColorId:'',
        dialogImageUrl:'',
        dialogVisible:false,
        bigImgList:[]
      },
      nameObj: {
        name1:'商品管理',
        name2:'添加商品'
      }
    }
  },
  methods: {
    tagClose(tag){
      this.shopAddData.englishName.splice(this.shopAddData.englishName.indexOf(tag),1)
    },
    tagClose2(tag){
      this.shopAddData.pro_attribute.splice(this.shopAddData.pro_attribute.indexOf(tag),1)
    },
    tagClose3(item){
      this.shopAddData.color.splice(this.shopAddData.color.indexOf(item),1)
    },
    showInput() {
      this.pageElementData.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(){
      let inputValue=this.pageElementData.markAlternative
      if (inputValue){
        this.shopAddData.englishName.push('#'+inputValue)
      }
      this.pageElementData.markAlternative=''
      this.pageElementData.tagInputVisible=false
    },
    formatTooltip(val) {
      return val / 100;
    },
    clearChildCharacterSelect(){
      this.pageElementData.characterWordSelected=''
    },
    addCharacterWordsToArr(){
      this.shopAddData.pro_attribute.push(this.pageElementData.characterWordSelected)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.shopAddData.pic_path=null
    },
    handlePreview(file) {
      console.log(file)
    },
    addToShopData(file,fileList){
    },
    submitShopDataBefore(){
      this.$refs.uploadBigImg.submit()
    },
    uploadProductBigImg(file){
      let formData=new FormData()
      let imgFile=file.file
      let headerConfig={header: {'Content-Type':'multipart/form-data'}}
      formData.append('file',imgFile)
      let that=this
      this.$http.post('/stage3/uploadFile/uploadImg',formData,headerConfig)
        .then(res=>{
          this.$message({
            message:'上传成功！',
            type:'success'
          })
          let imgUrl=res.data.imgUrl
          that.shopAddData.shopPageBigImg.push(imgUrl)
        })
        .catch(error=>{
          console.log(error)
        })
    },
    submitShopData(){
      let data=this.shopAddData
      let that=this
      if (this.productId){
        this.$http.post('/api/shopManage/editShop',data)
          .then(function (data) {
            that.$message({
              message:'修改成功',
              type:'success'
            })
          })
          .catch(function (error) {
            console.log(error)
            that.$message({
              message:'修改失败',
              type:'warning'
            })
          })
      }
      else {
        if (data.productName&&data.englishName.length>=1&&data.price&&data.discount&&data.pic_path&&data.pro_attribute.length>=1&&data.volume&&data.product_desc&&data.product_bigTitle&&data.overTime&&data.howUse&&data.builder&&data.suitShin&&data.category_id&&data.category_child_id&&data.color.length>=1&&data.shopPageBigImg.length>=1&&data.shopColorImg.length>=1){
          this.$http.post('/api/shopManage/addShop',data)
            .then(function (data) {
              console.log(data)
              that.$message({
                message:'新增成功',
                type:'success'
              })
            })
            .catch(function (error) {
              console.log(error)
              that.$message({
                message:'失败',
                type:'warning'
              })
            })
        }
        else{
          this.$message({
            message:'请将数据录入完整后再执行此操作',
            type:'warning'
          })
        }
      }
    },
    openColorInputTips(){
      if (this.pageElementData.colorTipsState){
        this.$message('请输入颜色代码')
        this.pageElementData.colorTipsState=false
      }
    },
    addToShopColorList(){
      if (this.pageElementData.colorTemporaryData&&this.pageElementData.colorTemporaryName&&this.pageElementData.colorTemporaryNumber){
        this.shopAddData.color.push({
          colorCode: this.pageElementData.colorTemporaryData,
          colorName: this.pageElementData.colorTemporaryName,
          productNumber: this.pageElementData.colorTemporaryNumber,
          colorId:++this.pageElementData.colorIdMax
        })
        this.pageElementData.colorTemporaryNumber=''
        this.pageElementData.colorTemporaryName=''
        this.pageElementData.colorTemporaryData=''
      }
      else {
        this.$message({
          message:'请完整输入完整数据后再操作！',
          type:'warning'
        })
      }
    },
    removeColorImg(file, fileList) {
      this.shopAddData.shopColorImg.splice(this.pageElementData.colorImgList.indexOf(file),1)
    },
    PreviewColorImg(file) {
      this.pageElementData.dialogImageUrl=file.url
      this.pageElementData.dialogVisible=true
    },
    addColorImg(file,fileList){
      if (!this.pageElementData.selectColorId){
        this.$message({
          message:'请先选择色号',
          type:'warning'
        })
        this.pageElementData.colorImgList=[]
        return false
      }
    },
    addToShopColorImgList(){
      this.$refs.uploadColorImg.submit()
    },
    shopColorStateChange(){
      if (!this.pageElementData.shopColorState){
        this.shopAddData.color=[]
        this.pageElementData.colorImgList=[]
        this.shopAddData.shopColorImg=[]
        this.pageElementData.selectColorId=''
        this.shopAddData.color.push({
          colorCode:'no',
          colorName:'',
          productNumber:this.pageElementData.colorTemporaryNumber,
          colorId:++this.pageElementData.colorIdMax
        })
      }
      else{
        this.shopAddData.color=[]
        this.pageElementData.colorImgList=[]
        this.shopAddData.shopColorImg=[]
        this.pageElementData.selectColorId=''
      }
    },
    removeBigImg(file,fileList){
      this.shopAddData.shopPageBigImg.splice(this.pageElementData.bigImgList.indexOf(file),1)
    },
    addBigImg(file,fileList){
    },
    discountStateChange(){
      this.shopAddData.discount=100
    },
    colorImgUpload(file){
      let formData=new FormData()
      let imgFile=file.file
      let headerConfig={header: {'Content-Type':'multipart/form-data'}}
      formData.append('file',imgFile)
      let that=this
      this.$http.post('/stage3/uploadFile/uploadImg',formData,headerConfig)
        .then(res=>{
          this.$message({
            message:'上传成功！',
            type:'success'
          })
          let imgUrl=res.data.imgUrl
          that.shopAddData.shopColorImg.push({
            colorId:this.pageElementData.selectColorId,
            imgUrl:imgUrl
          })
          console.log(that.shopAddData.shopColorImg)
        })
        .catch(error=>{
          console.log(error)
        })
    },
    beginUploadProductImg(){
      this.$refs.uploadProductImg.submit()
    },
    uploadProductImg(file){
      let formData=new FormData()
      let imgFile=file.file
      let headerConfig={header: {'Content-Type':'multipart/form-data'}}
      formData.append('file',imgFile)
      let that=this
      this.$http.post('/stage3/uploadFile/uploadImg',formData,headerConfig)
        .then(res=>{
          this.$message({
            message:'上传成功！',
            type:'success'
          })
          let imgUrl=res.data.imgUrl
          this.shopAddData.pic_path=imgUrl
        })
        .catch(error=>{
          console.log(error)
        })
    },
    clearChild(id){
      this.shopAddData.category_child_id=''
    }
  },
  created:function () {
    let that=this;
    this.$http.post('/api/shopManage/getPageData')
      .then(function (data) {
        that.pageElementData.categoryNameArr=[];
        for (let i=0;i<data.data[0].length;i++){
          that.pageElementData.categoryNameArr.push({
            name:data.data[0][i].category_name,
            id:data.data[0][i].category_id
          })
        }
        that.pageElementData.categoryChildNameArr=[]
        for (let i=0;i<data.data[1].length;i++){
          that.pageElementData.categoryChildNameArr.push({
            name:data.data[1][i].category_child_name,
            id:data.data[1][i].category_child_Id,
            fatherId:data.data[1][i].category_id
          })
        }
        that.pageElementData.characterWordsLineArr=[]
        for(let i=0;i<data.data[3].length;i++){
          that.pageElementData.characterWordsLineArr.push({
            lineId:data.data[3][i].lineid,
            lineName:data.data[3][i].con,
            categoryId:data.data[3][i].category_id
          })
        }
        that.pageElementData.characterWordsArr=[]
        for (let i=0;i<data.data[2].length;i++){
          that.pageElementData.characterWordsArr.push({
            con:data.data[2][i].con,
            lineId:data.data[2][i].lineid,
            categoryId:data.data[2][i].category_id
          })
        }
        console.log(data)
        that.pageElementData.colorIdMax=data.data[4][0].id+100
        console.log(that.pageElementData.colorIdMax)
        that.shopAddData.color.push({
          colorCode:'no',
          colorName:'',
          productNumber:that.pageElementData.colorTemporaryNumber,
          colorId:data.data[4][0].id+1
        })
    })
      .catch(function (err) {
        console.log(err)
      })
    if (this.$route.params.productId){
      let that=this
      this.$http.post('/api/shopManage/getProductData',{productId:this.$route.params.productId})
        .then(function (data) {
          console.log(data)
          let shopData=data.data[0][0]
          that.productId=shopData.product_id
          let colorData=data.data[1]
          that.shopAddData={
            productId:shopData.product_id,
            productName: shopData.product_name,
            englishName: shopData.English_name.split('，'),
            price:shopData.price,
            discount: shopData.old_price,
            pic_path: '/stage3/'+shopData.pic_path,
            pro_attribute: shopData.pro_bigTitle.split('，'),
            volume:shopData.volume,
            product_desc: shopData.product_desc,
            product_bigTitle:shopData.pro_bigTitle,
            overTime: shopData.overTime,
            howUse: shopData.HowUse,
            builder: shopData.builder,
            suitShin:shopData.suitSkin,
            category_id: shopData.category_id,
            category_child_id: shopData.category_child_Id,
            color:colorData,
            shopPageBigImg: [],
            shopColorImg:[]
          }
          let imgPath=data.data[0][0].pic_path.split('/');
          let imgName=imgPath[imgPath.length-1]
          that.pageElementData.imgFileList.push({
            name:imgName,
            url:'/ipa/'+data.data[0][0].pic_path
          })
          if (data.data[1].length>0){
            that.pageElementData.shopColorState=true
          }
          for (let i=0;i<data.data[2].length;i++){
            let imgArr=data.data[2][i].color_pic_path.split('/')
            let imgName=imgArr[imgArr.length-1]
            that.pageElementData.colorImgList.push({
              name:imgName,
              url:'/ipa/'+data.data[2][i].color_pic_path
            })
          }
          for (let i=0;i<data.data[3].length;i++){
            let imgArr=data.data[3][i].pic_path.split('/')
            let imgName=imgArr[imgArr.length-1]
            that.pageElementData.bigImgList.push({
              name:imgName,
              url:'/ipa/'+data.data[3][i].pic_path
            })
          }
          if (shopData.old_price==100&&shopData.old_price==0){
            that.pageElementData.disCountState=false
          }
          else {
            that.pageElementData.disCountState=true
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }

  }
}
</script>

<style scoped>
.myform{
  padding: 20px 0;
}
  .el-col{
    line-height: 36px;
  }
  .el-row{
    margin: 7px 0;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .colorTipsBox{
    position: relative;
  }

</style>
