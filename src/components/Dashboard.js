import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';
import {ProgressBar, Image, Card, Container, Row, Col} from 'react-bootstrap'
import Graphe from '../misc/LineGraph'

var env = require('../misc/env.js');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    var user;

    // User info
    var data = JSON.stringify(false);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                user = JSON.parse(this.responseText)['records'][0];
            } else if (this.status === 404){
                // TODO : Afficher message d'erreur
                console.log("Impossible de charger les infos utilisateur, veuillez vous authentifier");          
            }            
        }
    });
    xhr.open("GET", env.server_url + "api/v1/user/read_current.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

    // Nb validations
    data = JSON.stringify(false);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.status === 200) {
            var validations = JSON.parse(this.responseText)['records'];
            if (validations === undefined) {
                user.validations = [];
            } else {
                user.validations = validations;
            }
            
        }
    });
    xhr.open("GET", env.server_url + "api/v1/challenge/read_validations.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

    // TODO : update chall reussis / nb_total_chall par catégorie
    this.state = {
        pseudo: user['pseudo'],
        avatar: avatar,
        points: user['score'],
        rank: user['rank'],
        total_memberf: 12000,
        reussis: user.validations.length,
        solutions: 0,
        inventes: 0,
        stats: [
            {
              name: "Web",
              value: 75,
              color: '#00ff00',
            },
            {
              name: "Crypto",
              value: 25,
              color: '#ff0000',
            },
            {
              name: "Forensic",
              value: 10,
              color: '#ff0000',
            },
            {
              name: "Stégano",
              value: 100,
              color: '#0000ff',
            }
        ]
    };
  }

  get_color_stat(x) {
    if (x < 25) {
        return 'danger';
    } else if (x < 50) {
        return 'warning';
    } else {
        return 'success';
    }
  }


  render() {
    return (
        <div className={`Dashboard  ${styles.main_div}`}>
            <Container fluid="true">
                <Row className={styles.main_row}>
                    <Col xs={12} md={12} lg={"auto"}>
                        <Card bg="dark" className={styles.info_card}>
                        <Card.Img variant="top" className={styles.image2} src={this.state.avatar} rounded/>
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
                        <Card bg="dark" text="white" className={styles.info_card} style={{borderLeftColor:"white" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "white"}}>Points</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.points}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card bg="dark" text="white" className={styles.info_card} style={{borderLeftColor:"yellow" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "yellow"}}>Challenges réussis</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.reussis}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card bg="dark" text="white" className={styles.info_card} style={{borderLeftColor:"grey" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "grey"}}>Challenges proposés</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.inventes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card bg="dark" text="white" className={styles.info_card} style={{borderLeftColor:"red" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "red"}}>Solutions proposées</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.solutions}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row className={styles.main_row} style={{paddingTop : "15px"}}>
                    <Col>
                        <Card border="secondary" style={{ width: '100%', fontSize: "14px"}}>
                            <Graphe/>
                        </Card>
                    </Col>
                    <Col style={{paddingTop: "1rem"}}>
                        <Card bg="dark" border="secondary" style={{ width: '100%', fontSize: "14px"}}>
                            <Col>
                            {this.state.stats.map(stat => (
                                <Row style={{margin: "1rem"}}>
                                    <span className={`Dashboard  ${styles.stat_title}`}>
                                        {stat.name}
                                    </span>
                                    <div className={`${styles.progress_bar}`}>
                                        <ProgressBar className={styles.dark_progress_bar} now={stat.value} variant={this.get_color_stat(stat.value)}/>
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

export default Dashboard;
