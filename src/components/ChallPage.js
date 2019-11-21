import React, {Component} from 'react';
import styles from './ChallPage.module.css';
import { ProgressBar, Card , Button, Form, Col, Row, Container} from 'react-bootstrap';

class ChallPage extends Component {
  constructor(props) {
    super(props);
    this.state =({
        title: props.title
    })
    console.dir(this.props.match.params.id)
  }

render() {
    
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
                                        <div className={styles.card_title} style={{width:"8rem"}}>Accessible</div>
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
                                JackPepper, T2Lab
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card bg="dark" text="white" className={styles.info_card} style={{borderColor:"grey" }}>
                        <Card.Body>
                            <Card.Title className={styles.info_card_title} style={{color: "grey"}}>Récompense</Card.Title>
                            <Card.Text className={styles.card_title}>
                                5 points
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
                            Retrouver le flag. C'est facile lol
                            </Card.Text>
                            <Button variant="primary">Démarrer le challenge</Button>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className={styles.main_row}>
                    <Card bg="dark" text="white" className={styles.main_card}>
                        <Card.Header className={styles.card_title}>Valider le challenge</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Saisir le mot de passe
                                <Form.Control style={{backgroundColor:"#444444", color:"white"}} type="text" placeholder="" />
                            </Card.Text>
                            <Button variant="primary">Valider</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
  }
}

export default ChallPage;
