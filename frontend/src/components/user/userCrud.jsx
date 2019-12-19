import React, { Component } from 'react'
import Main from '../Main'
import axios from 'axios'


const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'cadrasto de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseURL = 'http://localhost:3001/users'

const initialState = { //estado inicial
    user: { name:'', email: '' },
    list: []
}

export default class UserCrud extends Component {
    
    state = {...initialState}//inicializar o estado

    componentWillMount(){//vai ser chamada quando o componente for mostrado
        axios(baseURL).then(response => {  //fznd o get na url do backend, usando promises
            this.setState({ list: response.data })
        })
    }

    clear(){//vai limpar o formulário
        this.setState({ user: initialState.user }) //vai limpar só o usuário
    }

    save(){//vai inserir ou alterar um usuário(quando vai inserir nao tem id, quando vai alterar tem)
        const user = this.state.user
        const method = user.id ? 'put' : 'post'  //se caso o id for 0, significa que o usuário não foi adcionado e o metodo sera POST, caso tenha id (o resultado lógico de user.id será TRUE) o metodo será put para alterar o usuario
        const url = user.id ? `${baseURL}/${user.id}` : baseURL//quando for fazer um put (alterar) vai precisar do id do usuário
        //função do axios
        axios[method](url, user)
        .then(resp => {
                const list = this.UpdatedList(resp.data)//vai preencher a lista com os dados retornado pelo json-server
                this.setState({ user: initialState.user, list })//dps que salvar o usuário vai limpar a lista
            })
    }


    UpdatedList(user){
        const list = this.state.list.filter(otherUser => otherUser.id != user.id) //vai filtrar os usuários que tenham o id diferente do id do usuário
        list.unshift(user)//coloca na primeira posição do array
        return list
    }
    
    
    updateField(event){//atualizar os campos
        const user = {...this.state.user} //clonando o usuário para dps alterá-lo 
        user[event.target.name] = event.target.value//buscar o input do nome
        this.setState({ user })
    }

    renderForm(){
        //renderizar o formulário
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-controll" name='name' value={this.state.user.name} 
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-controll" name='email' value={this.state.user.email} 
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o E-mail..."
                            />
                        </div>
                    </div>

                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e=> this.save(e)}
                        >
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e=> this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }


    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseURL}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u ==! user )
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
        }
}