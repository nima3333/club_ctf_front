import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import styles from './Dashboard.module.css';
import avatar from '../icons/007-hacker-icon.jpg';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.pseudo = "Alice_74";
    this.avatar = avatar;
    this.points = 4500;
    this.rank = 12;
    this.total_memberf = 12000;
    this.reussis = 12;
    this.solutions = 1;
    this.inventes = 2;
    this.stats = [
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
    ];
  }

  render() {
    return (
        <div className={`Dashboard  ${styles.main_div}`}>
            <div className={`Dashboard  ${styles.main_flex}`}>
                <div className={`Dashboard  ${styles.row1}`}>
                    <div className={`Dashboard  ${styles.col_img_info}`}>
                        <div className={`Dashboard  ${styles.img}`}>
                            <img src={this.avatar} alt="avatar" className={`Dashboard  ${styles.image}`}/>
                        </div>
                        <div className={`Dashboard  ${styles.col_info}`}>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.pseudo}
                            </h6>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.points} points
                            </h6>
                            <h6 className={`Dashboard  ${styles.info}`}>
                                {this.rank} / {this.total_member} membres
                            </h6>
                        </div>
                    </div>
                    <div className={`Dashboard  ${styles.col1}`}>
                        <h6 className={`Dashboard  ${styles.info}`}>
                            {this.reussis} challs réussis
                        </h6>
                        <h6 className={`Dashboard  ${styles.info}`}>
                            {this.solutions} solutions publiées
                        </h6>
                        <h6 className={`Dashboard  ${styles.info}`}>
                            {this.inventes} challs inventés
                        </h6>
                    </div>
                </div>
                <div className={`Dashboard  ${styles.row1}`}>
                    <div className={`Dashboard  ${styles.graph}`}>
                        <span className={`Dashboard  ${styles.graphtext}`}>
                            Graphe
                        </span>
                    </div>
                    <div className={`Dashboard  ${styles.col_stat}`}>
                        {this.stats.map(stat => (
                            <div className={`Dashboard  ${styles.row_stat}`}>
                                <span className={`Dashboard  ${styles.stat_title}`}>
                                    {stat.name}
                                </span>
                                <div className={`Dashboard  ${styles.stat_blank}`}>
                                    <div className={`Dashboard  ${styles.stat_value}`} style={{width: stat.value + '%', background: stat.color}}/>
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
