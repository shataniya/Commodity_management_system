import React from 'react'
import { Card, Pagination } from 'antd';
import './Commodity.css'
const { Meta } = Card;
// superagent
import _ from 'superagent'
// import Card from '../components/Card'
// http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8729282b199b3ec51e31c1b6b15f3f93.jpg
// 小米10 青春版 5G
class Commodity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            commoditylist: [],
            page: 1
        }
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        _.get('http://localhost:3000/commodity').end((err, res) => {
            if(err) throw new Error(err)
            this.setState({ commoditylist: JSON.parse(res.text) })
        })
    }
    onChange(page){
        this.setState({ page })
    }
    handleClick(el){
        this.props.history.push({pathname:"/updatecommodity", state : el})
    }
    render(){
        var { commoditylist, page } = this.state
        return (
            <div className='commodity'>
                <div className='commodity-content'>
                    {commoditylist.slice(6*(page-1), 6*page).map((el, idx) => (
                        <a className='commodity-item' key={el.title+idx}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt={el.title} src={el.image} />}
                                onClick={()=>{
                                    this.handleClick(el)
                                }}
                            >
                                <Meta title={el.title} description={el.desc} />
                            </Card>
                        </a>
                    ))}
                </div>
                <div  className='commodity-pagination'>
                    <Pagination 
                    defaultCurrent={1} 
                    pageSize={6} 
                    total={commoditylist.length}
                    onChange={this.onChange}
                    ></Pagination>
                </div>
            </div>
        )
    }
}

export default Commodity