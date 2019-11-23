import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';
import { Button, Modal, ProgressBar, Image, Card, Container, Row, Col } from 'react-bootstrap'
import Graphe from '../misc/LineGraph'
import Loading from '../misc/Loading';

var env = require('../misc/env.js');

class Dashboard extends Component {

    start_data_fetch1 = (dataFecth2, data_fetch3, postTreatment) => {
        // User info
        const setErrorFunction = this.setError
        var data = JSON.stringify(false);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var user = JSON.parse(this.responseText)['records'][0];
                    dataFecth2(user, data_fetch3, postTreatment);
                } else if (xhr.status === 404) {
                    setErrorFunction("Impossible de charger les infos utilisateur, veuillez vous authentifier");
                }
            }
        });

        xhr.open("GET", env.server_url + "api/v1/user/read_current.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("cache-control", "no-cache");
        try {
            xhr.send(data);
        }
        catch (e) {
            this.setError("Erreur de connexion")
        }
    }

    data_fetch2 = (user, data_fetch3, postTreatment) => {
        // Nb validations
        var data = JSON.stringify(false);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.status === 200) {
                if (this.responseText === "No validation found 404 for pseudo") {
                    user.validations = [];
                } else {
                    user.validations = JSON.parse(this.responseText).records;
                }
                data_fetch3(user, postTreatment)
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

    data_fetch3 = (user, postTreatment) => {
        //challs
        var data = null;
        var xhr = new XMLHttpRequest();
        const setErrorFunction = this.setError
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var challs = JSON.parse(this.responseText);
                    postTreatment(user, challs)
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

    postTreatment = (user, challs) => {
        console.dir("4")
        this.categories = [
            {
                name: "Dev",
                total: 0,
                value: 0
            },
            {
                name: "Web",
                total: 0,
                value: 0
            },
            {
                name: "Reverse",
                total: 0,
                value: 0
            },
            {
                name: "Forensics",
                total: 0,
                value: 0
            },
            {
                name: "Crypto",
                total: 0,
                value: 0
            },
            {
                name: "Reseau",
                total: 0,
                value: 0
            }
        ]
        if (typeof challs === 'undefined') { }
        else {
            // Total number of challenges per category
            this.categories[0].total = challs.dev.length === 0 ? 1 : challs.dev.length;
            this.categories[1].total = challs.web.length === 0 ? 1 : challs.web.length;
            this.categories[2].total = challs.reverse.length === 0 ? 1 : challs.reverse.length;
            this.categories[3].total = challs.forensics.length === 0 ? 1 : challs.forensics.length;
            this.categories[4].total = challs.crypto.length === 0 ? 1 : challs.crypto.length;
            this.categories[5].total = challs.reseau.length === 0 ? 1 : challs.reseau.length;


            // Nb of validations per category
            for (let chall of user.validations) {
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].name.toLocaleLowerCase() === chall.type) {
                        this.categories[i].value++;
                    }
                }
            }

            this.setState({
                pseudo: user.pseudo,
                avatar: avatar,
                points: user.score,
                rank: user.rank,
                total_memberf: 12000,
                reussis: user.validations.length,
                solutions: 0,
                inventes: 0,
                showError: false,
                loading: false,
            });

            console.dir('4')
            console.dir(this)
        }
    }

    constructor(props) {
        super(props);

        var user;
        var validations;

        this.state = {
            solutions: 0,
            inventes: 0,
            showError: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.start_data_fetch1(this.data_fetch2, this.data_fetch3, this.postTreatment);
    }

    get_color_stat(x) {
        if (x < 25) {
            return 'danger';
        } else if (x < 65) {
            return 'warning';
        } else {
            return 'success';
        }
    }

    setError = (message) => {
        this.setState({
            showError: true,
            errorMessage: message,
        })
    }

    handleClose = (message) => {
        this.setState({
            showError: false
        })
        this.props.signOut()
    }

    render() {
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
            return (
                <div className={`Dashboard  ${styles.main_div}`}>

                    {/* Erreur */}
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
                    </Modal>

                    <Container fluid="true">
                        <Row className={styles.main_row}>
                            <Col xs={12} md={12} lg={"auto"}>
                                <Card bg="dark" className={styles.info_card}>
                                    {/*}
                        <Card.Img variant="top" className={styles.image2} src={this.state.avatar} rounded/>
    {*/}
                                    {/*}                        
                        <Card.Body>
                            <Card.Text className={styles.card_title}>
                            <Image className={styles.image2} src={this.state.avatar} rounded />
                            </Card.Text>
                        </Card.Body>
                        {*/}
                                </Card>

                            </Col>
                            <Col sm>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderLeftColor: "white" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "white" }}>Points</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            {this.state.points}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderLeftColor: "yellow" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "yellow" }}>Challenges réussis</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            {this.state.reussis}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderLeftColor: "grey" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "grey" }}>Challenges proposés</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            {this.state.inventes}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm>
                                <Card bg="dark" text="white" className={styles.info_card} style={{ borderLeftColor: "red" }}>
                                    <Card.Body>
                                        <Card.Title className={styles.info_card_title} style={{ color: "red" }}>Solutions proposées</Card.Title>
                                        <Card.Text className={styles.card_title}>
                                            {this.state.solutions}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        <Row className={styles.main_row} style={{ paddingTop: "15px" }}>
                            <Col>
                                <Card border="secondary" style={{ width: '100%', fontSize: "14px" }}>
                                    <Graphe />
                                </Card>
                            </Col>
                            <Col style={{ paddingTop: "1rem" }}>
                                <Card bg="dark" border="secondary" style={{ width: '100%', fontSize: "14px" }}>
                                    <Col>
                                        {this.categories.map(stat => (
                                            <Row style={{ margin: "1rem" }}>
                                                <span className={`Dashboard  ${styles.stat_title}`}>
                                                    {stat.name}
                                                </span>
                                                <div className={`${styles.progress_bar}`}>
                                                    <ProgressBar className={styles.dark_progress_bar} now={(stat.value / stat.total) * 100} variant={this.get_color_stat((stat.value / stat.total) * 100)} />
                                                </div>
                                            </Row>
                                        ))}
                                    </Col>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default Dashboard;
