import React, { Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

import { auth } from '../base'
import NewArt from '../components/admin/Arts'

const AdminHome = props => <p>Bem vindo</p>

class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthing: true,
            isLoggedIn:false,
            user: null
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user =>{
            this.setState({
                isAuthing : false,
                isLoggedIn: !!user,
                user: user
            })
        })
    }
    render(){
        if(this.state.isAuthing){
            return <p>Aguarde...</p>
        }
        if(!this.state.isLoggedIn){
            return <Redirect to='/login'></Redirect>
        }
        return(
            <div className='container'>
            <h3>Painel administrador</h3>
                <Route 
                    exact  
                    path='/admin' 
                    component={AdminHome}/>
                <Route
                    path={this.props.match.url+'/nova-arte'}
                    component={ NewArt }
                />
            </div>
        )
    }
}

export default Admin
