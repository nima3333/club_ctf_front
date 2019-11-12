import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Challenges.module.css';
import { Button } from 'reactstrap';
import { ProgressBar, Card , Badge, Col, Row, Container} from 'react-bootstrap';

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state =({
        title: props.title
    })
    this.challs = [
        {
            id: "01",
            author: "Simon",
            points: 100,
            title: "Titre 1",
        },
        {
            id: "02",
            author: "Paul",
            points: 500,
            title: "Titre 2",
        },
        {
            id: "03",
            author: "Jacques",
            points: 1500,
            title: "Titre 3",
        },
        {
            id: "04",
            author: "Thomas",
            points: 5000,
            title: "Titre 4",
        }
    ];
    this.title = "Forensic";

    this.easy = 75;
    this.mean = 25;
    this.hard = 75;
    this.deadly = 25;
    this.levels = [
        {name: "easy",
        value: 24},
        {name: "medium",
        value: 25},
        {name: "hard",
        value: 75},
        {name: "deadly",
        value: 25}
    ]


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
    if (x < 25) {
        return 'danger';
    } else if (x < 50) {
        return 'warning';
    } else {
        return 'success';
    }
  }

  get_color_points(x) {
    if (x < 400) {
        return 'success';
    } else if (x < 1000) {
        return 'warning';
    } else if (x < 3500) {
        return 'danger';
    } else {
        return 'secondary';
    }
  }

  render() {

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
                                    <Card.Title>{chall.author}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk
                                        of the card's content.
                                    </Card.Text>
                                    <Button onClick={() => this.go_to_challenge(chall.id)} variant="primary">Go somewhere</Button>
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
                                            <Col md="4" className={styles.text_level}>
                                                <p> {level.name} </p>
                                            </Col>
                                            <Col md="auto" style={{width:"100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                                <ProgressBar className={styles.dark_progress_bar} variant={this.get_color_stat(level.value)} label={level.value} now={level.value}/>
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
