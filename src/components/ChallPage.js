import React, {Component} from 'react';
import styles from './ChallPage.module.css';
import { ProgressBar, Card , Button, Form, Col, Row, Container} from 'react-bootstrap';

var env = require('../misc/env.js');

class ChallPage extends Component {
  constructor(props) {
    super(props);
    this.state =({
        title: props.title
    })
    this.chall = [];
    var challreq;
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.status === 200) {
            challreq =  JSON.parse(this.responseText);
        } else if (this.status === 404){
            // TODO : Afficher message d'erreur
            console.log("Impossible de charger le challenge");                    
        }
    });
    xhr.open("GET", env.server_url + "api/v1/challenge/read.php?idChall=" + this.props.match.params.id, false);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
    this.chall = challreq;    
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]:event.target.value,
    })
  }

  loadChall(url) {
    window.open(url, '_blank');
  }

  validateChall() {
    var data = JSON.stringify({
        "flag": this.state.password,
        "idChall": this.props.match.params.id
    });
      
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // TODO : Afficher message
                var msg = JSON.parse(this.responseText).message;
                if (msg === "Flag is valid") {
                    console.log("Bien joué !"); 
                } else if (msg === "Flag already submitted!") {
                    console.log("Désolé, vous avez déjà validé ce challenge."); 
                } else {
                    console.log("Retentez votre chance."); 
                }
            } else if (this.status === 400){
                // TODO : Afficher message d'erreur
                console.log("Les données sont incomplètes.");                    
            }
        }
    });
    
    xhr.open("POST", env.server_url + "api/v1/challenge/validate.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);   
  }

  render() {  
    // Front
    // TODO : Afficher le titre du chall
    // TODO : Aligner les "boites" de couleur sur les cards du dessous 
    // TODO : Mettre le mot de passe de validation en **** plutôt qu'en clair

    // Intégration
    // TODO : Intégrer nombre de validations
    return (
        <div className={`chall ${styles.full_width}`}>
            <Container fluid="true">
                <Row className={styles.main_row}>
                    <Col>
                    <Card bg="dark" text="white" border="success" className={styles.info_card}>
                        <Card.Body>
                            <Card.Title className={styles.info_card_title} style={{color: "green"}}>Difficulté</Card.Title>
                            <Card.Text>
                                <Container>
                                    <Row>
                                        <div className={styles.card_title} style={{width:"8rem"}}>{this.chall.difficulty}</div>
                                        <div style={{display:"flex"}}>
                                            <ProgressBar className={styles.vertical_center} style={{width:"11rem"}} variant="success" now={20}></ProgressBar>
                                        </div>
                                    </Row>
                                </Container>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card bg="dark" text="white" className={styles.info_card} style={{borderColor:"red" }}>
                        <Card.Body>
                            <Card.Title className={styles.info_card_title} style={{color: "red"}}>Validations</Card.Title>
                            <Card.Text className={styles.card_title}>
                                18
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card bg="dark" text="white" className={styles.info_card} style={{borderColor:"yellow" }}>
                        <Card.Body>
                            <Card.Title className={styles.info_card_title} style={{color: "yellow"}}>Auteur(s)</Card.Title>
                            <Card.Text className={styles.card_title}>
                                {this.chall.authors.join(", ")}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card bg="dark" text="white" className={styles.info_card} style={{borderColor:"grey" }}>
                        <Card.Body>
                            <Card.Title className={styles.info_card_title} style={{color: "grey"}}>Récompense</Card.Title>
                            <Card.Text className={styles.card_title}>
                                {this.chall.points} points
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row className={styles.main_row}>
                    <Card bg="dark" text="white" className={styles.main_card}>
                        <Card.Header className={styles.card_title}>Enoncé</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {this.chall.statement}
                            </Card.Text>
                            <Button variant="primary" onClick={() => this.loadChall(this.chall.url)}>Démarrer le challenge</Button>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className={styles.main_row}>
                    <Card bg="dark" text="white" className={styles.main_card}>
                        <Card.Header className={styles.card_title}>Valider le challenge</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Saisir le mot de passe
                                <Form.Control style={{backgroundColor:"#444444", color:"white"}} type="text" placeholder="" onChange={this.handleChange} id="password" />
                            </Card.Text>
                            <Button variant="primary" onClick={() => this.validateChall()}>Valider</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
  }
}

export default ChallPage;
