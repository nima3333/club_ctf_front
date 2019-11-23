import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import styles from './Challenges.module.css';
import { Button } from 'reactstrap';
import { Modal, ProgressBar, Card, Badge, Col, Row, Container } from 'react-bootstrap';
import ErrorMessage from '../misc/ErrorMessage'
import Loading from '../misc/Loading'

var env = require('../misc/env.js');

class Challenges extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            title: props.title,
            loading: true
        })

        this.validations = []

        this.accompl = [
            {
                name: "Connie G.",
                time: "0:44",
                num: 1,
            },
            {
                name: "IdK",
                time: "0:48",
                num: 1,
            },
            {
                name: "HarryWKM",
                time: "1:13",
                num: 1,
            },
            {
                name: "BBlackwo",
                time: "2:25",
                num: 1,
            }
        ];
    }

    componentDidMount() {
        this.preFetch()
    }

    go_to_challenge = (i) => this.props.history.push(`/challenges/${i}`);


    get_color_stat(x) {
        if (x < 33) {
            return 'danger';
        } else if (x < 66) {
            return 'warning';
        } else {
            return 'success';
        }
    }

    get_color_points(x) {
        if (x < 20) {
            return 'success';
        } else if (x < 49) {
            return 'warning';
        } else if (x < 74) {
            return 'danger';
        } else {
            return 'secondary';
        }
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

    preFetch = () => {
        this.levels = [
            {
                name: "Accessible",
                total: 0,
                value: 0
            },
            {
                name: "Intermédiaire",
                total: 0,
                value: 0
            },
            {
                name: "Difficile",
                total: 0,
                value: 0
            },
            {
                name: "Hardcore",
                total: 0,
                value: 0
            }
        ]
        this.data_fetch_1()
    }

    data_fetch_1 = () => {
        var challs;
        var data = null;
        var xhr = new XMLHttpRequest();
        const setErrorFunction = this.setError
        const data_fetch_2_fn = this.data_fetch_2
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    challs = JSON.parse(this.responseText);
                    data_fetch_2_fn(challs)
                } else if (this.status === 404) {
                    setErrorFunction("Erreur de chargement des challenges")
                }
            }
        });
        xhr.open("GET", env.server_url + "/api/v1/challenge/read_all.php", false);
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

    data_fetch_2 = (challs) => {
        this.challs = challs[this.props.chall.toLowerCase()];
        if (this.challs === undefined) {
            this.challs = [];
        } else {
            // Charger les auteurs associés
            var number_of_challs = this.challs.length
            const data_fetch_3_fn = this.data_fetch_3
            
            for (let chall of this.challs) {
                var data = null;
                var xhr = new XMLHttpRequest();
                const setErrorFunction = this.setError
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function () {
                    number_of_challs --;
                    if (this.status === 200) {
                        chall.author = JSON.parse(this.responseText)['authors'];
                    } else if (this.status === 404) {
                        setErrorFunction("Tous les auteurs n'ont pas pu être chargés")
                    }
                    if(number_of_challs == 0) {
                        data_fetch_3_fn(challs)
                    }
                });
                xhr.open("GET", env.server_url + "api/v1/challenge/read.php?idChall=" + chall.idChall, false);
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
        }

    }

    data_fetch_3 = (challs) => {
        var data = JSON.stringify(false);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var val;
        const postProcessing_fn = this.postProcessing
        xhr.addEventListener("readystatechange", function () {
            if (this.status === 200) {
                if (this.responseText === "No validation found 404 for pseudo") {
                    val = [];
                } else {
                    val = JSON.parse(this.responseText);
                    console.log(this.validations);
                }
                postProcessing_fn(val, challs)
            }
        });
        xhr.open("GET", env.server_url + "api/v1/challenge/read_validations.php", false);
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

    postProcessing = (val, challs) => {

        this.validations = val.length === 0 ? [] : val.records;

        // Total number of challenges per category
        for (let chall of this.challs) {
            for (let i = 0; i < this.levels.length; i++) {
                if (chall.difficulty === this.levels[i].name) {
                    this.levels[i].total++;
                    break;
                }
            }
        }

        // Number of challenges validated by category
        for (let chall of this.validations) {
            for (let i = 0; i < this.levels.length; i++) {
                if (chall.difficulty === this.levels[i].name && chall.type == this.props.chall.toLowerCase()) {
                    this.levels[i].value++;
                    break;
                }
            }
        }

        // Don't allow division by 0
        for (let i = 0; i < this.levels.length; i++) {
            this.levels[i].total = this.levels[i].total === 0 ? 1 : this.levels[i].total;
        }

        this.setState({
            loading: false
        })
    }

    render() {
        // FIXME : Texte des difficultés "accessible, difficile etc" déborde sur 2 lignes quand on réduit la taille de la fenêtre
        if (this.state.loading === true) {
            return (<Container><Loading></Loading>
                <Modal show={this.state.showError} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Erreur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.errorMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="alert" onClick={this.handleClose}>
                            Close
                </Button>
                    </Modal.Footer>
                </Modal></Container>)
        }
        else {
            return(
            <div className={`Challenges  ${styles.main_div}`}>
                <ErrorMessage showError={this.state.showError} handleClose={this.handleClose} errorMessage={this.state.errorMessage}></ErrorMessage>
                <Container>
                    <Row>
                        <Col>
                            {this.challs.map(chall => (
                                <>
                                    <Card bg="dark" text="white" border="secondary" style={{ width: '100%', fontSize: "14px" }}>
                                        <Card.Header>
                                            <div className={styles.badge}>
                                                <div className={`${styles.title} ${styles.badge} `}>
                                                    {chall.title}
                                                </div>
                                                <div>
                                                    <Badge pill variant={this.get_color_points(chall.points)}> {chall.points} points </Badge>
                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>{chall.author.join(", ")}</Card.Title>
                                            <Button onClick={() => this.go_to_challenge(chall.idChall)} variant="primary">Démarrer le challenge</Button>
                                        </Card.Body>
                                    </Card>

                                    <br />
                                </>
                            ))}

                        </Col>

                        <Col>
                            <Card bg="dark" text="white" border="secondary" style={{ width: '100%' }}>
                                <Card.Header>{this.props.chall}</Card.Header>
                                <Card.Body>
                                    {this.levels.map(level => (
                                        <Container className={styles.diff}>
                                            <Row style={{ width: "100%" }}>
                                                <Col md="auto" className={styles.text_level}>
                                                    <p> {level.name} </p>
                                                </Col>
                                                <Col md="auto" style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                    <ProgressBar className={styles.dark_progress_bar} variant={this.get_color_stat((level.value / level.total) * 100)} label={(level.value / level.total) * 100 + " %"} now={(level.value / level.total) * 100} />
                                                </Col>
                                            </Row>
                                        </Container>
                                    ))}
                                    <br />
                                    {/*
                                <Media list>
                                {this.accompl.map(acco => (
                                    <div >
                                    <Media tag="li">
                                    <Media left href="#">
                                    <div className={`Challenges ${styles.update_image}`}/>
                                    </Media>
                                    <Media body>
                                    <Media heading> <div className={styles.update_time}> {acco.name} à {acco.time} </div>
                                    </Media>
                                    <div className={styles.update_phrase}> A fini le chall </div>
                                    </Media>
                                    </Media>
                                    <br />
                                    </div>
                                ))}
                                </Media>
                                */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }}
}

export default Challenges;
