import React from 'react';
import styles from './PublicPage.module.css'
import logo from '../logos/logo.png'
import {Navbar, Nav} from 'react-bootstrap'
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
        
        <div className={styles.fheader}>
          <p className={`${styles.around_text} ${styles.text_left}`}>Club</p>
          <img src={logo} className={styles.logo} alt="Logo"></img>
          <p className={`${styles.around_text} ${styles.text_right}`}>CTF</p>
        </div>
        <Navbar sticky="top" style={{backgroundColor: "black"}}>
          <Navbar.Brand style={{color: "white"}} href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto" >
            <Nav.Link style={{color: "white"}} href="#home">Home</Nav.Link>
            <Nav.Link style={{color: "white"}} href="#features">Features</Nav.Link>
            <Nav.Link style={{color: "white"}} href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{color: "white"}} onClick={this.showLogin}>Se connecter</Nav.Link>
            <Nav.Link style={{color: "white"}} onClick={this.showRegister}>S'inscrire</Nav.Link>
          </Nav>
        </Navbar>
        Page de présention du site.
        <button onClick={this.props.authenticate}>Login</button>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta viverra tellus, id gravida est aliquam hendrerit. Mauris sed metus id metus faucibus luctus. Aenean eu blandit odio, id molestie arcu. Praesent condimentum eros in commodo auctor. Phasellus nec lectus nibh. Curabitur euismod quam a elit tincidunt elementum. Quisque in sodales tellus. Duis tempor dui sodales, ultricies diam ac, pretium arcu. Sed pretium purus ut urna pretium semper. Fusce in accumsan dolor, nec ultricies leo. Duis eu egestas eros. Quisque vel consectetur orci. Aliquam erat volutpat. Integer at vulputate diam.

Sed gravida mattis quam, sed sagittis nisi tristique non. Curabitur bibendum elit velit, vel rutrum ipsum vehicula eu. Praesent ut quam magna. Quisque pretium venenatis quam a laoreet. Nam diam sapien, dictum vel est eu, sodales luctus ligula. Aenean quis urna id orci placerat molestie eget at nibh. Morbi in enim facilisis, dapibus turpis maximus, pellentesque ex. Praesent et erat nec lacus efficitur feugiat. Praesent vehicula eros arcu, sit amet malesuada velit cursus eu. Ut efficitur felis non mauris venenatis sollicitudin. Duis dapibus, arcu nec ornare sollicitudin, erat turpis aliquet nulla, at scelerisque risus libero sed velit. Cras sed metus lacinia, accumsan libero sit amet, sollicitudin sapien. Pellentesque nisl dolor, finibus imperdiet magna quis, bibendum rhoncus tortor. Sed venenatis neque eu lacus bibendum accumsan. Proin rhoncus fringilla lectus, id fringilla turpis condimentum in. Morbi congue velit lacus, vestibulum accumsan quam congue sed.

Morbi ac suscipit sem. Cras dignissim tellus quis nunc ultrices, vel dapibus ligula vulputate. Curabitur vulputate, orci et scelerisque tristique, enim sapien fermentum est, vel varius purus metus id magna. Fusce imperdiet dolor sit amet sem aliquam ullamcorper. Donec gravida nibh eget nibh congue, sed commodo diam accumsan. Donec dolor tortor, porta et nulla nec, gravida dapibus tellus. Vestibulum venenatis congue lectus, at consectetur felis pellentesque a. Morbi viverra nisi a nunc porta tincidunt non non erat. Morbi sit amet dolor lectus.

Curabitur finibus cursus lectus vel pulvinar. Etiam venenatis feugiat dolor, ut fringilla massa vestibulum eget. Cras id arcu accumsan, accumsan nulla vitae, bibendum nisi. Aliquam eget volutpat elit, sodales posuere libero. Nam vulputate eros elit, id ornare mauris fermentum eget. Sed mattis non nunc ut accumsan. Fusce rutrum convallis libero eget feugiat.

Maecenas ac mauris vitae sem fermentum ullamcorper ut eget nibh. Aenean vel vulputate risus. Nulla vel ante lectus. Sed ornare consequat feugiat. Quisque erat risus, tempor vitae porttitor in, mattis quis eros. Maecenas tincidunt leo quis laoreet malesuada. Maecenas dolor mauris, bibendum a mauris nec, efficitur ullamcorper augue. Suspendisse tincidunt, urna eu ornare congue, augue risus sollicitudin sapien, quis venenatis sem mauris et nisl. Vivamus vitae est arcu.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed pellentesque commodo diam a pellentesque. Morbi tincidunt egestas sapien. Ut quis suscipit lacus, ac maximus risus. Suspendisse a ligula a ligula rhoncus interdum vel sed augue. Nam sed quam id nisi lobortis ultrices. Praesent odio sem, efficitur tristique cursus convallis, pretium et dolor. Pellentesque tincidunt est at auctor porttitor. Fusce dolor metus, consectetur vitae feugiat vitae, finibus ut turpis. Fusce maximus euismod mi, sagittis iaculis justo porttitor sed. Etiam tincidunt magna id odio fermentum, id maximus sapien imperdiet. Etiam bibendum turpis id diam varius, ac malesuada magna bibendum.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus vel vestibulum libero, feugiat dapibus sem. Nunc semper hendrerit massa, ut mollis nisl mollis at. Fusce dignissim ante ac ipsum tempus tempus. Phasellus tincidunt lacus et dapibus laoreet. Donec fermentum tempor odio. Nam hendrerit leo ut massa consectetur, id porta purus sodales. Maecenas ut velit a tortor congue volutpat. Nulla dictum et lorem eget vulputate.

