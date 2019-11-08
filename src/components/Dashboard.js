import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';
import {ProgressBar, Image, Card, ListGroup, Container, Row, Col} from 'react-bootstrap'
import Graphe from '../misc/LineGraph'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pseudo: "Alice_74",
        avatar: avatar,
        points: 4500,
        rank: 12,
        total_memberf: 12000,
        reussis: 12,
        solutions: 1,
        inventes: 2,
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
                    <Col>
                        <Card border="info" className={styles.info_card}>
                                <Card.Body>
                                    <Card.Text className={styles.card_title}>
                                    <Image className={styles.image2} src={this.state.avatar} rounded />
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                        
                    </Col>
                    <Col>
                        <Card className={styles.info_card} style={{borderLeftColor:"blue" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "blue"}}>Points</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.points}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.info_card} style={{borderLeftColor:"purple" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "purple"}}>Challenges réussis</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.reussis}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.info_card} style={{borderLeftColor:"grey" }}>
                            <Card.Body>
                                <Card.Title className={styles.info_card_title} style={{color: "grey"}}>Challenges proposés</Card.Title>
                                <Card.Text className={styles.card_title}>
                                    {this.state.inventes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.info_card} style={{borderLeftColor:"red" }}>
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
                        <Card border="secondary" style={{ width: '100%', fontSize: "14px"}}>
                            <Col>
                            {this.state.stats.map(stat => (
                                <Row style={{margin: "1rem"}}>
                                    <span className={`Dashboard  ${styles.stat_title}`}>
                                        {stat.name}
                                    </span>
                                    <div className={`${styles.progress_bar}`}>
                                        <ProgressBar now={stat.value} variant={this.get_color_stat(stat.value)}/>
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
