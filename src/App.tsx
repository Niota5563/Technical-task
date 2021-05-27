import React, {ChangeEvent, Component} from 'react';
import { inject, observer} from 'mobx-react';
import style from './scss/App.module.scss';
import Modal from './Modal'
import { ModalWindow } from './mobxInput';

interface AppProps {
mobxInput?: ModalWindow;
}

interface AppState {
  name: string
  surname: string
  isValid:boolean
  emptyName: string
  emptySurname: string
}

@inject("mobxInput")
@observer
class App extends Component <AppProps, AppState> {
  
  constructor(props: AppProps) {
    super(props);
    
    this.state = {
      name: "",
      surname: "",
      isValid: false,
      emptyName: "",
      emptySurname: ""
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onSurnameChange = this.onSurnameChange.bind(this)
    this.displayModal = this.displayModal.bind(this)
    this.clearState = this.clearState.bind(this)
  }
  
  onNameChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({name: e.target.value})
  }
  
  onSurnameChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({surname:  e.target.value})
  }
  
  displayModal() {
    this.setState({isValid: !this.state.isValid})
  }
  clearState() {
    this.setState({name:"", surname:""})
  }

 private submitForm = (e: React.SyntheticEvent) => {
  e.preventDefault()
  const { setName, setSurname } = this.props.mobxInput!;
  const { name, surname } = this.state   
  if(name !== "" && surname !== ""){
    setName(this.state.name);
    setSurname(this.state.surname);
    this.setState({emptyName:""})
    this.setState({emptySurname:""})
    this.displayModal()
    this.clearState()
  }else {
    if (name === "") 
    {this.setState({emptyName:"*Введите имя"})
  } else {this.setState({emptyName:""})}
    
    if (surname === "") {
      this.setState({emptySurname:"*Введите фамилию"})
    } else {this.setState({emptySurname:""})}
  }
};

  render() {
    const {text} = this.props.mobxInput!;
      
return (
<div className={style.form_line}>
  <header className={style.form_main}>
  <Modal text={text.toString()} displayModal={this.displayModal} isValid={this.state.isValid}/>
    <form onSubmit={this.submitForm} className={style.form_container}>
    <input id={"name"} className={style.input} placeholder={"Имя"} onChange={this.onNameChange} value={this.state.name} autoComplete='off'></input>
    <label htmlFor={"name"} className={style.error}>{this.state.emptyName}</label>
    <input id={"surname"} className={style.input} placeholder={"Фамилия"} onChange={this.onSurnameChange} value={this.state.surname} autoComplete='off'></input>
    <label htmlFor={"surname"} className={style.error}>{this.state.emptySurname}</label>
    <button type={"submit"} className={style.button}>Готово</button>
    </form>
  </header>
</div>
  );
}
}

export default App;
