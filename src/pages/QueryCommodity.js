import React from 'react'
import './QueryCommodity.css'
import { Input, Pagination, Card } from 'antd'
const { Meta } = Card;
import _ from 'superagent'

class QueryCommodity extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            commoditylist: [],
            page: 1
        }
        this.onSearch = this.onSearch.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    onSearch(value){
        _.post('http://localhost:3000/querycommodity').send({search: value}).end((err, res) => {
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
                <h1 className='commodity-title'>查询商品</h1>
                <Input.Search enterButton='Search' onSearch={this.onSearch} style={{width: 300}}></Input.Search>
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
                {commoditylist.length ? (<div  className='commodity-pagination'>
                    <Pagination 
                    defaultCurrent={1} 
                    pageSize={6} 
                    total={commoditylist.length}
                    onChange={this.onChange}
                    ></Pagination>
                </div>) : null}
                
            </div>
        )
    }
}

export default QueryCommodity