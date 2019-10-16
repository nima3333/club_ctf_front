import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';
import ProgressBar from 'react-bootstrap/ProgressBar'

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
                    <div className={`Dashboard  ${styles.col_img_info}`}>
                        <div className={`Dashboard  ${styles.img}`}>
                            <img src={this.state.avatar} alt="avatar" className={`Dashboard  ${styles.image}`}/>
                        </div>
                        <div className={`Dashboard  ${styles.col_info}`}>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.state.pseudo}
                            </h6>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.state.points} points
                            </h6>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.state.rank} / {this.state.total_member} membres
                            </h6>
                        </div>
                    </div>
                    <div className={`Dashboard  ${styles.col_img_info}`}>
                        <div className={`Dashboard  ${styles.col_right_info}`}>
                            <h6 className={`Dashboard  ${styles.info_right}`}>
                                {this.state.reussis} challs réussis
                            </h6>
                            <h6 className={`Dashboard  ${styles.info_right}`}>
                                {this.state.solutions} solutions publiées
                            </h6>
                            <h6 className={`Dashboard  ${styles.info_right}`}>
                                {this.state.inventes} challs inventés
                            </h6>
                        </div>
                    </div>
                </div>
                <div className={`Dashboard  ${styles.row1}`}>
                    <div className={`Dashboard  ${styles.graph}`}>
                        <span className={`Dashboard  ${styles.graphtext}`}>
                            Graphe
                        </span>
                    </div>
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
