import React from 'react'
import './UpdateCommodity.css'
import { Form, Input, Upload, message, Button } from 'antd'
// import { LoadingOutlined, PlusOutlined, ConsoleSqlOutlined } from '@ant-design/icons';

import _ from 'superagent'

class UpdateCommodity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            imageUrl: ''
        }
        this.getBase64 = this.getBase64.bind(this)
        this.beforeUpload = this.beforeUpload.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onFinish = this.onFinish.bind(this)
        this.onFinishFailed = this.onFinishFailed.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange(info){
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => {
            //   console.log(imageUrl)
              _.post('http://localhost:3000/addcommodity_avatar').send({imageUrl}).end((err, res) => {
                if(err) throw new Error(err)
                message.success('商品图片已经上传成功')
                console.log(res.text)
              })
            this.setState({
                imageUrl,
                loading: false,
              })
            }
          );
        }
      };
    onFinish(values){
        var state = this.props.location.state
        var param = {}
        for(let p in state){
            // _id
            if(!values[p]){
                param[p] = state[p]
            }else if(state[p] !== values[p]){
                param[p] = values[p]
            }
        }
        // console.log(param)
        _.post('http://localhost:3000/updatecommodity').send(param).end((err, res) => {
            if(err) throw new Error(err)
            message.success('商品更新成功！')
            // console.log(res.text)
            this.props.history.push({pathname:"/commodity"})
        })
    }
    onFinishFailed(values){
        message.error('商品更新失败！')
    }
    // 删除商品
    onDelete(){
        var _id = this.props.location.state._id
        _.post('http://localhost:3000/deletecommodity').send({ _id }).end((err, res) => {
            if(err) throw new Error(err)
            message.success('商品删除成功！')
            // console.log(res.text)
            this.props.history.push({pathname:"/commodity"})
        })
    }
    render(){
        
        // const uploadButton = (
        //     <div>
        //       {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        //       <div className="ant-upload-text">Upload</div>
        //     </div>
        // );
        const { imageUrl } = this.state;
        var { title, image, desc, price } = this.props.location.state
        return (
            <div className='commodity'>
                <h1 className='commodity-title'>更新商品</h1>
                <Form 
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item 
                    name='title'
                    label='商品名称'
                    rules={[{
                        required: true,
                        message: '必须要输入商品名称'
                    }]}
                    initialValue={title}
                    >
                        <Input defaultValue={title}></Input>
                    </Form.Item>
                    <Form.Item
                    name='image'
                    label='商品图片'
                    rules={[{
                        required: true,
                        message: '必须要输入商品图片'
                    }]}
                    initialValue={image}
                    >
                        <Upload
                        name='image'
                        listType='picture-card'
                        className='commodity-avatar-uploader'
                        // action='http://localhost:3000/addcommodity_avatar'
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <img src={image} alt="avatar" style={{ width: '100%' }} />}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                    name='desc'
                    label='商品描述'
                    rules={[{
                        required: true,
                        message: '必须输入商品描述'
                    }]}
                    initialValue={desc}
                    >
                        <Input defaultValue={desc}></Input>
                    </Form.Item>
                    <Form.Item
                    name='price'
                    label='商品价格'
                    rules={[{
                        required: true,
                        message: '必须输入商品价格'
                    }]}
                    initialValue={price}
                    >
                        <Input defaultValue={price}></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>更新</Button>
                        <Button type='primary' className='clearbtn' onClick={this.onDelete}>删除</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default UpdateCommodity