Mauris ut leo in metus auctor sodales ut in neque. Maecenas maximus orci vel justo dignissim, vitae lobortis elit gravida. In odio risus, varius vel nibh ac, bibendum fermentum sem. Sed risus felis, sollicitudin vitae enim sed, interdum tristique tellus. Ut dolor purus, dictum at tortor elementum, iaculis vestibulum lectus. Vivamus sodales imperdiet mi, sit amet pulvinar nunc gravida sed. Vestibulum vel nibh dolor. Sed tempus ex dui, suscipit posuere urna auctor at. Sed semper lorem ipsum.

Donec viverra magna eu semper gravida. Nullam velit elit, pretium at ligula id, auctor consequat enim. Morbi consectetur aliquet nisl et facilisis. Nam tempor ullamcorper viverra. Aliquam felis nibh, aliquet feugiat odio eu, lobortis pharetra turpis. In placerat urna sit amet leo blandit, vel sodales erat fermentum. Cras porttitor, odio tempor maximus lobortis, risus odio pharetra mi, sit amet mollis tortor turpis fringilla velit. Vivamus ornare nulla sit amet neque pulvinar tempus vel ac nunc.

Nulla at sagittis velit. Pellentesque tristique quis mi ultrices gravida. Etiam auctor mi elit, a commodo purus molestie eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque volutpat cursus euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent arcu libero, aliquam in tincidunt ut, hendrerit et eros.

Nulla tortor urna, luctus a rhoncus vitae, pulvinar vitae mauris. In condimentum posuere neque nec posuere. Phasellus interdum semper mauris, eget posuere nisl lacinia vel. Nulla pretium iaculis pharetra. Quisque sem odio, aliquet eget sodales at, volutpat a nulla. Pellentesque in mauris eget lorem luctus sodales. Pellentesque tempor tellus sed rhoncus ornare. Donec pharetra velit in tortor dapibus, sed ultricies sapien ultricies. Mauris porttitor cursus massa, sit amet bibendum tortor sodales sit amet. Sed enim justo, facilisis vitae magna sed, cursus sagittis felis. Pellentesque justo diam, ornare sed risus nec, placerat consectetur arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin hendrerit erat eros, vel rhoncus lacus efficitur a. Mauris quis nibh sit amet magna accumsan dictum eget ut est.

Fusce at odio ut lacus suscipit facilisis. Curabitur mattis cursus diam feugiat congue. Fusce et pretium ipsum. Vivamus ac libero quis nunc scelerisque facilisis lacinia non felis. Fusce posuere porttitor quam suscipit pretium. Maecenas vitae viverra eros. Nunc iaculis, sapien pretium bibendum semper, nunc eros consectetur est, euismod aliquet nibh arcu ut sapien.

Mauris vel finibus ligula. Cras iaculis iaculis erat nec hendrerit. Nam quis aliquet nulla. Etiam ultrices sit amet libero vel tincidunt. Nulla rutrum imperdiet sapien a lobortis. Quisque sed pellentesque quam. Donec consectetur metus ac ipsum vehicula, vel vehicula ante convallis. Maecenas nec ultricies mi. Proin malesuada neque mattis nibh scelerisque sodales. Nam arcu mauris, feugiat quis tempor nec, dignissim nec nisl. Sed ut dui eget mi tincidunt pretium. Mauris sit amet pulvinar magna, vel lacinia lacus. Ut quis ante laoreet justo maximus fringilla sed in ex. Quisque aliquet porttitor elementum. Maecenas vitae nunc et mi dapibus eleifend dignissim sed mi.

Etiam eu libero tempus, imperdiet metus id, egestas sem. Pellentesque ac nisl quam. Suspendisse pretium ipsum ac mi ornare mattis. Morbi vulputate nibh quis dictum cursus. Quisque pulvinar tellus nec augue malesuada lobortis. Praesent bibendum lacinia tristique. Vivamus venenatis sem vel sagittis fringilla. Quisque metus lorem, pellentesque a dolor nec, eleifend malesuada nibh. Morbi nunc mauris, fringilla ut aliquam sit amet, blandit at nisi. Sed ut lectus eget ante lacinia molestie. Mauris et blandit risus.

Nulla et cursus ante. Etiam placerat urna eget imperdiet luctus. Vivamus fermentum ligula ac rutrum fringilla. Duis ut augue porta, volutpat velit ut, blandit turpis. Mauris eu turpis ut ligula maximus pellentesque. Quisque libero sapien, lobortis eget neque et, fermentum imperdiet dolor. Sed condimentum orci in luctus mattis. Phasellus ac neque libero. Integer finibus massa eget molestie interdum. In iaculis, magna nec imperdiet rhoncus, nisi neque lacinia ipsum, eu faucibus felis sem ornare eros. Cras fermentum eget diam vitae ultrices. Aenean a libero quis risus eleifend luctus. Sed dapibus arcu eget felis aliquet dictum.
        </div>
      </div>
    )
  }
}

export default Public