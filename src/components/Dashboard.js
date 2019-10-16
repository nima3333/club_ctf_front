import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';
import {ProgressBar, Image, Card, ListGroup} from 'react-bootstrap'
import Graphe from './myLineChart'

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

  render() {
    return (
        <div className={`Dashboard  ${styles.main_div}`}>
            <div className={`Dashboard  ${styles.main_flex}`}>
                
                
                <div className={`Dashboard  ${styles.row1}`}>


                        <Card border="secondary" style={{ width: '60%', fontSize: "14px"}}>
                                    
                                    <Card.Body>
                                    <Card.Title>moi</Card.Title>
                                    <Card.Text>
                                    <div className={styles.row}>
                                    <div className={`Dashboard  ${styles.img}`}>
                                        <Image src={this.state.avatar} rounded />
                                    </div>
                                        <div className={styles.column}>
                                        <ListGroup>
                                            <ListGroup.Item>{this.state.pseudo}</ListGroup.Item>
                                            <ListGroup.Item>{this.state.points} points</ListGroup.Item>
                                            <ListGroup.Item>Rank : {this.state.rank}</ListGroup.Item>
                                        </ListGroup>
                                        </div>
                                        <div className={styles.column}>
                                        <ListGroup>
                                            <ListGroup.Item>{this.state.reussis} challs réussis</ListGroup.Item>
                                            <ListGroup.Item>{this.state.solutions} solutions publiées</ListGroup.Item>
                                            <ListGroup.Item>{this.state.inventes} challs inventés</ListGroup.Item>
                                        </ListGroup>
                                        </div>
                                    </div>
                                    </Card.Text>
                                    </Card.Body>
                                </Card>

                    
                </div>




                <div className={`Dashboard  ${styles.row1}`}>
                        <span className={`Dashboard  ${styles.graphtext}`}>
                            <Graphe/>
                        </span>

                    <div className={`Dashboard  ${styles.col_stat}`}>

                        {this.state.stats.map(stat => (
                            <div className={`Dashboard  ${styles.row_stat}`}>
                                <span className={`Dashboard  ${styles.stat_title}`}>
                                    {stat.name}
                                </span>
                                <div className={`Dashboard  ${styles.progress_bar}`}>
                                    <ProgressBar now={stat.value}/>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
