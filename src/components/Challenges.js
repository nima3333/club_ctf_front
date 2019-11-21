import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Challenges.module.css';
import { Button } from 'reactstrap';
import { ProgressBar, Card , Badge, Col, Row, Container} from 'react-bootstrap';

var env = require('../misc/env.js');

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state =({
        title: props.title
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

  render() {

    this.levels = [
        {name: "Accessible",
        total: 0,
        value: 0},
        {name: "Intermédiaire",
        total: 0,
        value: 0},
        {name: "Difficile",
        total: 0,
        value: 0},
        {name: "Hardcore",
        total: 0,
        value: 0}
    ]

    var challs;
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                challs = JSON.parse(this.responseText);
            } else if (this.status === 404){
                // TODO : Afficher message d'erreur
                console.log("Erreur de chargement des challenges");
                
            }
            
        }
    });
    xhr.open("GET",  env.server_url + "/api/v1/challenge/read_all.php", false);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);

    console.log(challs);
    
    this.challs = challs[this.props.chall.toLowerCase()];
    if (this.challs === undefined) {
        this.challs = [];
    } else {
        // Charger les auteurs associés
        for (let chall of this.challs) {
            data = null;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.status === 200) {
                    chall.author =  JSON.parse(this.responseText)['authors'];
                } else if (this.status === 404){
                    // TODO : Afficher message d'erreur
                    console.log("Tous les auteurs n'ont pas pu être chargés");                    
                }
            });
            xhr.open("GET", env.server_url + "api/v1/challenge/read.php?idChall=" + chall.idChall, false);
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('jwt'));
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        }
    }

    data = JSON.stringify(false);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var val;
    xhr.addEventListener("readystatechange", function () {
        if (this.status === 200) {
            if (this.responseText === "No validation found 404 for pseudo") {
                val = [];
            } else {
                val = JSON.parse(this.responseText);
                console.log(this.validations);
                
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

    this.validations = val.length === 0 ? [] : val.records;

    // Total number of challenges per category
    for (let chall of this.challs) {
        for (let i = 0; i < this.levels.length; i++) {
            if (chall.difficulty === this.levels[i].name){
                this.levels[i].total++;
                break;
            }            
        }
    }
   
    // Number of challenges validated by category
    for (let chall of this.validations) {
        for (let i = 0; i < this.levels.length; i++) {
            if (chall.difficulty === this.levels[i].name && chall.type == this.props.chall.toLowerCase()){
                this.levels[i].value++;
                break;
            }            
        }
    }

    // Don't allow division by 0
    for (let i = 0; i < this.levels.length; i++) {
        this.levels[i].total = this.levels[i].total === 0 ? 1 : this.levels[i].total;           
    }

    // FIXME : Texte des difficultés "accessible, difficile etc" déborde sur 2 lignes quand on réduit la taille de la fenêtre
    // FIXME : Problème d'encodage des accents (ex : Intermédiaire)
    return (
        <div className={`Challenges  ${styles.main_div}`}>
            <Container>
                <Row>
                    <Col>
                        {this.challs.map(chall => (
                                <>
                                <Card bg="dark" text="white" border="secondary" style={{ width: '100%', fontSize: "14px"}}>
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
                                        <Row style={{width:"100%"}}>
                                            <Col md="auto" className={styles.text_level}>
                                                <p> {level.name} </p>
                                            </Col>
                                            <Col md="auto" style={{width:"100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                                <ProgressBar className={styles.dark_progress_bar} variant={this.get_color_stat((level.value / level.total) * 100)} label={(level.value / level.total) * 100 + " %"} now={(level.value / level.total) * 100}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                ))}
                                <br/>
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
  }
}

export default Challenges;
