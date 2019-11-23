import React, { Component } from 'react';
import styles from './ChallPage.module.css';
import { ProgressBar, Card, Button, Form, Col, Row, Container } from 'react-bootstrap';
import ErrorMessage from '../misc/ErrorMessage'
import Loading from '../misc/Loading'
var env = require('../misc/env.js');

class ChallPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: props.title
        })
        this.chall = [];
    }

    componentDidMount() {
        var setErrorFunction = this.setError
        var disableLoadingFunction = this.disableLoading
        var challreq;
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.status === 200) {
                challreq = JSON.parse(this.responseText);
                disableLoadingFunction()
            } else if (this.status === 404) {
                setErrorFunction("Impossible de charger le challenge")
            }
        });
        xhr.open("GET", env.server_url + "api/v1/challenge/read.php?idChall=" + this.props.match.params.id, false);
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("cache-control", "no-cache");
        try {
            xhr.send(data);
        }
        catch (e) {
            this.setError("Erreur de connexion")
        }
        this.chall = challreq;
    }

    disableLoading = () => {
        this.setState({
            loading: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    loadChall(url) {
        window.open(url, '_blank');
    }

    validateChall() {
        const setErrorFunction = this.setError
        var data = JSON.stringify({
            "flag": this.state.password,
            "idChall": this.props.match.params.id
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var msg = JSON.parse(this.responseText).message;
                    if (msg === "Flag is valid") {
                        setErrorFunction("Bien joué !")
                    } else if (msg === "Flag already submitted!") {
                        setErrorFunction("Désolé, vous avez déjà validé ce challenge.")
                    } else {
                        setErrorFunction("Retentez votre chance.");
                    }
                } else if (this.status === 400) {
                    setErrorFunction("Les données sont incomplètes.");
                }
            }
        });

        xhr.open("POST", env.server_url + "api/v1/challenge/validate.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("cache-control", "no-cache");
        try {
            xhr.send(data);
        }
        catch (e) {
            this.setError("Erreur de connexion")
        }
    }

    difficulty2color = {
        "Hardcore": "secondary",
        "Difficile": "danger",
        "IntermÃ©diaire": "warning",
        "Intermédiaire": "warning",
        "Accessible": "success"
    }

    setError = (message) => {
        this.setState({
            showError: true,
            errorMessage: message,
        })
    }

    handleClose = () => {
        this.setState({
            showError: false,
        })
    }

    render() {
        // Front
        // TODO : Aligner les "boites" de couleur sur les cards du dessous 

        // Intégration
        // TODO : Intégrer nombre de validations
        console.dir(this.chall)
        if (this.state.loading === false) {
            return (
                <div className={`chall ${styles.full_width}`}>
                    <ErrorMessage showError={this.state.showError} handleClose={this.handleClose} errorMessage={this.state.errorMessage}></ErrorMessage>
                    <Container fluid="true">
                        <Row>
                            <Col>
                                <Card bg="dark" text="white" className={styles.info_card}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Container>
                                                <Row>
                                                    <div className={styles.card_title} style={{textAlign: "center", width: "100%"}}>{this.chall.title}</div>
                                                </Row>
                                            </Container>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className={styles.main_row}>
                            <Col>
                                <Card bg="dark" text="white" border={this.difficulty2color[this.chall.difficulty]} className={styles.info_card}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "white" }}>Difficulté</Card.Title>
                                        <Card.Text>
                                            <Container>
                                                <Row>
                                                    <div className={styles.card_title} style={{ width: "8rem" }}>{this.chall.difficulty}</div>
                                                    <div style={{ display: "flex" }}>
                                                        <ProgressBar className={styles.vertical_center} style={{ width: "11rem" }} variant={this.difficulty2color[this.chall.difficulty]} now={this.chall.points}></ProgressBar>
                                                    </div>
                                                </Row>
                                            </Container>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderColor: "red" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "red" }}>Validations</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            18
                            </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderColor: "yellow" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "yellow" }}>Auteur(s)</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            {this.chall.authors.join(", ")}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderColor: "grey" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "grey" }}>Récompense</Card.Title>
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
                                <Form.Control style={{ backgroundColor: "#444444", color: "white" }} type="password" placeholder="" onChange={this.handleChange} id="password" />
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => this.validateChall()}>Valider</Button>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </div>
            );
        }
        else {
            return (<Loading></Loading>)
        }
    }
}

export default ChallPage;
