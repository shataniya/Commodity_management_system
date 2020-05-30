import React from 'react'
import './AddCommodity.css'
import { Form, Input, Upload, message, Button } from 'antd'
import { LoadingOutlined, PlusOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import _ from 'superagent'

class AddCommodity extends React.Component {
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
        _.post('http://localhost:3000/addcommodity').send(values).end((err, res) => {
            if(err) throw new Error(err)
            message.success('商品已经添加成功！')
            // console.log(res.text)
            this.props.history.push({pathname:"/commodity"})
        })
    }
    onFinishFailed(values){
        message.error('商品添加失败！')
    }
    render(){
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className='commodity'>
                <h1 className='commodity-title'>增加商品</h1>
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
                    >
                        <Input placeholder='请输入商品名称...'></Input>
                    </Form.Item>
                    <Form.Item
                    name='image'
                    label='商品图片'
                    rules={[{
                        required: true,
                        message: '必须要输入商品图片'
                    }]}
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
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                    name='desc'
                    label='商品描述'
                    rules={[{
                        required: true,
                        message: '必须输入商品描述'
                    }]}
                    >
                        <Input placeholder='请输入商品描述'></Input>
                    </Form.Item>
                    <Form.Item
                    name='price'
                    label='商品价格'
                    rules={[{
                        required: true,
                        message: '必须输入商品价格'
                    }]}
                    >
                        <Input placeholder='请输入商品价格'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AddCommodity