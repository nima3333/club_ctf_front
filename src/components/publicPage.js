import React from 'react';
import styles from './PublicPage.module.css'
import logo from '../logos/logo.png'
import {Navbar, Nav, Jumbotron} from 'react-bootstrap'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Forgot from '../auth/Forgot'
import {userService} from '../auth/Authentification'

class Public extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal_state: 0,

    };
  }

  State = {
    NO_MODAL: 0,
    LOGIN: 1,
    FORGOT: 2,
    REGISTER: 3,
  };

  showLogin = () => {
    this.setState({
      modal_state: this.State.LOGIN,
    })
  }

  showForgot = () => {
    this.setState({
      modal_state: this.State.FORGOT,
    })
  }

  showRegister = () => {
    this.setState({
      modal_state: this.State.REGISTER,
    })
  }


  closeModal = () => {
    this.setState({
      modal_state : this.State.NO_MODAL,
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.type]:event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleCheckbox = (event) => {
    this.setState({
      remember : event.target.checked,
    })
  }

  log = (e) => {
    console.log(e.target.checked)
  }

  loginButton = () => {
    userService.login(this.state.email, this.state.password, this.props.authenticate)
    this.setState({
      show_login_button: true,
    })
  }

  render(){
    
    return(
      <div className="public">
        <Login modal_state={this.state.modal_state} State={this.State} authenticate={this.props.authenticate} closeModal={this.closeModal} showForgot={this.showForgot}/>

        <Register modal_state={this.state.modal_state} State={this.State} authenticate={this.props.authenticate} closeModal={this.closeModal}/>

        <Forgot modal_state={this.state.modal_state} State={this.State} authenticate={this.props.authenticate} closeModal={this.closeModal}/>

        {/*
        <Container className={styles.fheader}>
          <Row className={styles.fheader}>
            <Col > <p className={`${styles.around_text} ${styles.text_left}`}>Club</p></Col>
            <Col ><img src={logo} className={styles.logo} alt="Logo"></img></Col>
            <Col ><p className={`${styles.around_text} ${styles.text_right}`}>CTF</p></Col>
          </Row>
        </Container>
        */}

        <div className={styles.fheader}>
          <p className={`${styles.around_text} ${styles.text_left} ${styles.text_font_size}`}>Club</p>
          <img src={logo} className={styles.logo} alt="Logo"></img>
          <p className={`${styles.around_text} ${styles.text_right} ${styles.text_font_size}`}>CTF</p>
        </div>
        <Navbar sticky="top" style={{backgroundColor: "black"}}>
          <Nav className="mr-auto" >
            {/*
            <Nav.Link style={{color: "white"}} href="#home">Home</Nav.Link>
            */}
          </Nav>
          <Nav>
            {/* FIXME : Les id n'apparaissent pas une fois la page interprétée par le navigateur*/}
            <Nav.Link id={"login"} style={{color: "white"}} onClick={this.showLogin}>Se connecter</Nav.Link>
            <Nav.Link id={"register"} style={{color: "white"}} onClick={this.showRegister}>S'inscrire</Nav.Link>
          </Nav>
        </Navbar>
        <div className={styles.center_div}>
          <Jumbotron className={styles.jumbotron}>
          <h1>Inscris toi dès maintenant</h1>
          <p>Le club CTF est le club de sécurité informatique de Télécom Paris. Tout au long de l’année, on organise des évènements pour initier les néophytes aux fondamentaux du hacking, mais aussi pour développer les skills des plus expérimentés.</p>
          <p>On a mis en place une plateforme qui te permettra de mettre tes connaissances à l’épreuve dans divers challenges, aussi appelés Capture The Flag (CTF). </p>
          <p>N’hésite plus, que tu sois débutant ou que t’aies déjà hacké la NSA, le club CTF n’attend que toi !</p>
          </Jumbotron>
        </div>
      </div>
    )
  }
}

export default Public