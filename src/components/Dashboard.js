import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';

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
        <div className={`hallOfFame  ${styles.main_div}`}>
            <div className={`hallOfFame  ${styles.main_flex}`}>
                <div className={`hallOfFame  ${styles.row1}`}>
                    <div className={`hallOfFame  ${styles.col_img_info}`}>
                        <div className={`hallOfFame  ${styles.img}`}>
                            <img src={this.state.avatar} alt="avatar" className={`hallOfFame  ${styles.image}`}/>
                        </div>
                        <div className={`hallOfFame  ${styles.col_info}`}>
                            <h6 className={`hallOfFame  ${styles.info}`}>
                                {this.state.pseudo}
                            </h6>
                            <h6 className={`hallOfFame  ${styles.info}`}>
                                {this.state.points} points
                            </h6>
                            <h6 className={`hallOfFame  ${styles.info}`}>
                                {this.state.rank} / {this.state.total_member} membres
                            </h6>
                        </div>
                    </div>
                    <div className={`hallOfFame  ${styles.col1}`}>
                        <h6 className={`hallOfFame  ${styles.info}`}>
                            {this.state.reussis} challs réussis
                        </h6>
                        <h6 className={`hallOfFame  ${styles.info}`}>
                            {this.state.solutions} solutions publiées
                        </h6>
                        <h6 className={`hallOfFame  ${styles.info}`}>
                            {this.state.inventes} challs inventés
                        </h6>
                    </div>
                </div>
                <div className={`hallOfFame  ${styles.row1}`}>
                    <div className={`hallOfFame  ${styles.graph}`}>
                        <span className={`hallOfFame  ${styles.graphtext}`}>
                            Graphe
                        </span>
                    </div>
                    <div className={`hallOfFame  ${styles.col_stat}`}>
                        {this.state.stats.map(stat => (
                            <div className={`hallOfFame  ${styles.row_stat}`}>
                                <span className={`hallOfFame  ${styles.stat_title}`}>
                                    {stat.name}
                                </span>
                                <div className={`hallOfFame  ${styles.stat_blank}`}>
                                    <div className={`hallOfFame  ${styles.stat_value}`} style={{width: stat.value + '%', background: stat.color}}/>
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
