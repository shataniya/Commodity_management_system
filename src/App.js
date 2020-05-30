import React from 'react'
// react-router
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import './App.css'
// pages
import Commodity from './pages/Commodity'
import AddCommodity from './pages/AddCommodity'
import UpdateCommodity from './pages/UpdateCommodity'
import QueryCommodity from './pages/QueryCommodity'
// antd components
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            current: '1'
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        // console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
    render(){
        return (
            <div className='app'>
                <nav className='app-nav'>
                    <Menu
                    theme='dark'
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    >
                    <Menu.Item key="sub1" icon={<MailOutlined />}>
                        <Link to='/commodity'>显示全部商品</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品操作">
                        <Menu.Item key="1">
                            <Link to='/addcommodity'>增加商品</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='/querycommodity'>查询商品</Link>
                        </Menu.Item>
                    </SubMenu>
                    </Menu>
                </nav>
                <section className='app-content'>
                    <Switch>
                        <Route exact path='/' component={QueryCommodity}></Route>
                        <Route path='/commodity' component={Commodity}></Route>
                        <Route path='/addcommodity' component={AddCommodity}></Route>
                        <Route path='/updatecommodity' component={UpdateCommodity}></Route>
                        <Route path='/querycommodity' component={QueryCommodity}></Route>
                        <Route component={Commodity}></Route>
                    </Switch>
                </section>
            </div>
        )
    }
}

export default App